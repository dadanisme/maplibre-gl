import "./Navbar.css";
import { Dropdown } from "react-bootstrap";

export default function Navbar() {
  return (
    <div className="heading">
      <div className="nav-item">
        <h3
          onClick={() => {
            window.location.href = "/";
          }}
        >
          MapLibre-GL Demo
        </h3>

        <div className="list-container">
          <span className="list-text active">
            <i className="bx bx-map-alt list-icon"></i> Peta Sebaran
          </span>
        </div>

        <Dropdown className="list-container">
          <Dropdown.Toggle variant="success" id="aset-dropdown">
            <span className="list-text">
              <i className="bx bx-spreadsheet list-icon"></i> Pengelolaan Aset
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">What's</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Inside</Dropdown.Item>
            <Dropdown.Item href="#/action-3">This</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-4">Menu</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="list-container">
          <span className="list-text">
            <i className="bx bx-bar-chart-alt-2 list-icon"></i> Infografis
          </span>
        </div>
      </div>
      <Dropdown className="nav-item list-container">
        <Dropdown.Toggle variant="success" id="dropdown">
          <span className="list-text">
            <i className="bx bx-user-circle list-icon user-icon"></i> username
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">
            <i className="bx bx-user text-icon"></i>Profile
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">
            <i className="bx bx-cog text-icon"></i>Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">
            <i className="bx bx-log-out text-icon"></i>Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
