import React from 'react';
import Btn from "../buttons/button"
import { Icon_backward, Icon_forward } from "../../svg"



export function Btn_tm_backward(props) {
  return (
    <Btn
      className="tm-backward"
      icon={<Icon_backward/>}
      onClick={()=>{
        typeof (props.onClick) == 'function' ? props.onClick(-10) : null
      }}
    />
  )
}

export function Btn_tm_forward(props) {
  return (
    <Btn
      className="tm-forward"
      icon={<Icon_forward/>}
      onClick={()=>{
        typeof (props.onClick) == 'function' ? props.onClick(10) : null
      }}
    />
  )
}
