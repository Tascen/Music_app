import React, { useState } from 'react';

export default function Btn(props) {
  return (
    <button
      onClick={typeof (props.onClick) == 'function' ? props.onClick : null}
      type="button"
      name={props.name ? props.name : null}
      className={props.className ? "btn" + ' ' + props.className : "btn"}
    >
      {props.icon}
      {props.title && <span>{props.title}</span>}
    </button>
  )
}
