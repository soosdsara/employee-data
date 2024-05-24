import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li>
          <Link to="/filter">
            <button type="button">Filter</button>
          </Link>
        </li>
        <li>
          <Link to="/sort">
            <button type="button">Sort</button>
          </Link>
        </li>
        <li>
          <Link to="/top-paid">
            <button type="button">Top paid</button>
          </Link>
        </li>
        <li>
          <Link to="/games-list">
            <button type="button">Board games</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
