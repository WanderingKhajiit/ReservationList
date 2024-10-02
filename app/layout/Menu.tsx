import React from "react";
import { Link } from "@remix-run/react";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time"
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const query = useQuery();
  const date = query.get("date")
  return (
    <div className="group">
      <header>
        <Link to="/">
          <h1>Periodic Tables</h1>
        </Link>
      </header>
      <nav>
        <div>
          <ul className="group-col no-gap">
            <li className="item">
              <Link to="/">
                <span />
                &nbsp;Dashboard
              </Link>
            </li>
            <li className="item">
              <Link to="/search">
                <span />
                &nbsp;Search
              </Link>
            </li>
            <li className="item">
              <Link to="/reservations/new">
                <span />
                &nbsp;New Reservation
              </Link>
            </li>
            <li className="item">
              <Link to="/tables/new">
                <span />
                &nbsp;New Table
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </div>
  );
}

export default Menu;