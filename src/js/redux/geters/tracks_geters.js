import * as name from "../rd_store_sections";



export const get_active_track = (store) => {
  let active_item,
    id = store?.[name.PATH][name.path_chunk.TRACK],
    items = store?.[name.ITEMS_BY_TYPE][name.items_type.TRACKS]?.items || [];

  items.forEach(item => {
    if (item.id == id) {
      active_item = {
        cover: {
          src: null,
          alt: "cover"
        },
        name: item.title,
        title: `Rank ${item.rank}`,
        date: item.release_date,
        link: item.link,
        audio: {
          src: item.preview,
          type: "audio/mp3"
        }
      }
    }
  });


  if (active_item == undefined) {
    active_item = {
      is_nullOBJ: true,
      cover: {
        src: null,
        alt: null
      },
      name: null,
      title: null,
      audio: {
        src: null,
        type: null
      }
    }
  }

  return active_item
};

export const get_active_track_id = (store) => {
  return store?.[name.PATH][name.path_chunk.TRACK] || -1
};

export const get_track_previews = (store) => {
  let valid_items,
    id = store?.[name.PATH][name.path_chunk.ALBUM],
    items = store?.[name.ITEMS_BY_TYPE][name.items_type.ALBUMS]?.items || [];

  items.forEach(item => {
    if (item.id == id) {
      valid_items = item.tracks.data.map(track=>{
        return {
          id: track.id,
          name: track.title,
          date: track.release_date,
          duration: track.duration,
        }
      })
    }
  });


  return valid_items || []
};
