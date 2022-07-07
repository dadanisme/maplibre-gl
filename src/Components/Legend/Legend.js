import { useState } from "react";
import "./Legend.css";

export default function Legend() {
  const [fold, setFold] = useState(true);

  const toggleFold = () => {
    setFold(!fold);
  };
  return (
    <div className={"legend" + (fold ? " fold" : "")}>
      <div
        className={"legend-label" + (fold ? " fold" : "")}
        onClick={toggleFold}
      >
        Legend
      </div>
      <h5>Aset</h5>
      <ul className="legend-content">
        <li className="legend-item">
          <div className="legend-item-icon">
            <i className="bx bx-home-alt-2"></i>
          </div>
          <div className="legend-item-label">
            <span>Aset Bangunan</span>
          </div>
        </li>
        <li className="legend-item">
          <div className="legend-item-icon">
            <i className="bx bx-layer"></i>
          </div>
          <div className="legend-item-label">
            <span>Aset Tanah</span>
          </div>
        </li>
        <li className="legend-item">
          <div className="legend-item-icon">
            <i className="bx bx-grid-alt"></i>
          </div>
          <div className="legend-item-label">
            <span>Aset Lainnya</span>
          </div>
        </li>
        <li className="legend-item">
          <div
            className="legend-item-color"
            style={{ backgroundColor: "var(--bs-warning)" }}
          />
          <div className="legend-item-label">
            <span>Belum Sensus</span>
          </div>
        </li>
        <li className="legend-item">
          <div
            className="legend-item-color"
            style={{ backgroundColor: "var(--bs-success)" }}
          />
          <div className="legend-item-label">
            <span>Telah Sensus</span>
          </div>
        </li>
        <li className="legend-item">
          <div
            className="legend-item-color"
            style={{ backgroundColor: "var(--bs-primary)" }}
          />
          <div className="legend-item-label">
            <span>Tervalidasi</span>
          </div>
        </li>
        <li className="legend-item">
          <div
            className="legend-item-color"
            style={{ backgroundColor: "var(--bs-secondary)" }}
          />
          <div className="legend-item-label">
            <span>Polygon Asset</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
