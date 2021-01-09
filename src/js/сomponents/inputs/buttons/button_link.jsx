import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {Icon_arrow_right} from "../../svg"

export default function Btn_link(props) {
  return (
    <a
      href={props.href || "#"}
      className="btn-link"
    >
      {props.title || "Link"}
      <Icon_arrow_right />
    </a>
  )
}
