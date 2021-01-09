import store from '../store.js'
import { fetch_items } from './all'

import * as name from "../rd_store_sections";
import * as settings from "../../restAPI_settings";

export function load_album(id = "101625552") {
  return fetch_items(
    name.items_type.ALBUMS,
    `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`,
    {
      save_old: true,
      fetch_props: {
        "method": "GET",
      	"headers": {
      		"x-rapidapi-key": settings.x_rapidapi_key,
      		"x-rapidapi-host": settings.x_rapidapi_host
      	}
      }
    }
  )(store.dispatch)
}




export function load_track(id = "703149052") {
  return fetch_items(
    name.items_type.TRACKS,
    `https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
    {
      save_old: true,
      fetch_props: {
        "method": "GET",
      	"headers": {
      		"x-rapidapi-key": settings.x_rapidapi_key,
      		"x-rapidapi-host": settings.x_rapidapi_host
      	}
      }
    }
  )(store.dispatch)
}

export function load_tracks(ids = []) {
  return multe_fetch('https://deezerdevs-deezer.p.rapidapi.com/track', ids, name.items_type.TRACKS)
}




function multe_fetch(url, ids, where_save) {
  let first_fetch = new Promise(resolve=>{resolve()});

  ids.forEach((id, index) => {
    if (index >= ids.lenght - 1) {
      return first_fetch.then(()=>{
        return fetch_items(where_save, `${url}/${id}/`, {save_old: true})(store.dispatch)
      })
    } else {
      first_fetch = first_fetch.then(()=>{
        return fetch_items(where_save, `${url}/${id}/`, {save_old: true})(store.dispatch)
      })
    }
  });

}
