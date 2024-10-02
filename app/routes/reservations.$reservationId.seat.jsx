import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "@remix-run/react";
import { listTables, updateTable, readReservation } from "../utils/api";

export default function ReservationSeat(){
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [reservation, setReservation] = useState({});
  const history = useNavigate();

  useEffect(() => {
    listTables().then(setTables);
  }, []);

  useEffect(() => {
    readReservation(reservation_id).then(setReservation);
  }, [reservation_id]);

  const changeHandler = (event) => {
    setTableId(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    await updateTable(reservation.reservation_id, tableId);
    //history("/dashboard");
  };

  return (
    <section>
      <h2>Seat Reservation</h2>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div>
            <select
              id="table_id"
              name="table_id"
              value={tableId}
              required={true}
              onChange={changeHandler}
            >
              <option value="">- Select a table -</option>
              {tables.map((table) => (
                <option
                  key={table.table_id}
                  value={table.table_id}
                  disabled={
                    table.capacity < reservation.people || table.occupied
                  }
                >
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div className="group-row">
            <Link
              className="black"
              type="button"
              to="/"
            >
              Cancel
            </Link>
            <Link to ="/">
            <button className="yellow" type="submit">
              Submit
            </button>
            </Link>
          </div>
        </fieldset>
      </form>
    </section>
  );
};