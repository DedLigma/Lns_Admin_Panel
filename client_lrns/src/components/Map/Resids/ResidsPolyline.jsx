import { Polyline } from "react-yandex-maps";

function ResidsPolyline(props) {
  return props.Lct.number.map((current_number) => {
    return props.Lct.number.map((el) => {
      if (el !== current_number) {
        return (
          <Polyline
            geometry={[
              [
                props.Lct.coordinates.latitude[current_number],
                props.Lct.coordinates.longtude[current_number],
              ],
              [
                (props.Lct.coordinates.latitude[el] +
                  props.Lct.coordinates.latitude[current_number]) /
                  2,
                (props.Lct.coordinates.longtude[el] +
                  props.Lct.coordinates.longtude[current_number]) /
                  2,
              ],
            ]}
            options={{
              balloonCloseButton: true,
              strokeColor: `rgba(${
                96 + Math.abs(props.Lct.resids[el][current_number] * 2)
              },${
                255 - Math.abs(props.Lct.resids[el][current_number] * 2)
              },0,2)`,

              strokeWidth: 10,
              strokeOpacity: 0.5,
            }}
            properties={{
              balloonContentBody: [
                `${el} to ${current_number} = ${props.Lct.resids[el][current_number]}`,
              ].join(""),
            }}
            key={`${current_number}+${el}`}
          />
        );
      }
    });
  });
}

export default ResidsPolyline;
