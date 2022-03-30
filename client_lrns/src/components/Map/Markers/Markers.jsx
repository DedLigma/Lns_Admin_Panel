import { Placemark, Circle } from "react-yandex-maps";
import cssFile from "./Markers.module.css";

function Markers(props) {

  let resids_generator = (arr, key) => {
    let resid_string = [];
    if (arr != null) {
      arr.forEach((el, ind) => {
        if (el != null) {
          resid_string = `${resid_string} <b style="color: red;">${ind})</b>${el} `;
        }
      });
    }
    return resid_string;
  };

  let SolvMarker = () => {
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
              iconColor: "#23c400",
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
  };

  let LctMarkers = () => {
    return props.state.Lct.number.map((item) => {
      return (
        <Placemark
          key={item}
          geometry={[
            props.state.Lct.coordinates.latitude[item],
            props.state.Lct.coordinates.longtude[item],
          ]}
          options={{
            preset: "islands#icon",
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -35],
          }}
          modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
          properties={{
            iconContent: item,
            balloonContentBody: [
              `<div>${resids_generator(props.state.Lct.resids[item])}</div>`,
            ].join(""),
          }}
        />
      );
    });
  };

  return (
    <div>
      <SolvMarker />
      <LctMarkers />
    </div>
  );
}

export default Markers;
