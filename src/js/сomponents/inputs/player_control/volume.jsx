import React from 'react';
import Btn from "../buttons/button"

import { Icon_volume } from "../../svg"
import close_when_missDown from "../../../functions/close_when_missDown"


export default class Btn_volume extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.state = {
      volume: this.props.default || 100,
      closed: true,
    };

    this.change_bar_closed = change_bar_closed.bind(this);
    this.close_when_missDown = close_when_missDown.bind(this);

    this.onClick_volume_bar = onClick_volume_bar.bind(this);
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div ref={this.container} className="btn-tm-volume">

        <div onClick={this.onClick_volume_bar} className={this.state.closed ? "btn-tm-volume_bar closed" : "btn-tm-volume_bar"} style={{"--value": this.state.volume}}>
          <div className="btn-tm-volume_bar_value"></div>
        </div>

        <Btn
          onClick={this.change_bar_closed}
          icon={
            <React.Fragment>
              <Icon_volume />
              <span></span>
              <span></span>
              <span></span>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}


function onClick_volume_bar(event) {
  let timeline_height = window.getComputedStyle(event.currentTarget).height;
  this.setState({
    volume: 100 - event.nativeEvent.offsetY / parseFloat(timeline_height) * 100
  })
  typeof (this.props.onChange) == 'function' && this.props.onChange(100 - event.nativeEvent.offsetY / parseFloat(timeline_height) * 100)
}


function change_bar_closed() {
  let bar_closed = this.state.closed

  if (bar_closed) {
    this.setState({
      closed: false
    })
    window.addEventListener('mousedown', this.close_when_missDown, true )
  } else {
    this.setState({
      closed: true
    })
    window.removeEventListener('mousedown', this.close_when_missDown, true )
  }
}
