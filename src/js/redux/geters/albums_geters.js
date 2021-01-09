import * as name from "../rd_store_sections";

export const get_active_album_id = (store) => {
  return store?.[name.PATH][name.path_chunk.ALBUM] || -1
};

export const get_active_album = (store) => {
  let active_item,
    id = store?.[name.PATH][name.path_chunk.ALBUM],
    items = store?.[name.ITEMS_BY_TYPE][name.items_type.ALBUMS].items || [];

    items.forEach(item => {
      if (item.id == get_active_album_id(store)) {
        active_item = {
          cover: {
            src: item.cover_big,
            alt: "big cover",
          },
          name: item.title,
          author: item.artist.name,
          desc: "",
          href: item.link
        }
      };
    })

  if (active_item == undefined) {
    active_item = {
      is_nullOBJ: true,
      cover: {
        src: null,
        alt: null
      },
      name: null,
      author: null,
      desc: null,
      href: null
    }
  }

  return active_item
};
