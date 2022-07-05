import Map from "./Components/Map.js";
import Navbar from "./Components/Navbar.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  if (window.innerWidth < 768) {
    return (
      <h1>
        No, you can't use this app on a mobile device. Please use a desktop
      </h1>
    );
  }
  return (
    <div className="App">
      <Navbar />
      <Map />
    </div>
  );
}

export default App;
