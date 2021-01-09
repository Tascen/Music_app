const assert = require('assert');
import configureStore from 'redux-mock-store'



import store, {initial_state} from '../redux/store'

import {path_by_items} from '../redux/reducers/path_by_items.js'
import {items_by_type} from '../redux/reducers/items_by_type.js'

import * as store_sections_names from "../redux/rd_store_sections";
import * as actions_type_name from '../redux/actionTypes'

import nullObjs from './nullObj.js'
import * as actions from "../redux/actions/all.js";
import * as loaders from "../redux/actions/loaders.js";
import * as albums_geters from "../redux/geters/albums_geters.js";
import * as tracks_geters from "../redux/geters/tracks_geters.js";





describe('>>> S T O R E <<<', ()=>{
  const mockStore = configureStore();
  var store = mockStore(initial_state);

  describe('Reducers', ()=>{

    describe('--- items_by_type ---', ()=>{

      it('Request sumthing items', () => {
        let state = {
          [store_sections_names.items_type.TRACKS]: {
            is_fetching: true,
            items: []
          }
        }
        state = items_by_type(state,
          {
            type: actions_type_name.REQUEST_ITEMS,
            items_type: store_sections_names.items_type.TRACKS
          }
        )

        assert.deepStrictEqual(
          state,
          {
            [store_sections_names.items_type.TRACKS]: {
              is_fetching: true,
              items: []
            }
          },
        );
      });

      it(`Receive sumthing items and save old`, () => {
        let state = items_by_type(
          {
            [store_sections_names.items_type.TRACKS]: {
              is_fetching: false,
              items: [
                {id: 1}
              ]
            }
          },
          {
            type: actions_type_name.RECEIVE_ITEMS,
            items_type: store_sections_names.items_type.TRACKS,
            items: [
              {id: 1},
              {id: 2}
            ],
            save_old: true
          }
        )

        assert.deepStrictEqual(
          state,
          {
            [store_sections_names.items_type.TRACKS]: {
              items: [
                {id: 1},
                {id: 1},
                {id: 2}
              ],
              is_fetching: false,
            }
          },
        );
      });

      it(`Receive sumthing items and save\`not old`, () => {
        let state = items_by_type(
          {
            [store_sections_names.items_type.TRACKS]: {
              is_fetching: false,
              items: [
                {id: 3}
              ]
            }
          },
          {
            type: actions_type_name.RECEIVE_ITEMS,
            items_type: store_sections_names.items_type.TRACKS,
            items: [
              {id: 1},
              {id: 2}
            ],
            save_old: false
          }
        )

        assert.deepStrictEqual(
          state,
          {
            [store_sections_names.items_type.TRACKS]: {
              items: [
                {id: 1},
                {id: 2}
              ],
              is_fetching: false,
            }
          },
        );
      });

    });

    describe('--- path_by_items ---', ()=>{
      it(`Change active track id to 22`, () => {
          let state = {[store_sections_names.path_chunk.TRACK]: 435}
          state = path_by_items(state, {type: actions_type_name.CHANGE_PATH, path: {track: 22}})
          assert.deepEqual(state, {[store_sections_names.path_chunk.TRACK]: 22});
      });
    });

  });

  describe('Geters', ()=>{

    describe('when nothing return', ()=>{


      describe("--- albums_geters ---", ()=>{
        it(`get_active_album() equal NuLLOBJ`, () => {
          assert.deepStrictEqual(albums_geters.get_active_album(), nullObjs.album);
        });
      })

      describe("--- tracks_geters ---", ()=>{
        it(`get_active_track() equal NuLLOBJ`, () => {
          assert.deepStrictEqual(tracks_geters.get_active_track(), nullObjs.track);
        });
        it(`get_active_track_id() equal -1`, () => {
          assert.equal(tracks_geters.get_active_track_id(), -1);
        });
        it(`get_track_previews() equal empty array`, () => {
          assert.deepEqual(tracks_geters.get_track_previews(), []);
        });
      })


    })

  });

});
