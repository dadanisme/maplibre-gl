import { Badge } from "react-bootstrap";
import "./Box.css";
export default function Box(props) {
  return (
    <div className="result-box pt-3">
      {props.routes.length === 0 ? (
        <div className="p-2">
          <h3>Usage</h3>
          <ul>
            <li>Click on the map to add a point</li>
            <li>
              Hit <Badge bg="primary">Backspace</Badge> to delete last point
            </li>
            <li>
              Hit <Badge bg="success">Enter</Badge> to draw polygon
            </li>
            <li>
              Hit <Badge bg="danger">Delete</Badge> to erase polygon
            </li>
            <li>
              Hit <Badge bg="dark">Escape</Badge> to erase all waypoints
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <h4>Waypoints</h4>
          <ol>
            {props.routes.map((route, index) => (
              <li key={index}>
                ({route.coordinates[0].toFixed(5)},{" "}
                {route.coordinates[1].toFixed(5)})
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
