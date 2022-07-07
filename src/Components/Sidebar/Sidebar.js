import { useState, useEffect } from "react";
import "./Sidebar.css";

export default function Sidebar(props) {
  const [fold, setFold] = useState(true);
  const [isPicking, setIsPicking] = useState(false);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes(props.routes);
  }, [props.routes]);

  useEffect(() => {
    setIsPicking(props.isPicking);
  }, [props.isPicking]);

  const toggleFold = () => {
    setFold(!fold);
  };

  const handleStartPicking = (e) => {
    props.onStartPick(!isPicking);
  };

  return (
    <div className={"sidebar" + (fold ? " fold" : "")}>
      <div
        className={"sidebar-toggle" + (fold ? " fold" : "")}
        onClick={toggleFold}
      >
        <i className={"bx bx-chevron-right" + (fold ? " fold" : "")}></i>
      </div>
      <div className="sidebar-content">
        <h5 className="sidebar-title">
          <i className="bx bx-edit-alt"></i> Edit Informasi Aset
        </h5>
        <div className="sidebar-header">
          <hr className="line line-yellow" />
          <hr className="line line-blue" />
          <i className="bx bx-user yellow"></i>
          <i className="bx bx-map yellow"></i>
          <i className="bx bx-camera blue"></i>
        </div>
        <div className="polygon-container">
          <button
            className="btn btn-primary polygon-button"
            onClick={handleStartPicking}
          >
            + Edit Poligon Aset
          </button>
          {isPicking && (
            <div className="action-buttons">
              <button
                className="btn btn-outline-secondary"
                onClick={(e) => {
                  props.onUndo();
                }}
              >
                Undo
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={(e) => {
                  props.onFill();
                }}
              >
                Fill Shape
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={(e) => {
                  props.onClearFill();
                }}
              >
                Clear Fill
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={(e) => {
                  props.onRemoveLayer();
                }}
              >
                Remove
              </button>
            </div>
          )}

          <div className="preview">
            {routes.length > 0 && (
              <div>
                <h5>Koordinat TItik</h5>
                <ol className="preview-content">
                  {routes.map((route, index) => (
                    <li className="preview-item" key={index}>
                      ({route.coordinates[0].toFixed(5)},{" "}
                      {route.coordinates[1].toFixed(5)})
                    </li>
                  ))}
                </ol>
                <p>Tipe: {props.isFilled ? "polygon" : "polyLine"}</p>
              </div>
            )}
          </div>

          {isPicking && (
            <div className="sidebar-footer">
              <button className="btn btn-outline-primary" onClick={toggleFold}>
                Kembali
              </button>
              <button className="btn btn-primary" onClick={toggleFold}>
                Selanjutnya
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
