import { CHANGE_PATH } from '../actionTypes'
import { path_chunk } from '../rd_store_sections'


let path_template = {}
path_template[path_chunk.ALBUM] = globalThis.localStorage?.getItem('path__album') || 101625552
path_template[path_chunk.TRACK] = globalThis.localStorage?.getItem('path__track') || 231

export function path_by_items(state = path_template, action) {
  switch (action.type) {
    case CHANGE_PATH:
      let new_path = {...state}
      if (action.path.album) {
        new_path[path_chunk.ALBUM] = action.path.album
        globalThis.localStorage?.setItem('path__album', action.path.album);
      }
      if (action.path.track) {
        new_path[path_chunk.TRACK] = action.path.track
        globalThis.localStorage?.setItem('path__track', action.path.track);
      }

      return {...new_path}
    default:
      return state
  }
}
