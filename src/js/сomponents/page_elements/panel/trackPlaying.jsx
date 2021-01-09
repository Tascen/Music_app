import React, {useState, useEffect} from 'react';

import { Icon_backward, Icon_forward, Icon_arrow_down } from "../../svg"
import Btn from "../../inputs/buttons/button"
import { Data_preloader } from "../preloaders"


import Player_timeline from "../../inputs/player_control/timeline"
import Btn_tm_play from "../../inputs/player_control/tm_play"
import Btn_volume from "../../inputs/player_control/volume"
import Playback_speed from "../../inputs/player_control/playback_speed"
import { Btn_tm_backward, Btn_tm_forward } from "../../inputs/player_control/tm_steps"

export const TrackPlaying_panel = React.forwardRef((props, ref) => {
  const [audio, set_Audio] = useState(props.audio);
  const [update_audio_in, set__update_audio] = useState(props.update_audio_in);



  if (!audio || props.update_audio_in != update_audio_in) {
    let ref_audio = new Audio(props.audio.src);
    ref_audio.addEventListener(
      "loadeddata",
      () => {
        set_Audio(ref_audio);
        set__update_audio(props.update_audio_in)
        ref_audio.addEventListener("ended", function(){
          audio.currentTime = 0;
        });
        ref_audio = null;
      },
      false
    );
  }



  const [audio_settings, set_Settings] = useState({
    playbackRate: 1,
    valume: 0.5,
    paused: true,
  });
  if (audio instanceof Audio) {
    audio.playbackRate = audio_settings.playbackRate;
    audio.volume = audio_settings.valume;
    audio_settings.paused ? audio.pause() : audio.play();
  }

  return (
    <div ref={ref} className={props.default_opened ? "panel-trackPlaying opened" : "panel-trackPlaying"}>
      <Data_preloader is_hidden={audio instanceof Audio}/>
      <div className="panel-trackPlaying_header">
        <Btn
          onClick={()=>{
            set_Settings({...audio_settings, paused: true})
            typeof(props.onChange_opened) == "function" ? props.onChange_opened(false) : null;
          }}
          className="close_open"
          icon={<Icon_arrow_down />}
        />
      </div>

      <div className="panel-trackPlaying_cover">
        {props.cover &&
          <img src={props.cover.src} alt={props.cover.alt}/>
          ||
          <img src="#" alt="not founded"/>
        }
      </div>

      <Player_timeline audio={audio}/>

      <div className="panel-trackPlaying_text">
        <h3>{props.name}</h3>
        <h6>{props.title}</h6>
      </div>

      <div className="panel-trackPlaying_control">
        <div className="panel-trackPlaying_control_line">
          <Playback_speed
            default={audio_settings.playbackRate}
            onChange={value=>{
              set_Settings({...audio_settings, playbackRate: value})
            }}
          />


          <Btn_tm_backward
            onClick={step=>{
              audio.currentTime = audio.currentTime + step
            }}
          />
        </div>

        <Btn_tm_play
          active={audio_settings.paused}
          onClick={(paused)=>{
            set_Settings({...audio_settings, paused: paused})
          }}
        />

        <div className="panel-trackPlaying_control_line">
          <Btn_tm_forward
            onClick={step=>{
              audio.currentTime = audio.currentTime + step
            }}
          />
          <Btn_volume
            default={audio_settings.valume * 100}
            onChange={value=>{
              if (value * 0.01 < 0) {
                set_Settings({...audio_settings, valume: 0})
              } else if (value * 0.01 > 1) {
                set_Settings({...audio_settings, valume: 1})
              } else {
                set_Settings({...audio_settings, valume: value * 0.01})
              }
            }}
          />
        </div>
      </div>




    </div>
  )
})
