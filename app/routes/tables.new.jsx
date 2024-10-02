import { useState } from "react";
import { Link } from "@remix-run/react";
import { createTable } from "../utils/api";
import TableErrors from "../errors/TableErrors";

export default function TableNew(){
  const initialTableState = {
    table_name: "",
    capacity: 0,
  };

  const [table, setTable] = useState({
    ...initialTableState,
  });
  const [tableErrors, setTableErrors] = useState(null);
  //const history = useNavigate();

  const changeHandler = (event) => {
    if (event.target.name === "capacity") {
      setTable({
        ...table,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setTable({
        ...table,
        [event.target.name]: event.target.value,
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    createTable(table, abortController.signal)
      //.then(<Navigate to="/dashboard"/>)
      .catch(setTableErrors);

    return () => abortController.abort();
  };

  return (
    <section>
      <h2>Create a Table:</h2>
      <TableErrors errors={tableErrors} />
      <form onSubmit={submitHandler}>
        <fieldset>
          <div>
            <label htmlFor="table_name">Table Name:</label>
            <input
              id="table_name"
              name="table_name"
              type="text"
              required={true}
              value={table.table_name}
              maxLength={100}
              minLength={2}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="capacity">Capacity:</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              required={true}
              value={table.capacity}
              min={1}
              onChange={changeHandler}
            />
          </div>
          <div className="group-row">
            <Link className="red" to="/">
              Cancel
            </Link>
            <Link to="/">
            <button className="black" type="submit">
              Submit
            </button>
            </Link>
          </div>
        </fieldset>
      </form>
    </section>
  );
};