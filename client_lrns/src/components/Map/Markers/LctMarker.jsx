import { Placemark, Circle } from "react-yandex-maps";
import cssFile from "./Markers.module.css";

function LctMarkers(props) {
  let input_resids_bubble_generator = (resids, numbers, itemnum) => {
    let resid_string = [];
    numbers.forEach((el) => {
      if (el == itemnum) {
        resid_string = `<div style="text-align: center"><b style="color: red;">${el})</b> <b>${resids[el][itemnum]}</b></div>${resid_string}`;
      } else {
        resid_string = `${resid_string} <b style="color: red;">${el})</b>${resids[el][itemnum]} `;
      }
    });
    return resid_string;
  };

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
          iconColor: `rgba(${
            96 + Math.abs(props.state.Lct.resids[item][item] * 2)
          },${255 - Math.abs(props.state.Lct.resids[item][item] * 2)},0,2)`,
          balloonOffset: [0, -35],
        }}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
        properties={{
          iconContent: item,
          balloonContentBody: [
            `<div>${input_resids_bubble_generator(
              props.state.Lct.resids,
              props.state.Lct.number,
              item
            )}</div>`,
          ].join(""),
        }}
      />
    );
  });
}

export default LctMarkers;
