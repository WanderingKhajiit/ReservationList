//import type { MetaFunction } from "@remix-run/node";
import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable, updateStatus } from "../utils/api";
import ErrorAlert from "../errors/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import { useNavigate } from "@remix-run/react";
import ReservationsList from "../reservation/ReservationsList";
import TablesList from "../tables/TablesList";
import moment from "moment";
import Menu from "./Menu"
/*export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};*/

export default function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const history = useNavigate();
  const filterResults = true;

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then((data) => {
        setReservations(data)
        console.log(data) 
      })
      
      .catch(setReservationsError);

    listTables().then(setTables);

    return () => abortController.abort();
  }

  async function finishHandler(table_id) {
    const abortController = new AbortController();
    const result = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (result) {
      await finishTable(table_id, abortController.signal);
      loadDashboard();
    }

    return () => abortController.abort();
  }

  const cancelHandler = async (event) => {
    const result = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );

    if (result) {
      await updateStatus(event.target.value, "cancelled");
      loadDashboard();
    }
  };

  return (
    <main>
    <Menu />
    <ErrorAlert error={reservationsError} />
    <div className="group">
      <div className="item-double">
        <div className="group">
          <div className="item-double">
            <h2>
              Reservations for {moment(date).format("dddd MMM DD YYYY")}
            </h2>
          </div>
          <div className="item centered">
            <div className="group-row">
              <button
                className="item black"
                onClick={() =>
                  history(`/?date=${previous(date)}`)
                }
              >
                Previous
              </button>
              <button
                className="item black"
                onClick={() => history(`/?date=${today()}`)}
              >
                Today
              </button>
              <button
                className="item black"
                onClick={() => history(`/?date=${next(date)}`)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <hr></hr>
        <div id="reservations" className="group-col">
          <ReservationsList
            reservations={reservations}
            filterResults={filterResults}
            cancelHandler={cancelHandler}
          />
        </div>
      </div>
      <div id="tables" className="item">
        <h2>Tables</h2>
        <hr></hr>
        <TablesList tables={tables} finishHandler={finishHandler} />
      </div>
    </div>
  </main>
  );
}
