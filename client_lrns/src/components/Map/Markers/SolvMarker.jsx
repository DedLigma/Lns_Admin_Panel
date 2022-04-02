import { Placemark, Circle } from "react-yandex-maps";
import cssFile from "./Markers.module.css";

function SolvMarker(props) {
  if (props.state == undefined) {
    return <Placemark geometry={[55.75, 37.57]} />;
  } else {
    return (
      <div>
        <Placemark
          geometry={[
            props.state.Solv.coordinates.latitude,
            props.state.Solv.coordinates.longtude,
          ]}
          options={{
            preset: "islands#dotIcon",
            iconColor: "rgb(0,0,255,1)",
          }}
        />
        <Circle
          geometry={[
            [
              props.state.Solv.coordinates.latitude,
              props.state.Solv.coordinates.longtude,
            ],
            props.state.Solv.pdop,
          ]}
        />
      </div>
    );
  }
}

export default SolvMarker;
