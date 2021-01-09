import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../actionTypes'
import { items_type } from '../rd_store_sections'

export function items_by_type(state = {}, action) {
  if (action.type == REQUEST_ITEMS) {
    let new_state_with_new_group_items = {...state}
    new_state_with_new_group_items[action.items_type] = {
      ...new_state_with_new_group_items[action.items_type],
      is_fetching: true,
      items: new_state_with_new_group_items[action.items_type]?.items || []
    }
    return new_state_with_new_group_items;
    //-------------------------------------------------------
  } else if (action.type == RECEIVE_ITEMS) {
    let new_items = {...state}
    if (action.save_old) {
      let systematized_items = action.items

      new_items[action.items_type] = {
        items: [...state[action.items_type].items, ...systematized_items],
        is_fetching: false
      }

    } else {
      new_items[action.items_type] = {
        items: action.items,
        is_fetching: false
      }

    }


    return {...new_items}
    //-------------------------------------------------------
  } else {return state}
}






function habitats_systematizer(items) {
  return items.map(item=>{
    return {
      id: item.id,
      name: item.name,
      pokemon_species: item.pokemon_species.map(item=>item.name)
    }
  })
}

function growth_rates_systematizer(items) {
  return items.map(item=>{
    return {
      id: item.id,
      name: item.name,
      pokemon_species: item.pokemon_species.map(item=>item.name)
    }
  })
}

function egg_groups_systematizer(items) {
  return items.map(item=>{
    return {
      id: item.id,
      name: item.name,
      pokemon_species: item.pokemon_species.map(item=>item.name)
    }
  })
}
