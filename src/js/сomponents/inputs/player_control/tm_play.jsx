import React, {useState} from 'react';

export default function Btn_tm_play(props) {
  return (
    <button
      onClick={()=>{
        typeof (props.onClick) == 'function' ? props.onClick(!props.active) : null
      }}
      type="button"
      className={props.active ? "btn-tm-play active" : "btn-tm-play"}
    >
      <span></span>
    </button>
  )
}
