import React, {useEffect} from 'react';

export function Fallback_preloader(props) {
  return (
    <div className={props.is_hidden ? "fallback_loader_panel is_hidden" : "fallback_loader_panel"}>
      <img src=""/>
    </div>
  )
}

export function Data_preloader(props) {
  return (
    <div className={props.is_hidden ? "loader_panel is_hidden" : "loader_panel"}>
      <div className="loader-t2"></div>

    </div>
  )
}

export function Preloader(props) {
  return (
    <div className={props.is_hidden ? "loader_panel is_hidden" : "loader_panel"}>
      <div className="loader-t1"></div>
    </div>
  )
}
