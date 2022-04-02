import cssstyle from "./LctLayer.module.css";
import LctBlock from "./Lct_Block/LctBlock";

function LctLayer(props) {
  let Lct_Block_Generator = props.Lct.number.map((element) => {
    return <LctBlock Lct={props.Lct} num={element} key={element} />;
  });
  return <div className={cssstyle.Lct}>{Lct_Block_Generator}</div>;
}

export default LctLayer;
