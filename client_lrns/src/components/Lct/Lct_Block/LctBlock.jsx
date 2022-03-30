import cssstyle from "./LctBlock.module.css";

function LctBlock(props) {
  let resids_generator = (arr, key) => {
    let resid_string = null;
    if (arr != null) {
      resid_string = arr.map((el, ind) => {
        if (el != null) {
          return (
            <a key={ind}>
              <b>{ind})</b> {el}{" "}
            </a>
          );
        } else {
          return <b key={ind}>Невязки: </b>;
        }
      });
    }

    return <div className="white-space: nowrap;">{resid_string}</div>;
  };

  return (
    <div className={cssstyle.LctBlock}>
      <b>LctL2O # {props.num}</b>
      {"\u00A0"}
      {"\u00A0"}
      {"\u00A0"}
      {"\u00A0"}
      {"\u00A0"}
      <a className={cssstyle.data}>
        {props.Lct.time_data[props.num]} {props.Lct.timer[props.num]}
      </a>
      <br />
      {props.Lct.coordinates.latitude[props.num]},{" "}
      {props.Lct.coordinates.longtude[props.num]}, {props.Lct.height[props.num]}{" "}
      m
      <br />
      {resids_generator(props.Lct.resids[props.num])}
    </div>
  );
}

export default LctBlock;