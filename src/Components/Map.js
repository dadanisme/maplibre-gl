import { useRef, useEffect, useState } from "react";
import useKeypress from "react-use-keypress";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import Box from "./Box";

export default function Map() {
  // refs
  const mapContainer = useRef(null);
  const map = useRef(null);

  // consts
  const [lng] = useState(107.59181517109367);
  const [lat] = useState(-6.862748883983936);
  const [zoom] = useState(15);
  const [API_KEY] = useState("Nxj6l8KzvfU1L2uBVBZs");

  // states
  const [routes, setRoutes] = useState([]);
  const [markers, setMarkers] = useState([]);

  // initialize map
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    // handle map click
    map.current.on("click", (e) => {
      const pointLngLat = [e.lngLat.lng, e.lngLat.lat];

      // well, this is absurd, but it works
      setRoutes((prevRoutes) => {
        const id = prevRoutes.length + 1;
        let tempRoutes = [...prevRoutes, { id, coordinates: pointLngLat }];

        if (map.current.getSource("polygon") !== undefined) {
          // update polygon
          updatePolygon(tempRoutes);
        }

        // create marker
        if (map.current.getLayer("point-" + id) === undefined) {
          map.current.addLayer({
            id: `point-${id}`,
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: pointLngLat,
                },
              },
            },
            paint: {
              "circle-radius": 5,
              "circle-color": "#ff0000",
            },
          });

          const marker = new maplibregl.Marker({
            draggable: true,
            color: "#ff0000",
          })
            .setLngLat(pointLngLat)
            .addTo(map.current);

          // add marker to markers
          setMarkers((prevMarkers) => [...prevMarkers, marker]);
          marker.getElement().id = id;
        }
        return tempRoutes;
      });
    });
  });

  // update routes
  const updateRoutes = (arr) => {
    map.current.getSource("route").setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: arr.map((route) => route.coordinates),
      },
    });
  };

  // update polygon
  const updatePolygon = (arr) => {
    map.current.getSource("polygon").setData({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [arr.map((route) => route.coordinates)],
      },
    });
  };

  // construct route from coordinates
  useEffect(() => {
    if (map.current.getSource("route") === undefined) {
      if (routes.length < 2) return;
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routes.map((route) => route.coordinates),
          },
        },
      });
    }

    if (map.current.getLayer("route") === undefined) {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 4,
        },
      });
    } else {
      // update route
      map.current.getSource("route").setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: routes.map((route) => route.coordinates),
        },
      });
    }
  }, [routes]);

  // handle markers changes
  useEffect(() => {
    for (const marker of markers) {
      // handle dragging
      marker.on("drag", (e) => {
        let tempRoutes = routes;
        const markerElement = marker.getElement();
        const id = markerElement.id;
        const newPointLngLat = [e.target._lngLat.lng, e.target._lngLat.lat];
        map.current.getSource("point-" + id).setData({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: newPointLngLat,
          },
        });
        tempRoutes[id - 1].coordinates = newPointLngLat;
        setRoutes(tempRoutes);

        updateRoutes(tempRoutes);

        if (map.current.getSource("polygon") !== undefined) {
          // update polygon
          updatePolygon(tempRoutes);
        }
      });
    }
  }, [markers, routes]);

  // handle enter key
  useKeypress("Enter", () => {
    if (routes.length > 2) {
      if (map.current.getLayer("polygon") !== undefined) {
        map.current.removeLayer("polygon");
        map.current.removeSource("polygon");
      }

      map.current.addSource("polygon", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              routes.map((route) => route.coordinates),
              routes[0].coordinates,
            ],
          },
        },
      });

      map.current.addLayer({
        id: "polygon",
        type: "fill",
        source: "polygon",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8,
        },
      });
    }
  });

  //handle delete key
  useKeypress("Delete", () => {
    if (routes.length > 2) {
      map.current.removeLayer("polygon");
      map.current.removeSource("polygon");
    }
  });

  // handle escape key
  useKeypress("Escape", () => {
    for (let i = 1; i <= routes.length; i++) {
      map.current.removeLayer(`point-${i}`);
      map.current.removeSource(`point-${i}`);
    }

    if (map.current.getLayer("route") !== undefined) {
      map.current.removeLayer(`route`);
      map.current.removeSource(`route`);
    }

    if (map.current.getLayer("polygon") !== undefined) {
      map.current.removeLayer("polygon");
      map.current.removeSource("polygon");
    }
    setRoutes([]);
  });

  // handle backspace key
  useKeypress("Backspace", () => {
    if (routes.length < 1) return;
    map.current.removeLayer(`point-${routes.length}`);
    map.current.removeSource(`point-${routes.length}`);

    // remove last point from routes
    const tempRoutes = [...routes].slice(0, routes.length - 1);
    if (map.current.getLayer("polygon") !== undefined) {
      updatePolygon(tempRoutes);
    }
    setRoutes(tempRoutes);
  });

  return (
    <div className="map-wrap">
      <Box routes={routes} />
      <div ref={mapContainer} className="map" />
    </div>
  );
}
