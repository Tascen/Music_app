(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./src/js/functions/close_when_missDown.js":
/*!*************************************************!*\
  !*** ./src/js/functions/close_when_missDown.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return close_when_missDown; });
function close_when_missDown(event) {
  var down_on_container = false,
      path = event.composedPath();

  for (var i = 0; i < path.length; i++) {
    var _path$i$isEqualNode, _path$i;

    if ((_path$i$isEqualNode = (_path$i = path[i]).isEqualNode) !== null && _path$i$isEqualNode !== void 0 && _path$i$isEqualNode.call(_path$i, this.container.current)) {
      down_on_container = true;
      break;
    }
  }

  if (!down_on_container) {
    this.setState({
      closed: true
    });
    window.removeEventListener('mousedown', this.close_when_missDown, true);
  }
}

/***/ }),

/***/ "./src/js/functions/copy_text.js":
/*!***************************************!*\
  !*** ./src/js/functions/copy_text.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return copy_text; });
function fallback__copy_text(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text; // Avoid scrolling to bottom

  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copy_text(text) {
  if (!navigator.clipboard) {
    fallback__copy_text(text);
    return;
  }

  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}

/***/ }),

/***/ "./src/js/functions/viewport_visibility.js":
/*!*************************************************!*\
  !*** ./src/js/functions/viewport_visibility.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return is_element_in_viewport; });
function is_element_in_viewport(element) {
  var _parametr$viewport, _parametr$viewport$ge;

  var parametr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  parametr = Object.assign({
    bad_property: {},
    viewport: window,
    full_element: true
  }, parametr);
  var rect = element.getBoundingClientRect();
  var context = ((_parametr$viewport = parametr.viewport) === null || _parametr$viewport === void 0 ? void 0 : (_parametr$viewport$ge = _parametr$viewport.getBoundingClientRect) === null || _parametr$viewport$ge === void 0 ? void 0 : _parametr$viewport$ge.call(_parametr$viewport)) || {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight
  };
  var hasProp = false;

  for (var prop in parametr.bad_property) {
    if (window.getComputedStyle(element, null).getPropertyValue(prop) == parametr.bad_property[prop]) {
      hasProp = true;
      break;
    }
  }

  return !hasProp && rect.left - context.left >= 0 && rect.top - context.top >= 0 && (parametr.full_element ? rect.left >= 0 && rect.top >= 0 && rect.left + rect.width <= context.width + context.left && rect.top + rect.height <= context.height + context.top : rect.left <= rect.width && rect.top <= rect.height && rect.left <= context.width + context.left && rect.top <= context.height + context.top);
}

/***/ }),

/***/ "./src/js/redux/geters/albums_geters.js":
/*!**********************************************!*\
  !*** ./src/js/redux/geters/albums_geters.js ***!
  \**********************************************/
/*! exports provided: get_active_album_id, get_active_album */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_active_album_id", function() { return get_active_album_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_active_album", function() { return get_active_album; });
/* harmony import */ var _rd_store_sections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rd_store_sections */ "./src/js/redux/rd_store_sections.js");

var get_active_album_id = function get_active_album_id(store) {
  return (store === null || store === void 0 ? void 0 : store[_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["PATH"]][_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["path_chunk"].ALBUM]) || -1;
};
var get_active_album = function get_active_album(store) {
  var active_item,
      id = store === null || store === void 0 ? void 0 : store[_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["PATH"]][_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["path_chunk"].ALBUM],
      items = (store === null || store === void 0 ? void 0 : store[_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["ITEMS_BY_TYPE"]][_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["items_type"].ALBUMS].items) || [];
  items.forEach(function (item) {
    if (item.id == get_active_album_id(store)) {
      active_item = {
        cover: {
          src: item.cover_big,
          alt: "big cover"
        },
        name: item.title,
        author: item.artist.name,
        desc: "",
        href: item.link
      };
    }

    ;
  });

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
    };
  }

  return active_item;
};

/***/ }),

/***/ "./src/js/redux/geters/tracks_geters.js":
/*!**********************************************!*\
  !*** ./src/js/redux/geters/tracks_geters.js ***!
  \**********************************************/
/*! exports provided: get_active_track, get_active_track_id, get_track_previews */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_active_track", function() { return get_active_track; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_active_track_id", function() { return get_active_track_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_track_previews", function() { return get_track_previews; });
/* harmony import */ var _rd_store_sections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rd_store_sections */ "./src/js/redux/rd_store_sections.js");

var get_active_track = function get_active_track(store) {
  var _store$name$ITEMS_BY_;

  var active_item,
      id = store === null || store === void 0 ? void 0 : store[_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["PATH"]][_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["path_chunk"].TRACK],
      items = (store === null || store === void 0 ? void 0 : (_store$name$ITEMS_BY_ = store[_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["ITEMS_BY_TYPE"]][_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["items_type"].TRACKS]) === null || _store$name$ITEMS_BY_ === void 0 ? void 0 : _store$name$ITEMS_BY_.items) || [];
  items.forEach(function (item) {
    if (item.id == id) {
      active_item = {
        cover: {
          src: null,
          alt: "cover"
        },
        name: item.title,
        title: "Rank ".concat(item.rank),
        date: item.release_date,
        link: item.link,
        audio: {
          src: item.preview,
          type: "audio/mp3"
        }
      };
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
    };
  }

  return active_item;
};
var get_active_track_id = function get_active_track_id(store) {
  return (store === null || store === void 0 ? void 0 : store[_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["PATH"]][_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["path_chunk"].TRACK]) || -1;
};
var get_track_previews = function get_track_previews(store) {
  var _store$name$ITEMS_BY_2;

  var valid_items,
      id = store === null || store === void 0 ? void 0 : store[_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["PATH"]][_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["path_chunk"].ALBUM],
      items = (store === null || store === void 0 ? void 0 : (_store$name$ITEMS_BY_2 = store[_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["ITEMS_BY_TYPE"]][_rd_store_sections__WEBPACK_IMPORTED_MODULE_0__["items_type"].ALBUMS]) === null || _store$name$ITEMS_BY_2 === void 0 ? void 0 : _store$name$ITEMS_BY_2.items) || [];
  items.forEach(function (item) {
    if (item.id == id) {
      valid_items = item.tracks.data.map(function (track) {
        return {
          id: track.id,
          name: track.title,
          date: track.release_date,
          duration: track.duration
        };
      });
    }
  });
  return valid_items || [];
};

/***/ }),

/***/ "./src/js/сomponents/inputs/buttons/button.jsx":
/*!*****************************************************!*\
  !*** ./src/js/сomponents/inputs/buttons/button.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Btn; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Btn(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: typeof props.onClick == 'function' ? props.onClick : null,
    type: "button",
    name: props.name ? props.name : null,
    className: props.className ? "btn" + ' ' + props.className : "btn"
  }, props.icon, props.title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, props.title));
}

/***/ }),

/***/ "./src/js/сomponents/inputs/buttons/button_link.jsx":
/*!**********************************************************!*\
  !*** ./src/js/сomponents/inputs/buttons/button_link.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Btn_link; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../svg */ "./src/js/сomponents/svg.jsx");



function Btn_link(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: props.href || "#",
    className: "btn-link"
  }, props.title || "Link", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svg__WEBPACK_IMPORTED_MODULE_2__["Icon_arrow_right"], null));
}

/***/ }),

/***/ "./src/js/сomponents/inputs/input-list.jsx":
/*!*************************************************!*\
  !*** ./src/js/сomponents/inputs/input-list.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Input_list; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Input_list = /*#__PURE__*/function (_React$Component) {
  _inherits(Input_list, _React$Component);

  var _super = _createSuper(Input_list);

  function Input_list(props) {
    var _this;

    _classCallCheck(this, Input_list);

    _this = _super.call(this, props);
    _this.container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.state = {
      selected_item: props.selected_item || 0,
      // item`s index
      list_closed: true
    };
    _this.toggle_closed = toggle_closed.bind(_assertThisInitialized(_this));
    _this.onMissDown = onMissDown.bind(_assertThisInitialized(_this));
    _this.select_item = select_item.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Input_list, [{
    key: "render",
    value: function render() {
      var props = this.props,
          list_closed = this.state.list_closed,
          selected_item = this.state.selected_item;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        onClick: this.select_item,
        className: list_closed ? "input-list_items closed" : "input-list_items"
      }, props.items && props.items.map(function (title, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index,
          "data-key": index
        }, title);
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input-list_head",
        onClick: this.toggle_closed
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "input-list_selected_item"
      }, props.items[selected_item])));
    }
  }]);

  return Input_list;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



function onMissDown(event) {
  var down_on_container = false,
      path = event.composedPath();

  for (var i = 0; i < path.length; i++) {
    var _path$i$isEqualNode, _path$i;

    if ((_path$i$isEqualNode = (_path$i = path[i]).isEqualNode) !== null && _path$i$isEqualNode !== void 0 && _path$i$isEqualNode.call(_path$i, this.container.current)) {
      down_on_container = true;
      break;
    }
  }

  if (!down_on_container) {
    this.setState({
      list_closed: true
    });
    window.removeEventListener('mousedown', this.onMissDown, true);
  }
}

function select_item(event) {
  var item = event.target.closest('li[data-key]'),
      old_item = this.state.selected_item;

  if (item.getAttribute('data-key') != old_item) {
    typeof this.props.onChange == 'function' ? this.props.onChange(item.getAttribute('data-key')) : null;
  }

  item.parentNode.children[old_item].classList.remove('selected');
  item.classList.add('selected');
  this.setState({
    selected_item: item.getAttribute('data-key')
  });
}

function toggle_closed() {
  var list_closed = this.state.list_closed;

  if (list_closed) {
    this.setState({
      list_closed: false
    });
    window.addEventListener('mousedown', this.onMissDown, true);
  } else {
    this.setState({
      list_closed: true
    });
    window.removeEventListener('mousedown', this.onMissDown, true);
  }
}

/***/ }),

/***/ "./src/js/сomponents/inputs/player_control/playback_speed.jsx":
/*!********************************************************************!*\
  !*** ./src/js/сomponents/inputs/player_control/playback_speed.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Playback_speed; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/button */ "./src/js/сomponents/inputs/buttons/button.jsx");
/* harmony import */ var _input_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../input-list */ "./src/js/сomponents/inputs/input-list.jsx");



var playbackRates = ["0.50X", "0.75X", "1.00X", "1.25X", "1.50X"];
function Playback_speed(props) {
  var default_index = playbackRates.map(function (item) {
    return parseFloat(item);
  }).indexOf(props["default"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_input_list__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onChange: function onChange(index) {
      typeof props.onChange == 'function' ? props.onChange(parseFloat(playbackRates[index])) : null;
    },
    selected_item: default_index != -1 ? default_index : 2,
    items: playbackRates
  });
}

/***/ }),

/***/ "./src/js/сomponents/inputs/player_control/timeline.jsx":
/*!**************************************************************!*\
  !*** ./src/js/сomponents/inputs/player_control/timeline.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timeline; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function Timeline(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    currentTime: 0,
    duration: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      audio_state = _useState2[0],
      set__Audio_state = _useState2[1];

  if (props.audio instanceof Audio) {
    var timeout;
    timeout = setTimeout(function () {
      set__Audio_state({
        currentTime: props.audio.currentTime || 0,
        duration: props.audio.duration || 0
      });
    }, props.audio.playbackRate * 100);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "playerTimeline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick(event) {
      onClick_timeline_progress(event, props.audio);
    },
    className: "playerTimeline_progress_bar",
    style: {
      "--value": audio_state.currentTime,
      "--max": audio_state.duration
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "playerTimeline_progress_value"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "playerTimeline_currentTime"
  }, Math.floor(audio_state.currentTime)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "playerTimeline_allTime"
  }, Math.floor(audio_state.duration)));
}

var onClick_timeline_progress = function onClick_timeline_progress(event, audio) {
  var timeline_width = window.getComputedStyle(event.currentTarget).width;
  audio.currentTime = event.nativeEvent.offsetX / parseFloat(timeline_width) * audio.duration;
};

/***/ }),

/***/ "./src/js/сomponents/inputs/player_control/tm_play.jsx":
/*!*************************************************************!*\
  !*** ./src/js/сomponents/inputs/player_control/tm_play.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Btn_tm_play; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Btn_tm_play(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: function onClick() {
      typeof props.onClick == 'function' ? props.onClick(!props.active) : null;
    },
    type: "button",
    className: props.active ? "btn-tm-play active" : "btn-tm-play"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null));
}

/***/ }),

/***/ "./src/js/сomponents/inputs/player_control/tm_steps.jsx":
/*!**************************************************************!*\
  !*** ./src/js/сomponents/inputs/player_control/tm_steps.jsx ***!
  \**************************************************************/
/*! exports provided: Btn_tm_backward, Btn_tm_forward */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Btn_tm_backward", function() { return Btn_tm_backward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Btn_tm_forward", function() { return Btn_tm_forward; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/button */ "./src/js/сomponents/inputs/buttons/button.jsx");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../svg */ "./src/js/сomponents/svg.jsx");



function Btn_tm_backward(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "tm-backward",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svg__WEBPACK_IMPORTED_MODULE_2__["Icon_backward"], null),
    onClick: function onClick() {
      typeof props.onClick == 'function' ? props.onClick(-10) : null;
    }
  });
}
function Btn_tm_forward(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "tm-forward",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svg__WEBPACK_IMPORTED_MODULE_2__["Icon_forward"], null),
    onClick: function onClick() {
      typeof props.onClick == 'function' ? props.onClick(10) : null;
    }
  });
}

/***/ }),

/***/ "./src/js/сomponents/inputs/player_control/volume.jsx":
/*!************************************************************!*\
  !*** ./src/js/сomponents/inputs/player_control/volume.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Btn_volume; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/button */ "./src/js/сomponents/inputs/buttons/button.jsx");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../svg */ "./src/js/сomponents/svg.jsx");
/* harmony import */ var _functions_close_when_missDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../functions/close_when_missDown */ "./src/js/functions/close_when_missDown.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var Btn_volume = /*#__PURE__*/function (_React$Component) {
  _inherits(Btn_volume, _React$Component);

  var _super = _createSuper(Btn_volume);

  function Btn_volume(props) {
    var _this;

    _classCallCheck(this, Btn_volume);

    _this = _super.call(this, props);
    _this.container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.state = {
      volume: _this.props["default"] || 100,
      closed: true
    };
    _this.change_bar_closed = change_bar_closed.bind(_assertThisInitialized(_this));
    _this.close_when_missDown = _functions_close_when_missDown__WEBPACK_IMPORTED_MODULE_3__["default"].bind(_assertThisInitialized(_this));
    _this.onClick_volume_bar = onClick_volume_bar.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Btn_volume, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: this.container,
        className: "btn-tm-volume"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.onClick_volume_bar,
        className: this.state.closed ? "btn-tm-volume_bar closed" : "btn-tm-volume_bar",
        style: {
          "--value": this.state.volume
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "btn-tm-volume_bar_value"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onClick: this.change_bar_closed,
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svg__WEBPACK_IMPORTED_MODULE_2__["Icon_volume"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null))
      }));
    }
  }]);

  return Btn_volume;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



function onClick_volume_bar(event) {
  var timeline_height = window.getComputedStyle(event.currentTarget).height;
  this.setState({
    volume: 100 - event.nativeEvent.offsetY / parseFloat(timeline_height) * 100
  });
  typeof this.props.onChange == 'function' && this.props.onChange(100 - event.nativeEvent.offsetY / parseFloat(timeline_height) * 100);
}

function change_bar_closed() {
  var bar_closed = this.state.closed;

  if (bar_closed) {
    this.setState({
      closed: false
    });
    window.addEventListener('mousedown', this.close_when_missDown, true);
  } else {
    this.setState({
      closed: true
    });
    window.removeEventListener('mousedown', this.close_when_missDown, true);
  }
}

/***/ }),

/***/ "./src/js/сomponents/list_items/item_track.jsx":
/*!*****************************************************!*\
  !*** ./src/js/сomponents/list_items/item_track.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Item_track; });
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg */ "./src/js/сomponents/svg.jsx");
/* harmony import */ var _inputs_buttons_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inputs/buttons/button */ "./src/js/сomponents/inputs/buttons/button.jsx");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");



function Item_track(props) {
  var duration = props.duration || "0",
      hour = Math.floor(duration / 3600),
      min = Math.floor((duration - hour * 3600) / 60),
      sec = Math.floor(duration - hour * 3600 - min * 60);
  return /*#__PURE__*/React.createElement("div", {
    className: "item-track"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "item-track_name"
  }, props.name), /*#__PURE__*/React.createElement("p", {
    className: "item-track_miniInfo"
  }, "".concat(hour > 0 ? hour + " hours" : "").concat(min > 0 ? " " + min + " min" : "").concat(sec > 0 ? " " + sec + " sec" : "")), /*#__PURE__*/React.createElement(_inputs_buttons_button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onClick: function onClick() {
      typeof props.Btn_onClick == "function" ? props.Btn_onClick(props.id) : null;
    },
    className: "play",
    icon: /*#__PURE__*/React.createElement(_svg__WEBPACK_IMPORTED_MODULE_0__["Icon_triangle_right"], null)
  }));
}

