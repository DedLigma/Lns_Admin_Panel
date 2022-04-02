import { YMaps, Map, Placemark } from "react-yandex-maps";
import cssFile from "./MapLayer.module.css";
import LctMarkers from "./Markers/LctMarker";
import SolvMarker from "./Markers/SolvMarker";
import ResidsPolyline from "./Resids/ResidsPolyline";

function MapLayer(props) {
  return (
    <div>
      <YMaps>
        <Map
          defaultState={{
            center: [
              props.state.Solv.coordinates.latitude,
              props.state.Solv.coordinates.longtude,
            ],
            zoom: 18,
          }}
          width={"auto"}
          minheight={"10px"}
          height={"98vh"}
        >
          <SolvMarker state={props.state} />
          <LctMarkers state={props.state} />
          <ResidsPolyline Lct={props.state.Lct} />
        </Map>
      </YMaps>
    </div>
  );
}

export default MapLayer;
