import "./MapOverlays.css";
import { useState, useEffect } from "react";

export default function MapOverlays(props) {
  const [map, setMap] = useState(null);
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    if (map) return;
    setMap(props.map);
  }, [map, props.map]);

  useEffect(() => {
    setDegree(props.degree);
  }, [props.degree]);

  const handleZoomIn = () => {
    map.current.zoomIn();
  };

  const handleZoomOut = () => {
    map.current.zoomOut();
  };

  const toggleSatellite = () => {
    const mapStyle = map.current.getStyle();
    if (mapStyle.name === "Streets") {
      map.current.setStyle(
        "https://api.maptiler.com/maps/hybrid/style.json?key=" +
          process.env.REACT_APP_MAPTILER_API_KEY
      );
    } else {
      map.current.setStyle(
        "https://api.maptiler.com/maps/streets/style.json?key=" +
          process.env.REACT_APP_MAPTILER_API_KEY
      );
    }
  };

  return (
    <div className="map-overlays">
      <div className="overlay-item">
        <i className="action-button bx bx-expand"></i>{" "}
      </div>
      <div className="overlay-item plus-minus">
        <button onClick={handleZoomIn}>
          <i className="action-button plus bx bx-plus"></i>
        </button>
        <button onClick={handleZoomOut}>
          <i className="action-button min bx bx-minus"></i>
        </button>
      </div>
      <div className="overlay-item">
        <i
          className="action-button bx bx-up-arrow-alt"
          style={{
            transform: `rotate(${degree}deg)`,
          }}
        ></i>{" "}
      </div>
      <button
        className="btn btn-primary overlay-item"
        onClick={toggleSatellite}
      >
        <i className="action-button bx bx-globe"></i>{" "}
      </button>
    </div>
  );
}
