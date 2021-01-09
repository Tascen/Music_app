import React from 'react';

export default class Input_list extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      selected_item: props.selected_item || 0, // item`s index
      list_closed: true,
    };


    this.toggle_closed = toggle_closed.bind(this);
    this.onMissDown = onMissDown.bind(this);

    this.select_item = select_item.bind(this);
  }

  render() {
    let props = this.props, list_closed = this.state.list_closed, selected_item = this.state.selected_item;
    return (
      <div className="input-list">
        <ul onClick={this.select_item} className={list_closed ? "input-list_items closed" : "input-list_items"}>
          {props.items && props.items.map((title, index) =>
            <li key={index} data-key={index}>{title}</li>
          )}
        </ul>

        <div className="input-list_head" onClick={this.toggle_closed}>
          <p className="input-list_selected_item">{props.items[selected_item]}</p>
        </div>

      </div>
    );
  }
}





function onMissDown(event) {
  let down_on_container = false, path = event.composedPath()

  for (let i = 0; i < path.length; i++) {
    if ( path[i].isEqualNode?.(this.container.current) ) {
      down_on_container = true;
      break;
    }
  }
  if (!down_on_container) {
    this.setState({list_closed: true})
    window.removeEventListener('mousedown', this.onMissDown, true )
  }
}

function select_item(event) {
  let item = event.target.closest('li[data-key]'), old_item = this.state.selected_item
  if (item.getAttribute('data-key') != old_item) {
    typeof(this.props.onChange) == 'function' ? this.props.onChange(item.getAttribute('data-key')) : null
  }

  item.parentNode.children[old_item].classList.remove('selected')
  item.classList.add('selected')
  this.setState({selected_item: item.getAttribute('data-key')})
}

function toggle_closed() {
  let list_closed = this.state.list_closed

  if (list_closed) {
    this.setState({
      list_closed: false
    })
    window.addEventListener('mousedown', this.onMissDown, true )
  } else {
    this.setState({
      list_closed: true
    })
    window.removeEventListener('mousedown', this.onMissDown, true )
  }
}
