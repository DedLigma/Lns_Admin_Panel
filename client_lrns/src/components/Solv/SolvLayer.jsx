import styles from './SolvLayer.module.css'

function SolvLayer(props) {
  return (
    <div className={styles.SolvBlock}>
      <b>Solv</b>
      <br/><b>Коорд:</b>{"\u00A0"}{props.Solv.coordinates.latitude}, {props.Solv.coordinates.longtude};
      <br/><b>Высота:</b>{"\u00A0"}{props.Solv.height};
      <br/><b>Расст:</b>{"\u00A0"}{props.Solv.e_distance};
      <br/><b>Г.фактор:</b>{"\u00A0"}{props.Solv.pdop};
      <br/><b>SVs:</b>{"\u00A0"}{props.Solv.svs};
      <br/><b>Апп.счетчик:</b>{"\u00A0"}{props.Solv.appar_counter};
      <br/><b>Поправки:</b>{"\u00A0"}{props.Solv.modi_ns}ns {props.Solv.modi_ms}m/s;
    </div>
    )
}

export default SolvLayer;
