import "./App.css";
import MapLayer from "./components/Map/MapLayer";
import React from "react";
import SolvLayer from "./components/Solv/SolvLayer";
import LctLayer from "./components/Lct/LctLayer";

function App(props) {
  let [data, setData] = React.useState(null);
  //ловим промес
  React.useEffect(() => {
    if (props.state !== undefined) props.state.then((data) => setData(data));
  }, [data, props.state]);
  if (data == null) {
    return (
      <div className="All_Layer">
        <div className="Solv_Layer">LOADNIG...</div>
        <div className="Lct_Layer">LOADNIG...</div>
        <div className="Map_Layer">LOADNIG...</div>
      </div>
    );
  } else {
    return (
      <div className="All_Layer">
        <div className="Solv_Layer">
          <SolvLayer Solv={data.state.Solv} />{" "}
        </div>
        <div className="Lct_Layer">
          <LctLayer Lct={data.state.Lct} />
        </div>
        <div className="Map_Layer">
          <MapLayer state={data.state} />
        </div>
      </div>
    );
  }
}
export default App;
