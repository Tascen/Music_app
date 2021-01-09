export default function close_when_missDown(event) {
  let down_on_container = false, path = event.composedPath()

  for (let i = 0; i < path.length; i++) {
    if ( path[i].isEqualNode?.(this.container.current) ) {
      down_on_container = true;
      break;
    }
  }
  if (!down_on_container) {
    this.setState({closed: true})
    window.removeEventListener('mousedown', this.close_when_missDown, true )
  }
}