/***/ }),

/***/ "./src/js/сomponents/page_elements/lists/tracks_list.jsx":
/*!***************************************************************!*\
  !*** ./src/js/сomponents/page_elements/lists/tracks_list.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tracks_list; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/esm/index.js");
/* harmony import */ var _inputs_buttons_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../inputs/buttons/button */ "./src/js/сomponents/inputs/buttons/button.jsx");
/* harmony import */ var _list_items_item_track__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../list_items/item_track */ "./src/js/сomponents/list_items/item_track.jsx");
/* harmony import */ var _functions_viewport_visibility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../functions/viewport_visibility */ "./src/js/functions/viewport_visibility.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var throttle = __webpack_require__(/*! lodash.throttle */ "./node_modules/lodash.throttle/index.js");


function Tracks_list(props) {
  var _container$current, _container$current2, _props$items2;

  var container = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.default_opened || false),
      _useState2 = _slicedToArray(_useState, 2),
      opened = _useState2[0],
      setOpened = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
      _useState4 = _slicedToArray(_useState3, 2),
      selected_item = _useState4[0],
      set_item = _useState4[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: container,
    className: opened ? "list-tracks opened" : "list-tracks",
    onScroll: function onScroll(event) {
      var btn = event.currentTarget.children[0];

      if (event.currentTarget.scrollTop <= btn.getBoundingClientRect().height + 40) {
        btn.classList.remove("fixed");
      } else if (!btn.classList.contains("fixed") && !Object(_functions_viewport_visibility__WEBPACK_IMPORTED_MODULE_4__["default"])(btn, {
        full_element: true,
        viewport: event.currentTarget
      })) {
        btn.classList.add("fixed");
      }

      if (!opened && event.currentTarget.scrollTop >= 20) {
        setOpened(true);
        typeof props.onChange_opened == "function" ? props.onChange_opened(true) : null;
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "list-tracks_header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_buttons_button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: function onClick() {
      var _props$items;

      if ((_props$items = props.items) !== null && _props$items !== void 0 && _props$items.length) {
        if (opened && container.current) {
          container.current.scrollTop = 0;
        }

        setOpened(!opened);
        typeof props.onChange_opened == "function" ? props.onChange_opened(!opened) : null;
      }
    },
    className: container.current && ((_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.scrollHeight) == ((_container$current2 = container.current) === null || _container$current2 === void 0 ? void 0 : _container$current2.clientHeight) ? "close_open is_hidden" : "close_open",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null))
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "list-tracks_items"
  }, ((_props$items2 = props.items) === null || _props$items2 === void 0 ? void 0 : _props$items2.length) != 0 && props.items.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_list_items_item_track__WEBPACK_IMPORTED_MODULE_3__["default"], {
      key: item.id || index,
      id: index,
      Btn_onClick: function Btn_onClick() {
        set_item.bind(null, index);
        typeof props.onSelect == "function" ? props.onSelect(index) : "";
      },
      name: item.name,
      date: item.date,
      duration: item.duration
    });
  })));
}

/***/ }),

/***/ "./src/js/сomponents/page_elements/panel/albumHead.jsx":
/*!*************************************************************!*\
  !*** ./src/js/сomponents/page_elements/panel/albumHead.jsx ***!
  \*************************************************************/
/*! exports provided: AlbumHead_panel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlbumHead_panel", function() { return AlbumHead_panel; });
/* harmony import */ var _inputs_buttons_button_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../inputs/buttons/button_link */ "./src/js/сomponents/inputs/buttons/button_link.jsx");
/* harmony import */ var _inputs_buttons_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../inputs/buttons/button */ "./src/js/сomponents/inputs/buttons/button.jsx");
/* harmony import */ var _functions_copy_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../functions/copy_text */ "./src/js/functions/copy_text.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");




function AlbumHead_panel(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: props.mini_ver ? "panel-albumHead mini_ver" : "panel-albumHead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-albumHead_part-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-albumHead_cover"
  }, props.cover && /*#__PURE__*/React.createElement("img", {
    src: props.cover.src || "#",
    alt: props.cover.alt
  }) || /*#__PURE__*/React.createElement("img", {
    src: "#",
    alt: "not founded"
  })), /*#__PURE__*/React.createElement("div", {
    className: "panel-albumHead_title"
  }, props.name && /*#__PURE__*/React.createElement("h3", {
    className: "panel-albumHead_name"
  }, props.name), props.author && /*#__PURE__*/React.createElement("h6", {
    className: "panel-albumHead_author"
  }, props.author))), /*#__PURE__*/React.createElement("div", {
    className: "panel-albumHead_part-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-albumHead_title"
  }, props.name && /*#__PURE__*/React.createElement("h3", {
    className: "panel-albumHead_name"
  }, props.name), props.author && /*#__PURE__*/React.createElement("h6", {
    className: "panel-albumHead_author"
  }, props.author)), props.desc && /*#__PURE__*/React.createElement("h6", {
    className: "panel-albumHead_desc"
  }, props.desc), /*#__PURE__*/React.createElement("div", {
    className: "panel-albumHead_line"
  }, /*#__PURE__*/React.createElement(_inputs_buttons_button_link__WEBPACK_IMPORTED_MODULE_0__["default"], {
    title: "Source",
    href: props.href
  }), /*#__PURE__*/React.createElement(_inputs_buttons_button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onClick: function onClick() {
      Object(_functions_copy_text__WEBPACK_IMPORTED_MODULE_2__["default"])(props.href);
    },
    className: "copy_link",
    title: "Copy link"
  }))));
}

/***/ }),

/***/ "./src/js/сomponents/page_elements/panel/trackPlaying.jsx":
/*!****************************************************************!*\
  !*** ./src/js/сomponents/page_elements/panel/trackPlaying.jsx ***!
  \****************************************************************/
/*! exports provided: TrackPlaying_panel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackPlaying_panel", function() { return TrackPlaying_panel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../svg */ "./src/js/сomponents/svg.jsx");
/* harmony import */ var _inputs_buttons_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../inputs/buttons/button */ "./src/js/сomponents/inputs/buttons/button.jsx");
/* harmony import */ var _preloaders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../preloaders */ "./src/js/сomponents/page_elements/preloaders.jsx");
/* harmony import */ var _inputs_player_control_timeline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../inputs/player_control/timeline */ "./src/js/сomponents/inputs/player_control/timeline.jsx");
/* harmony import */ var _inputs_player_control_tm_play__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../inputs/player_control/tm_play */ "./src/js/сomponents/inputs/player_control/tm_play.jsx");
/* harmony import */ var _inputs_player_control_volume__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../inputs/player_control/volume */ "./src/js/сomponents/inputs/player_control/volume.jsx");
/* harmony import */ var _inputs_player_control_playback_speed__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../inputs/player_control/playback_speed */ "./src/js/сomponents/inputs/player_control/playback_speed.jsx");
/* harmony import */ var _inputs_player_control_tm_steps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../inputs/player_control/tm_steps */ "./src/js/сomponents/inputs/player_control/tm_steps.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var TrackPlaying_panel = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, ref) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.audio),
      _useState2 = _slicedToArray(_useState, 2),
      audio = _useState2[0],
      set_Audio = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.update_audio_in),
      _useState4 = _slicedToArray(_useState3, 2),
      update_audio_in = _useState4[0],
      set__update_audio = _useState4[1];

  if (!audio || props.update_audio_in != update_audio_in) {
    var ref_audio = new Audio(props.audio.src);
    ref_audio.addEventListener("loadeddata", function () {
      set_Audio(ref_audio);
      set__update_audio(props.update_audio_in);
      ref_audio.addEventListener("ended", function () {
        audio.currentTime = 0;
      });
      ref_audio = null;
    }, false);
  }

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    playbackRate: 1,
    valume: 0.5,
    paused: true
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      audio_settings = _useState6[0],
      set_Settings = _useState6[1];

  if (audio instanceof Audio) {
    audio.playbackRate = audio_settings.playbackRate;
    audio.volume = audio_settings.valume;
    audio_settings.paused ? audio.pause() : audio.play();
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: ref,
    className: props.default_opened ? "panel-trackPlaying opened" : "panel-trackPlaying"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_preloaders__WEBPACK_IMPORTED_MODULE_3__["Data_preloader"], {
    is_hidden: audio instanceof Audio
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "panel-trackPlaying_header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_buttons_button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: function onClick() {
      set_Settings(_objectSpread(_objectSpread({}, audio_settings), {}, {
        paused: true
      }));
      typeof props.onChange_opened == "function" ? props.onChange_opened(false) : null;
    },
    className: "close_open",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svg__WEBPACK_IMPORTED_MODULE_1__["Icon_arrow_down"], null)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "panel-trackPlaying_cover"
  }, props.cover && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: props.cover.src,
    alt: props.cover.alt
  }) || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "#",
    alt: "not founded"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_player_control_timeline__WEBPACK_IMPORTED_MODULE_4__["default"], {
    audio: audio
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "panel-trackPlaying_text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, props.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, props.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "panel-trackPlaying_control"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "panel-trackPlaying_control_line"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_player_control_playback_speed__WEBPACK_IMPORTED_MODULE_7__["default"], {
    "default": audio_settings.playbackRate,
    onChange: function onChange(value) {
      set_Settings(_objectSpread(_objectSpread({}, audio_settings), {}, {
        playbackRate: value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_player_control_tm_steps__WEBPACK_IMPORTED_MODULE_8__["Btn_tm_backward"], {
    onClick: function onClick(step) {
      audio.currentTime = audio.currentTime + step;
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_player_control_tm_play__WEBPACK_IMPORTED_MODULE_5__["default"], {
    active: audio_settings.paused,
    onClick: function onClick(paused) {
      set_Settings(_objectSpread(_objectSpread({}, audio_settings), {}, {
        paused: paused
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "panel-trackPlaying_control_line"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_player_control_tm_steps__WEBPACK_IMPORTED_MODULE_8__["Btn_tm_forward"], {
    onClick: function onClick(step) {
      audio.currentTime = audio.currentTime + step;
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_player_control_volume__WEBPACK_IMPORTED_MODULE_6__["default"], {
    "default": audio_settings.valume * 100,
    onChange: function onChange(value) {
      if (value * 0.01 < 0) {
        set_Settings(_objectSpread(_objectSpread({}, audio_settings), {}, {
          valume: 0
        }));
      } else if (value * 0.01 > 1) {
        set_Settings(_objectSpread(_objectSpread({}, audio_settings), {}, {
          valume: 1
        }));
      } else {
        set_Settings(_objectSpread(_objectSpread({}, audio_settings), {}, {
          valume: value * 0.01
        }));
      }
    }
  }))));
});

/***/ }),

/***/ "./src/js/сomponents/pages/page_musicList.jsx":
/*!****************************************************!*\
  !*** ./src/js/сomponents/pages/page_musicList.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/esm/index.js");
/* harmony import */ var _inputs_buttons_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../inputs/buttons/button */ "./src/js/сomponents/inputs/buttons/button.jsx");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../svg */ "./src/js/сomponents/svg.jsx");
/* harmony import */ var _page_elements_panel_albumHead__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../page_elements/panel/albumHead */ "./src/js/сomponents/page_elements/panel/albumHead.jsx");
/* harmony import */ var _page_elements_lists_tracks_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../page_elements/lists/tracks_list */ "./src/js/сomponents/page_elements/lists/tracks_list.jsx");
/* harmony import */ var _page_elements_panel_trackPlaying__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../page_elements/panel/trackPlaying */ "./src/js/сomponents/page_elements/panel/trackPlaying.jsx");
/* harmony import */ var _page_elements_preloaders__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../page_elements/preloaders */ "./src/js/сomponents/page_elements/preloaders.jsx");
/* harmony import */ var _redux_actions_loaders__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../redux/actions/loaders */ "./src/js/redux/actions/loaders.js");
/* harmony import */ var _redux_actions_all_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../redux/actions/all.js */ "./src/js/redux/actions/all.js");
/* harmony import */ var _redux_geters_tracks_geters_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../redux/geters/tracks_geters.js */ "./src/js/redux/geters/tracks_geters.js");
/* harmony import */ var _redux_geters_albums_geters_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../redux/geters/albums_geters.js */ "./src/js/redux/geters/albums_geters.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }















var Page_musicList = /*#__PURE__*/function (_React$Component) {
  _inherits(Page_musicList, _React$Component);

  var _super = _createSuper(Page_musicList);

  function Page_musicList(props) {
    var _this;

    _classCallCheck(this, Page_musicList);

    _this = _super.call(this, props);
    _this.tracks_list = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.state = {
      parent: null,
      offset: 0,
      active_track: 0,
      update_track_in: true,
      tracks_list_opened: false,
      trackPlaying_panel_opened: false,
      ready: true
    };
    _this.load_random_album = load_random_album.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Page_musicList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
        id: "page_musicList",
        ref: this.page
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inputs_buttons_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "reset_album",
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_svg__WEBPACK_IMPORTED_MODULE_4__["Icon_reset"], null),
        onClick: function onClick() {
          console.log("reset");

          _this2.load_random_album();
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_page_elements_panel_albumHead__WEBPACK_IMPORTED_MODULE_5__["AlbumHead_panel"], {
        cover: {
          src: props.album.cover.src,
          alt: props.album.cover.alt
        },
        name: props.album.name,
        author: props.album.author,
        desc: props.album.desc,
        href: props.album.href,
        mini_ver: this.state.tracks_list_opened ? true : false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_page_elements_lists_tracks_list__WEBPACK_IMPORTED_MODULE_6__["default"], {
        default_opened: this.state.tracks_list_opened,
        onChange_opened: function onChange_opened(opened) {
          _this2.setState({
            tracks_list_opened: opened
          });
        },
        onSelect: function onSelect(index) {
          Object(_redux_actions_all_js__WEBPACK_IMPORTED_MODULE_10__["change_path"])({
            track: props.tracks[index].id
          });

          _this2.setState({
            trackPlaying_panel_opened: true,
            active_track: index,
            update_track_in: !_this2.state.update_track_in
          });
        },
        items: props.tracks
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_page_elements_panel_trackPlaying__WEBPACK_IMPORTED_MODULE_7__["TrackPlaying_panel"], {
        update_audio_in: this.state.update_track_in,
        default_opened: this.state.trackPlaying_panel_opened,
        onChange_opened: function onChange_opened(opened) {
          _this2.setState({
            trackPlaying_panel_opened: opened
          });
        },
        cover: {
          src: props.active_track.cover.src,
          alt: props.active_track.cover.alt
        },
        name: props.active_track.name,
        title: props.active_track.title,
        timePoint: 0,
        audio: {
          src: props.active_track.audio.src,
          type: props.active_track.audio.type
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_page_elements_preloaders__WEBPACK_IMPORTED_MODULE_8__["Data_preloader"], {
        is_hidden: this.state.ready
      }));
    }
  }]);

  return Page_musicList;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var return_data = function return_data(state) {
  var album = Object(_redux_geters_albums_geters_js__WEBPACK_IMPORTED_MODULE_12__["get_active_album"])(state),
      tracks = Object(_redux_geters_tracks_geters_js__WEBPACK_IMPORTED_MODULE_11__["get_track_previews"])(state),
      active_track = Object(_redux_geters_tracks_geters_js__WEBPACK_IMPORTED_MODULE_11__["get_active_track"])(state);

  if (active_track.is_nullOBJ) {
    Object(_redux_actions_loaders__WEBPACK_IMPORTED_MODULE_9__["load_track"])(Object(_redux_geters_tracks_geters_js__WEBPACK_IMPORTED_MODULE_11__["get_active_track_id"])(state));
  }

  return {
    album: album,
    tracks: tracks,
    active_track: active_track
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(return_data)(Page_musicList));

function load_random_album() {
  var _this3 = this;

  var id = randomNumber(101620000, 101625552); //for check use id: 101625552

  this.setState({
    ready: false
  });
  Object(_redux_actions_loaders__WEBPACK_IMPORTED_MODULE_9__["load_album"])(id).then(function () {
    Object(_redux_actions_all_js__WEBPACK_IMPORTED_MODULE_10__["change_path"])({
      album: id
    });

    _this3.setState({
      ready: true
    });
  })["catch"](function (code) {
    _this3.load_random_album();
  });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/***/ }),

/***/ "./src/js/сomponents/svg.jsx":
/*!***********************************!*\
  !*** ./src/js/сomponents/svg.jsx ***!
  \***********************************/
