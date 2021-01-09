import React, {useState} from 'react';

export default function Timeline(props) {
  const [audio_state, set__Audio_state] = useState({
    currentTime: 0,
    duration: 0,
  });

  if (props.audio instanceof Audio) {
    let timeout;
    timeout = setTimeout(()=>{
      set__Audio_state({
        currentTime: props.audio.currentTime || 0,
        duration: props.audio.duration || 0,
      })
    }, props.audio.playbackRate * 100)
  }


  return (
    <div className="playerTimeline">
      <div onClick={event=>{onClick_timeline_progress(event, props.audio)}} className="playerTimeline_progress_bar" style={{"--value": audio_state.currentTime, "--max": audio_state.duration}}>
        <div className="playerTimeline_progress_value"></div>
      </div>

      <p className="playerTimeline_currentTime">{Math.floor(audio_state.currentTime)}</p>
      <p className="playerTimeline_allTime">{Math.floor(audio_state.duration)}</p>
    </div>
  )
}

let onClick_timeline_progress = (event, audio) => {
  let timeline_width = window.getComputedStyle(event.currentTarget).width;
  audio.currentTime = event.nativeEvent.offsetX / parseFloat(timeline_width) * audio.duration;
}
