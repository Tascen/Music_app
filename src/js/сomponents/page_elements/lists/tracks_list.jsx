import React, {useState, useRef} from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Btn from "../../inputs/buttons/button"
import Item_track from "../../list_items/item_track"


let throttle = require('lodash.throttle');
import is_element_in_viewport from '../../../functions/viewport_visibility'




export default function Tracks_list(props) {
  const container = useRef(null);
  const [opened, setOpened] = useState(props.default_opened || false);
  const [selected_item, set_item] = useState(0);

  return (
    <div
      ref={container}
      className={opened ? "list-tracks opened" : "list-tracks"}
      onScroll={event=>{
        let btn = event.currentTarget.children[0]
        if ( event.currentTarget.scrollTop <= btn.getBoundingClientRect().height + 40 ) {
          btn.classList.remove("fixed")
        } else if ( !btn.classList.contains("fixed") && !is_element_in_viewport(btn, {full_element: true, viewport: event.currentTarget}) ) {
          btn.classList.add("fixed")
        }

        if (!opened && event.currentTarget.scrollTop >= 20) {
          setOpened(true)
          typeof(props.onChange_opened) == "function" ? props.onChange_opened(true) : null
        }
      }}
    >
      <div className="list-tracks_header">
      <Btn
        onClick={()=>{
          if (props.items?.length) {
            if (opened && container.current) {
              container.current.scrollTop = 0
            }
            setOpened(!opened)
            typeof(props.onChange_opened) == "function" ? props.onChange_opened(!opened) : null
          }
        }}
        className={( container.current && container.current?.scrollHeight == container.current?.clientHeight) ? "close_open is_hidden" : "close_open"}
        icon={<React.Fragment><span></span><span></span></React.Fragment>}
      />
      </div>

      <div className="list-tracks_items">
        {props.items?.length != 0 && props.items.map((item, index)=>
          <Item_track
            key={item.id || index}
            id={index}
            Btn_onClick={()=>{
              set_item.bind(null, index);
              typeof(props.onSelect) == "function" ? props.onSelect(index) : ""
            }}
            name={item.name}
            date={item.date}
            duration={item.duration}
          />
        )}
      </div>

    </div>
  )
}
