import React from 'react';
import Btn from "../buttons/button"
import Input_list from "../input-list"

const playbackRates = [
  "0.50X",
  "0.75X",
  "1.00X",
  "1.25X",
  "1.50X",
]

export default function Playback_speed(props) {
  let default_index = playbackRates.map(item=>parseFloat(item)).indexOf(props.default)
  return (
    <Input_list
      onChange={index=>{
        typeof (props.onChange) == 'function' ? props.onChange(parseFloat(playbackRates[index])) : null
      }}
      selected_item={default_index != -1 ? default_index : 2}
      items={playbackRates}
    />
  )
}
