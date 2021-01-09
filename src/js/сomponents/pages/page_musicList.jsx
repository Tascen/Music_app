import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import { CSSTransition, TransitionGroup } from 'react-transition-group';


import Btn from "../inputs/buttons/button";
import {Icon_reset} from "../svg";


import { AlbumHead_panel } from "../page_elements/panel/albumHead";
import Tracks_list from "../page_elements/lists/tracks_list";
import { TrackPlaying_panel } from "../page_elements/panel/trackPlaying";
import {Data_preloader} from "../page_elements/preloaders";


import { load_track, load_album } from '../../redux/actions/loaders'
import {change_path} from '../../redux/actions/all.js'

import {get_track_previews, get_active_track, get_active_track_id} from '../../redux/geters/tracks_geters.js'
import {get_active_album} from '../../redux/geters/albums_geters.js'

class Page_musicList extends React.Component {
  constructor(props) {
    super(props);
    this.tracks_list = React.createRef();

    this.state = {
      parent: null,
      offset: 0,

      active_track: 0,
      update_track_in: true,

      tracks_list_opened: false,
      trackPlaying_panel_opened: false,

      ready: true
    };

    this.load_random_album = load_random_album.bind(this)
  }

  render() {
    let props = this.props;

    return (
      <main id="page_musicList" ref={this.page}>
        <header>

          <Btn
            className="reset_album"
            icon={<Icon_reset/>}
            onClick={()=>{
              this.load_random_album()
            }}
          />
        </header>

        <AlbumHead_panel
          cover={{
            src: props.album.cover.src,
            alt: props.album.cover.alt
          }}
          name={props.album.name}
          author={props.album.author}
          desc={props.album.desc}
          href={props.album.href}

          mini_ver={this.state.tracks_list_opened ? true : false}
        />

        <Tracks_list

          default_opened={this.state.tracks_list_opened}
          onChange_opened={(opened)=>{
            this.setState({tracks_list_opened: opened})
          }}
          onSelect={(index)=>{
            change_path({
              track: props.tracks[index].id
            })
            this.setState({
              trackPlaying_panel_opened: true,
              active_track: index,
              update_track_in: !this.state.update_track_in
            })
          }}
          items={props.tracks}
        />

        <TrackPlaying_panel
          update_audio_in={this.state.update_track_in}
          default_opened={this.state.trackPlaying_panel_opened}
          onChange_opened={(opened)=>{
            this.setState({trackPlaying_panel_opened: opened})
          }}
          cover={{
            src: props.active_track.cover.src,
            alt: props.active_track.cover.alt
          }}
          name={props.active_track.name}
          title={props.active_track.title}
          timePoint={0}
          audio={{
            src: props.active_track.audio.src,
            type: props.active_track.audio.type
          }}
        />

        <Data_preloader is_hidden={this.state.ready}/>

      </main>
    );
  }
}


const return_data = state => {
  let album = get_active_album(state), tracks = get_track_previews(state), active_track = get_active_track(state);
  if (active_track.is_nullOBJ) {
    load_track(get_active_track_id(state))
  }


  return { album, tracks, active_track };
};
export default connect(return_data)(Page_musicList);




function load_random_album() {
  let id = randomNumber(101620000, 101625552);//for check use id: 101625552
  this.setState({ready: false})
  load_album(id).then(()=>{
    change_path({
      album: id,
    })
    this.setState({ready: true})
  }).catch(code=>{
    this.load_random_album()
  })
}

function randomNumber(min, max) {
  return Math.floor( Math.random() * (max - min) + min )
}
