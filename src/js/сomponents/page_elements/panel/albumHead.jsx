let React = require('react');

import Btn_link from "../../inputs/buttons/button_link"
import Btn from "../../inputs/buttons/button"
import copy_text from "../../../functions/copy_text"


export function AlbumHead_panel(props) {
  return (
    <div className={props.mini_ver ? "panel-albumHead mini_ver" : "panel-albumHead"}>
      <div className="panel-albumHead_part-1">
        <div className="panel-albumHead_cover">
          {props.cover &&
            <img src={props.cover.src || "#"} alt={props.cover.alt}/>
            ||
            <img src="#" alt="not founded"/>
          }
        </div>
        <div className="panel-albumHead_title">
          {props.name && <h3 className="panel-albumHead_name">{props.name}</h3>}
          {props.author && <h6 className="panel-albumHead_author">{props.author}</h6>}
        </div>
      </div>

      <div className="panel-albumHead_part-2">
        <div className="panel-albumHead_title">
          {props.name && <h3 className="panel-albumHead_name">{props.name}</h3>}
          {props.author && <h6 className="panel-albumHead_author">{props.author}</h6>}
        </div>
        {props.desc && <h6 className="panel-albumHead_desc">{props.desc}</h6>}
        <div className="panel-albumHead_line">
          <Btn_link title="Source" href={props.href}/>
          <Btn onClick={()=>{copy_text(props.href)}} className="copy_link" title="Copy link"/>
        </div>
      </div>

    </div>
  )
}