/*! exports provided: Icon_arrow_right, Icon_arrow_down, Icon_triangle_right, Icon_forward, Icon_backward, Icon_volume, Icon_reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon_arrow_right", function() { return Icon_arrow_right; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon_arrow_down", function() { return Icon_arrow_down; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon_triangle_right", function() { return Icon_triangle_right; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon_forward", function() { return Icon_forward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon_backward", function() { return Icon_backward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon_volume", function() { return Icon_volume; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon_reset", function() { return Icon_reset; });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js"); //Arrows


function Icon_arrow_right(props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-arrow-right",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      stroke: "var(--color_1)"
    },
    d: "M25 15.75C25 15.75 23.0177 16.789 21.9091 17.6818C20.912 18.4849 19.5909 20 19.5909 20M25 15.75C25 15.75 23.0177 14.711 21.9091 13.8182C20.912 13.0151 19.5909 11.5 19.5909 11.5M25 15.75L6.45455 15.75",
    strokeWidth: "1.54545"
  }));
}
function Icon_arrow_down(props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-arrow-down",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "var(--color_1)"
    },
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.3325 11.8988C12.995 12.5278 13.8317 13.3617 14.4282 14.1023C15.0706 14.8999 15.7419 15.9711 16.25 16.8343C16.7581 15.9711 17.4293 14.8999 18.0718 14.1023C18.6683 13.3617 19.5049 12.5278 20.1675 11.8988C20.5036 11.5797 20.8042 11.3046 21.021 11.109C21.1296 11.0111 21.2173 10.933 21.2784 10.8789L21.3493 10.8163L21.3684 10.7996L21.3751 10.7938C21.3751 10.7938 21.3758 10.7931 22.0714 11.5909C22.767 12.3887 22.7671 12.3886 22.7671 12.3886L22.7624 12.3927L22.7463 12.4068L22.6817 12.4638C22.625 12.514 22.5421 12.5878 22.4389 12.681C22.2322 12.8674 21.9452 13.13 21.625 13.434C20.9749 14.0512 20.2239 14.805 19.7204 15.4301C19.1607 16.1251 18.5316 17.1269 18.0278 17.9874C17.7796 18.4112 17.5685 18.7891 17.4196 19.0607C17.3452 19.1964 17.2866 19.3052 17.2468 19.3796L17.2018 19.4643L17.1906 19.4854L17.1875 19.4913L16.25 21.2801L15.3125 19.4914L15.3093 19.4854L15.2982 19.4643L15.2531 19.3796C15.2134 19.3052 15.1547 19.1964 15.0803 19.0607C14.9314 18.7891 14.7203 18.4112 14.4722 17.9874C13.9683 17.1269 13.3393 16.1251 12.7795 15.4301C12.276 14.805 11.5251 14.0512 10.8749 13.434C10.5547 13.13 10.2678 12.8674 10.0611 12.681C9.95786 12.5878 9.87493 12.514 9.81821 12.4638L9.75362 12.4068L9.73751 12.3927L9.73297 12.3887C9.73297 12.3887 9.73294 12.3887 10.4285 11.5909C11.1241 10.7931 11.1243 10.7932 11.1243 10.7932L11.1316 10.7996L11.1506 10.8163L11.2215 10.8789C11.2826 10.933 11.3704 11.0111 11.4789 11.109C11.6957 11.3046 11.9963 11.5797 12.3325 11.8988Z"
  }));
} //triangles

function Icon_triangle_right(props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-triangle-right",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "var(--color_1)",
      stroke: "var(--color_2)"
    },
    d: "M7 18.0038V5.99617L17.0063 12L7 18.0038Z",
    strokeWidth: "2"
  }));
} //audio control

function Icon_forward(props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-forward",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      stroke: "var(--color_1)"
    },
    d: "M14.5909 2.8C14.5909 2.8 15.912 4.31511 16.9091 5.11818C18.0177 6.01105 20 7.05 20 7.05C20 7.05 18.0177 8.08896 16.9091 8.98182C15.912 9.7849 14.5909 11.3 14.5909 11.3",
    strokeWidth: "1.54545"
  }), /*#__PURE__*/React.createElement("path", {
    style: {
      stroke: "var(--color_1)"
    },
    d: "M18.5882 7.34074C16.57 6.79996 14.433 6.90494 12.4775 7.64094C10.522 8.37695 8.84613 9.707 7.6853 11.4443C6.52448 13.1816 5.93699 15.2389 6.00536 17.3272C6.07372 19.4155 6.7945 21.43 8.06647 23.0876C9.33844 24.7453 11.0977 25.9629 13.0972 26.5694C15.0966 27.1759 17.2358 27.1409 19.2144 26.4693C21.1929 25.7977 22.9114 24.5232 24.1285 22.8248C25.3455 21.1264 26 19.0894 26 17",
    strokeWidth: "1.55"
  }), /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "var(--color_1)"
    },
    d: "M11.5912 19.01L11.5412 18.46L12.8912 18.29V15.5L12.9412 15.32L12.5212 15.52L11.6712 15.66L11.4412 15.15L13.6912 14.1H14.6412V18.29L15.9912 18.46L15.9412 19.01L13.7912 18.98L11.5912 19.01ZM18.4455 19.15C17.7588 19.15 17.1855 18.92 16.7255 18.46C16.2722 17.9933 16.0455 17.3767 16.0455 16.61C16.0455 15.8233 16.3155 15.2233 16.8555 14.81C17.4022 14.3967 18.1055 14.1267 18.9655 14C19.6522 14 20.2222 14.23 20.6755 14.69C21.1288 15.15 21.3555 15.7633 21.3555 16.53C21.3555 17.9833 20.3855 18.8567 18.4455 19.15ZM18.7955 18.35C19.3088 18.35 19.5655 17.91 19.5655 17.03C19.5655 16.29 19.4688 15.7333 19.2755 15.36C19.0822 14.9867 18.8555 14.8 18.5955 14.8C18.0755 14.8 17.8155 15.2367 17.8155 16.11C17.8155 16.85 17.9122 17.41 18.1055 17.79C18.3055 18.1633 18.5355 18.35 18.7955 18.35Z"
  }));
}
function Icon_backward(props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-backward",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      stroke: "var(--color_1)"
    },
    d: "M17.4091 2.8C17.4091 2.8 16.088 4.31511 15.0909 5.11818C13.9823 6.01105 12 7.05 12 7.05C12 7.05 13.9823 8.08896 15.0909 8.98182C16.088 9.7849 17.4091 11.3 17.4091 11.3",
    strokeWidth: "1.54545"
  }), /*#__PURE__*/React.createElement("path", {
    style: {
      stroke: "var(--color_1)"
    },
    d: "M13.4118 7.34074C15.43 6.79996 17.567 6.90494 19.5225 7.64094C21.478 8.37695 23.1539 9.707 24.3147 11.4443C25.4755 13.1816 26.063 15.2389 25.9946 17.3272C25.9263 19.4155 25.2055 21.43 23.9335 23.0876C22.6616 24.7453 20.9023 25.9629 18.9028 26.5694C16.9034 27.1759 14.7642 27.1409 12.7856 26.4693C10.8071 25.7977 9.08858 24.5232 7.87153 22.8248C6.65448 21.1264 6 19.0894 6 17",
    strokeWidth: "1.55"
  }), /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "var(--color_1)"
    },
    d: "M11.5912 19.01L11.5412 18.46L12.8912 18.29V15.5L12.9412 15.32L12.5212 15.52L11.6712 15.66L11.4412 15.15L13.6912 14.1H14.6412V18.29L15.9912 18.46L15.9412 19.01L13.7912 18.98L11.5912 19.01ZM18.4455 19.15C17.7588 19.15 17.1855 18.92 16.7255 18.46C16.2722 17.9933 16.0455 17.3767 16.0455 16.61C16.0455 15.8233 16.3155 15.2233 16.8555 14.81C17.4022 14.3967 18.1055 14.1267 18.9655 14C19.6522 14 20.2222 14.23 20.6755 14.69C21.1288 15.15 21.3555 15.7633 21.3555 16.53C21.3555 17.9833 20.3855 18.8567 18.4455 19.15ZM18.7955 18.35C19.3088 18.35 19.5655 17.91 19.5655 17.03C19.5655 16.29 19.4688 15.7333 19.2755 15.36C19.0822 14.9867 18.8555 14.8 18.5955 14.8C18.0755 14.8 17.8155 15.2367 17.8155 16.11C17.8155 16.85 17.9122 17.41 18.1055 17.79C18.3055 18.1633 18.5355 18.35 18.7955 18.35Z"
  }));
}
function Icon_volume(props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-volume",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "var(--color_1)"
    },
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M23.0043 8.01198C22.8484 8.00403 22.6914 8 22.5333 8C22.3753 8 22.2183 8.00403 22.0624 8.01198H23.0043ZM21 8.1288C18.0943 8.62305 15.7011 10.4967 14.6203 13H10C9.44772 13 9 13.4477 9 14V18C9 18.5523 9.44772 19 10 19H14.6203C15.7011 21.5033 18.0943 23.3769 21 23.8712V8.1288Z",
    fill: "#96A1A3"
  }), /*#__PURE__*/React.createElement("rect", {
    style: {
      fill: "var(--color_1)"
    },
    x: "22",
    y: "13",
    width: "1",
    height: "6",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    style: {
      fill: "var(--color_1)"
    },
    x: "24",
    y: "11",
    width: "1",
    height: "10",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    style: {
      fill: "var(--color_1)"
    },
    x: "26",
    y: "10",
    width: "1",
    height: "12",
    rx: "0.5"
  }));
}
function Icon_reset(props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-reset",
    viewBox: "0 0 100 100",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "var(--color_1)"
    },
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M50 84C68.7777 84 84 68.7777 84 50C84 47.9527 83.819 45.9477 83.4723 44H95.6122C95.868 45.9638 96 47.9665 96 50C96 75.4051 75.4051 96 50 96C36.0248 96 23.5052 89.7679 15.0687 79.9313L6 89V62H33L23.5879 71.4121C29.8217 79.092 39.3377 84 50 84ZM84.9313 20.0687L94 11V38H67L76.4121 28.5879C70.1783 20.9079 60.6623 16 50 16C31.2223 16 16 31.2223 16 50C16 52.0473 16.181 54.0523 16.5277 56H4.38776C4.13195 54.0362 4 52.0335 4 50C4 24.5949 24.5949 4 50 4C63.9752 4 76.4948 10.2321 84.9313 20.0687Z"
  }));
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZnVuY3Rpb25zL2Nsb3NlX3doZW5fbWlzc0Rvd24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Z1bmN0aW9ucy9jb3B5X3RleHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Z1bmN0aW9ucy92aWV3cG9ydF92aXNpYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWR1eC9nZXRlcnMvYWxidW1zX2dldGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdXgvZ2V0ZXJzL3RyYWNrc19nZXRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL9GBb21wb25lbnRzL2lucHV0cy9idXR0b25zL2J1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL9GBb21wb25lbnRzL2lucHV0cy9idXR0b25zL2J1dHRvbl9saW5rLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvanMv0YFvbXBvbmVudHMvaW5wdXRzL2lucHV0LWxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9qcy/RgW9tcG9uZW50cy9pbnB1dHMvcGxheWVyX2NvbnRyb2wvcGxheWJhY2tfc3BlZWQuanN4Iiwid2VicGFjazovLy8uL3NyYy9qcy/RgW9tcG9uZW50cy9pbnB1dHMvcGxheWVyX2NvbnRyb2wvdGltZWxpbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9qcy/RgW9tcG9uZW50cy9pbnB1dHMvcGxheWVyX2NvbnRyb2wvdG1fcGxheS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL9GBb21wb25lbnRzL2lucHV0cy9wbGF5ZXJfY29udHJvbC90bV9zdGVwcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL9GBb21wb25lbnRzL2lucHV0cy9wbGF5ZXJfY29udHJvbC92b2x1bWUuanN4Iiwid2VicGFjazovLy8uL3NyYy9qcy/RgW9tcG9uZW50cy9saXN0X2l0ZW1zL2l0ZW1fdHJhY2suanN4Iiwid2VicGFjazovLy8uL3NyYy9qcy/RgW9tcG9uZW50cy9wYWdlX2VsZW1lbnRzL2xpc3RzL3RyYWNrc19saXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvanMv0YFvbXBvbmVudHMvcGFnZV9lbGVtZW50cy9wYW5lbC9hbGJ1bUhlYWQuanN4Iiwid2VicGFjazovLy8uL3NyYy9qcy/RgW9tcG9uZW50cy9wYWdlX2VsZW1lbnRzL3BhbmVsL3RyYWNrUGxheWluZy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL9GBb21wb25lbnRzL3BhZ2VzL3BhZ2VfbXVzaWNMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvanMv0YFvbXBvbmVudHMvc3ZnLmpzeCJdLCJuYW1lcyI6WyJjbG9zZV93aGVuX21pc3NEb3duIiwiZXZlbnQiLCJkb3duX29uX2NvbnRhaW5lciIsInBhdGgiLCJjb21wb3NlZFBhdGgiLCJpIiwibGVuZ3RoIiwiaXNFcXVhbE5vZGUiLCJjb250YWluZXIiLCJjdXJyZW50Iiwic2V0U3RhdGUiLCJjbG9zZWQiLCJ3aW5kb3ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZmFsbGJhY2tfX2NvcHlfdGV4dCIsInRleHQiLCJ0ZXh0QXJlYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbHVlIiwic3R5bGUiLCJ0b3AiLCJsZWZ0IiwicG9zaXRpb24iLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJmb2N1cyIsInNlbGVjdCIsInN1Y2Nlc3NmdWwiLCJleGVjQ29tbWFuZCIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJlcnJvciIsInJlbW92ZUNoaWxkIiwiY29weV90ZXh0IiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0IiwidGhlbiIsImlzX2VsZW1lbnRfaW5fdmlld3BvcnQiLCJlbGVtZW50IiwicGFyYW1ldHIiLCJPYmplY3QiLCJhc3NpZ24iLCJiYWRfcHJvcGVydHkiLCJ2aWV3cG9ydCIsImZ1bGxfZWxlbWVudCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb250ZXh0Iiwid2lkdGgiLCJpbm5lcldpZHRoIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJoYXNQcm9wIiwicHJvcCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiZ2V0X2FjdGl2ZV9hbGJ1bV9pZCIsInN0b3JlIiwibmFtZSIsIkFMQlVNIiwiZ2V0X2FjdGl2ZV9hbGJ1bSIsImFjdGl2ZV9pdGVtIiwiaWQiLCJpdGVtcyIsIkFMQlVNUyIsImZvckVhY2giLCJpdGVtIiwiY292ZXIiLCJzcmMiLCJjb3Zlcl9iaWciLCJhbHQiLCJ0aXRsZSIsImF1dGhvciIsImFydGlzdCIsImRlc2MiLCJocmVmIiwibGluayIsInVuZGVmaW5lZCIsImlzX251bGxPQkoiLCJnZXRfYWN0aXZlX3RyYWNrIiwiVFJBQ0siLCJUUkFDS1MiLCJyYW5rIiwiZGF0ZSIsInJlbGVhc2VfZGF0ZSIsImF1ZGlvIiwicHJldmlldyIsInR5cGUiLCJnZXRfYWN0aXZlX3RyYWNrX2lkIiwiZ2V0X3RyYWNrX3ByZXZpZXdzIiwidmFsaWRfaXRlbXMiLCJ0cmFja3MiLCJkYXRhIiwibWFwIiwidHJhY2siLCJkdXJhdGlvbiIsIkJ0biIsInByb3BzIiwib25DbGljayIsImNsYXNzTmFtZSIsImljb24iLCJCdG5fbGluayIsIklucHV0X2xpc3QiLCJSZWFjdCIsImNyZWF0ZVJlZiIsInN0YXRlIiwic2VsZWN0ZWRfaXRlbSIsImxpc3RfY2xvc2VkIiwidG9nZ2xlX2Nsb3NlZCIsImJpbmQiLCJvbk1pc3NEb3duIiwic2VsZWN0X2l0ZW0iLCJpbmRleCIsIkNvbXBvbmVudCIsInRhcmdldCIsImNsb3Nlc3QiLCJvbGRfaXRlbSIsImdldEF0dHJpYnV0ZSIsIm9uQ2hhbmdlIiwicGFyZW50Tm9kZSIsImNoaWxkcmVuIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBsYXliYWNrUmF0ZXMiLCJQbGF5YmFja19zcGVlZCIsImRlZmF1bHRfaW5kZXgiLCJwYXJzZUZsb2F0IiwiaW5kZXhPZiIsIlRpbWVsaW5lIiwidXNlU3RhdGUiLCJjdXJyZW50VGltZSIsImF1ZGlvX3N0YXRlIiwic2V0X19BdWRpb19zdGF0ZSIsIkF1ZGlvIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJwbGF5YmFja1JhdGUiLCJvbkNsaWNrX3RpbWVsaW5lX3Byb2dyZXNzIiwiTWF0aCIsImZsb29yIiwidGltZWxpbmVfd2lkdGgiLCJjdXJyZW50VGFyZ2V0IiwibmF0aXZlRXZlbnQiLCJvZmZzZXRYIiwiQnRuX3RtX3BsYXkiLCJhY3RpdmUiLCJCdG5fdG1fYmFja3dhcmQiLCJCdG5fdG1fZm9yd2FyZCIsIkJ0bl92b2x1bWUiLCJ2b2x1bWUiLCJjaGFuZ2VfYmFyX2Nsb3NlZCIsIm9uQ2xpY2tfdm9sdW1lX2JhciIsInRpbWVsaW5lX2hlaWdodCIsIm9mZnNldFkiLCJiYXJfY2xvc2VkIiwicmVxdWlyZSIsIkl0ZW1fdHJhY2siLCJob3VyIiwibWluIiwic2VjIiwiQnRuX29uQ2xpY2siLCJ0aHJvdHRsZSIsIlRyYWNrc19saXN0IiwidXNlUmVmIiwiZGVmYXVsdF9vcGVuZWQiLCJvcGVuZWQiLCJzZXRPcGVuZWQiLCJzZXRfaXRlbSIsImJ0biIsInNjcm9sbFRvcCIsImNvbnRhaW5zIiwib25DaGFuZ2Vfb3BlbmVkIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0Iiwib25TZWxlY3QiLCJBbGJ1bUhlYWRfcGFuZWwiLCJtaW5pX3ZlciIsIlRyYWNrUGxheWluZ19wYW5lbCIsImZvcndhcmRSZWYiLCJyZWYiLCJzZXRfQXVkaW8iLCJ1cGRhdGVfYXVkaW9faW4iLCJzZXRfX3VwZGF0ZV9hdWRpbyIsInJlZl9hdWRpbyIsInZhbHVtZSIsInBhdXNlZCIsImF1ZGlvX3NldHRpbmdzIiwic2V0X1NldHRpbmdzIiwicGF1c2UiLCJwbGF5Iiwic3RlcCIsIlBhZ2VfbXVzaWNMaXN0IiwidHJhY2tzX2xpc3QiLCJwYXJlbnQiLCJvZmZzZXQiLCJhY3RpdmVfdHJhY2siLCJ1cGRhdGVfdHJhY2tfaW4iLCJ0cmFja3NfbGlzdF9vcGVuZWQiLCJ0cmFja1BsYXlpbmdfcGFuZWxfb3BlbmVkIiwicmVhZHkiLCJsb2FkX3JhbmRvbV9hbGJ1bSIsInBhZ2UiLCJhbGJ1bSIsImNoYW5nZV9wYXRoIiwicmV0dXJuX2RhdGEiLCJsb2FkX3RyYWNrIiwiY29ubmVjdCIsInJhbmRvbU51bWJlciIsImxvYWRfYWxidW0iLCJjb2RlIiwibWF4IiwicmFuZG9tIiwiSWNvbl9hcnJvd19yaWdodCIsInN0cm9rZSIsIkljb25fYXJyb3dfZG93biIsImZpbGwiLCJJY29uX3RyaWFuZ2xlX3JpZ2h0IiwiSWNvbl9mb3J3YXJkIiwiSWNvbl9iYWNrd2FyZCIsIkljb25fdm9sdW1lIiwiSWNvbl9yZXNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBZSxTQUFTQSxtQkFBVCxDQUE2QkMsS0FBN0IsRUFBb0M7QUFDakQsTUFBSUMsaUJBQWlCLEdBQUcsS0FBeEI7QUFBQSxNQUErQkMsSUFBSSxHQUFHRixLQUFLLENBQUNHLFlBQU4sRUFBdEM7O0FBRUEsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixJQUFJLENBQUNHLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO0FBQUE7O0FBQ3BDLCtCQUFLLFdBQUFGLElBQUksQ0FBQ0UsQ0FBRCxDQUFKLEVBQVFFLFdBQWIsZ0RBQUssa0NBQXNCLEtBQUtDLFNBQUwsQ0FBZUMsT0FBckMsQ0FBTCxFQUFxRDtBQUNuRFAsdUJBQWlCLEdBQUcsSUFBcEI7QUFDQTtBQUNEO0FBQ0Y7O0FBQ0QsTUFBSSxDQUFDQSxpQkFBTCxFQUF3QjtBQUN0QixTQUFLUSxRQUFMLENBQWM7QUFBQ0MsWUFBTSxFQUFFO0FBQVQsS0FBZDtBQUNBQyxVQUFNLENBQUNDLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDLEtBQUtiLG1CQUE3QyxFQUFrRSxJQUFsRTtBQUNEO0FBQ0YsQzs7Ozs7Ozs7Ozs7O0FDYkQ7QUFBQTtBQUFBLFNBQVNjLG1CQUFULENBQTZCQyxJQUE3QixFQUFtQztBQUNqQyxN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QTNEO0FBQStELFVBQU0sRUFBQyxJQUF0RTtBQUEyRSxNQUFFLEVBQUM7QUFBOUUsSUFIRixlQUlFO0FBQU0sU0FBSyxFQUFFO0FBQUNBLFVBQUksRUFBRTtBQUFQLEtBQWI7QUFBdUMsS0FBQyxFQUFDLElBQXpDO0FBQThDLEtBQUMsRUFBQyxJQUFoRDtBQUFxRCxTQUFLLEVBQUMsR0FBM0Q7QUFBK0QsVUFBTSxFQUFDLElBQXRFO0FBQTJFLE1BQUUsRUFBQztBQUE5RSxJQUpGLENBREY7QUFTRDtBQUNNLFNBQVNLLFVBQVQsQ0FBb0I3SCxLQUFwQixFQUEyQjtBQUNoQyxzQkFDRTtBQUFLLGFBQVMsRUFBQyxZQUFmO0FBQTRCLFdBQU8sRUFBQyxhQUFwQztBQUFrRCxRQUFJLEVBQUMsTUFBdkQ7QUFBOEQsU0FBSyxFQUFDO0FBQXBFLGtCQUNFO0FBQU0sU0FBSyxFQUFFO0FBQUN3SCxVQUFJLEVBQUU7QUFBUCxLQUFiO0FBQXVDLFlBQVEsRUFBQyxTQUFoRDtBQUEwRCxZQUFRLEVBQUMsU0FBbkU7QUFBNkUsS0FBQyxFQUFDO0FBQS9FLElBREYsQ0FERjtBQUtELEMiLCJmaWxlIjoiLi8xLTY0NWQ5OWQ3ZmZhZGJlNTM4OGI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xvc2Vfd2hlbl9taXNzRG93bihldmVudCkge1xyXG4gIGxldCBkb3duX29uX2NvbnRhaW5lciA9IGZhbHNlLCBwYXRoID0gZXZlbnQuY29tcG9zZWRQYXRoKClcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoIHBhdGhbaV0uaXNFcXVhbE5vZGU/Lih0aGlzLmNvbnRhaW5lci5jdXJyZW50KSApIHtcclxuICAgICAgZG93bl9vbl9jb250YWluZXIgPSB0cnVlO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKCFkb3duX29uX2NvbnRhaW5lcikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2xvc2VkOiB0cnVlfSlcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmNsb3NlX3doZW5fbWlzc0Rvd24sIHRydWUgKVxyXG4gIH1cclxufVxyXG4iLCJmdW5jdGlvbiBmYWxsYmFja19fY29weV90ZXh0KHRleHQpIHtcclxuICB2YXIgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbiAgdGV4dEFyZWEudmFsdWUgPSB0ZXh0O1xyXG5cclxuICAvLyBBdm9pZCBzY3JvbGxpbmcgdG8gYm90dG9tXHJcbiAgdGV4dEFyZWEuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgdGV4dEFyZWEuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG4gIHRleHRBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG5cclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcclxuICB0ZXh0QXJlYS5mb2N1cygpO1xyXG4gIHRleHRBcmVhLnNlbGVjdCgpO1xyXG5cclxuICB0cnkge1xyXG4gICAgdmFyIHN1Y2Nlc3NmdWwgPSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgdmFyIG1zZyA9IHN1Y2Nlc3NmdWwgPyAnc3VjY2Vzc2Z1bCcgOiAndW5zdWNjZXNzZnVsJztcclxuICAgIGNvbnNvbGUubG9nKCdGYWxsYmFjazogQ29weWluZyB0ZXh0IGNvbW1hbmQgd2FzICcgKyBtc2cpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcignRmFsbGJhY2s6IE9vcHMsIHVuYWJsZSB0byBjb3B5JywgZXJyKTtcclxuICB9XHJcblxyXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dEFyZWEpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvcHlfdGV4dCh0ZXh0KSB7XHJcbiAgaWYgKCFuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XHJcbiAgICBmYWxsYmFja19fY29weV90ZXh0KHRleHQpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0FzeW5jOiBDb3B5aW5nIHRvIGNsaXBib2FyZCB3YXMgc3VjY2Vzc2Z1bCEnKTtcclxuICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0FzeW5jOiBDb3VsZCBub3QgY29weSB0ZXh0OiAnLCBlcnIpO1xyXG4gIH0pO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzX2VsZW1lbnRfaW5fdmlld3BvcnQoZWxlbWVudCwgcGFyYW1ldHIgPSB7fSkge1xyXG4gICAgcGFyYW1ldHIgPSBPYmplY3QuYXNzaWduKHtiYWRfcHJvcGVydHk6IHt9LCB2aWV3cG9ydDogd2luZG93LCBmdWxsX2VsZW1lbnQ6IHRydWV9LCBwYXJhbWV0cilcclxuICAgIGxldCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGxldCBjb250ZXh0ID0gcGFyYW1ldHIudmlld3BvcnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdD8uKCkgfHwge2xlZnQ6IDAsIHRvcDogMCwgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH07XHJcblxyXG4gICAgbGV0IGhhc1Byb3AgPSBmYWxzZTtcclxuICAgIGZvciAobGV0IHByb3AgaW4gcGFyYW1ldHIuYmFkX3Byb3BlcnR5KSB7XHJcbiAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcCkgPT0gcGFyYW1ldHIuYmFkX3Byb3BlcnR5W3Byb3BdKSB7XHJcbiAgICAgICAgaGFzUHJvcCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAhaGFzUHJvcCAmJlxyXG4gICAgICAgIHJlY3QubGVmdCAtIGNvbnRleHQubGVmdCA+PSAwICYmXHJcbiAgICAgICAgcmVjdC50b3AgLSBjb250ZXh0LnRvcCA+PSAwICYmXHJcbiAgICAgICAgKHBhcmFtZXRyLmZ1bGxfZWxlbWVudCA/XHJcbiAgICAgICAgICByZWN0LmxlZnQgPj0gMCAmJiByZWN0LnRvcCA+PSAwICYmXHJcbiAgICAgICAgICByZWN0LmxlZnQgKyByZWN0LndpZHRoIDw9IChjb250ZXh0LndpZHRoICsgY29udGV4dC5sZWZ0KSAmJlxyXG4gICAgICAgICAgcmVjdC50b3AgKyByZWN0LmhlaWdodCA8PSAoY29udGV4dC5oZWlnaHQgKyBjb250ZXh0LnRvcClcclxuICAgICAgICAgIDpcclxuICAgICAgICAgIHJlY3QubGVmdCA8PSByZWN0LndpZHRoICYmXHJcbiAgICAgICAgICByZWN0LnRvcCA8PSByZWN0LmhlaWdodCAmJlxyXG4gICAgICAgICAgcmVjdC5sZWZ0IDw9IChjb250ZXh0LndpZHRoICsgY29udGV4dC5sZWZ0KSAmJlxyXG4gICAgICAgICAgcmVjdC50b3AgPD0gKGNvbnRleHQuaGVpZ2h0ICsgY29udGV4dC50b3ApXHJcbiAgICAgICAgKVxyXG4gICAgKTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBuYW1lIGZyb20gXCIuLi9yZF9zdG9yZV9zZWN0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldF9hY3RpdmVfYWxidW1faWQgPSAoc3RvcmUpID0+IHtcclxuICByZXR1cm4gc3RvcmU/LltuYW1lLlBBVEhdW25hbWUucGF0aF9jaHVuay5BTEJVTV0gfHwgLTFcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRfYWN0aXZlX2FsYnVtID0gKHN0b3JlKSA9PiB7XHJcbiAgbGV0IGFjdGl2ZV9pdGVtLFxyXG4gICAgaWQgPSBzdG9yZT8uW25hbWUuUEFUSF1bbmFtZS5wYXRoX2NodW5rLkFMQlVNXSxcclxuICAgIGl0ZW1zID0gc3RvcmU/LltuYW1lLklURU1TX0JZX1RZUEVdW25hbWUuaXRlbXNfdHlwZS5BTEJVTVNdLml0ZW1zIHx8IFtdO1xyXG5cclxuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmlkID09IGdldF9hY3RpdmVfYWxidW1faWQoc3RvcmUpKSB7XHJcbiAgICAgICAgYWN0aXZlX2l0ZW0gPSB7XHJcbiAgICAgICAgICBjb3Zlcjoge1xyXG4gICAgICAgICAgICBzcmM6IGl0ZW0uY292ZXJfYmlnLFxyXG4gICAgICAgICAgICBhbHQ6IFwiYmlnIGNvdmVyXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbmFtZTogaXRlbS50aXRsZSxcclxuICAgICAgICAgIGF1dGhvcjogaXRlbS5hcnRpc3QubmFtZSxcclxuICAgICAgICAgIGRlc2M6IFwiXCIsXHJcbiAgICAgICAgICBocmVmOiBpdGVtLmxpbmtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9KVxyXG5cclxuICBpZiAoYWN0aXZlX2l0ZW0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBhY3RpdmVfaXRlbSA9IHtcclxuICAgICAgaXNfbnVsbE9CSjogdHJ1ZSxcclxuICAgICAgY292ZXI6IHtcclxuICAgICAgICBzcmM6IG51bGwsXHJcbiAgICAgICAgYWx0OiBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIG5hbWU6IG51bGwsXHJcbiAgICAgIGF1dGhvcjogbnVsbCxcclxuICAgICAgZGVzYzogbnVsbCxcclxuICAgICAgaHJlZjogbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFjdGl2ZV9pdGVtXHJcbn07XHJcbiIsImltcG9ydCAqIGFzIG5hbWUgZnJvbSBcIi4uL3JkX3N0b3JlX3NlY3Rpb25zXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRfYWN0aXZlX3RyYWNrID0gKHN0b3JlKSA9PiB7XHJcbiAgbGV0IGFjdGl2ZV9pdGVtLFxyXG4gICAgaWQgPSBzdG9yZT8uW25hbWUuUEFUSF1bbmFtZS5wYXRoX2NodW5rLlRSQUNLXSxcclxuICAgIGl0ZW1zID0gc3RvcmU/LltuYW1lLklURU1TX0JZX1RZUEVdW25hbWUuaXRlbXNfdHlwZS5UUkFDS1NdPy5pdGVtcyB8fCBbXTtcclxuXHJcbiAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGlmIChpdGVtLmlkID09IGlkKSB7XHJcbiAgICAgIGFjdGl2ZV9pdGVtID0ge1xyXG4gICAgICAgIGNvdmVyOiB7XHJcbiAgICAgICAgICBzcmM6IG51bGwsXHJcbiAgICAgICAgICBhbHQ6IFwiY292ZXJcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmFtZTogaXRlbS50aXRsZSxcclxuICAgICAgICB0aXRsZTogYFJhbmsgJHtpdGVtLnJhbmt9YCxcclxuICAgICAgICBkYXRlOiBpdGVtLnJlbGVhc2VfZGF0ZSxcclxuICAgICAgICBsaW5rOiBpdGVtLmxpbmssXHJcbiAgICAgICAgYXVkaW86IHtcclxuICAgICAgICAgIHNyYzogaXRlbS5wcmV2aWV3LFxyXG4gICAgICAgICAgdHlwZTogXCJhdWRpby9tcDNcIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuXHJcbiAgaWYgKGFjdGl2ZV9pdGVtID09IHVuZGVmaW5lZCkge1xyXG4gICAgYWN0aXZlX2l0ZW0gPSB7XHJcbiAgICAgIGlzX251bGxPQko6IHRydWUsXHJcbiAgICAgIGNvdmVyOiB7XHJcbiAgICAgICAgc3JjOiBudWxsLFxyXG4gICAgICAgIGFsdDogbnVsbFxyXG4gICAgICB9LFxyXG4gICAgICBuYW1lOiBudWxsLFxyXG4gICAgICB0aXRsZTogbnVsbCxcclxuICAgICAgYXVkaW86IHtcclxuICAgICAgICBzcmM6IG51bGwsXHJcbiAgICAgICAgdHlwZTogbnVsbFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYWN0aXZlX2l0ZW1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRfYWN0aXZlX3RyYWNrX2lkID0gKHN0b3JlKSA9PiB7XHJcbiAgcmV0dXJuIHN0b3JlPy5bbmFtZS5QQVRIXVtuYW1lLnBhdGhfY2h1bmsuVFJBQ0tdIHx8IC0xXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0X3RyYWNrX3ByZXZpZXdzID0gKHN0b3JlKSA9PiB7XHJcbiAgbGV0IHZhbGlkX2l0ZW1zLFxyXG4gICAgaWQgPSBzdG9yZT8uW25hbWUuUEFUSF1bbmFtZS5wYXRoX2NodW5rLkFMQlVNXSxcclxuICAgIGl0ZW1zID0gc3RvcmU/LltuYW1lLklURU1TX0JZX1RZUEVdW25hbWUuaXRlbXNfdHlwZS5BTEJVTVNdPy5pdGVtcyB8fCBbXTtcclxuXHJcbiAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGlmIChpdGVtLmlkID09IGlkKSB7XHJcbiAgICAgIHZhbGlkX2l0ZW1zID0gaXRlbS50cmFja3MuZGF0YS5tYXAodHJhY2s9PntcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IHRyYWNrLmlkLFxyXG4gICAgICAgICAgbmFtZTogdHJhY2sudGl0bGUsXHJcbiAgICAgICAgICBkYXRlOiB0cmFjay5yZWxlYXNlX2RhdGUsXHJcbiAgICAgICAgICBkdXJhdGlvbjogdHJhY2suZHVyYXRpb24sXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuXHJcbiAgcmV0dXJuIHZhbGlkX2l0ZW1zIHx8IFtdXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJ0bihwcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIG9uQ2xpY2s9e3R5cGVvZiAocHJvcHMub25DbGljaykgPT0gJ2Z1bmN0aW9uJyA/IHByb3BzLm9uQ2xpY2sgOiBudWxsfVxyXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgbmFtZT17cHJvcHMubmFtZSA/IHByb3BzLm5hbWUgOiBudWxsfVxyXG4gICAgICBjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZSA/IFwiYnRuXCIgKyAnICcgKyBwcm9wcy5jbGFzc05hbWUgOiBcImJ0blwifVxyXG4gICAgPlxyXG4gICAgICB7cHJvcHMuaWNvbn1cclxuICAgICAge3Byb3BzLnRpdGxlICYmIDxzcGFuPntwcm9wcy50aXRsZX08L3NwYW4+fVxyXG4gICAgPC9idXR0b24+XHJcbiAgKVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluayB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCB7SWNvbl9hcnJvd19yaWdodH0gZnJvbSBcIi4uLy4uL3N2Z1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCdG5fbGluayhwcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YVxyXG4gICAgICBocmVmPXtwcm9wcy5ocmVmIHx8IFwiI1wifVxyXG4gICAgICBjbGFzc05hbWU9XCJidG4tbGlua1wiXHJcbiAgICA+XHJcbiAgICAgIHtwcm9wcy50aXRsZSB8fCBcIkxpbmtcIn1cclxuICAgICAgPEljb25fYXJyb3dfcmlnaHQgLz5cclxuICAgIDwvYT5cclxuICApXHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0X2xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZVJlZigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2VsZWN0ZWRfaXRlbTogcHJvcHMuc2VsZWN0ZWRfaXRlbSB8fCAwLCAvLyBpdGVtYHMgaW5kZXhcclxuICAgICAgbGlzdF9jbG9zZWQ6IHRydWUsXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnRvZ2dsZV9jbG9zZWQgPSB0b2dnbGVfY2xvc2VkLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTWlzc0Rvd24gPSBvbk1pc3NEb3duLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RfaXRlbSA9IHNlbGVjdF9pdGVtLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBsZXQgcHJvcHMgPSB0aGlzLnByb3BzLCBsaXN0X2Nsb3NlZCA9IHRoaXMuc3RhdGUubGlzdF9jbG9zZWQsIHNlbGVjdGVkX2l0ZW0gPSB0aGlzLnN0YXRlLnNlbGVjdGVkX2l0ZW07XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWxpc3RcIj5cclxuICAgICAgICA8dWwgb25DbGljaz17dGhpcy5zZWxlY3RfaXRlbX0gY2xhc3NOYW1lPXtsaXN0X2Nsb3NlZCA/IFwiaW5wdXQtbGlzdF9pdGVtcyBjbG9zZWRcIiA6IFwiaW5wdXQtbGlzdF9pdGVtc1wifT5cclxuICAgICAgICAgIHtwcm9wcy5pdGVtcyAmJiBwcm9wcy5pdGVtcy5tYXAoKHRpdGxlLCBpbmRleCkgPT5cclxuICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9IGRhdGEta2V5PXtpbmRleH0+e3RpdGxlfTwvbGk+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvdWw+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtbGlzdF9oZWFkXCIgb25DbGljaz17dGhpcy50b2dnbGVfY2xvc2VkfT5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImlucHV0LWxpc3Rfc2VsZWN0ZWRfaXRlbVwiPntwcm9wcy5pdGVtc1tzZWxlY3RlZF9pdGVtXX08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gb25NaXNzRG93bihldmVudCkge1xyXG4gIGxldCBkb3duX29uX2NvbnRhaW5lciA9IGZhbHNlLCBwYXRoID0gZXZlbnQuY29tcG9zZWRQYXRoKClcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoIHBhdGhbaV0uaXNFcXVhbE5vZGU/Lih0aGlzLmNvbnRhaW5lci5jdXJyZW50KSApIHtcclxuICAgICAgZG93bl9vbl9jb250YWluZXIgPSB0cnVlO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKCFkb3duX29uX2NvbnRhaW5lcikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7bGlzdF9jbG9zZWQ6IHRydWV9KVxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25NaXNzRG93biwgdHJ1ZSApXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RfaXRlbShldmVudCkge1xyXG4gIGxldCBpdGVtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2xpW2RhdGEta2V5XScpLCBvbGRfaXRlbSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRfaXRlbVxyXG4gIGlmIChpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSAhPSBvbGRfaXRlbSkge1xyXG4gICAgdHlwZW9mKHRoaXMucHJvcHMub25DaGFuZ2UpID09ICdmdW5jdGlvbicgPyB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpKSA6IG51bGxcclxuICB9XHJcblxyXG4gIGl0ZW0ucGFyZW50Tm9kZS5jaGlsZHJlbltvbGRfaXRlbV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxyXG4gIGl0ZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxyXG4gIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkX2l0ZW06IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlX2Nsb3NlZCgpIHtcclxuICBsZXQgbGlzdF9jbG9zZWQgPSB0aGlzLnN0YXRlLmxpc3RfY2xvc2VkXHJcblxyXG4gIGlmIChsaXN0X2Nsb3NlZCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGxpc3RfY2xvc2VkOiBmYWxzZVxyXG4gICAgfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTWlzc0Rvd24sIHRydWUgKVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbGlzdF9jbG9zZWQ6IHRydWVcclxuICAgIH0pXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1pc3NEb3duLCB0cnVlIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ0biBmcm9tIFwiLi4vYnV0dG9ucy9idXR0b25cIlxyXG5pbXBvcnQgSW5wdXRfbGlzdCBmcm9tIFwiLi4vaW5wdXQtbGlzdFwiXHJcblxyXG5jb25zdCBwbGF5YmFja1JhdGVzID0gW1xyXG4gIFwiMC41MFhcIixcclxuICBcIjAuNzVYXCIsXHJcbiAgXCIxLjAwWFwiLFxyXG4gIFwiMS4yNVhcIixcclxuICBcIjEuNTBYXCIsXHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsYXliYWNrX3NwZWVkKHByb3BzKSB7XHJcbiAgbGV0IGRlZmF1bHRfaW5kZXggPSBwbGF5YmFja1JhdGVzLm1hcChpdGVtPT5wYXJzZUZsb2F0KGl0ZW0pKS5pbmRleE9mKHByb3BzLmRlZmF1bHQpXHJcbiAgcmV0dXJuIChcclxuICAgIDxJbnB1dF9saXN0XHJcbiAgICAgIG9uQ2hhbmdlPXtpbmRleD0+e1xyXG4gICAgICAgIHR5cGVvZiAocHJvcHMub25DaGFuZ2UpID09ICdmdW5jdGlvbicgPyBwcm9wcy5vbkNoYW5nZShwYXJzZUZsb2F0KHBsYXliYWNrUmF0ZXNbaW5kZXhdKSkgOiBudWxsXHJcbiAgICAgIH19XHJcbiAgICAgIHNlbGVjdGVkX2l0ZW09e2RlZmF1bHRfaW5kZXggIT0gLTEgPyBkZWZhdWx0X2luZGV4IDogMn1cclxuICAgICAgaXRlbXM9e3BsYXliYWNrUmF0ZXN9XHJcbiAgICAvPlxyXG4gIClcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGltZWxpbmUocHJvcHMpIHtcclxuICBjb25zdCBbYXVkaW9fc3RhdGUsIHNldF9fQXVkaW9fc3RhdGVdID0gdXNlU3RhdGUoe1xyXG4gICAgY3VycmVudFRpbWU6IDAsXHJcbiAgICBkdXJhdGlvbjogMCxcclxuICB9KTtcclxuXHJcbiAgaWYgKHByb3BzLmF1ZGlvIGluc3RhbmNlb2YgQXVkaW8pIHtcclxuICAgIGxldCB0aW1lb3V0O1xyXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgc2V0X19BdWRpb19zdGF0ZSh7XHJcbiAgICAgICAgY3VycmVudFRpbWU6IHByb3BzLmF1ZGlvLmN1cnJlbnRUaW1lIHx8IDAsXHJcbiAgICAgICAgZHVyYXRpb246IHByb3BzLmF1ZGlvLmR1cmF0aW9uIHx8IDAsXHJcbiAgICAgIH0pXHJcbiAgICB9LCBwcm9wcy5hdWRpby5wbGF5YmFja1JhdGUgKiAxMDApXHJcbiAgfVxyXG5cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWVyVGltZWxpbmVcIj5cclxuICAgICAgPGRpdiBvbkNsaWNrPXtldmVudD0+e29uQ2xpY2tfdGltZWxpbmVfcHJvZ3Jlc3MoZXZlbnQsIHByb3BzLmF1ZGlvKX19IGNsYXNzTmFtZT1cInBsYXllclRpbWVsaW5lX3Byb2dyZXNzX2JhclwiIHN0eWxlPXt7XCItLXZhbHVlXCI6IGF1ZGlvX3N0YXRlLmN1cnJlbnRUaW1lLCBcIi0tbWF4XCI6IGF1ZGlvX3N0YXRlLmR1cmF0aW9ufX0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5ZXJUaW1lbGluZV9wcm9ncmVzc192YWx1ZVwiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxwIGNsYXNzTmFtZT1cInBsYXllclRpbWVsaW5lX2N1cnJlbnRUaW1lXCI+e01hdGguZmxvb3IoYXVkaW9fc3RhdGUuY3VycmVudFRpbWUpfTwvcD5cclxuICAgICAgPHAgY2xhc3NOYW1lPVwicGxheWVyVGltZWxpbmVfYWxsVGltZVwiPntNYXRoLmZsb29yKGF1ZGlvX3N0YXRlLmR1cmF0aW9uKX08L3A+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuXHJcbmxldCBvbkNsaWNrX3RpbWVsaW5lX3Byb2dyZXNzID0gKGV2ZW50LCBhdWRpbykgPT4ge1xyXG4gIGxldCB0aW1lbGluZV93aWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGV2ZW50LmN1cnJlbnRUYXJnZXQpLndpZHRoO1xyXG4gIGF1ZGlvLmN1cnJlbnRUaW1lID0gZXZlbnQubmF0aXZlRXZlbnQub2Zmc2V0WCAvIHBhcnNlRmxvYXQodGltZWxpbmVfd2lkdGgpICogYXVkaW8uZHVyYXRpb247XHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0LCB7dXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJ0bl90bV9wbGF5KHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgb25DbGljaz17KCk9PntcclxuICAgICAgICB0eXBlb2YgKHByb3BzLm9uQ2xpY2spID09ICdmdW5jdGlvbicgPyBwcm9wcy5vbkNsaWNrKCFwcm9wcy5hY3RpdmUpIDogbnVsbFxyXG4gICAgICB9fVxyXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgY2xhc3NOYW1lPXtwcm9wcy5hY3RpdmUgPyBcImJ0bi10bS1wbGF5IGFjdGl2ZVwiIDogXCJidG4tdG0tcGxheVwifVxyXG4gICAgPlxyXG4gICAgICA8c3Bhbj48L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICApXHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ0biBmcm9tIFwiLi4vYnV0dG9ucy9idXR0b25cIlxyXG5pbXBvcnQgeyBJY29uX2JhY2t3YXJkLCBJY29uX2ZvcndhcmQgfSBmcm9tIFwiLi4vLi4vc3ZnXCJcclxuXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEJ0bl90bV9iYWNrd2FyZChwcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8QnRuXHJcbiAgICAgIGNsYXNzTmFtZT1cInRtLWJhY2t3YXJkXCJcclxuICAgICAgaWNvbj17PEljb25fYmFja3dhcmQvPn1cclxuICAgICAgb25DbGljaz17KCk9PntcclxuICAgICAgICB0eXBlb2YgKHByb3BzLm9uQ2xpY2spID09ICdmdW5jdGlvbicgPyBwcm9wcy5vbkNsaWNrKC0xMCkgOiBudWxsXHJcbiAgICAgIH19XHJcbiAgICAvPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEJ0bl90bV9mb3J3YXJkKHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxCdG5cclxuICAgICAgY2xhc3NOYW1lPVwidG0tZm9yd2FyZFwiXHJcbiAgICAgIGljb249ezxJY29uX2ZvcndhcmQvPn1cclxuICAgICAgb25DbGljaz17KCk9PntcclxuICAgICAgICB0eXBlb2YgKHByb3BzLm9uQ2xpY2spID09ICdmdW5jdGlvbicgPyBwcm9wcy5vbkNsaWNrKDEwKSA6IG51bGxcclxuICAgICAgfX1cclxuICAgIC8+XHJcbiAgKVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBCdG4gZnJvbSBcIi4uL2J1dHRvbnMvYnV0dG9uXCJcclxuXHJcbmltcG9ydCB7IEljb25fdm9sdW1lIH0gZnJvbSBcIi4uLy4uL3N2Z1wiXHJcbmltcG9ydCBjbG9zZV93aGVuX21pc3NEb3duIGZyb20gXCIuLi8uLi8uLi9mdW5jdGlvbnMvY2xvc2Vfd2hlbl9taXNzRG93blwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuX3ZvbHVtZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuY29udGFpbmVyID0gUmVhY3QuY3JlYXRlUmVmKCk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgdm9sdW1lOiB0aGlzLnByb3BzLmRlZmF1bHQgfHwgMTAwLFxyXG4gICAgICBjbG9zZWQ6IHRydWUsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY2hhbmdlX2Jhcl9jbG9zZWQgPSBjaGFuZ2VfYmFyX2Nsb3NlZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5jbG9zZV93aGVuX21pc3NEb3duID0gY2xvc2Vfd2hlbl9taXNzRG93bi5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMub25DbGlja192b2x1bWVfYmFyID0gb25DbGlja192b2x1bWVfYmFyLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHt9XHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7fVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHJlZj17dGhpcy5jb250YWluZXJ9IGNsYXNzTmFtZT1cImJ0bi10bS12b2x1bWVcIj5cclxuXHJcbiAgICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tfdm9sdW1lX2Jhcn0gY2xhc3NOYW1lPXt0aGlzLnN0YXRlLmNsb3NlZCA/IFwiYnRuLXRtLXZvbHVtZV9iYXIgY2xvc2VkXCIgOiBcImJ0bi10bS12b2x1bWVfYmFyXCJ9IHN0eWxlPXt7XCItLXZhbHVlXCI6IHRoaXMuc3RhdGUudm9sdW1lfX0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi10bS12b2x1bWVfYmFyX3ZhbHVlXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxCdG5cclxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2hhbmdlX2Jhcl9jbG9zZWR9XHJcbiAgICAgICAgICBpY29uPXtcclxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgICAgICAgIDxJY29uX3ZvbHVtZSAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBvbkNsaWNrX3ZvbHVtZV9iYXIoZXZlbnQpIHtcclxuICBsZXQgdGltZWxpbmVfaGVpZ2h0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZXZlbnQuY3VycmVudFRhcmdldCkuaGVpZ2h0O1xyXG4gIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgdm9sdW1lOiAxMDAgLSBldmVudC5uYXRpdmVFdmVudC5vZmZzZXRZIC8gcGFyc2VGbG9hdCh0aW1lbGluZV9oZWlnaHQpICogMTAwXHJcbiAgfSlcclxuICB0eXBlb2YgKHRoaXMucHJvcHMub25DaGFuZ2UpID09ICdmdW5jdGlvbicgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSgxMDAgLSBldmVudC5uYXRpdmVFdmVudC5vZmZzZXRZIC8gcGFyc2VGbG9hdCh0aW1lbGluZV9oZWlnaHQpICogMTAwKVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2Jhcl9jbG9zZWQoKSB7XHJcbiAgbGV0IGJhcl9jbG9zZWQgPSB0aGlzLnN0YXRlLmNsb3NlZFxyXG5cclxuICBpZiAoYmFyX2Nsb3NlZCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNsb3NlZDogZmFsc2VcclxuICAgIH0pXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5jbG9zZV93aGVuX21pc3NEb3duLCB0cnVlIClcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNsb3NlZDogdHJ1ZVxyXG4gICAgfSlcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmNsb3NlX3doZW5fbWlzc0Rvd24sIHRydWUgKVxyXG4gIH1cclxufVxyXG4iLCJsZXQgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5pbXBvcnQgeyBJY29uX3RyaWFuZ2xlX3JpZ2h0IH0gZnJvbSBcIi4uL3N2Z1wiO1xyXG5pbXBvcnQgQnRuIGZyb20gXCIuLi9pbnB1dHMvYnV0dG9ucy9idXR0b25cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSXRlbV90cmFjayhwcm9wcykge1xyXG4gIGxldCBkdXJhdGlvbiA9IHByb3BzLmR1cmF0aW9uIHx8IFwiMFwiLFxyXG4gICAgaG91ciA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyAzNjAwKSxcclxuICAgIG1pbiA9IE1hdGguZmxvb3IoKGR1cmF0aW9uIC0gaG91ciAqIDM2MDApIC8gNjApLFxyXG4gICAgc2VjID0gTWF0aC5mbG9vcihkdXJhdGlvbiAtIGhvdXIgKiAzNjAwIC0gbWluICogNjApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXRyYWNrXCI+XHJcbiAgICAgIDxoNiBjbGFzc05hbWU9XCJpdGVtLXRyYWNrX25hbWVcIj57cHJvcHMubmFtZX08L2g2PlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJpdGVtLXRyYWNrX21pbmlJbmZvXCI+e2Ake2hvdXIgPiAwID8gaG91ciArIFwiIGhvdXJzXCIgOiBcIlwiIH0ke21pbiA+IDAgPyBcIiBcIiArIG1pbiArIFwiIG1pblwiIDogXCJcIiB9JHtzZWMgPiAwID8gXCIgXCIgKyBzZWMgKyBcIiBzZWNcIiA6IFwiXCIgfWB9PC9wPlxyXG5cclxuICAgICAgPEJ0blxyXG4gICAgICAgIG9uQ2xpY2s9eygpPT57IHR5cGVvZihwcm9wcy5CdG5fb25DbGljaykgPT0gXCJmdW5jdGlvblwiID8gcHJvcHMuQnRuX29uQ2xpY2socHJvcHMuaWQpIDogbnVsbCB9fVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInBsYXlcIlxyXG4gICAgICAgIGljb249ezxJY29uX3RyaWFuZ2xlX3JpZ2h0Lz59XHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0LCB7dXNlU3RhdGUsIHVzZVJlZn0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTd2l0Y2hUcmFuc2l0aW9uLCBDU1NUcmFuc2l0aW9uIH0gZnJvbSBcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIjtcclxuaW1wb3J0IEJ0biBmcm9tIFwiLi4vLi4vaW5wdXRzL2J1dHRvbnMvYnV0dG9uXCJcclxuaW1wb3J0IEl0ZW1fdHJhY2sgZnJvbSBcIi4uLy4uL2xpc3RfaXRlbXMvaXRlbV90cmFja1wiXHJcblxyXG5cclxubGV0IHRocm90dGxlID0gcmVxdWlyZSgnbG9kYXNoLnRocm90dGxlJyk7XHJcbmltcG9ydCBpc19lbGVtZW50X2luX3ZpZXdwb3J0IGZyb20gJy4uLy4uLy4uL2Z1bmN0aW9ucy92aWV3cG9ydF92aXNpYmlsaXR5J1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVHJhY2tzX2xpc3QocHJvcHMpIHtcclxuICBjb25zdCBjb250YWluZXIgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgW29wZW5lZCwgc2V0T3BlbmVkXSA9IHVzZVN0YXRlKHByb3BzLmRlZmF1bHRfb3BlbmVkIHx8IGZhbHNlKTtcclxuICBjb25zdCBbc2VsZWN0ZWRfaXRlbSwgc2V0X2l0ZW1dID0gdXNlU3RhdGUoMCk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj17Y29udGFpbmVyfVxyXG4gICAgICBjbGFzc05hbWU9e29wZW5lZCA/IFwibGlzdC10cmFja3Mgb3BlbmVkXCIgOiBcImxpc3QtdHJhY2tzXCJ9XHJcbiAgICAgIG9uU2Nyb2xsPXtldmVudD0+e1xyXG4gICAgICAgIGxldCBidG4gPSBldmVudC5jdXJyZW50VGFyZ2V0LmNoaWxkcmVuWzBdXHJcbiAgICAgICAgaWYgKCBldmVudC5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCA8PSBidG4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0ICsgNDAgKSB7XHJcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkXCIpXHJcbiAgICAgICAgfSBlbHNlIGlmICggIWJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJmaXhlZFwiKSAmJiAhaXNfZWxlbWVudF9pbl92aWV3cG9ydChidG4sIHtmdWxsX2VsZW1lbnQ6IHRydWUsIHZpZXdwb3J0OiBldmVudC5jdXJyZW50VGFyZ2V0fSkgKSB7XHJcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImZpeGVkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW9wZW5lZCAmJiBldmVudC5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCA+PSAyMCkge1xyXG4gICAgICAgICAgc2V0T3BlbmVkKHRydWUpXHJcbiAgICAgICAgICB0eXBlb2YocHJvcHMub25DaGFuZ2Vfb3BlbmVkKSA9PSBcImZ1bmN0aW9uXCIgPyBwcm9wcy5vbkNoYW5nZV9vcGVuZWQodHJ1ZSkgOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtdHJhY2tzX2hlYWRlclwiPlxyXG4gICAgICA8QnRuXHJcbiAgICAgICAgb25DbGljaz17KCk9PntcclxuICAgICAgICAgIGlmIChwcm9wcy5pdGVtcz8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmIChvcGVuZWQgJiYgY29udGFpbmVyLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICBjb250YWluZXIuY3VycmVudC5zY3JvbGxUb3AgPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0T3BlbmVkKCFvcGVuZWQpXHJcbiAgICAgICAgICAgIHR5cGVvZihwcm9wcy5vbkNoYW5nZV9vcGVuZWQpID09IFwiZnVuY3Rpb25cIiA/IHByb3BzLm9uQ2hhbmdlX29wZW5lZCghb3BlbmVkKSA6IG51bGxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9fVxyXG4gICAgICAgIGNsYXNzTmFtZT17KCBjb250YWluZXIuY3VycmVudCAmJiBjb250YWluZXIuY3VycmVudD8uc2Nyb2xsSGVpZ2h0ID09IGNvbnRhaW5lci5jdXJyZW50Py5jbGllbnRIZWlnaHQpID8gXCJjbG9zZV9vcGVuIGlzX2hpZGRlblwiIDogXCJjbG9zZV9vcGVuXCJ9XHJcbiAgICAgICAgaWNvbj17PFJlYWN0LkZyYWdtZW50PjxzcGFuPjwvc3Bhbj48c3Bhbj48L3NwYW4+PC9SZWFjdC5GcmFnbWVudD59XHJcbiAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LXRyYWNrc19pdGVtc1wiPlxyXG4gICAgICAgIHtwcm9wcy5pdGVtcz8ubGVuZ3RoICE9IDAgJiYgcHJvcHMuaXRlbXMubWFwKChpdGVtLCBpbmRleCk9PlxyXG4gICAgICAgICAgPEl0ZW1fdHJhY2tcclxuICAgICAgICAgICAga2V5PXtpdGVtLmlkIHx8IGluZGV4fVxyXG4gICAgICAgICAgICBpZD17aW5kZXh9XHJcbiAgICAgICAgICAgIEJ0bl9vbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgIHNldF9pdGVtLmJpbmQobnVsbCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgIHR5cGVvZihwcm9wcy5vblNlbGVjdCkgPT0gXCJmdW5jdGlvblwiID8gcHJvcHMub25TZWxlY3QoaW5kZXgpIDogXCJcIlxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBuYW1lPXtpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgIGRhdGU9e2l0ZW0uZGF0ZX1cclxuICAgICAgICAgICAgZHVyYXRpb249e2l0ZW0uZHVyYXRpb259XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG4iLCJsZXQgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5cclxuaW1wb3J0IEJ0bl9saW5rIGZyb20gXCIuLi8uLi9pbnB1dHMvYnV0dG9ucy9idXR0b25fbGlua1wiXHJcbmltcG9ydCBCdG4gZnJvbSBcIi4uLy4uL2lucHV0cy9idXR0b25zL2J1dHRvblwiXHJcbmltcG9ydCBjb3B5X3RleHQgZnJvbSBcIi4uLy4uLy4uL2Z1bmN0aW9ucy9jb3B5X3RleHRcIlxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBBbGJ1bUhlYWRfcGFuZWwocHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e3Byb3BzLm1pbmlfdmVyID8gXCJwYW5lbC1hbGJ1bUhlYWQgbWluaV92ZXJcIiA6IFwicGFuZWwtYWxidW1IZWFkXCJ9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWFsYnVtSGVhZF9wYXJ0LTFcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWFsYnVtSGVhZF9jb3ZlclwiPlxyXG4gICAgICAgICAge3Byb3BzLmNvdmVyICYmXHJcbiAgICAgICAgICAgIDxpbWcgc3JjPXtwcm9wcy5jb3Zlci5zcmMgfHwgXCIjXCJ9IGFsdD17cHJvcHMuY292ZXIuYWx0fS8+XHJcbiAgICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiI1wiIGFsdD1cIm5vdCBmb3VuZGVkXCIvPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYWxidW1IZWFkX3RpdGxlXCI+XHJcbiAgICAgICAgICB7cHJvcHMubmFtZSAmJiA8aDMgY2xhc3NOYW1lPVwicGFuZWwtYWxidW1IZWFkX25hbWVcIj57cHJvcHMubmFtZX08L2gzPn1cclxuICAgICAgICAgIHtwcm9wcy5hdXRob3IgJiYgPGg2IGNsYXNzTmFtZT1cInBhbmVsLWFsYnVtSGVhZF9hdXRob3JcIj57cHJvcHMuYXV0aG9yfTwvaDY+fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYWxidW1IZWFkX3BhcnQtMlwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYWxidW1IZWFkX3RpdGxlXCI+XHJcbiAgICAgICAgICB7cHJvcHMubmFtZSAmJiA8aDMgY2xhc3NOYW1lPVwicGFuZWwtYWxidW1IZWFkX25hbWVcIj57cHJvcHMubmFtZX08L2gzPn1cclxuICAgICAgICAgIHtwcm9wcy5hdXRob3IgJiYgPGg2IGNsYXNzTmFtZT1cInBhbmVsLWFsYnVtSGVhZF9hdXRob3JcIj57cHJvcHMuYXV0aG9yfTwvaDY+fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtwcm9wcy5kZXNjICYmIDxoNiBjbGFzc05hbWU9XCJwYW5lbC1hbGJ1bUhlYWRfZGVzY1wiPntwcm9wcy5kZXNjfTwvaDY+fVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYWxidW1IZWFkX2xpbmVcIj5cclxuICAgICAgICAgIDxCdG5fbGluayB0aXRsZT1cIlNvdXJjZVwiIGhyZWY9e3Byb3BzLmhyZWZ9Lz5cclxuICAgICAgICAgIDxCdG4gb25DbGljaz17KCk9Pntjb3B5X3RleHQocHJvcHMuaHJlZil9fSBjbGFzc05hbWU9XCJjb3B5X2xpbmtcIiB0aXRsZT1cIkNvcHkgbGlua1wiLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCwge3VzZVN0YXRlLCB1c2VFZmZlY3R9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB7IEljb25fYmFja3dhcmQsIEljb25fZm9yd2FyZCwgSWNvbl9hcnJvd19kb3duIH0gZnJvbSBcIi4uLy4uL3N2Z1wiXHJcbmltcG9ydCBCdG4gZnJvbSBcIi4uLy4uL2lucHV0cy9idXR0b25zL2J1dHRvblwiXHJcbmltcG9ydCB7IERhdGFfcHJlbG9hZGVyIH0gZnJvbSBcIi4uL3ByZWxvYWRlcnNcIlxyXG5cclxuXHJcbmltcG9ydCBQbGF5ZXJfdGltZWxpbmUgZnJvbSBcIi4uLy4uL2lucHV0cy9wbGF5ZXJfY29udHJvbC90aW1lbGluZVwiXHJcbmltcG9ydCBCdG5fdG1fcGxheSBmcm9tIFwiLi4vLi4vaW5wdXRzL3BsYXllcl9jb250cm9sL3RtX3BsYXlcIlxyXG5pbXBvcnQgQnRuX3ZvbHVtZSBmcm9tIFwiLi4vLi4vaW5wdXRzL3BsYXllcl9jb250cm9sL3ZvbHVtZVwiXHJcbmltcG9ydCBQbGF5YmFja19zcGVlZCBmcm9tIFwiLi4vLi4vaW5wdXRzL3BsYXllcl9jb250cm9sL3BsYXliYWNrX3NwZWVkXCJcclxuaW1wb3J0IHsgQnRuX3RtX2JhY2t3YXJkLCBCdG5fdG1fZm9yd2FyZCB9IGZyb20gXCIuLi8uLi9pbnB1dHMvcGxheWVyX2NvbnRyb2wvdG1fc3RlcHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFRyYWNrUGxheWluZ19wYW5lbCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcclxuICBjb25zdCBbYXVkaW8sIHNldF9BdWRpb10gPSB1c2VTdGF0ZShwcm9wcy5hdWRpbyk7XHJcbiAgY29uc3QgW3VwZGF0ZV9hdWRpb19pbiwgc2V0X191cGRhdGVfYXVkaW9dID0gdXNlU3RhdGUocHJvcHMudXBkYXRlX2F1ZGlvX2luKTtcclxuXHJcblxyXG5cclxuICBpZiAoIWF1ZGlvIHx8IHByb3BzLnVwZGF0ZV9hdWRpb19pbiAhPSB1cGRhdGVfYXVkaW9faW4pIHtcclxuICAgIGxldCByZWZfYXVkaW8gPSBuZXcgQXVkaW8ocHJvcHMuYXVkaW8uc3JjKTtcclxuICAgIHJlZl9hdWRpby5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcImxvYWRlZGRhdGFcIixcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHNldF9BdWRpbyhyZWZfYXVkaW8pO1xyXG4gICAgICAgIHNldF9fdXBkYXRlX2F1ZGlvKHByb3BzLnVwZGF0ZV9hdWRpb19pbilcclxuICAgICAgICByZWZfYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBhdWRpby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVmX2F1ZGlvID0gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGNvbnN0IFthdWRpb19zZXR0aW5ncywgc2V0X1NldHRpbmdzXSA9IHVzZVN0YXRlKHtcclxuICAgIHBsYXliYWNrUmF0ZTogMSxcclxuICAgIHZhbHVtZTogMC41LFxyXG4gICAgcGF1c2VkOiB0cnVlLFxyXG4gIH0pO1xyXG4gIGlmIChhdWRpbyBpbnN0YW5jZW9mIEF1ZGlvKSB7XHJcbiAgICBhdWRpby5wbGF5YmFja1JhdGUgPSBhdWRpb19zZXR0aW5ncy5wbGF5YmFja1JhdGU7XHJcbiAgICBhdWRpby52b2x1bWUgPSBhdWRpb19zZXR0aW5ncy52YWx1bWU7XHJcbiAgICBhdWRpb19zZXR0aW5ncy5wYXVzZWQgPyBhdWRpby5wYXVzZSgpIDogYXVkaW8ucGxheSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgcmVmPXtyZWZ9IGNsYXNzTmFtZT17cHJvcHMuZGVmYXVsdF9vcGVuZWQgPyBcInBhbmVsLXRyYWNrUGxheWluZyBvcGVuZWRcIiA6IFwicGFuZWwtdHJhY2tQbGF5aW5nXCJ9PlxyXG4gICAgICA8RGF0YV9wcmVsb2FkZXIgaXNfaGlkZGVuPXthdWRpbyBpbnN0YW5jZW9mIEF1ZGlvfS8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtdHJhY2tQbGF5aW5nX2hlYWRlclwiPlxyXG4gICAgICAgIDxCdG5cclxuICAgICAgICAgIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgIHNldF9TZXR0aW5ncyh7Li4uYXVkaW9fc2V0dGluZ3MsIHBhdXNlZDogdHJ1ZX0pXHJcbiAgICAgICAgICAgIHR5cGVvZihwcm9wcy5vbkNoYW5nZV9vcGVuZWQpID09IFwiZnVuY3Rpb25cIiA/IHByb3BzLm9uQ2hhbmdlX29wZW5lZChmYWxzZSkgOiBudWxsO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cImNsb3NlX29wZW5cIlxyXG4gICAgICAgICAgaWNvbj17PEljb25fYXJyb3dfZG93biAvPn1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtdHJhY2tQbGF5aW5nX2NvdmVyXCI+XHJcbiAgICAgICAge3Byb3BzLmNvdmVyICYmXHJcbiAgICAgICAgICA8aW1nIHNyYz17cHJvcHMuY292ZXIuc3JjfSBhbHQ9e3Byb3BzLmNvdmVyLmFsdH0vPlxyXG4gICAgICAgICAgfHxcclxuICAgICAgICAgIDxpbWcgc3JjPVwiI1wiIGFsdD1cIm5vdCBmb3VuZGVkXCIvPlxyXG4gICAgICAgIH1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8UGxheWVyX3RpbWVsaW5lIGF1ZGlvPXthdWRpb30vPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC10cmFja1BsYXlpbmdfdGV4dFwiPlxyXG4gICAgICAgIDxoMz57cHJvcHMubmFtZX08L2gzPlxyXG4gICAgICAgIDxoNj57cHJvcHMudGl0bGV9PC9oNj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLXRyYWNrUGxheWluZ19jb250cm9sXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC10cmFja1BsYXlpbmdfY29udHJvbF9saW5lXCI+XHJcbiAgICAgICAgICA8UGxheWJhY2tfc3BlZWRcclxuICAgICAgICAgICAgZGVmYXVsdD17YXVkaW9fc2V0dGluZ3MucGxheWJhY2tSYXRlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17dmFsdWU9PntcclxuICAgICAgICAgICAgICBzZXRfU2V0dGluZ3Moey4uLmF1ZGlvX3NldHRpbmdzLCBwbGF5YmFja1JhdGU6IHZhbHVlfSlcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcblxyXG5cclxuICAgICAgICAgIDxCdG5fdG1fYmFja3dhcmRcclxuICAgICAgICAgICAgb25DbGljaz17c3RlcD0+e1xyXG4gICAgICAgICAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gYXVkaW8uY3VycmVudFRpbWUgKyBzdGVwXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8QnRuX3RtX3BsYXlcclxuICAgICAgICAgIGFjdGl2ZT17YXVkaW9fc2V0dGluZ3MucGF1c2VkfVxyXG4gICAgICAgICAgb25DbGljaz17KHBhdXNlZCk9PntcclxuICAgICAgICAgICAgc2V0X1NldHRpbmdzKHsuLi5hdWRpb19zZXR0aW5ncywgcGF1c2VkOiBwYXVzZWR9KVxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLXRyYWNrUGxheWluZ19jb250cm9sX2xpbmVcIj5cclxuICAgICAgICAgIDxCdG5fdG1fZm9yd2FyZFxyXG4gICAgICAgICAgICBvbkNsaWNrPXtzdGVwPT57XHJcbiAgICAgICAgICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSBhdWRpby5jdXJyZW50VGltZSArIHN0ZXBcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8QnRuX3ZvbHVtZVxyXG4gICAgICAgICAgICBkZWZhdWx0PXthdWRpb19zZXR0aW5ncy52YWx1bWUgKiAxMDB9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt2YWx1ZT0+e1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAqIDAuMDEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRfU2V0dGluZ3Moey4uLmF1ZGlvX3NldHRpbmdzLCB2YWx1bWU6IDB9KVxyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgKiAwLjAxID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc2V0X1NldHRpbmdzKHsuLi5hdWRpb19zZXR0aW5ncywgdmFsdW1lOiAxfSlcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0X1NldHRpbmdzKHsuLi5hdWRpb19zZXR0aW5ncywgdmFsdW1lOiB2YWx1ZSAqIDAuMDF9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufSlcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuXHJcbmltcG9ydCB7IENTU1RyYW5zaXRpb24sIFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xyXG5cclxuXHJcbmltcG9ydCBCdG4gZnJvbSBcIi4uL2lucHV0cy9idXR0b25zL2J1dHRvblwiO1xyXG5pbXBvcnQge0ljb25fcmVzZXR9IGZyb20gXCIuLi9zdmdcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBBbGJ1bUhlYWRfcGFuZWwgfSBmcm9tIFwiLi4vcGFnZV9lbGVtZW50cy9wYW5lbC9hbGJ1bUhlYWRcIjtcclxuaW1wb3J0IFRyYWNrc19saXN0IGZyb20gXCIuLi9wYWdlX2VsZW1lbnRzL2xpc3RzL3RyYWNrc19saXN0XCI7XHJcbmltcG9ydCB7IFRyYWNrUGxheWluZ19wYW5lbCB9IGZyb20gXCIuLi9wYWdlX2VsZW1lbnRzL3BhbmVsL3RyYWNrUGxheWluZ1wiO1xyXG5pbXBvcnQge0RhdGFfcHJlbG9hZGVyfSBmcm9tIFwiLi4vcGFnZV9lbGVtZW50cy9wcmVsb2FkZXJzXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgbG9hZF90cmFjaywgbG9hZF9hbGJ1bSB9IGZyb20gJy4uLy4uL3JlZHV4L2FjdGlvbnMvbG9hZGVycydcclxuaW1wb3J0IHtjaGFuZ2VfcGF0aH0gZnJvbSAnLi4vLi4vcmVkdXgvYWN0aW9ucy9hbGwuanMnXHJcblxyXG5pbXBvcnQge2dldF90cmFja19wcmV2aWV3cywgZ2V0X2FjdGl2ZV90cmFjaywgZ2V0X2FjdGl2ZV90cmFja19pZH0gZnJvbSAnLi4vLi4vcmVkdXgvZ2V0ZXJzL3RyYWNrc19nZXRlcnMuanMnXHJcbmltcG9ydCB7Z2V0X2FjdGl2ZV9hbGJ1bX0gZnJvbSAnLi4vLi4vcmVkdXgvZ2V0ZXJzL2FsYnVtc19nZXRlcnMuanMnXHJcblxyXG5jbGFzcyBQYWdlX211c2ljTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMudHJhY2tzX2xpc3QgPSBSZWFjdC5jcmVhdGVSZWYoKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgIG9mZnNldDogMCxcclxuXHJcbiAgICAgIGFjdGl2ZV90cmFjazogMCxcclxuICAgICAgdXBkYXRlX3RyYWNrX2luOiB0cnVlLFxyXG5cclxuICAgICAgdHJhY2tzX2xpc3Rfb3BlbmVkOiBmYWxzZSxcclxuICAgICAgdHJhY2tQbGF5aW5nX3BhbmVsX29wZW5lZDogZmFsc2UsXHJcblxyXG4gICAgICByZWFkeTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmxvYWRfcmFuZG9tX2FsYnVtID0gbG9hZF9yYW5kb21fYWxidW0uYmluZCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgbGV0IHByb3BzID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bWFpbiBpZD1cInBhZ2VfbXVzaWNMaXN0XCIgcmVmPXt0aGlzLnBhZ2V9PlxyXG4gICAgICAgIDxoZWFkZXI+XHJcblxyXG4gICAgICAgICAgPEJ0blxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZXNldF9hbGJ1bVwiXHJcbiAgICAgICAgICAgIGljb249ezxJY29uX3Jlc2V0Lz59XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICB0aGlzLmxvYWRfcmFuZG9tX2FsYnVtKClcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcblxyXG4gICAgICAgIDxBbGJ1bUhlYWRfcGFuZWxcclxuICAgICAgICAgIGNvdmVyPXt7XHJcbiAgICAgICAgICAgIHNyYzogcHJvcHMuYWxidW0uY292ZXIuc3JjLFxyXG4gICAgICAgICAgICBhbHQ6IHByb3BzLmFsYnVtLmNvdmVyLmFsdFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIG5hbWU9e3Byb3BzLmFsYnVtLm5hbWV9XHJcbiAgICAgICAgICBhdXRob3I9e3Byb3BzLmFsYnVtLmF1dGhvcn1cclxuICAgICAgICAgIGRlc2M9e3Byb3BzLmFsYnVtLmRlc2N9XHJcbiAgICAgICAgICBocmVmPXtwcm9wcy5hbGJ1bS5ocmVmfVxyXG5cclxuICAgICAgICAgIG1pbmlfdmVyPXt0aGlzLnN0YXRlLnRyYWNrc19saXN0X29wZW5lZCA/IHRydWUgOiBmYWxzZX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8VHJhY2tzX2xpc3RcclxuXHJcbiAgICAgICAgICBkZWZhdWx0X29wZW5lZD17dGhpcy5zdGF0ZS50cmFja3NfbGlzdF9vcGVuZWR9XHJcbiAgICAgICAgICBvbkNoYW5nZV9vcGVuZWQ9eyhvcGVuZWQpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYWNrc19saXN0X29wZW5lZDogb3BlbmVkfSlcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICBvblNlbGVjdD17KGluZGV4KT0+e1xyXG4gICAgICAgICAgICBjaGFuZ2VfcGF0aCh7XHJcbiAgICAgICAgICAgICAgdHJhY2s6IHByb3BzLnRyYWNrc1tpbmRleF0uaWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgdHJhY2tQbGF5aW5nX3BhbmVsX29wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBhY3RpdmVfdHJhY2s6IGluZGV4LFxyXG4gICAgICAgICAgICAgIHVwZGF0ZV90cmFja19pbjogIXRoaXMuc3RhdGUudXBkYXRlX3RyYWNrX2luXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgaXRlbXM9e3Byb3BzLnRyYWNrc31cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8VHJhY2tQbGF5aW5nX3BhbmVsXHJcbiAgICAgICAgICB1cGRhdGVfYXVkaW9faW49e3RoaXMuc3RhdGUudXBkYXRlX3RyYWNrX2lufVxyXG4gICAgICAgICAgZGVmYXVsdF9vcGVuZWQ9e3RoaXMuc3RhdGUudHJhY2tQbGF5aW5nX3BhbmVsX29wZW5lZH1cclxuICAgICAgICAgIG9uQ2hhbmdlX29wZW5lZD17KG9wZW5lZCk9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhY2tQbGF5aW5nX3BhbmVsX29wZW5lZDogb3BlbmVkfSlcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICBjb3Zlcj17e1xyXG4gICAgICAgICAgICBzcmM6IHByb3BzLmFjdGl2ZV90cmFjay5jb3Zlci5zcmMsXHJcbiAgICAgICAgICAgIGFsdDogcHJvcHMuYWN0aXZlX3RyYWNrLmNvdmVyLmFsdFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIG5hbWU9e3Byb3BzLmFjdGl2ZV90cmFjay5uYW1lfVxyXG4gICAgICAgICAgdGl0bGU9e3Byb3BzLmFjdGl2ZV90cmFjay50aXRsZX1cclxuICAgICAgICAgIHRpbWVQb2ludD17MH1cclxuICAgICAgICAgIGF1ZGlvPXt7XHJcbiAgICAgICAgICAgIHNyYzogcHJvcHMuYWN0aXZlX3RyYWNrLmF1ZGlvLnNyYyxcclxuICAgICAgICAgICAgdHlwZTogcHJvcHMuYWN0aXZlX3RyYWNrLmF1ZGlvLnR5cGVcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPERhdGFfcHJlbG9hZGVyIGlzX2hpZGRlbj17dGhpcy5zdGF0ZS5yZWFkeX0vPlxyXG5cclxuICAgICAgPC9tYWluPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCByZXR1cm5fZGF0YSA9IHN0YXRlID0+IHtcclxuICBsZXQgYWxidW0gPSBnZXRfYWN0aXZlX2FsYnVtKHN0YXRlKSwgdHJhY2tzID0gZ2V0X3RyYWNrX3ByZXZpZXdzKHN0YXRlKSwgYWN0aXZlX3RyYWNrID0gZ2V0X2FjdGl2ZV90cmFjayhzdGF0ZSk7XHJcbiAgaWYgKGFjdGl2ZV90cmFjay5pc19udWxsT0JKKSB7XHJcbiAgICBsb2FkX3RyYWNrKGdldF9hY3RpdmVfdHJhY2tfaWQoc3RhdGUpKVxyXG4gIH1cclxuXHJcblxyXG4gIHJldHVybiB7IGFsYnVtLCB0cmFja3MsIGFjdGl2ZV90cmFjayB9O1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHJldHVybl9kYXRhKShQYWdlX211c2ljTGlzdCk7XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBsb2FkX3JhbmRvbV9hbGJ1bSgpIHtcclxuICBsZXQgaWQgPSByYW5kb21OdW1iZXIoMTAxNjIwMDAwLCAxMDE2MjU1NTIpOy8vZm9yIGNoZWNrIHVzZSBpZDogMTAxNjI1NTUyXHJcbiAgdGhpcy5zZXRTdGF0ZSh7cmVhZHk6IGZhbHNlfSlcclxuICBsb2FkX2FsYnVtKGlkKS50aGVuKCgpPT57XHJcbiAgICBjaGFuZ2VfcGF0aCh7XHJcbiAgICAgIGFsYnVtOiBpZCxcclxuICAgIH0pXHJcbiAgICB0aGlzLnNldFN0YXRlKHtyZWFkeTogdHJ1ZX0pXHJcbiAgfSkuY2F0Y2goY29kZT0+e1xyXG4gICAgdGhpcy5sb2FkX3JhbmRvbV9hbGJ1bSgpXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9tTnVtYmVyKG1pbiwgbWF4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbiApXHJcbn1cclxuIiwibGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbi8vQXJyb3dzXHJcbmV4cG9ydCBmdW5jdGlvbiBJY29uX2Fycm93X3JpZ2h0KHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmcgY2xhc3NOYW1lPVwiaWNvbi1hcnJvdy1yaWdodFwiIHZpZXdCb3g9XCIwIDAgMzIgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgPHBhdGggc3R5bGU9e3tzdHJva2U6IFwidmFyKC0tY29sb3JfMSlcIn19IGQ9XCJNMjUgMTUuNzVDMjUgMTUuNzUgMjMuMDE3NyAxNi43ODkgMjEuOTA5MSAxNy42ODE4QzIwLjkxMiAxOC40ODQ5IDE5LjU5MDkgMjAgMTkuNTkwOSAyME0yNSAxNS43NUMyNSAxNS43NSAyMy4wMTc3IDE0LjcxMSAyMS45MDkxIDEzLjgxODJDMjAuOTEyIDEzLjAxNTEgMTkuNTkwOSAxMS41IDE5LjU5MDkgMTEuNU0yNSAxNS43NUw2LjQ1NDU1IDE1Ljc1XCIgc3Ryb2tlV2lkdGg9XCIxLjU0NTQ1XCIvPlxyXG4gICAgPC9zdmc+XHJcbiAgKVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBJY29uX2Fycm93X2Rvd24ocHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9XCJpY29uLWFycm93LWRvd25cIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgIDxwYXRoIHN0eWxlPXt7ZmlsbDogXCJ2YXIoLS1jb2xvcl8xKVwifX0gZmlsbFJ1bGU9XCJldmVub2RkXCIgY2xpcFJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMi4zMzI1IDExLjg5ODhDMTIuOTk1IDEyLjUyNzggMTMuODMxNyAxMy4zNjE3IDE0LjQyODIgMTQuMTAyM0MxNS4wNzA2IDE0Ljg5OTkgMTUuNzQxOSAxNS45NzExIDE2LjI1IDE2LjgzNDNDMTYuNzU4MSAxNS45NzExIDE3LjQyOTMgMTQuODk5OSAxOC4wNzE4IDE0LjEwMjNDMTguNjY4MyAxMy4zNjE3IDE5LjUwNDkgMTIuNTI3OCAyMC4xNjc1IDExLjg5ODhDMjAuNTAzNiAxMS41Nzk3IDIwLjgwNDIgMTEuMzA0NiAyMS4wMjEgMTEuMTA5QzIxLjEyOTYgMTEuMDExMSAyMS4yMTczIDEwLjkzMyAyMS4yNzg0IDEwLjg3ODlMMjEuMzQ5MyAxMC44MTYzTDIxLjM2ODQgMTAuNzk5NkwyMS4zNzUxIDEwLjc5MzhDMjEuMzc1MSAxMC43OTM4IDIxLjM3NTggMTAuNzkzMSAyMi4wNzE0IDExLjU5MDlDMjIuNzY3IDEyLjM4ODcgMjIuNzY3MSAxMi4zODg2IDIyLjc2NzEgMTIuMzg4NkwyMi43NjI0IDEyLjM5MjdMMjIuNzQ2MyAxMi40MDY4TDIyLjY4MTcgMTIuNDYzOEMyMi42MjUgMTIuNTE0IDIyLjU0MjEgMTIuNTg3OCAyMi40Mzg5IDEyLjY4MUMyMi4yMzIyIDEyLjg2NzQgMjEuOTQ1MiAxMy4xMyAyMS42MjUgMTMuNDM0QzIwLjk3NDkgMTQuMDUxMiAyMC4yMjM5IDE0LjgwNSAxOS43MjA0IDE1LjQzMDFDMTkuMTYwNyAxNi4xMjUxIDE4LjUzMTYgMTcuMTI2OSAxOC4wMjc4IDE3Ljk4NzRDMTcuNzc5NiAxOC40MTEyIDE3LjU2ODUgMTguNzg5MSAxNy40MTk2IDE5LjA2MDdDMTcuMzQ1MiAxOS4xOTY0IDE3LjI4NjYgMTkuMzA1MiAxNy4yNDY4IDE5LjM3OTZMMTcuMjAxOCAxOS40NjQzTDE3LjE5MDYgMTkuNDg1NEwxNy4xODc1IDE5LjQ5MTNMMTYuMjUgMjEuMjgwMUwxNS4zMTI1IDE5LjQ5MTRMMTUuMzA5MyAxOS40ODU0TDE1LjI5ODIgMTkuNDY0M0wxNS4yNTMxIDE5LjM3OTZDMTUuMjEzNCAxOS4zMDUyIDE1LjE1NDcgMTkuMTk2NCAxNS4wODAzIDE5LjA2MDdDMTQuOTMxNCAxOC43ODkxIDE0LjcyMDMgMTguNDExMiAxNC40NzIyIDE3Ljk4NzRDMTMuOTY4MyAxNy4xMjY5IDEzLjMzOTMgMTYuMTI1MSAxMi43Nzk1IDE1LjQzMDFDMTIuMjc2IDE0LjgwNSAxMS41MjUxIDE0LjA1MTIgMTAuODc0OSAxMy40MzRDMTAuNTU0NyAxMy4xMyAxMC4yNjc4IDEyLjg2NzQgMTAuMDYxMSAxMi42ODFDOS45NTc4NiAxMi41ODc4IDkuODc0OTMgMTIuNTE0IDkuODE4MjEgMTIuNDYzOEw5Ljc1MzYyIDEyLjQwNjhMOS43Mzc1MSAxMi4zOTI3TDkuNzMyOTcgMTIuMzg4N0M5LjczMjk3IDEyLjM4ODcgOS43MzI5NCAxMi4zODg3IDEwLjQyODUgMTEuNTkwOUMxMS4xMjQxIDEwLjc5MzEgMTEuMTI0MyAxMC43OTMyIDExLjEyNDMgMTAuNzkzMkwxMS4xMzE2IDEwLjc5OTZMMTEuMTUwNiAxMC44MTYzTDExLjIyMTUgMTAuODc4OUMxMS4yODI2IDEwLjkzMyAxMS4zNzA0IDExLjAxMTEgMTEuNDc4OSAxMS4xMDlDMTEuNjk1NyAxMS4zMDQ2IDExLjk5NjMgMTEuNTc5NyAxMi4zMzI1IDExLjg5ODhaXCIvPlxyXG4gICAgPC9zdmc+XHJcblxyXG4gIClcclxufVxyXG5cclxuXHJcbi8vdHJpYW5nbGVzXHJcbmV4cG9ydCBmdW5jdGlvbiBJY29uX3RyaWFuZ2xlX3JpZ2h0KHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmcgY2xhc3NOYW1lPVwiaWNvbi10cmlhbmdsZS1yaWdodFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgPHBhdGggc3R5bGU9e3tmaWxsOiBcInZhcigtLWNvbG9yXzEpXCIsIHN0cm9rZTogXCJ2YXIoLS1jb2xvcl8yKVwifX0gZD1cIk03IDE4LjAwMzhWNS45OTYxN0wxNy4wMDYzIDEyTDcgMTguMDAzOFpcIiBzdHJva2VXaWR0aD1cIjJcIi8+XHJcbiAgICA8L3N2Zz5cclxuXHJcbiAgKVxyXG59XHJcblxyXG5cclxuXHJcbi8vYXVkaW8gY29udHJvbFxyXG5leHBvcnQgZnVuY3Rpb24gSWNvbl9mb3J3YXJkKHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmcgY2xhc3NOYW1lPVwiaWNvbi1mb3J3YXJkXCIgdmlld0JveD1cIjAgMCAzMiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICA8cGF0aCBzdHlsZT17e3N0cm9rZTogXCJ2YXIoLS1jb2xvcl8xKVwifX0gZD1cIk0xNC41OTA5IDIuOEMxNC41OTA5IDIuOCAxNS45MTIgNC4zMTUxMSAxNi45MDkxIDUuMTE4MThDMTguMDE3NyA2LjAxMTA1IDIwIDcuMDUgMjAgNy4wNUMyMCA3LjA1IDE4LjAxNzcgOC4wODg5NiAxNi45MDkxIDguOTgxODJDMTUuOTEyIDkuNzg0OSAxNC41OTA5IDExLjMgMTQuNTkwOSAxMS4zXCIgc3Ryb2tlV2lkdGg9XCIxLjU0NTQ1XCIvPlxyXG5cclxuICAgICAgPHBhdGggc3R5bGU9e3tzdHJva2U6IFwidmFyKC0tY29sb3JfMSlcIn19IGQ9XCJNMTguNTg4MiA3LjM0MDc0QzE2LjU3IDYuNzk5OTYgMTQuNDMzIDYuOTA0OTQgMTIuNDc3NSA3LjY0MDk0QzEwLjUyMiA4LjM3Njk1IDguODQ2MTMgOS43MDcgNy42ODUzIDExLjQ0NDNDNi41MjQ0OCAxMy4xODE2IDUuOTM2OTkgMTUuMjM4OSA2LjAwNTM2IDE3LjMyNzJDNi4wNzM3MiAxOS40MTU1IDYuNzk0NSAyMS40MyA4LjA2NjQ3IDIzLjA4NzZDOS4zMzg0NCAyNC43NDUzIDExLjA5NzcgMjUuOTYyOSAxMy4wOTcyIDI2LjU2OTRDMTUuMDk2NiAyNy4xNzU5IDE3LjIzNTggMjcuMTQwOSAxOS4yMTQ0IDI2LjQ2OTNDMjEuMTkyOSAyNS43OTc3IDIyLjkxMTQgMjQuNTIzMiAyNC4xMjg1IDIyLjgyNDhDMjUuMzQ1NSAyMS4xMjY0IDI2IDE5LjA4OTQgMjYgMTdcIiBzdHJva2VXaWR0aD1cIjEuNTVcIi8+XHJcblxyXG4gICAgICA8cGF0aCBzdHlsZT17e2ZpbGw6IFwidmFyKC0tY29sb3JfMSlcIn19IGQ9XCJNMTEuNTkxMiAxOS4wMUwxMS41NDEyIDE4LjQ2TDEyLjg5MTIgMTguMjlWMTUuNUwxMi45NDEyIDE1LjMyTDEyLjUyMTIgMTUuNTJMMTEuNjcxMiAxNS42NkwxMS40NDEyIDE1LjE1TDEzLjY5MTIgMTQuMUgxNC42NDEyVjE4LjI5TDE1Ljk5MTIgMTguNDZMMTUuOTQxMiAxOS4wMUwxMy43OTEyIDE4Ljk4TDExLjU5MTIgMTkuMDFaTTE4LjQ0NTUgMTkuMTVDMTcuNzU4OCAxOS4xNSAxNy4xODU1IDE4LjkyIDE2LjcyNTUgMTguNDZDMTYuMjcyMiAxNy45OTMzIDE2LjA0NTUgMTcuMzc2NyAxNi4wNDU1IDE2LjYxQzE2LjA0NTUgMTUuODIzMyAxNi4zMTU1IDE1LjIyMzMgMTYuODU1NSAxNC44MUMxNy40MDIyIDE0LjM5NjcgMTguMTA1NSAxNC4xMjY3IDE4Ljk2NTUgMTRDMTkuNjUyMiAxNCAyMC4yMjIyIDE0LjIzIDIwLjY3NTUgMTQuNjlDMjEuMTI4OCAxNS4xNSAyMS4zNTU1IDE1Ljc2MzMgMjEuMzU1NSAxNi41M0MyMS4zNTU1IDE3Ljk4MzMgMjAuMzg1NSAxOC44NTY3IDE4LjQ0NTUgMTkuMTVaTTE4Ljc5NTUgMTguMzVDMTkuMzA4OCAxOC4zNSAxOS41NjU1IDE3LjkxIDE5LjU2NTUgMTcuMDNDMTkuNTY1NSAxNi4yOSAxOS40Njg4IDE1LjczMzMgMTkuMjc1NSAxNS4zNkMxOS4wODIyIDE0Ljk4NjcgMTguODU1NSAxNC44IDE4LjU5NTUgMTQuOEMxOC4wNzU1IDE0LjggMTcuODE1NSAxNS4yMzY3IDE3LjgxNTUgMTYuMTFDMTcuODE1NSAxNi44NSAxNy45MTIyIDE3LjQxIDE4LjEwNTUgMTcuNzlDMTguMzA1NSAxOC4xNjMzIDE4LjUzNTUgMTguMzUgMTguNzk1NSAxOC4zNVpcIi8+XHJcbiAgICA8L3N2Zz5cclxuICApXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIEljb25fYmFja3dhcmQocHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9XCJpY29uLWJhY2t3YXJkXCIgdmlld0JveD1cIjAgMCAzMiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICA8cGF0aCBzdHlsZT17e3N0cm9rZTogXCJ2YXIoLS1jb2xvcl8xKVwifX0gZD1cIk0xNy40MDkxIDIuOEMxNy40MDkxIDIuOCAxNi4wODggNC4zMTUxMSAxNS4wOTA5IDUuMTE4MThDMTMuOTgyMyA2LjAxMTA1IDEyIDcuMDUgMTIgNy4wNUMxMiA3LjA1IDEzLjk4MjMgOC4wODg5NiAxNS4wOTA5IDguOTgxODJDMTYuMDg4IDkuNzg0OSAxNy40MDkxIDExLjMgMTcuNDA5MSAxMS4zXCIgc3Ryb2tlV2lkdGg9XCIxLjU0NTQ1XCIvPlxyXG5cclxuICAgICAgPHBhdGggc3R5bGU9e3tzdHJva2U6IFwidmFyKC0tY29sb3JfMSlcIn19IGQ9XCJNMTMuNDExOCA3LjM0MDc0QzE1LjQzIDYuNzk5OTYgMTcuNTY3IDYuOTA0OTQgMTkuNTIyNSA3LjY0MDk0QzIxLjQ3OCA4LjM3Njk1IDIzLjE1MzkgOS43MDcgMjQuMzE0NyAxMS40NDQzQzI1LjQ3NTUgMTMuMTgxNiAyNi4wNjMgMTUuMjM4OSAyNS45OTQ2IDE3LjMyNzJDMjUuOTI2MyAxOS40MTU1IDI1LjIwNTUgMjEuNDMgMjMuOTMzNSAyMy4wODc2QzIyLjY2MTYgMjQuNzQ1MyAyMC45MDIzIDI1Ljk2MjkgMTguOTAyOCAyNi41Njk0QzE2LjkwMzQgMjcuMTc1OSAxNC43NjQyIDI3LjE0MDkgMTIuNzg1NiAyNi40NjkzQzEwLjgwNzEgMjUuNzk3NyA5LjA4ODU4IDI0LjUyMzIgNy44NzE1MyAyMi44MjQ4QzYuNjU0NDggMjEuMTI2NCA2IDE5LjA4OTQgNiAxN1wiIHN0cm9rZVdpZHRoPVwiMS41NVwiLz5cclxuXHJcbiAgICAgIDxwYXRoIHN0eWxlPXt7ZmlsbDogXCJ2YXIoLS1jb2xvcl8xKVwifX0gZD1cIk0xMS41OTEyIDE5LjAxTDExLjU0MTIgMTguNDZMMTIuODkxMiAxOC4yOVYxNS41TDEyLjk0MTIgMTUuMzJMMTIuNTIxMiAxNS41MkwxMS42NzEyIDE1LjY2TDExLjQ0MTIgMTUuMTVMMTMuNjkxMiAxNC4xSDE0LjY0MTJWMTguMjlMMTUuOTkxMiAxOC40NkwxNS45NDEyIDE5LjAxTDEzLjc5MTIgMTguOThMMTEuNTkxMiAxOS4wMVpNMTguNDQ1NSAxOS4xNUMxNy43NTg4IDE5LjE1IDE3LjE4NTUgMTguOTIgMTYuNzI1NSAxOC40NkMxNi4yNzIyIDE3Ljk5MzMgMTYuMDQ1NSAxNy4zNzY3IDE2LjA0NTUgMTYuNjFDMTYuMDQ1NSAxNS44MjMzIDE2LjMxNTUgMTUuMjIzMyAxNi44NTU1IDE0LjgxQzE3LjQwMjIgMTQuMzk2NyAxOC4xMDU1IDE0LjEyNjcgMTguOTY1NSAxNEMxOS42NTIyIDE0IDIwLjIyMjIgMTQuMjMgMjAuNjc1NSAxNC42OUMyMS4xMjg4IDE1LjE1IDIxLjM1NTUgMTUuNzYzMyAyMS4zNTU1IDE2LjUzQzIxLjM1NTUgMTcuOTgzMyAyMC4zODU1IDE4Ljg1NjcgMTguNDQ1NSAxOS4xNVpNMTguNzk1NSAxOC4zNUMxOS4zMDg4IDE4LjM1IDE5LjU2NTUgMTcuOTEgMTkuNTY1NSAxNy4wM0MxOS41NjU1IDE2LjI5IDE5LjQ2ODggMTUuNzMzMyAxOS4yNzU1IDE1LjM2QzE5LjA4MjIgMTQuOTg2NyAxOC44NTU1IDE0LjggMTguNTk1NSAxNC44QzE4LjA3NTUgMTQuOCAxNy44MTU1IDE1LjIzNjcgMTcuODE1NSAxNi4xMUMxNy44MTU1IDE2Ljg1IDE3LjkxMjIgMTcuNDEgMTguMTA1NSAxNy43OUMxOC4zMDU1IDE4LjE2MzMgMTguNTM1NSAxOC4zNSAxOC43OTU1IDE4LjM1WlwiLz5cclxuICAgIDwvc3ZnPlxyXG4gIClcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gSWNvbl92b2x1bWUocHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9XCJpY29uLXZvbHVtZVwiIHZpZXdCb3g9XCIwIDAgMzIgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgPHBhdGggc3R5bGU9e3tmaWxsOiBcInZhcigtLWNvbG9yXzEpXCJ9fSBmaWxsUnVsZT1cImV2ZW5vZGRcIiBjbGlwUnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIzLjAwNDMgOC4wMTE5OEMyMi44NDg0IDguMDA0MDMgMjIuNjkxNCA4IDIyLjUzMzMgOEMyMi4zNzUzIDggMjIuMjE4MyA4LjAwNDAzIDIyLjA2MjQgOC4wMTE5OEgyMy4wMDQzWk0yMSA4LjEyODhDMTguMDk0MyA4LjYyMzA1IDE1LjcwMTEgMTAuNDk2NyAxNC42MjAzIDEzSDEwQzkuNDQ3NzIgMTMgOSAxMy40NDc3IDkgMTRWMThDOSAxOC41NTIzIDkuNDQ3NzIgMTkgMTAgMTlIMTQuNjIwM0MxNS43MDExIDIxLjUwMzMgMTguMDk0MyAyMy4zNzY5IDIxIDIzLjg3MTJWOC4xMjg4WlwiIGZpbGw9XCIjOTZBMUEzXCIvPlxyXG4gICAgICA8cmVjdCBzdHlsZT17e2ZpbGw6IFwidmFyKC0tY29sb3JfMSlcIn19IHg9XCIyMlwiIHk9XCIxM1wiIHdpZHRoPVwiMVwiIGhlaWdodD1cIjZcIiByeD1cIjAuNVwiLz5cclxuICAgICAgPHJlY3Qgc3R5bGU9e3tmaWxsOiBcInZhcigtLWNvbG9yXzEpXCJ9fSB4PVwiMjRcIiB5PVwiMTFcIiB3aWR0aD1cIjFcIiBoZWlnaHQ9XCIxMFwiIHJ4PVwiMC41XCIvPlxyXG4gICAgICA8cmVjdCBzdHlsZT17e2ZpbGw6IFwidmFyKC0tY29sb3JfMSlcIn19IHg9XCIyNlwiIHk9XCIxMFwiIHdpZHRoPVwiMVwiIGhlaWdodD1cIjEyXCIgcng9XCIwLjVcIi8+XHJcbiAgICA8L3N2Zz5cclxuXHJcbiAgKVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBJY29uX3Jlc2V0KHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmcgY2xhc3NOYW1lPVwiaWNvbi1yZXNldFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICA8cGF0aCBzdHlsZT17e2ZpbGw6IFwidmFyKC0tY29sb3JfMSlcIn19IGZpbGxSdWxlPVwiZXZlbm9kZFwiIGNsaXBSdWxlPVwiZXZlbm9kZFwiIGQ9XCJNNTAgODRDNjguNzc3NyA4NCA4NCA2OC43Nzc3IDg0IDUwQzg0IDQ3Ljk1MjcgODMuODE5IDQ1Ljk0NzcgODMuNDcyMyA0NEg5NS42MTIyQzk1Ljg2OCA0NS45NjM4IDk2IDQ3Ljk2NjUgOTYgNTBDOTYgNzUuNDA1MSA3NS40MDUxIDk2IDUwIDk2QzM2LjAyNDggOTYgMjMuNTA1MiA4OS43Njc5IDE1LjA2ODcgNzkuOTMxM0w2IDg5VjYySDMzTDIzLjU4NzkgNzEuNDEyMUMyOS44MjE3IDc5LjA5MiAzOS4zMzc3IDg0IDUwIDg0Wk04NC45MzEzIDIwLjA2ODdMOTQgMTFWMzhINjdMNzYuNDEyMSAyOC41ODc5QzcwLjE3ODMgMjAuOTA3OSA2MC42NjIzIDE2IDUwIDE2QzMxLjIyMjMgMTYgMTYgMzEuMjIyMyAxNiA1MEMxNiA1Mi4wNDczIDE2LjE4MSA1NC4wNTIzIDE2LjUyNzcgNTZINC4zODc3NkM0LjEzMTk1IDU0LjAzNjIgNCA1Mi4wMzM1IDQgNTBDNCAyNC41OTQ5IDI0LjU5NDkgNCA1MCA0QzYzLjk3NTIgNCA3Ni40OTQ4IDEwLjIzMjEgODQuOTMxMyAyMC4wNjg3WlwiLz5cclxuICAgIDwvc3ZnPlxyXG4gIClcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9