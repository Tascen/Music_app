import {CHANGE_PATH, SELECT_ITEMS_TYPE, REQUEST_ITEMS, RECEIVE_ITEMS } from '../actionTypes'
import * as name from "../rd_store_sections";
import store from '../store.js'


function request_items(type) {
  return {
    type: REQUEST_ITEMS,
    items_type: type
  }
}

function receive_items(type, json, param) {
  if (param.save_old) {
    return {
      type: RECEIVE_ITEMS,
      items_type: type,
      items: [json],
      save_old: param.save_old
    }

  } else {
    return {
      type: RECEIVE_ITEMS,
      items_type: type,
      items: json,
      save_old: param.save_old
    }
  }
}

export function fetch_items(type, url = null, param = {save_old: false, fetch_props: {}}) {
  return dispatch => {

    if (!store_section_isLocked(type)) {
      dispatch(request_items(type))
      let head_resulve, head_reject;

      fetch(url, {mode: 'cors', ...param.fetch_props})
        .then(response => response.json())
          .then(json => {

            if (json.error) {
              dispatch(receive_items(type, json, {...param, save_old: true })); head_reject(json.error.code)
            } else {
              dispatch(receive_items(type, json, param)); head_resulve()
            }
          })
      return new Promise((resulve, reject)=>{head_resulve = resulve; head_reject = reject})

    } else {
      return -1
    }
  }
}

export function change_path(path) {
  store.dispatch({
    type: CHANGE_PATH,
    path: path
  })
}











function store_section_isLocked(type) {
  if (store.getState()[name.ITEMS_BY_TYPE][type] === undefined) {
    return false
  } else {
    return store.getState()[name.ITEMS_BY_TYPE][type].is_fetching
  }
}
