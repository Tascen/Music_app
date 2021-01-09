let React = require('react');
import { Icon_triangle_right } from "../svg";
import Btn from "../inputs/buttons/button"

export default function Item_track(props) {
  let duration = props.duration || "0",
    hour = Math.floor(duration / 3600),
    min = Math.floor((duration - hour * 3600) / 60),
    sec = Math.floor(duration - hour * 3600 - min * 60);

  return (
    <div className="item-track">
      <h6 className="item-track_name">{props.name}</h6>
      <p className="item-track_miniInfo">{`${hour > 0 ? hour + " hours" : "" }${min > 0 ? " " + min + " min" : "" }${sec > 0 ? " " + sec + " sec" : "" }`}</p>

      <Btn
        onClick={()=>{ typeof(props.Btn_onClick) == "function" ? props.Btn_onClick(props.id) : null }}
        className="play"
        icon={<Icon_triangle_right/>}
      />
    </div>
  )
}
