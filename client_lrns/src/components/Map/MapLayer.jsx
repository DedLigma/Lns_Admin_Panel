import { YMaps, Map, Placemark } from "react-yandex-maps";
import cssFile from "./MapLayer.module.css";
import Markers from "./Markers/Markers";

function MapLayer(props) {
  return (
    <div>
      <YMaps>
        <Map
          defaultState={{
            center: [props.state.Solv.coordinates.latitude, props.state.Solv.coordinates.longtude],
            zoom: 18,
          }}
          width={"auto"}
          minheight={"10px"}
          height={"98vh"}
         
        >
          <Markers state={props.state} />
        </Map>
      </YMaps>
    </div>
  );
}

export default MapLayer;
