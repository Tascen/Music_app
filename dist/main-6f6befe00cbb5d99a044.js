/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "./" + ({}[chunkId]||chunkId) + "-" + {"0":"0552e77c3a0eb4a68755","1":"645d99d7ffadbe5388b4"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/gen.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/gen.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../images/img_404.png */ "./src/images/img_404.png");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Overpass:wght@300;400;700;900&display=swap);"]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Overpass:wght@300;400;700;900&display=swap);"]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Overpass:wght@300;400;700;900&display=swap);"]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Overpass:wght@300;400;700;900&display=swap);"]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Overpass:wght@300;400;700;900&display=swap);"]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Overpass:wght@300;400;700;900&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
// Module
exports.push([module.i, ":root {\n  color: var(--color_topography_1); }\n\n*::selection {\n  background: var(--color_topography_warn);\n  color: var(--color_topography_1); }\n\nh3 {\n  font-family: GT Sectra Display;\n  font-size: 28px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 36px;\n  --line-height: 36px;\n  letter-spacing: 0em; }\n\nh4 {\n  font-family: GT Sectra Display;\n  font-size: 20px;\n  font-style: italic;\n  font-weight: 700;\n  line-height: 24px;\n  --line-height: 24px;\n  letter-spacing: 0em; }\n\nh6 {\n  font-family: GT Sectra Display;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 22px;\n  --line-height: 22px;\n  letter-spacing: 0em; }\n\np, a {\n  font-family: GT Sectra Display;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n  --line-height: 20px;\n  letter-spacing: 0em;\n  text-decoration: none; }\n\n*[class|=\"icon\"], .icon {\n  --color_1: var(--color_topography_1);\n  --color_2: var(--color_topography_2);\n  --transition: all .25s ease; }\n  *[class|=\"icon\"] svg *, .icon svg * {\n    transition: var(--transition); }\n\n.icon-reset {\n  width: 20px;\n  height: 20px; }\n\n*[class*=\"icon-arrow\"] {\n  --size: 32px;\n  width: var(--size);\n  height: var(--size);\n  vertical-align: middle; }\n\n*[class*=\"icon-triangle\"] {\n  --size: 32px;\n  width: var(--size);\n  height: var(--size);\n  vertical-align: middle; }\n\n.icon-backward, .icon-forward, .icon-volume {\n  --size: 32px;\n  width: var(--size);\n  height: var(--size); }\n\n*[class|=\"btn\"], *[class*=\"btn\"], .btn {\n  cursor: pointer;\n  background: transparent;\n  outline: none;\n  border: none;\n  font-family: GT Sectra Fine;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: 24px;\n  --line-height: 24px;\n  letter-spacing: 0em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  user-select: none; }\n\n.btn.play {\n  transition: all .25s ease; }\n  .btn.play:active {\n    transform: scale(0.95); }\n\n.btn-link {\n  display: inline-block;\n  padding: 8px 16px;\n  border-radius: 4px;\n  background: var(--color_topography_warn);\n  text-decoration: revert;\n  color: var(--color_topography_1_shade);\n  transition: all .25s ease; }\n  .btn-link *[class*=\"icon-arrow\"] {\n    --size: 1.778em;\n    margin: -0.389em -0.1945em -0.389em 0;\n    --color_1: var(--color_topography_1_shade); }\n  .btn-link *[class*=\"icon-arrow\"] {\n    --transition: all .25s ease; }\n  .btn-link:hover {\n    transform: translateY(-2px);\n    box-shadow: -1px 5px 3px -2px #00000047; }\n  .btn-link:active {\n    transform: scale(0.95); }\n    .btn-link:active *[class*=\"icon-arrow\"] {\n      --size: 1.82em; }\n\n.btn.copy_link {\n  display: inline-block;\n  padding: 6px 14px;\n  border-radius: 4px;\n  border: solid 2px var(--color_topography_warn);\n  background: transparent;\n  color: var(--color_topography_warn);\n  transition: all .25s ease; }\n  .btn.copy_link > span {\n    transition: inherit; }\n  .btn.copy_link:hover {\n    background: var(--color_topography_warn);\n    color: var(--color_topography_2); }\n  .btn.copy_link:active {\n    transform: scale(0.95); }\n\n.input-list {\n  display: grid;\n  position: relative; }\n  .input-list .input-list_items {\n    list-style: none;\n    overflow: hidden;\n    max-height: calc((1.62em + 8px * 2) * 5);\n    transition: max-height 0.4s ease-in-out;\n    position: absolute;\n    z-index: 1000;\n    background: var(--color_background);\n    top: -5px;\n    transform: translateY(-100%);\n    border-radius: 4px;\n    box-shadow: 0 0 20px 0px #00000030; }\n    .input-list .input-list_items > li {\n      font-family: GT Sectra Display;\n      font-size: 14px;\n      font-style: italic;\n      font-weight: 500;\n      line-height: 16px;\n      --line-height: 16px;\n      letter-spacing: 0em;\n      color: var(--color_topography_1);\n      cursor: pointer;\n      padding: 4px 6px; }\n    .input-list .input-list_items.closed {\n      max-height: 0; }\n      .input-list .input-list_items.closed ~ .input-list_head .btn {\n        transform: rotate(90deg); }\n  .input-list .input-list_head {\n    background: var(--color_topography_warn);\n    padding: 4px 6px;\n    border-radius: 4px;\n    grid-row: 1/2;\n    display: grid;\n    grid-template-columns: 1fr auto;\n    grid-template-rows: auto 1fr;\n    align-items: center; }\n    .input-list .input-list_head .input-list_selected_item {\n      cursor: pointer;\n      font-family: GT Sectra Display;\n      font-size: 14px;\n      font-style: italic;\n      font-weight: 500;\n      line-height: 16px;\n      --line-height: 16px;\n      letter-spacing: 0em;\n      color: var(--color_topography_2);\n      grid-column: 1/2;\n      grid-row: 2/3; }\n\n.btn-tm-volume {\n  display: grid;\n  justify-items: center;\n  align-items: flex-start;\n  position: relative;\n  transition: all .25s ease; }\n  .btn-tm-volume *[class|=\"icon\"], .btn-tm-volume .icon {\n    --color_1: var(--color_topography_2_shade); }\n  .btn-tm-volume .btn-tm-volume_bar {\n    grid-column: 1/3;\n    position: absolute;\n    transform: translateY(-100%);\n    width: 12px;\n    height: 60px;\n    max-height: 60px;\n    transition: max-height .25s ease; }\n    .btn-tm-volume .btn-tm-volume_bar::before {\n      content: '';\n      display: block;\n      height: inherit;\n      max-height: inherit;\n      width: 2px;\n      margin: 0 5px;\n      background: var(--color_topography_lurking_tr);\n      position: absolute;\n      top: 100%;\n      transform: translateY(-100%); }\n    .btn-tm-volume .btn-tm-volume_bar::after {\n      content: '';\n      display: block;\n      height: inherit;\n      max-height: inherit;\n      width: 100%;\n      margin: 0 5px;\n      position: absolute;\n      top: 100%;\n      left: calc(-50% + 1px);\n      transform: translateY(-100%); }\n    .btn-tm-volume .btn-tm-volume_bar .btn-tm-volume_bar_value {\n      width: 2px;\n      height: calc(var(--value) / 100 * 100%);\n      max-height: inherit;\n      margin: 0 5px;\n      background: var(--color_topography_warn);\n      position: relative;\n      top: 100%;\n      transform: translateY(-100%); }\n      .btn-tm-volume .btn-tm-volume_bar .btn-tm-volume_bar_value::after {\n        content: '';\n        display: block;\n        width: 12px;\n        height: 7px;\n        max-height: 7px;\n        border-radius: 2px;\n        position: relative;\n        left: 50%;\n        top: 0;\n        transform: translate(-50%, -50%);\n        background: var(--color_topography_warn); }\n    .btn-tm-volume .btn-tm-volume_bar::before {\n      transition: max-height .25s ease; }\n    .btn-tm-volume .btn-tm-volume_bar .btn-tm-volume_bar_value {\n      transition: all .25s ease; }\n      .btn-tm-volume .btn-tm-volume_bar .btn-tm-volume_bar_value::after {\n        transition: all .25s .25s ease; }\n    .btn-tm-volume .btn-tm-volume_bar.closed {\n      transition: max-height .25s ease;\n      max-height: 0px; }\n      .btn-tm-volume .btn-tm-volume_bar.closed .btn-tm-volume_bar_value::after {\n        transition: transform .25s ease, visibility 0s .25s;\n        transform: translate(-50%, -50%) scale(0.2);\n        visibility: hidden; }\n  .btn-tm-volume:hover *[class|=\"icon\"], .btn-tm-volume:hover .icon {\n    --color_1: var(--color_topography_warn); }\n  .btn-tm-volume:active {\n    transform: scale(0.95); }\n\n.btn-tm-volume {\n  display: grid;\n  justify-items: center;\n  align-items: flex-start;\n  position: relative;\n  transition: all .25s ease; }\n  .btn-tm-volume *[class|=\"icon\"], .btn-tm-volume .icon {\n    --color_1: var(--color_topography_2_shade); }\n  .btn-tm-volume .btn-tm-volume_bar {\n    grid-column: 1/3;\n    position: absolute;\n    transform: translateY(-100%);\n    width: 12px;\n    height: 60px;\n    max-height: 60px;\n    transition: max-height .25s ease; }\n    .btn-tm-volume .btn-tm-volume_bar::before {\n      content: '';\n      display: block;\n      height: inherit;\n      max-height: inherit;\n      width: 2px;\n      margin: 0 5px;\n      background: var(--color_topography_lurking_tr);\n      position: absolute;\n      top: 100%;\n      transform: translateY(-100%); }\n    .btn-tm-volume .btn-tm-volume_bar::after {\n      content: '';\n      display: block;\n      height: inherit;\n      max-height: inherit;\n      width: 100%;\n      margin: 0 5px;\n      position: absolute;\n      top: 100%;\n      left: calc(-50% + 1px);\n      transform: translateY(-100%); }\n    .btn-tm-volume .btn-tm-volume_bar .btn-tm-volume_bar_value {\n      width: 2px;\n      height: calc(var(--value) / 100 * 100%);\n      max-height: inherit;\n      margin: 0 5px;\n      background: var(--color_topography_warn);\n      position: relative;\n      top: 100%;\n      transform: translateY(-100%); }\n      .btn-tm-volume .btn-tm-volume_bar .btn-tm-volume_bar_value::after {\n        content: '';\n        display: block;\n        width: 12px;\n        height: 7px;\n        max-height: 7px;\n        border-radius: 2px;\n        position: relative;\n        left: 50%;\n        top: 0;\n        transform: translate(-50%, -50%);\n        background: var(--color_topography_warn); }\n    .btn-tm-volume .btn-tm-volume_bar::before {\n      transition: max-height .25s ease; }\n    .btn-tm-volume .btn-tm-volume_bar .btn-tm-volume_bar_value {\n      transition: all .25s ease; }\n      .btn-tm-volume .btn-tm-volume_bar .btn-tm-volume_bar_value::after {\n        transition: all .25s .25s ease; }\n    .btn-tm-volume .btn-tm-volume_bar.closed {\n      transition: max-height .25s ease;\n      max-height: 0px; }\n      .btn-tm-volume .btn-tm-volume_bar.closed .btn-tm-volume_bar_value::after {\n        transition: transform .25s ease, visibility 0s .25s;\n        transform: translate(-50%, -50%) scale(0.2);\n        visibility: hidden; }\n  .btn-tm-volume:hover *[class|=\"icon\"], .btn-tm-volume:hover .icon {\n    --color_1: var(--color_topography_warn); }\n  .btn-tm-volume:active {\n    transform: scale(0.95); }\n\n.btn.tm-backward, .btn.tm-forward, .btn-tm-speed {\n  display: inline-flex;\n  justify-content: center;\n  align-items: center; }\n\n.btn.tm-backward, .btn.tm-forward {\n  border-radius: 2px;\n  transition: all .25s ease; }\n  .btn.tm-backward *[class|=\"icon\"], .btn.tm-backward .icon, .btn.tm-forward *[class|=\"icon\"], .btn.tm-forward .icon {\n    --color_1: var(--color_topography_2_shade); }\n  .btn.tm-backward:hover *[class|=\"icon\"], .btn.tm-backward:hover .icon, .btn.tm-forward:hover *[class|=\"icon\"], .btn.tm-forward:hover .icon {\n    --color_1: var(--color_topography_warn); }\n  .btn.tm-backward:active, .btn.tm-forward:active {\n    transform: scale(0.95); }\n\n.btn-tm-play {\n  --size: 48px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: var(--size);\n  height: var(--size);\n  min-width: var(--size);\n  border-radius: 4px;\n  background: var(--color_topography_warn);\n  transition: all .25s ease; }\n  .btn-tm-play > span {\n    width: 50%;\n    height: 50%;\n    background: var(--color_topography_1);\n    clip-path: polygon(12.5% 0, 12.5% 100%, 37.5% 100%, 37.5% 0, 62.5% 0, 62.5% 100%, 87.5% 100%, 87.5% 0); }\n  .btn-tm-play:hover {\n    background: var(--color_topography_2); }\n  .btn-tm-play:active {\n    transform: scale(0.95); }\n  .btn-tm-play.active > span {\n    clip-path: polygon(12.5% 0, 12.5% 100%, 100% 50%); }\n\n.playerTimeline {\n  display: grid;\n  grid-template-columns: auto auto;\n  justify-content: space-between;\n  grid-gap: 4px 0; }\n  .playerTimeline .playerTimeline_progress_bar {\n    position: relative;\n    width: 100%;\n    height: 12px;\n    grid-column: 1/3;\n    cursor: pointer; }\n    .playerTimeline .playerTimeline_progress_bar::before {\n      content: \"\";\n      display: block;\n      position: absolute;\n      background: var(--color_topography_lurking_tr);\n      width: 100%;\n      top: 5px;\n      height: 2px;\n      grid-column: 1/3; }\n    .playerTimeline .playerTimeline_progress_bar .playerTimeline_progress_value {\n      width: calc(var(--value) / var(--max) * 100%);\n      height: 2px;\n      margin: 5px 0 0 0;\n      background: var(--color_topography_warn);\n      position: relative; }\n      .playerTimeline .playerTimeline_progress_bar .playerTimeline_progress_value::after {\n        content: '';\n        display: block;\n        width: 12px;\n        height: 12px;\n        position: relative;\n        background: var(--color_topography_warn);\n        left: 100%;\n        top: 50%;\n        transform: translate(-50%, -50%);\n        border-radius: 2px; }\n  .playerTimeline .playerTimeline_currentTime, .playerTimeline .playerTimeline_allTime {\n    color: var(--color_topography_lurking_shade); }\n\n.btn-theme_checkbox {\n  --size: 20px;\n  display: inline-flex;\n  justify-content: flex-start;\n  align-items: center;\n  height: var(--size);\n  width: calc(var(--size) * 2);\n  border-radius: 4px;\n  box-shadow: inset 0 0 6px 0px #00000073; }\n  .btn-theme_checkbox input[type=\"checkbox\"] {\n    display: none; }\n  .btn-theme_checkbox span {\n    display: block;\n    width: calc(var(--size) - var(--size) / 6 * 2);\n    height: calc(var(--size) - var(--size) / 6 * 2);\n    border: solid calc(var(--size) / 6) var(--color_topography_lurking_tr);\n    border-radius: 4px;\n    transform: translateX(0%);\n    background: var(--color_topography_lurking_tr); }\n  .btn-theme_checkbox span {\n    transition: all 0.5s cubic-bezier(0.55, -0.07, 0.52, 1.07); }\n  .btn-theme_checkbox input[type=\"checkbox\"]:checked ~ span {\n    transform: translateX(calc(100% + 2px));\n    border: solid calc(var(--size) / 6 + 1px) var(--color_topography_warn);\n    background: var(--color_topography_warn); }\n\n.item-track {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  grid-gap: 4px 0; }\n  .item-track::before {\n    counter-increment: item_number;\n    content: counter(item_number) \".\";\n    grid-column: 1/2;\n    grid-row: 1/3;\n    margin: 0 10px 0 0;\n    font-family: GT Sectra Display;\n    font-size: 18px;\n    font-style: normal;\n    font-weight: 500;\n    line-height: 22px;\n    --line-height: 22px;\n    letter-spacing: 0em;\n    color: var(--color_topography_lurking_shade); }\n  .item-track .item-track_name {\n    grid-column: 2/3;\n    grid-row: 1/2;\n    color: var(--color_topography_2); }\n  .item-track .item-track_miniInfo {\n    grid-column: 2/3;\n    grid-row: 2/3;\n    font-style: italic;\n    color: var(--color_topography_lurking); }\n  .item-track .btn.play {\n    grid-column: 3/4;\n    grid-row: 1/3;\n    margin: 0 0 0 10px; }\n    .item-track .btn.play *[class|=\"icon\"], .item-track .btn.play .icon {\n      --color_1: transparent;\n      --color_2: var(--color_topography_warn); }\n    .item-track .btn.play:hover *[class|=\"icon\"], .item-track .btn.play:hover .icon {\n      --color_1: var(--color_topography_warn);\n      --color_2: var(--color_topography_warn); }\n\n.panel-albumHead {\n  display: grid;\n  overflow: hidden; }\n  .panel-albumHead .panel-albumHead_cover {\n    position: relative;\n    width: 160px;\n    height: 160px;\n    border-radius: 8px;\n    margin: 0 0 24px 0;\n    overflow: hidden;\n    float: left; }\n    .panel-albumHead .panel-albumHead_cover > img, .panel-albumHead .panel-albumHead_cover > canvas {\n      width: 100%;\n      height: 100%;\n      object-fit: cover; }\n  .panel-albumHead .panel-albumHead_author {\n    color: var(--color_topography_warn); }\n  .panel-albumHead .panel-albumHead_desc {\n    margin: 16px 0; }\n  .panel-albumHead .panel-albumHead_title {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden; }\n    .panel-albumHead .panel-albumHead_title > * {\n      white-space: inherit;\n      text-overflow: inherit;\n      overflow: inherit; }\n  .panel-albumHead .panel-albumHead_line {\n    max-height: 100px; }\n    .panel-albumHead .panel-albumHead_line *[class|=\"btn\"], .panel-albumHead .panel-albumHead_line *[class*=\"btn\"], .panel-albumHead .panel-albumHead_line .btn {\n      margin: 8px; }\n      .panel-albumHead .panel-albumHead_line *[class|=\"btn\"]:nth-child(1), .panel-albumHead .panel-albumHead_line *[class*=\"btn\"]:nth-child(1), .panel-albumHead .panel-albumHead_line .btn:nth-child(1) {\n        margin-left: 0; }\n      .panel-albumHead .panel-albumHead_line *[class|=\"btn\"]:nth-last-child(1), .panel-albumHead .panel-albumHead_line *[class*=\"btn\"]:nth-last-child(1), .panel-albumHead .panel-albumHead_line .btn:nth-last-child(1) {\n        margin-right: 0; }\n\n.panel-albumHead .panel-albumHead_part-1 .panel-albumHead_cover {\n  transition: all 0.5s ease; }\n\n.panel-albumHead .panel-albumHead_part-1 .panel-albumHead_title {\n  transition: all 0.5s ease, display 0s 0.5s;\n  transform: translate(20px, -20px);\n  opacity: 0; }\n\n.panel-albumHead .panel-albumHead_part-2 {\n  transition: all 0.5s ease;\n  max-height: 250px; }\n  .panel-albumHead .panel-albumHead_part-2 > * {\n    transition: all 0.5s ease; }\n\n.panel-albumHead.mini_ver .panel-albumHead_part-1 .panel-albumHead_cover {\n  transition: all 0.5s ease;\n  width: 60px;\n  height: 60px;\n  margin: 0 16px 16px 0; }\n\n.panel-albumHead.mini_ver .panel-albumHead_part-1 .panel-albumHead_title {\n  transition: all 0.5s 0.5s ease, display 0s 0s;\n  transform: translate(0px, 0px);\n  opacity: 1; }\n\n.panel-albumHead.mini_ver .panel-albumHead_part-2 {\n  transition: all 0.5s ease;\n  max-height: 0px; }\n  .panel-albumHead.mini_ver .panel-albumHead_part-2 > * {\n    transition: all 0.5s ease;\n    transform: translateY(-20px);\n    opacity: 0; }\n\n.panel-trackPlaying {\n  width: var(--viewbox_width);\n  height: var(--viewbox_height);\n  max-height: 100%;\n  box-sizing: border-box;\n  padding: 10px 26px;\n  border-radius: 12px 12px 0 0;\n  background: var(--color_panel_background_1);\n  scroll-behavior: smooth;\n  overflow: scroll; }\n  .panel-trackPlaying::-webkit-scrollbar {\n    width: 0px; }\n  .panel-trackPlaying .btn.close_open {\n    margin: 0 0 16px 0;\n    transition: all .25s ease; }\n    .panel-trackPlaying .btn.close_open *[class|=\"icon\"], .panel-trackPlaying .btn.close_open .icon {\n      --color_1: var(--color_topography_2);\n      --size: 32px;\n      margin: 0 0 0 -9px; }\n    .panel-trackPlaying .btn.close_open:hover {\n      transform: translateY(-5px); }\n    .panel-trackPlaying .btn.close_open:active {\n      transform: translateY(-5px) scale(0.85); }\n  .panel-trackPlaying .panel-trackPlaying_cover {\n    position: relative;\n    width: calc(var(--viewbox_width) - 26px * 2);\n    max-width: 300px;\n    height: calc(var(--viewbox_width) - 26px * 2);\n    max-height: 300px;\n    border-radius: 8px;\n    margin: 0 auto 24px auto;\n    overflow: hidden; }\n    .panel-trackPlaying .panel-trackPlaying_cover > img, .panel-trackPlaying .panel-trackPlaying_cover > canvas {\n      width: 100%;\n      height: 100%;\n      object-fit: cover; }\n  .panel-trackPlaying .panel-trackPlaying_text {\n    margin: 24px 0;\n    text-align: center;\n    color: var(--color_topography_2); }\n    .panel-trackPlaying .panel-trackPlaying_text h4, .panel-trackPlaying .panel-trackPlaying_text h5, .panel-trackPlaying .panel-trackPlaying_text h6 {\n      color: var(--color_topography_lurking); }\n  .panel-trackPlaying .panel-trackPlaying_control {\n    display: grid;\n    grid-template-columns: calc(50% - 24px) 48px auto; }\n    .panel-trackPlaying .panel-trackPlaying_control .panel-trackPlaying_control_line > * {\n      margin: 0 12px; }\n    .panel-trackPlaying .panel-trackPlaying_control .btn-tm-play {\n      --size: 48px; }\n    .panel-trackPlaying .panel-trackPlaying_control > .panel-trackPlaying_control_line {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      width: 100%; }\n  .panel-trackPlaying .loader_panel {\n    background: var(--color_panel_background_1); }\n    .panel-trackPlaying .loader_panel *[class|=\"loader\"] {\n      --color: var(--color_background); }\n    .panel-trackPlaying .loader_panel:not(.is_hidden) ~ * {\n      display: none; }\n\n.list-tracks {\n  width: 100%;\n  max-height: 100%;\n  padding: 10px 0;\n  border-radius: 12px 12px 0 0;\n  background: var(--color_panel_background_1);\n  scroll-behavior: smooth;\n  overflow: scroll; }\n  .list-tracks::-webkit-scrollbar {\n    width: 0px; }\n  .list-tracks .list-tracks_items {\n    counter-reset: item_number; }\n    .list-tracks .list-tracks_items .item-track {\n      margin: 12px 18px; }\n  .list-tracks .btn.close_open {\n    display: flex;\n    justify-content: center;\n    position: relative;\n    left: calc(50% - 90px);\n    height: 10px;\n    width: 180px;\n    margin: -10px 0 0 0;\n    border-radius: 0 0 12px 12px;\n    padding: 10px 0 8px 0; }\n    .list-tracks .btn.close_open > span {\n      display: block;\n      width: 16px;\n      height: 2px;\n      background: var(--color_topography_lurking); }\n    .list-tracks .btn.close_open.is_hidden {\n      display: none; }\n  .list-tracks .list-tracks_header {\n    display: block;\n    width: 100%;\n    height: 18px;\n    margin: -10px 0 0 0;\n    overflow: hidden; }\n    .list-tracks .list-tracks_header .btn.close_open {\n      margin: 18px 0 -18px 0;\n      transform: translateY(-100%);\n      transition: transform .25s ease; }\n      .list-tracks .list-tracks_header .btn.close_open > span {\n        transition: all .25s ease; }\n      .list-tracks .list-tracks_header .btn.close_open:active {\n        transform: translateY(-110%); }\n    .list-tracks .list-tracks_header.fixed {\n      position: absolute; }\n      .list-tracks .list-tracks_header.fixed .btn.close_open {\n        margin: 0;\n        transform: translateY(0%);\n        background: var(--color_topography_warn); }\n        .list-tracks .list-tracks_header.fixed .btn.close_open > span {\n          background: var(--color_topography_1); }\n        .list-tracks .list-tracks_header.fixed .btn.close_open:active {\n          transform: translateY(-10%); }\n    .list-tracks .list-tracks_header.is_hidden {\n      display: none; }\n\n.list-tracks.opened .btn.close_open:hover > span:nth-child(1) {\n  transform: rotate(25deg) translate(0%, -100%); }\n\n.list-tracks.opened .btn.close_open:hover > span:nth-child(2) {\n  transform: rotate(-25deg) translate(0%, -100%); }\n\n.list-tracks:not(.opened) .btn.close_open:hover > span:nth-child(1), .list-tracks.opened .list-tracks_header.fixed .btn.close_open:hover > span:nth-child(1) {\n  transform: rotate(-25deg) translate(10%, -60%); }\n\n.list-tracks:not(.opened) .btn.close_open:hover > span:nth-child(2), .list-tracks.opened .list-tracks_header.fixed .btn.close_open:hover > span:nth-child(2) {\n  transform: rotate(25deg) translate(-10%, -60%); }\n\n.loader_panel {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 99999;\n  background: var(--color_background);\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.loader_panel {\n  visibility: visible;\n  opacity: 1;\n  border-radius: 4px;\n  transition: all 0.5s, visibility 0s 0s; }\n  .loader_panel.is_hidden {\n    visibility: hidden;\n    opacity: 0;\n    border-radius: 0px;\n    transition: all 0.5s 1s, border-radius 0.3s 1.2s, visibility 0s 1.5s; }\n\n.loader-t1 {\n  width: 8px;\n  height: 8px;\n  display: inline-block;\n  position: relative;\n  border-radius: 4px;\n  color: var(--color_topography_warn);\n  background: currentColor;\n  animation: anim__loader-t1 0.3s 0.3s linear infinite alternate; }\n  .loader-t1::after, .loader-t1::before {\n    content: '';\n    width: 8px;\n    height: 8px;\n    border-radius: 4px;\n    background: currentColor;\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n    top: 15px;\n    animation: anim__loader-t1 0.3s 0.45s linear infinite alternate; }\n  .loader-t1::after {\n    top: -15px;\n    animation-delay: 0s; }\n\n.loader_panel .loader-t1 {\n  transition: transform 0.5s 1s ease; }\n  .loader_panel .loader-t1::before, .loader_panel .loader-t1::after {\n    transition: transform 0.5s 0.5s ease, border-radius 0.3s 0.5s 1.4 ease, height 0.5s 1s ease; }\n\n.loader_panel.is_hidden .loader-t1 {\n  transition: transform 0.5s 0.5s ease;\n  animation-fill-mode: backwards;\n  animation-iteration-count: unset;\n  transform: scale(0); }\n  .loader_panel.is_hidden .loader-t1::before, .loader_panel.is_hidden .loader-t1::after {\n    transition: transform 0.5s ease, height 0.5s 0.5s ease;\n    animation-fill-mode: backwards;\n    animation-iteration-count: unset; }\n  .loader_panel.is_hidden .loader-t1::before {\n    transform: translateY(-15px) translateX(-50%); }\n  .loader_panel.is_hidden .loader-t1::after {\n    transform: translateY(15px) translateX(-50%); }\n\n@keyframes anim__loader-t1 {\n  0% {\n    width: 8px; }\n  100% {\n    width: 80px; } }\n\n.loader-t2 {\n  --color: var(--color_topography_1);\n  width: 8px;\n  height: 40px;\n  border-radius: 4px;\n  display: inline-block;\n  position: relative;\n  background: var(--color);\n  color: var(--color);\n  animation: anim__loader-t2 0.5s 0.5s linear infinite alternate; }\n  .loader-t2::after, .loader-t2::before {\n    content: '';\n    width: 8px;\n    height: 40px;\n    border-radius: 4px;\n    background: var(--color);\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    left: 20px;\n    animation: anim__loader-t2 0.5s 0.75s linear infinite alternate; }\n  .loader-t2::before {\n    left: -20px;\n    animation-delay: 0s; }\n\n.loader_panel .loader-t2 {\n  transition: transform 0.5s 1s ease; }\n  .loader_panel .loader-t2::before, .loader_panel .loader-t2::after {\n    transition: transform 0.5s 0.5s ease, border-radius 0.3s 0.5s 1.4 ease, height 0.5s 1s ease; }\n\n.loader_panel.is_hidden .loader-t2 {\n  transition: transform 0.5s 0.5s ease;\n  animation-fill-mode: backwards;\n  animation-iteration-count: unset;\n  transform: scale(0); }\n  .loader_panel.is_hidden .loader-t2::before, .loader_panel.is_hidden .loader-t2::after {\n    transition: transform 0.5s ease, height 0.5s 0.5s ease;\n    animation-fill-mode: backwards;\n    animation-iteration-count: unset; }\n  .loader_panel.is_hidden .loader-t2::before {\n    transform: translateX(20px) translateY(-50%); }\n  .loader_panel.is_hidden .loader-t2::after {\n    transform: translateX(-20px) translateY(-50%); }\n\n@keyframes anim__loader-t2 {\n  0% {\n    height: 48px; }\n  100% {\n    height: 4.8px; } }\n\n#page_musicList {\n  display: grid;\n  grid-template-rows: auto auto 1fr;\n  align-items: flex-end;\n  padding: 32px 24px 0 24px; }\n  #page_musicList header {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    height: 32px;\n    margin: 0 0 16px 0; }\n    #page_musicList header .btn.reset_album {\n      width: 20px;\n      height: 20px;\n      transition: all .25s ease; }\n      #page_musicList header .btn.reset_album:hover *[class|=\"icon\"], #page_musicList header .btn.reset_album:hover .icon {\n        --color_1: var(--color_topography_warn); }\n      #page_musicList header .btn.reset_album:active {\n        transform: scale(0.95) rotate(360deg); }\n  #page_musicList .panel-albumHead {\n    margin: 0 0 32px 0;\n    color: var(--color_topography_1); }\n  #page_musicList .list-tracks {\n    width: calc(100% + 24px * 2);\n    height: 100%;\n    margin: 0 0 0 -24px;\n    z-index: 2;\n    transition: box-shadow .5s ease;\n    box-shadow: 0px -3px 15px -3px #00000073; }\n    #page_musicList .list-tracks.opened {\n      box-shadow: 0px -7px 9px -5px #0000003d; }\n  #page_musicList .panel-trackPlaying {\n    position: absolute;\n    left: 0;\n    top: 100%;\n    z-index: 3;\n    box-shadow: 0px -7px 9px -1px #0000003d;\n    transition: transform 0.5s cubic-bezier(0.6, 0.01, 0.25, 1); }\n    #page_musicList .panel-trackPlaying > *:not(.loader_panel) {\n      transition: all 0.5s ease;\n      opacity: 0;\n      transform: translateY(-20px); }\n    #page_musicList .panel-trackPlaying.opened {\n      transition: transform 0.5s cubic-bezier(0.6, 0.01, 0.25, 1), border-radius 0.5s 0.4s cubic-bezier(0.6, 0.01, 0.25, 1);\n      border-radius: 0;\n      transform: translateY(-100%); }\n      #page_musicList .panel-trackPlaying.opened > *:not(.loader_panel) {\n        transition: all 0.5s 0.45s ease;\n        opacity: 1;\n        transform: translateY(0px); }\n  #page_musicList > .loader_panel {\n    background: var(--color_panel_background_1); }\n    #page_musicList > .loader_panel *[class|=\"loader\"] {\n      --color: var(--color_background); }\n    #page_musicList > .loader_panel.is_hidden {\n      transform: translateY(100%);\n      opacity: 1;\n      visibility: visible; }\n\n@keyframes list-tracks__anim-fade-in {\n  0% {\n    max-height: 0%; }\n  100% {\n    max-height: calc(var(--viewbox_height) * 0.7); } }\n\nbody {\n  --color_background: #313038;\n  --color_panel_background_1: #f4f4f4;\n  --color_topography_1: #FFFFFF;\n  --color_topography_1_shade: #f4f4f4;\n  --color_topography_2: #313038;\n  --color_topography_2_shade: #5D5B6A;\n  --color_topography_lurking: #92929d;\n  --color_topography_lurking_tr: #d9edf7;\n  --color_topography_lurking_shade: #758184;\n  --color_topography_warn: #ef5466; }\n\n* {\n  margin: 0;\n  padding: 0; }\n\nsvg.assets {\n  width: 0;\n  height: 0;\n  position: absolute; }\n\nimg:not(*[src]), img[src=\"#\"] {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover; }\n\nbody {\n  height: 100vh;\n  width: 100vw;\n  background: linear-gradient(199deg, #96A1A3 -10%, #3a5988 100%);\n  text-align: left;\n  --viewbox_width: 360px;\n  --viewbox_height: 640px; }\n  body .page_background {\n    background: var(--color_background);\n    position: absolute;\n    width: 100%;\n    height: 100%; }\n    body .page_background > svg:nth-of-type(1) {\n      width: 354px;\n      height: 368px; }\n    body .page_background > svg:nth-of-type(2) {\n      width: 114px;\n      height: 237px; }\n\n#root {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  #root main[id^=\"page\"] {\n    width: var(--viewbox_width);\n    height: var(--viewbox_height);\n    position: relative;\n    scroll-behavior: smooth;\n    box-sizing: border-box; }\n    #root main[id^=\"page\"]::-webkit-scrollbar {\n      width: 6px; }\n    #root main[id^=\"page\"]::-webkit-scrollbar-track {\n      background: transparent;\n      border: solid 1px var(--color_topography_1-tr);\n      border-radius: 20px; }\n    #root main[id^=\"page\"]::-webkit-scrollbar-thumb {\n      background: var(--color_topography_1);\n      border-radius: 20px; }\n\n#screen {\n  position: relative;\n  width: var(--viewbox_width);\n  height: var(--viewbox_height);\n  overflow: hidden;\n  background: var(--color_background);\n  border-radius: 16px;\n  box-shadow: 0 0 20px 0px #0000002e;\n  border: solid 8px var(--color_background); }\n\n@media (min-width: 376px) {\n  body {\n    display: flex;\n    justify-content: center;\n    align-items: center; } }\n\n@media (max-width: 376px) {\n  body {\n    --viewbox_width: 100vw;\n    --viewbox_height: 100vh; }\n  #screen {\n    border: none !important;\n    border-radius: 0;\n    box-shadow: none !important; } }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./src/images/img_404.png":
/*!********************************!*\
  !*** ./src/images/img_404.png ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "src/images/img_404.png");

/***/ }),

/***/ "./src/js/index.jsx":
/*!**************************!*\
  !*** ./src/js/index.jsx ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_gen_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styles/gen.scss */ "./src/style/gen.scss");
/* harmony import */ var _styles_gen_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_gen_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./redux/store */ "./src/js/redux/store.js");
/* harmony import */ var _redux_actions_loaders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./redux/actions/loaders */ "./src/js/redux/actions/loaders.js");
/* harmony import */ var _redux_actions_all__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./redux/actions/all */ "./src/js/redux/actions/all.js");
/* harmony import */ var _omponents_page_elements_preloaders__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./сomponents/page_elements/preloaders */ "./src/js/сomponents/page_elements/preloaders.jsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var Page_musicList = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./сomponents/pages/page_musicList */ "./src/js/сomponents/pages/page_musicList.jsx"));
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(App, null), document.getElementById('root'));

function App(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      ready = _useState2[0],
      change_ready = _useState2[1];

  if (!ready) {
    (function load_random_album() {
      var id = randomNumber(101620000, 101625552); //for check use id: 101625552

      Object(_redux_actions_loaders__WEBPACK_IMPORTED_MODULE_5__["load_album"])(id).then(function () {
        Object(_redux_actions_all__WEBPACK_IMPORTED_MODULE_6__["change_path"])({
          album: id
        });
        change_ready(true);
      })["catch"](function (code) {
        load_random_album();
      });
    })();
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: _redux_store__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_omponents_page_elements_preloaders__WEBPACK_IMPORTED_MODULE_7__["Preloader"], {
    is_hidden: ready
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_omponents_page_elements_preloaders__WEBPACK_IMPORTED_MODULE_7__["Fallback_preloader"], null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Page_musicList, null)));
}

/***/ }),

/***/ "./src/js/redux/actionTypes.js":
/*!*************************************!*\
  !*** ./src/js/redux/actionTypes.js ***!
  \*************************************/
/*! exports provided: SELECT_ITEMS_TYPE, REQUEST_ITEMS, RECEIVE_ITEMS, CHANGE_PATH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_ITEMS_TYPE", function() { return SELECT_ITEMS_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_ITEMS", function() { return REQUEST_ITEMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_ITEMS", function() { return RECEIVE_ITEMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_PATH", function() { return CHANGE_PATH; });
var SELECT_ITEMS_TYPE = "SELECT_SUBREDDIT";
var REQUEST_ITEMS = "REQUEST_ITEMS";
var RECEIVE_ITEMS = "RECEIVE_ITEMS";
var CHANGE_PATH = "CHANGE_PATH";

/***/ }),

/***/ "./src/js/redux/actions/all.js":
/*!*************************************!*\
  !*** ./src/js/redux/actions/all.js ***!
  \*************************************/
/*! exports provided: fetch_items, change_path */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch_items", function() { return fetch_items; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "change_path", function() { return change_path; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actionTypes */ "./src/js/redux/actionTypes.js");
/* harmony import */ var _rd_store_sections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rd_store_sections */ "./src/js/redux/rd_store_sections.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store.js */ "./src/js/redux/store.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function request_items(type) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["REQUEST_ITEMS"],
    items_type: type
  };
}

function receive_items(type, json, param) {
  if (param.save_old) {
    return {
      type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["RECEIVE_ITEMS"],
      items_type: type,
      items: [json],
      save_old: param.save_old
    };
  } else {
    return {
      type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["RECEIVE_ITEMS"],
      items_type: type,
      items: json,
      save_old: param.save_old
    };
  }
}

function fetch_items(type) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    save_old: false,
    fetch_props: {}
  };
  return function (dispatch) {
    if (!store_section_isLocked(type)) {
      dispatch(request_items(type));
      var head_resulve, head_reject;
      fetch(url, _objectSpread({
        mode: 'cors'
      }, param.fetch_props)).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.error) {
          dispatch(receive_items(type, json, _objectSpread(_objectSpread({}, param), {}, {
            save_old: true
          })));
          head_reject(json.error.code);
        } else {
          dispatch(receive_items(type, json, param));
          head_resulve();
        }
      });
      return new Promise(function (resulve, reject) {
        head_resulve = resulve;
        head_reject = reject;
      });
    } else {
      return -1;
    }
  };
}
function change_path(path) {
  _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatch({
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_PATH"],
    path: path
  });
}

function store_section_isLocked(type) {
  if (_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState()[_rd_store_sections__WEBPACK_IMPORTED_MODULE_1__["ITEMS_BY_TYPE"]][type] === undefined) {
    return false;
  } else {
    return _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState()[_rd_store_sections__WEBPACK_IMPORTED_MODULE_1__["ITEMS_BY_TYPE"]][type].is_fetching;
  }
}

/***/ }),

/***/ "./src/js/redux/actions/loaders.js":
/*!*****************************************!*\
  !*** ./src/js/redux/actions/loaders.js ***!
  \*****************************************/
/*! exports provided: load_album, load_track, load_tracks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load_album", function() { return load_album; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load_track", function() { return load_track; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load_tracks", function() { return load_tracks; });
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store.js */ "./src/js/redux/store.js");
/* harmony import */ var _all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./all */ "./src/js/redux/actions/all.js");
/* harmony import */ var _rd_store_sections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rd_store_sections */ "./src/js/redux/rd_store_sections.js");
/* harmony import */ var _restAPI_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../restAPI_settings */ "./src/js/restAPI_settings.js");




function load_album() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "101625552";
  return Object(_all__WEBPACK_IMPORTED_MODULE_1__["fetch_items"])(_rd_store_sections__WEBPACK_IMPORTED_MODULE_2__["items_type"].ALBUMS, "https://deezerdevs-deezer.p.rapidapi.com/album/".concat(id), {
    save_old: true,
    fetch_props: {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": _restAPI_settings__WEBPACK_IMPORTED_MODULE_3__["x_rapidapi_key"],
        "x-rapidapi-host": _restAPI_settings__WEBPACK_IMPORTED_MODULE_3__["x_rapidapi_host"]
      }
    }
  })(_store_js__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch);
}
function load_track() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "703149052";
  return Object(_all__WEBPACK_IMPORTED_MODULE_1__["fetch_items"])(_rd_store_sections__WEBPACK_IMPORTED_MODULE_2__["items_type"].TRACKS, "https://deezerdevs-deezer.p.rapidapi.com/track/".concat(id), {
    save_old: true,
    fetch_props: {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": _restAPI_settings__WEBPACK_IMPORTED_MODULE_3__["x_rapidapi_key"],
        "x-rapidapi-host": _restAPI_settings__WEBPACK_IMPORTED_MODULE_3__["x_rapidapi_host"]
      }
    }
  })(_store_js__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch);
}
function load_tracks() {
  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return multe_fetch('https://deezerdevs-deezer.p.rapidapi.com/track', ids, _rd_store_sections__WEBPACK_IMPORTED_MODULE_2__["items_type"].TRACKS);
}

function multe_fetch(url, ids, where_save) {
  var first_fetch = new Promise(function (resolve) {
    resolve();
  });
  ids.forEach(function (id, index) {
    if (index >= ids.lenght - 1) {
      return first_fetch.then(function () {
        return Object(_all__WEBPACK_IMPORTED_MODULE_1__["fetch_items"])(where_save, "".concat(url, "/").concat(id, "/"), {
          save_old: true
        })(_store_js__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch);
      });
    } else {
      first_fetch = first_fetch.then(function () {
        return Object(_all__WEBPACK_IMPORTED_MODULE_1__["fetch_items"])(where_save, "".concat(url, "/").concat(id, "/"), {
          save_old: true
        })(_store_js__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch);
      });
    }
  });
}

/***/ }),

/***/ "./src/js/redux/rd_store_sections.js":
/*!*******************************************!*\
  !*** ./src/js/redux/rd_store_sections.js ***!
  \*******************************************/
/*! exports provided: items_type, path_chunk, ITEMS_BY_TYPE, PATH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "items_type", function() { return items_type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "path_chunk", function() { return path_chunk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ITEMS_BY_TYPE", function() { return ITEMS_BY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATH", function() { return PATH; });
var items_type = {
  ALBUMS: "ALBUMS",
  TRACKS: "TRACKS"
};
var path_chunk = {
  ALBUM: 'ALBUM',
  TRACK: 'TRACK'
};
var ITEMS_BY_TYPE = "ITEMS_BY_TYPE";
var PATH = "PATH";

/***/ }),

/***/ "./src/js/redux/reducers/all.js":
/*!**************************************!*\
  !*** ./src/js/redux/reducers/all.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/lib/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actionTypes */ "./src/js/redux/actionTypes.js");
/* harmony import */ var _rd_store_sections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rd_store_sections */ "./src/js/redux/rd_store_sections.js");
/* harmony import */ var _items_by_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./items_by_type */ "./src/js/redux/reducers/items_by_type.js");
/* harmony import */ var _path_by_items__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./path_by_items */ "./src/js/redux/reducers/path_by_items.js");





var root_reducer = {};
root_reducer[_rd_store_sections__WEBPACK_IMPORTED_MODULE_2__["ITEMS_BY_TYPE"]] = _items_by_type__WEBPACK_IMPORTED_MODULE_3__["items_by_type"];
root_reducer[_rd_store_sections__WEBPACK_IMPORTED_MODULE_2__["PATH"]] = _path_by_items__WEBPACK_IMPORTED_MODULE_4__["path_by_items"];
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(root_reducer));

/***/ }),

/***/ "./src/js/redux/reducers/items_by_type.js":
/*!************************************************!*\
  !*** ./src/js/redux/reducers/items_by_type.js ***!
  \************************************************/
/*! exports provided: items_by_type */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "items_by_type", function() { return items_by_type; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actionTypes */ "./src/js/redux/actionTypes.js");
/* harmony import */ var _rd_store_sections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rd_store_sections */ "./src/js/redux/rd_store_sections.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function items_by_type() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type == _actionTypes__WEBPACK_IMPORTED_MODULE_0__["REQUEST_ITEMS"]) {
    var _new_state_with_new_g;

    var new_state_with_new_group_items = _objectSpread({}, state);

    new_state_with_new_group_items[action.items_type] = _objectSpread(_objectSpread({}, new_state_with_new_group_items[action.items_type]), {}, {
      is_fetching: true,
      items: ((_new_state_with_new_g = new_state_with_new_group_items[action.items_type]) === null || _new_state_with_new_g === void 0 ? void 0 : _new_state_with_new_g.items) || []
    });
    return new_state_with_new_group_items; //-------------------------------------------------------
  } else if (action.type == _actionTypes__WEBPACK_IMPORTED_MODULE_0__["RECEIVE_ITEMS"]) {
    var new_items = _objectSpread({}, state);

    if (action.save_old) {
      var systematized_items = action.items;
      new_items[action.items_type] = {
        items: [].concat(_toConsumableArray(state[action.items_type].items), _toConsumableArray(systematized_items)),
        is_fetching: false
      };
    } else {
      new_items[action.items_type] = {
        items: action.items,
        is_fetching: false
      };
    }

    return _objectSpread({}, new_items); //-------------------------------------------------------
  } else {
    return state;
  }
}

function habitats_systematizer(items) {
  return items.map(function (item) {
    return {
      id: item.id,
      name: item.name,
      pokemon_species: item.pokemon_species.map(function (item) {
        return item.name;
      })
    };
  });
}

function growth_rates_systematizer(items) {
  return items.map(function (item) {
    return {
      id: item.id,
      name: item.name,
      pokemon_species: item.pokemon_species.map(function (item) {
        return item.name;
      })
    };
  });
}

function egg_groups_systematizer(items) {
  return items.map(function (item) {
    return {
      id: item.id,
      name: item.name,
      pokemon_species: item.pokemon_species.map(function (item) {
        return item.name;
      })
    };
  });
}

/***/ }),

/***/ "./src/js/redux/reducers/path_by_items.js":
/*!************************************************!*\
  !*** ./src/js/redux/reducers/path_by_items.js ***!
  \************************************************/
/*! exports provided: path_by_items */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "path_by_items", function() { return path_by_items; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actionTypes */ "./src/js/redux/actionTypes.js");
/* harmony import */ var _rd_store_sections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rd_store_sections */ "./src/js/redux/rd_store_sections.js");
var _globalThis$localStor, _globalThis$localStor2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var path_template = {};
path_template[_rd_store_sections__WEBPACK_IMPORTED_MODULE_1__["path_chunk"].ALBUM] = ((_globalThis$localStor = globalThis.localStorage) === null || _globalThis$localStor === void 0 ? void 0 : _globalThis$localStor.getItem('path__album')) || 101625552;
path_template[_rd_store_sections__WEBPACK_IMPORTED_MODULE_1__["path_chunk"].TRACK] = ((_globalThis$localStor2 = globalThis.localStorage) === null || _globalThis$localStor2 === void 0 ? void 0 : _globalThis$localStor2.getItem('path__track')) || 231;
function path_by_items() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : path_template;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_PATH"]:
      var new_path = _objectSpread({}, state);

      if (action.path.album) {
        var _globalThis$localStor3;

        new_path[_rd_store_sections__WEBPACK_IMPORTED_MODULE_1__["path_chunk"].ALBUM] = action.path.album;
        (_globalThis$localStor3 = globalThis.localStorage) === null || _globalThis$localStor3 === void 0 ? void 0 : _globalThis$localStor3.setItem('path__album', action.path.album);
      }

      if (action.path.track) {
        var _globalThis$localStor4;

        new_path[_rd_store_sections__WEBPACK_IMPORTED_MODULE_1__["path_chunk"].TRACK] = action.path.track;
        (_globalThis$localStor4 = globalThis.localStorage) === null || _globalThis$localStor4 === void 0 ? void 0 : _globalThis$localStor4.setItem('path__track', action.path.track);
      }

      return _objectSpread({}, new_path);

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/js/redux/store.js":
/*!*******************************!*\
  !*** ./src/js/redux/store.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/lib/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers/all */ "./src/js/redux/reducers/all.js");
/* harmony import */ var _rd_store_sections__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rd_store_sections */ "./src/js/redux/rd_store_sections.js");
/* harmony import */ var _actions_all__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/all */ "./src/js/redux/actions/all.js");


var ReduxThunk = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js")["default"];



var initialState = {};
var loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_1__["createLogger"])();
var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers_all__WEBPACK_IMPORTED_MODULE_2__["default"], initialState, Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(ReduxThunk, loggerMiddleware));


/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./src/js/restAPI_settings.js":
/*!************************************!*\
  !*** ./src/js/restAPI_settings.js ***!
  \************************************/
/*! exports provided: x_rapidapi_key, x_rapidapi_host */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x_rapidapi_key", function() { return x_rapidapi_key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x_rapidapi_host", function() { return x_rapidapi_host; });
var x_rapidapi_key = "dbb9c57b79msh19d47049482e79fp185fdajsnc3b33b8c2a87";
var x_rapidapi_host = "deezerdevs-deezer.p.rapidapi.com";

/***/ }),

/***/ "./src/js/сomponents/page_elements/preloaders.jsx":
/*!********************************************************!*\
  !*** ./src/js/сomponents/page_elements/preloaders.jsx ***!
  \********************************************************/
/*! exports provided: Fallback_preloader, Data_preloader, Preloader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fallback_preloader", function() { return Fallback_preloader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data_preloader", function() { return Data_preloader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Preloader", function() { return Preloader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Fallback_preloader(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: props.is_hidden ? "fallback_loader_panel is_hidden" : "fallback_loader_panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: ""
  }));
}
function Data_preloader(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: props.is_hidden ? "loader_panel is_hidden" : "loader_panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "loader-t2"
  }));
}
function Preloader(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: props.is_hidden ? "loader_panel is_hidden" : "loader_panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "loader-t1"
  }));
}

/***/ }),

/***/ "./src/style/gen.scss":
/*!****************************!*\
  !*** ./src/style/gen.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./gen.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/gen.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi @babel/polyfill ./src/js/index.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"./node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! E:\programing\OpenServer\domains\Music_app\src/js/index.jsx */"./src/js/index.jsx");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL2dlbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvaW1nXzQwNC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdXgvYWN0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHV4L2FjdGlvbnMvYWxsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWR1eC9hY3Rpb25zL2xvYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHV4L3JkX3N0b3JlX3NlY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWR1eC9yZWR1Y2Vycy9hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHV4L3JlZHVjZXJzL2l0ZW1zX2J5X3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHV4L3JlZHVjZXJzL3BhdGhfYnlfaXRlbXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHV4L3N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZXN0QVBJX3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy/RgW9tcG9uZW50cy9wYWdlX2VsZW1lbnRzL3ByZWxvYWRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9nZW4uc2Nzcz9iMTgyIl0sIm5hbWVzIjpbIlBhZ2VfbXVzaWNMaXN0IiwiUmVhY3QiLCJsYXp5IiwicmFuZG9tTnVtYmVyIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkFwcCIsInByb3BzIiwidXNlU3RhdGUiLCJyZWFkeSIsImNoYW5nZV9yZWFkeSIsImxvYWRfcmFuZG9tX2FsYnVtIiwiaWQiLCJsb2FkX2FsYnVtIiwidGhlbiIsImNoYW5nZV9wYXRoIiwiYWxidW0iLCJjb2RlIiwic3RvcmUiLCJTRUxFQ1RfSVRFTVNfVFlQRSIsIlJFUVVFU1RfSVRFTVMiLCJSRUNFSVZFX0lURU1TIiwiQ0hBTkdFX1BBVEgiLCJyZXF1ZXN0X2l0ZW1zIiwidHlwZSIsIml0ZW1zX3R5cGUiLCJyZWNlaXZlX2l0ZW1zIiwianNvbiIsInBhcmFtIiwic2F2ZV9vbGQiLCJpdGVtcyIsImZldGNoX2l0ZW1zIiwidXJsIiwiZmV0Y2hfcHJvcHMiLCJkaXNwYXRjaCIsInN0b3JlX3NlY3Rpb25faXNMb2NrZWQiLCJoZWFkX3Jlc3VsdmUiLCJoZWFkX3JlamVjdCIsImZldGNoIiwibW9kZSIsInJlc3BvbnNlIiwiZXJyb3IiLCJQcm9taXNlIiwicmVzdWx2ZSIsInJlamVjdCIsInBhdGgiLCJnZXRTdGF0ZSIsIm5hbWUiLCJ1bmRlZmluZWQiLCJpc19mZXRjaGluZyIsIkFMQlVNUyIsInNldHRpbmdzIiwieF9yYXBpZGFwaV9ob3N0IiwibG9hZF90cmFjayIsIlRSQUNLUyIsImxvYWRfdHJhY2tzIiwiaWRzIiwibXVsdGVfZmV0Y2giLCJ3aGVyZV9zYXZlIiwiZmlyc3RfZmV0Y2giLCJyZXNvbHZlIiwiZm9yRWFjaCIsImluZGV4IiwibGVuZ2h0IiwicGF0aF9jaHVuayIsIkFMQlVNIiwiVFJBQ0siLCJJVEVNU19CWV9UWVBFIiwiUEFUSCIsInJvb3RfcmVkdWNlciIsIml0ZW1zX2J5X3R5cGUiLCJwYXRoX2J5X2l0ZW1zIiwiY29tYmluZVJlZHVjZXJzIiwic3RhdGUiLCJhY3Rpb24iLCJuZXdfc3RhdGVfd2l0aF9uZXdfZ3JvdXBfaXRlbXMiLCJuZXdfaXRlbXMiLCJzeXN0ZW1hdGl6ZWRfaXRlbXMiLCJoYWJpdGF0c19zeXN0ZW1hdGl6ZXIiLCJtYXAiLCJpdGVtIiwicG9rZW1vbl9zcGVjaWVzIiwiZ3Jvd3RoX3JhdGVzX3N5c3RlbWF0aXplciIsImVnZ19ncm91cHNfc3lzdGVtYXRpemVyIiwicGF0aF90ZW1wbGF0ZSIsImdsb2JhbFRoaXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibmV3X3BhdGgiLCJzZXRJdGVtIiwidHJhY2siLCJSZWR1eFRodW5rIiwicmVxdWlyZSIsImluaXRpYWxTdGF0ZSIsImxvZ2dlck1pZGRsZXdhcmUiLCJjcmVhdGVMb2dnZXIiLCJjcmVhdGVTdG9yZSIsImFwcGx5TWlkZGxld2FyZSIsInhfcmFwaWRhcGlfa2V5IiwiRmFsbGJhY2tfcHJlbG9hZGVyIiwiaXNfaGlkZGVuIiwiRGF0YV9wcmVsb2FkZXIiLCJQcmVsb2FkZXIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLDRDQUE0Qyw2QkFBNkIsc0RBQXNEO1FBQy9IOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7O1FBRUE7UUFDQSxpQ0FBaUM7O1FBRWpDO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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ckJJLDZEQUFlLENBQUNOLFVBQUQsRUFBYUcsZ0JBQWIsQ0FITSxDQUF2QjtBQVFBO0FBQ0E7QUFLZTVFLG9FQUFmLEU7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBTyxJQUFNZ0YsY0FBYyxHQUFHLG9EQUF2QjtBQUNBLElBQU05QyxlQUFlLEdBQUcsa0NBQXhCLEM7Ozs7Ozs7Ozs7OztBQ0RQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU8sU0FBUytDLGtCQUFULENBQTRCNUYsS0FBNUIsRUFBbUM7QUFDeEMsc0JBQ0U7QUFBSyxhQUFTLEVBQUVBLEtBQUssQ0FBQzZGLFNBQU4sR0FBa0IsaUNBQWxCLEdBQXNEO0FBQXRFLGtCQUNFO0FBQUssT0FBRyxFQUFDO0FBQVQsSUFERixDQURGO0FBS0Q7QUFFTSxTQUFTQyxjQUFULENBQXdCOUYsS0FBeEIsRUFBK0I7QUFDcEMsc0JBQ0U7QUFBSyxhQUFTLEVBQUVBLEtBQUssQ0FBQzZGLFNBQU4sR0FBa0Isd0JBQWxCLEdBQTZDO0FBQTdELGtCQUNFO0FBQUssYUFBUyxFQUFDO0FBQWYsSUFERixDQURGO0FBTUQ7QUFFTSxTQUFTRSxTQUFULENBQW1CL0YsS0FBbkIsRUFBMEI7QUFDL0Isc0JBQ0U7QUFBSyxhQUFTLEVBQUVBLEtBQUssQ0FBQzZGLFNBQU4sR0FBa0Isd0JBQWxCLEdBQTZDO0FBQTdELGtCQUNFO0FBQUssYUFBUyxFQUFDO0FBQWYsSUFERixDQURGO0FBS0QsQzs7Ozs7Ozs7Ozs7QUN6QkQsVUFBVSxtQkFBTyxDQUFDLHNKQUEyRTtBQUM3RiwwQkFBMEIsbUJBQU8sQ0FBQywyTUFBbUc7O0FBRXJJOztBQUVBO0FBQ0EsMEJBQTBCLFFBQVM7QUFDbkM7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7OztBQUlBLHNDIiwiZmlsZSI6Ii4vbWFpbi02ZjZiZWZlMDBjYmI1ZDk5YTA0NC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtYWluXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiLi9cIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi1cIiArIHtcIjBcIjpcIjA1NTJlNzdjM2EwZWI0YTY4NzU1XCIsXCIxXCI6XCI2NDVkOTlkN2ZmYWRiZTUzODhiNFwifVtjaHVua0lkXSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3Jzfm1haW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gcmVxdWlyZShcIi4uL2ltYWdlcy9pbWdfNDA0LnBuZ1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PdmVycGFzczp3Z2h0QDMwMDs0MDA7NzAwOzkwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU92ZXJwYXNzOndnaHRAMzAwOzQwMDs3MDA7OTAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3ZlcnBhc3M6d2dodEAzMDA7NDAwOzcwMDs5MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PdmVycGFzczp3Z2h0QDMwMDs0MDA7NzAwOzkwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU92ZXJwYXNzOndnaHRAMzAwOzQwMDs3MDA7OTAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3ZlcnBhc3M6d2dodEAzMDA7NDAwOzcwMDs5MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfMSk7IH1cXG5cXG4qOjpzZWxlY3Rpb24ge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzEpOyB9XFxuXFxuaDMge1xcbiAgZm9udC1mYW1pbHk6IEdUIFNlY3RyYSBEaXNwbGF5O1xcbiAgZm9udC1zaXplOiAyOHB4O1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzNnB4O1xcbiAgLS1saW5lLWhlaWdodDogMzZweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwZW07IH1cXG5cXG5oNCB7XFxuICBmb250LWZhbWlseTogR1QgU2VjdHJhIERpc3BsYXk7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAtLWxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDBlbTsgfVxcblxcbmg2IHtcXG4gIGZvbnQtZmFtaWx5OiBHVCBTZWN0cmEgRGlzcGxheTtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMjJweDtcXG4gIC0tbGluZS1oZWlnaHQ6IDIycHg7XFxuICBsZXR0ZXItc3BhY2luZzogMGVtOyB9XFxuXFxucCwgYSB7XFxuICBmb250LWZhbWlseTogR1QgU2VjdHJhIERpc3BsYXk7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICAtLWxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDBlbTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcblxcbipbY2xhc3N8PVxcXCJpY29uXFxcIl0sIC5pY29uIHtcXG4gIC0tY29sb3JfMTogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8xKTtcXG4gIC0tY29sb3JfMjogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8yKTtcXG4gIC0tdHJhbnNpdGlvbjogYWxsIC4yNXMgZWFzZTsgfVxcbiAgKltjbGFzc3w9XFxcImljb25cXFwiXSBzdmcgKiwgLmljb24gc3ZnICoge1xcbiAgICB0cmFuc2l0aW9uOiB2YXIoLS10cmFuc2l0aW9uKTsgfVxcblxcbi5pY29uLXJlc2V0IHtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4OyB9XFxuXFxuKltjbGFzcyo9XFxcImljb24tYXJyb3dcXFwiXSB7XFxuICAtLXNpemU6IDMycHg7XFxuICB3aWR0aDogdmFyKC0tc2l6ZSk7XFxuICBoZWlnaHQ6IHZhcigtLXNpemUpO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcblxcbipbY2xhc3MqPVxcXCJpY29uLXRyaWFuZ2xlXFxcIl0ge1xcbiAgLS1zaXplOiAzMnB4O1xcbiAgd2lkdGg6IHZhcigtLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1zaXplKTtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cXG5cXG4uaWNvbi1iYWNrd2FyZCwgLmljb24tZm9yd2FyZCwgLmljb24tdm9sdW1lIHtcXG4gIC0tc2l6ZTogMzJweDtcXG4gIHdpZHRoOiB2YXIoLS1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tc2l6ZSk7IH1cXG5cXG4qW2NsYXNzfD1cXFwiYnRuXFxcIl0sICpbY2xhc3MqPVxcXCJidG5cXFwiXSwgLmJ0biB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LWZhbWlseTogR1QgU2VjdHJhIEZpbmU7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAtLWxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDBlbTtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLmJ0bi5wbGF5IHtcXG4gIHRyYW5zaXRpb246IGFsbCAuMjVzIGVhc2U7IH1cXG4gIC5idG4ucGxheTphY3RpdmUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpOyB9XFxuXFxuLmJ0bi1saW5rIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDhweCAxNnB4O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTtcXG4gIHRleHQtZGVjb3JhdGlvbjogcmV2ZXJ0O1xcbiAgY29sb3I6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfMV9zaGFkZSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgLjI1cyBlYXNlOyB9XFxuICAuYnRuLWxpbmsgKltjbGFzcyo9XFxcImljb24tYXJyb3dcXFwiXSB7XFxuICAgIC0tc2l6ZTogMS43NzhlbTtcXG4gICAgbWFyZ2luOiAtMC4zODllbSAtMC4xOTQ1ZW0gLTAuMzg5ZW0gMDtcXG4gICAgLS1jb2xvcl8xOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzFfc2hhZGUpOyB9XFxuICAuYnRuLWxpbmsgKltjbGFzcyo9XFxcImljb24tYXJyb3dcXFwiXSB7XFxuICAgIC0tdHJhbnNpdGlvbjogYWxsIC4yNXMgZWFzZTsgfVxcbiAgLmJ0bi1saW5rOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xcbiAgICBib3gtc2hhZG93OiAtMXB4IDVweCAzcHggLTJweCAjMDAwMDAwNDc7IH1cXG4gIC5idG4tbGluazphY3RpdmUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpOyB9XFxuICAgIC5idG4tbGluazphY3RpdmUgKltjbGFzcyo9XFxcImljb24tYXJyb3dcXFwiXSB7XFxuICAgICAgLS1zaXplOiAxLjgyZW07IH1cXG5cXG4uYnRuLmNvcHlfbGluayB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiA2cHggMTRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJvcmRlcjogc29saWQgMnB4IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfd2Fybik7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X3dhcm4pO1xcbiAgdHJhbnNpdGlvbjogYWxsIC4yNXMgZWFzZTsgfVxcbiAgLmJ0bi5jb3B5X2xpbmsgPiBzcGFuIHtcXG4gICAgdHJhbnNpdGlvbjogaW5oZXJpdDsgfVxcbiAgLmJ0bi5jb3B5X2xpbms6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X3dhcm4pO1xcbiAgICBjb2xvcjogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8yKTsgfVxcbiAgLmJ0bi5jb3B5X2xpbms6YWN0aXZlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTsgfVxcblxcbi5pbnB1dC1saXN0IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5pbnB1dC1saXN0IC5pbnB1dC1saXN0X2l0ZW1zIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgbWF4LWhlaWdodDogY2FsYygoMS42MmVtICsgOHB4ICogMikgKiA1KTtcXG4gICAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjRzIGVhc2UtaW4tb3V0O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHotaW5kZXg6IDEwMDA7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX2JhY2tncm91bmQpO1xcbiAgICB0b3A6IC01cHg7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDIwcHggMHB4ICMwMDAwMDAzMDsgfVxcbiAgICAuaW5wdXQtbGlzdCAuaW5wdXQtbGlzdF9pdGVtcyA+IGxpIHtcXG4gICAgICBmb250LWZhbWlseTogR1QgU2VjdHJhIERpc3BsYXk7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xcbiAgICAgIC0tbGluZS1oZWlnaHQ6IDE2cHg7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IDBlbTtcXG4gICAgICBjb2xvcjogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8xKTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgcGFkZGluZzogNHB4IDZweDsgfVxcbiAgICAuaW5wdXQtbGlzdCAuaW5wdXQtbGlzdF9pdGVtcy5jbG9zZWQge1xcbiAgICAgIG1heC1oZWlnaHQ6IDA7IH1cXG4gICAgICAuaW5wdXQtbGlzdCAuaW5wdXQtbGlzdF9pdGVtcy5jbG9zZWQgfiAuaW5wdXQtbGlzdF9oZWFkIC5idG4ge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XFxuICAuaW5wdXQtbGlzdCAuaW5wdXQtbGlzdF9oZWFkIHtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTtcXG4gICAgcGFkZGluZzogNHB4IDZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBncmlkLXJvdzogMS8yO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciBhdXRvO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAgIC5pbnB1dC1saXN0IC5pbnB1dC1saXN0X2hlYWQgLmlucHV0LWxpc3Rfc2VsZWN0ZWRfaXRlbSB7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIGZvbnQtZmFtaWx5OiBHVCBTZWN0cmEgRGlzcGxheTtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgbGluZS1oZWlnaHQ6IDE2cHg7XFxuICAgICAgLS1saW5lLWhlaWdodDogMTZweDtcXG4gICAgICBsZXR0ZXItc3BhY2luZzogMGVtO1xcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzIpO1xcbiAgICAgIGdyaWQtY29sdW1uOiAxLzI7XFxuICAgICAgZ3JpZC1yb3c6IDIvMzsgfVxcblxcbi5idG4tdG0tdm9sdW1lIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRyYW5zaXRpb246IGFsbCAuMjVzIGVhc2U7IH1cXG4gIC5idG4tdG0tdm9sdW1lICpbY2xhc3N8PVxcXCJpY29uXFxcIl0sIC5idG4tdG0tdm9sdW1lIC5pY29uIHtcXG4gICAgLS1jb2xvcl8xOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzJfc2hhZGUpOyB9XFxuICAuYnRuLXRtLXZvbHVtZSAuYnRuLXRtLXZvbHVtZV9iYXIge1xcbiAgICBncmlkLWNvbHVtbjogMS8zO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgIHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIG1heC1oZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zaXRpb246IG1heC1oZWlnaHQgLjI1cyBlYXNlOyB9XFxuICAgIC5idG4tdG0tdm9sdW1lIC5idG4tdG0tdm9sdW1lX2Jhcjo6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBoZWlnaHQ6IGluaGVyaXQ7XFxuICAgICAgbWF4LWhlaWdodDogaW5oZXJpdDtcXG4gICAgICB3aWR0aDogMnB4O1xcbiAgICAgIG1hcmdpbjogMCA1cHg7XFxuICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV9sdXJraW5nX3RyKTtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiAxMDAlO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7IH1cXG4gICAgLmJ0bi10bS12b2x1bWUgLmJ0bi10bS12b2x1bWVfYmFyOjphZnRlciB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgICAgIG1heC1oZWlnaHQ6IGluaGVyaXQ7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgbWFyZ2luOiAwIDVweDtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiAxMDAlO1xcbiAgICAgIGxlZnQ6IGNhbGMoLTUwJSArIDFweCk7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTsgfVxcbiAgICAuYnRuLXRtLXZvbHVtZSAuYnRuLXRtLXZvbHVtZV9iYXIgLmJ0bi10bS12b2x1bWVfYmFyX3ZhbHVlIHtcXG4gICAgICB3aWR0aDogMnB4O1xcbiAgICAgIGhlaWdodDogY2FsYyh2YXIoLS12YWx1ZSkgLyAxMDAgKiAxMDAlKTtcXG4gICAgICBtYXgtaGVpZ2h0OiBpbmhlcml0O1xcbiAgICAgIG1hcmdpbjogMCA1cHg7XFxuICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgdG9wOiAxMDAlO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7IH1cXG4gICAgICAuYnRuLXRtLXZvbHVtZSAuYnRuLXRtLXZvbHVtZV9iYXIgLmJ0bi10bS12b2x1bWVfYmFyX3ZhbHVlOjphZnRlciB7XFxuICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgd2lkdGg6IDEycHg7XFxuICAgICAgICBoZWlnaHQ6IDdweDtcXG4gICAgICAgIG1heC1oZWlnaHQ6IDdweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIGxlZnQ6IDUwJTtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTsgfVxcbiAgICAuYnRuLXRtLXZvbHVtZSAuYnRuLXRtLXZvbHVtZV9iYXI6OmJlZm9yZSB7XFxuICAgICAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAuMjVzIGVhc2U7IH1cXG4gICAgLmJ0bi10bS12b2x1bWUgLmJ0bi10bS12b2x1bWVfYmFyIC5idG4tdG0tdm9sdW1lX2Jhcl92YWx1ZSB7XFxuICAgICAgdHJhbnNpdGlvbjogYWxsIC4yNXMgZWFzZTsgfVxcbiAgICAgIC5idG4tdG0tdm9sdW1lIC5idG4tdG0tdm9sdW1lX2JhciAuYnRuLXRtLXZvbHVtZV9iYXJfdmFsdWU6OmFmdGVyIHtcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuMjVzIC4yNXMgZWFzZTsgfVxcbiAgICAuYnRuLXRtLXZvbHVtZSAuYnRuLXRtLXZvbHVtZV9iYXIuY2xvc2VkIHtcXG4gICAgICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IC4yNXMgZWFzZTtcXG4gICAgICBtYXgtaGVpZ2h0OiAwcHg7IH1cXG4gICAgICAuYnRuLXRtLXZvbHVtZSAuYnRuLXRtLXZvbHVtZV9iYXIuY2xvc2VkIC5idG4tdG0tdm9sdW1lX2Jhcl92YWx1ZTo6YWZ0ZXIge1xcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4yNXMgZWFzZSwgdmlzaWJpbGl0eSAwcyAuMjVzO1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMC4yKTtcXG4gICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjsgfVxcbiAgLmJ0bi10bS12b2x1bWU6aG92ZXIgKltjbGFzc3w9XFxcImljb25cXFwiXSwgLmJ0bi10bS12b2x1bWU6aG92ZXIgLmljb24ge1xcbiAgICAtLWNvbG9yXzE6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfd2Fybik7IH1cXG4gIC5idG4tdG0tdm9sdW1lOmFjdGl2ZSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7IH1cXG5cXG4uYnRuLXRtLXZvbHVtZSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0cmFuc2l0aW9uOiBhbGwgLjI1cyBlYXNlOyB9XFxuICAuYnRuLXRtLXZvbHVtZSAqW2NsYXNzfD1cXFwiaWNvblxcXCJdLCAuYnRuLXRtLXZvbHVtZSAuaWNvbiB7XFxuICAgIC0tY29sb3JfMTogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8yX3NoYWRlKTsgfVxcbiAgLmJ0bi10bS12b2x1bWUgLmJ0bi10bS12b2x1bWVfYmFyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvMztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbiAgICB3aWR0aDogMTJweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICBtYXgtaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IC4yNXMgZWFzZTsgfVxcbiAgICAuYnRuLXRtLXZvbHVtZSAuYnRuLXRtLXZvbHVtZV9iYXI6OmJlZm9yZSB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgICAgIG1heC1oZWlnaHQ6IGluaGVyaXQ7XFxuICAgICAgd2lkdGg6IDJweDtcXG4gICAgICBtYXJnaW46IDAgNXB4O1xcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfbHVya2luZ190cik7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHRvcDogMTAwJTtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpOyB9XFxuICAgIC5idG4tdG0tdm9sdW1lIC5idG4tdG0tdm9sdW1lX2Jhcjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGhlaWdodDogaW5oZXJpdDtcXG4gICAgICBtYXgtaGVpZ2h0OiBpbmhlcml0O1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIG1hcmdpbjogMCA1cHg7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHRvcDogMTAwJTtcXG4gICAgICBsZWZ0OiBjYWxjKC01MCUgKyAxcHgpO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7IH1cXG4gICAgLmJ0bi10bS12b2x1bWUgLmJ0bi10bS12b2x1bWVfYmFyIC5idG4tdG0tdm9sdW1lX2Jhcl92YWx1ZSB7XFxuICAgICAgd2lkdGg6IDJweDtcXG4gICAgICBoZWlnaHQ6IGNhbGModmFyKC0tdmFsdWUpIC8gMTAwICogMTAwJSk7XFxuICAgICAgbWF4LWhlaWdodDogaW5oZXJpdDtcXG4gICAgICBtYXJnaW46IDAgNXB4O1xcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfd2Fybik7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIHRvcDogMTAwJTtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpOyB9XFxuICAgICAgLmJ0bi10bS12b2x1bWUgLmJ0bi10bS12b2x1bWVfYmFyIC5idG4tdG0tdm9sdW1lX2Jhcl92YWx1ZTo6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHdpZHRoOiAxMnB4O1xcbiAgICAgICAgaGVpZ2h0OiA3cHg7XFxuICAgICAgICBtYXgtaGVpZ2h0OiA3cHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBsZWZ0OiA1MCU7XFxuICAgICAgICB0b3A6IDA7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfd2Fybik7IH1cXG4gICAgLmJ0bi10bS12b2x1bWUgLmJ0bi10bS12b2x1bWVfYmFyOjpiZWZvcmUge1xcbiAgICAgIHRyYW5zaXRpb246IG1heC1oZWlnaHQgLjI1cyBlYXNlOyB9XFxuICAgIC5idG4tdG0tdm9sdW1lIC5idG4tdG0tdm9sdW1lX2JhciAuYnRuLXRtLXZvbHVtZV9iYXJfdmFsdWUge1xcbiAgICAgIHRyYW5zaXRpb246IGFsbCAuMjVzIGVhc2U7IH1cXG4gICAgICAuYnRuLXRtLXZvbHVtZSAuYnRuLXRtLXZvbHVtZV9iYXIgLmJ0bi10bS12b2x1bWVfYmFyX3ZhbHVlOjphZnRlciB7XFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjI1cyAuMjVzIGVhc2U7IH1cXG4gICAgLmJ0bi10bS12b2x1bWUgLmJ0bi10bS12b2x1bWVfYmFyLmNsb3NlZCB7XFxuICAgICAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAuMjVzIGVhc2U7XFxuICAgICAgbWF4LWhlaWdodDogMHB4OyB9XFxuICAgICAgLmJ0bi10bS12b2x1bWUgLmJ0bi10bS12b2x1bWVfYmFyLmNsb3NlZCAuYnRuLXRtLXZvbHVtZV9iYXJfdmFsdWU6OmFmdGVyIHtcXG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuMjVzIGVhc2UsIHZpc2liaWxpdHkgMHMgLjI1cztcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDAuMik7XFxuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47IH1cXG4gIC5idG4tdG0tdm9sdW1lOmhvdmVyICpbY2xhc3N8PVxcXCJpY29uXFxcIl0sIC5idG4tdG0tdm9sdW1lOmhvdmVyIC5pY29uIHtcXG4gICAgLS1jb2xvcl8xOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X3dhcm4pOyB9XFxuICAuYnRuLXRtLXZvbHVtZTphY3RpdmUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpOyB9XFxuXFxuLmJ0bi50bS1iYWNrd2FyZCwgLmJ0bi50bS1mb3J3YXJkLCAuYnRuLXRtLXNwZWVkIHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuXFxuLmJ0bi50bS1iYWNrd2FyZCwgLmJ0bi50bS1mb3J3YXJkIHtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIHRyYW5zaXRpb246IGFsbCAuMjVzIGVhc2U7IH1cXG4gIC5idG4udG0tYmFja3dhcmQgKltjbGFzc3w9XFxcImljb25cXFwiXSwgLmJ0bi50bS1iYWNrd2FyZCAuaWNvbiwgLmJ0bi50bS1mb3J3YXJkICpbY2xhc3N8PVxcXCJpY29uXFxcIl0sIC5idG4udG0tZm9yd2FyZCAuaWNvbiB7XFxuICAgIC0tY29sb3JfMTogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8yX3NoYWRlKTsgfVxcbiAgLmJ0bi50bS1iYWNrd2FyZDpob3ZlciAqW2NsYXNzfD1cXFwiaWNvblxcXCJdLCAuYnRuLnRtLWJhY2t3YXJkOmhvdmVyIC5pY29uLCAuYnRuLnRtLWZvcndhcmQ6aG92ZXIgKltjbGFzc3w9XFxcImljb25cXFwiXSwgLmJ0bi50bS1mb3J3YXJkOmhvdmVyIC5pY29uIHtcXG4gICAgLS1jb2xvcl8xOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X3dhcm4pOyB9XFxuICAuYnRuLnRtLWJhY2t3YXJkOmFjdGl2ZSwgLmJ0bi50bS1mb3J3YXJkOmFjdGl2ZSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7IH1cXG5cXG4uYnRuLXRtLXBsYXkge1xcbiAgLS1zaXplOiA0OHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiB2YXIoLS1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tc2l6ZSk7XFxuICBtaW4td2lkdGg6IHZhcigtLXNpemUpO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTtcXG4gIHRyYW5zaXRpb246IGFsbCAuMjVzIGVhc2U7IH1cXG4gIC5idG4tdG0tcGxheSA+IHNwYW4ge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBoZWlnaHQ6IDUwJTtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8xKTtcXG4gICAgY2xpcC1wYXRoOiBwb2x5Z29uKDEyLjUlIDAsIDEyLjUlIDEwMCUsIDM3LjUlIDEwMCUsIDM3LjUlIDAsIDYyLjUlIDAsIDYyLjUlIDEwMCUsIDg3LjUlIDEwMCUsIDg3LjUlIDApOyB9XFxuICAuYnRuLXRtLXBsYXk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzIpOyB9XFxuICAuYnRuLXRtLXBsYXk6YWN0aXZlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTsgfVxcbiAgLmJ0bi10bS1wbGF5LmFjdGl2ZSA+IHNwYW4ge1xcbiAgICBjbGlwLXBhdGg6IHBvbHlnb24oMTIuNSUgMCwgMTIuNSUgMTAwJSwgMTAwJSA1MCUpOyB9XFxuXFxuLnBsYXllclRpbWVsaW5lIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0bztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGdyaWQtZ2FwOiA0cHggMDsgfVxcbiAgLnBsYXllclRpbWVsaW5lIC5wbGF5ZXJUaW1lbGluZV9wcm9ncmVzc19iYXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIGdyaWQtY29sdW1uOiAxLzM7XFxuICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAucGxheWVyVGltZWxpbmUgLnBsYXllclRpbWVsaW5lX3Byb2dyZXNzX2Jhcjo6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV9sdXJraW5nX3RyKTtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICB0b3A6IDVweDtcXG4gICAgICBoZWlnaHQ6IDJweDtcXG4gICAgICBncmlkLWNvbHVtbjogMS8zOyB9XFxuICAgIC5wbGF5ZXJUaW1lbGluZSAucGxheWVyVGltZWxpbmVfcHJvZ3Jlc3NfYmFyIC5wbGF5ZXJUaW1lbGluZV9wcm9ncmVzc192YWx1ZSB7XFxuICAgICAgd2lkdGg6IGNhbGModmFyKC0tdmFsdWUpIC8gdmFyKC0tbWF4KSAqIDEwMCUpO1xcbiAgICAgIGhlaWdodDogMnB4O1xcbiAgICAgIG1hcmdpbjogNXB4IDAgMCAwO1xcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfd2Fybik7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgICAgLnBsYXllclRpbWVsaW5lIC5wbGF5ZXJUaW1lbGluZV9wcm9ncmVzc19iYXIgLnBsYXllclRpbWVsaW5lX3Byb2dyZXNzX3ZhbHVlOjphZnRlciB7XFxuICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgd2lkdGg6IDEycHg7XFxuICAgICAgICBoZWlnaHQ6IDEycHg7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X3dhcm4pO1xcbiAgICAgICAgbGVmdDogMTAwJTtcXG4gICAgICAgIHRvcDogNTAlO1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7IH1cXG4gIC5wbGF5ZXJUaW1lbGluZSAucGxheWVyVGltZWxpbmVfY3VycmVudFRpbWUsIC5wbGF5ZXJUaW1lbGluZSAucGxheWVyVGltZWxpbmVfYWxsVGltZSB7XFxuICAgIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X2x1cmtpbmdfc2hhZGUpOyB9XFxuXFxuLmJ0bi10aGVtZV9jaGVja2JveCB7XFxuICAtLXNpemU6IDIwcHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IHZhcigtLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tc2l6ZSkgKiAyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggMHB4ICMwMDAwMDA3MzsgfVxcbiAgLmJ0bi10aGVtZV9jaGVja2JveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcbiAgLmJ0bi10aGVtZV9jaGVja2JveCBzcGFuIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLXNpemUpIC0gdmFyKC0tc2l6ZSkgLyA2ICogMik7XFxuICAgIGhlaWdodDogY2FsYyh2YXIoLS1zaXplKSAtIHZhcigtLXNpemUpIC8gNiAqIDIpO1xcbiAgICBib3JkZXI6IHNvbGlkIGNhbGModmFyKC0tc2l6ZSkgLyA2KSB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X2x1cmtpbmdfdHIpO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfbHVya2luZ190cik7IH1cXG4gIC5idG4tdGhlbWVfY2hlY2tib3ggc3BhbiB7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGN1YmljLWJlemllcigwLjU1LCAtMC4wNywgMC41MiwgMS4wNyk7IH1cXG4gIC5idG4tdGhlbWVfY2hlY2tib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpjaGVja2VkIH4gc3BhbiB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKDEwMCUgKyAycHgpKTtcXG4gICAgYm9yZGVyOiBzb2xpZCBjYWxjKHZhcigtLXNpemUpIC8gNiArIDFweCkgdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTsgfVxcblxcbi5pdGVtLXRyYWNrIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gMWZyIGF1dG87XFxuICBncmlkLWdhcDogNHB4IDA7IH1cXG4gIC5pdGVtLXRyYWNrOjpiZWZvcmUge1xcbiAgICBjb3VudGVyLWluY3JlbWVudDogaXRlbV9udW1iZXI7XFxuICAgIGNvbnRlbnQ6IGNvdW50ZXIoaXRlbV9udW1iZXIpIFxcXCIuXFxcIjtcXG4gICAgZ3JpZC1jb2x1bW46IDEvMjtcXG4gICAgZ3JpZC1yb3c6IDEvMztcXG4gICAgbWFyZ2luOiAwIDEwcHggMCAwO1xcbiAgICBmb250LWZhbWlseTogR1QgU2VjdHJhIERpc3BsYXk7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICBsaW5lLWhlaWdodDogMjJweDtcXG4gICAgLS1saW5lLWhlaWdodDogMjJweDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDBlbTtcXG4gICAgY29sb3I6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfbHVya2luZ19zaGFkZSk7IH1cXG4gIC5pdGVtLXRyYWNrIC5pdGVtLXRyYWNrX25hbWUge1xcbiAgICBncmlkLWNvbHVtbjogMi8zO1xcbiAgICBncmlkLXJvdzogMS8yO1xcbiAgICBjb2xvcjogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8yKTsgfVxcbiAgLml0ZW0tdHJhY2sgLml0ZW0tdHJhY2tfbWluaUluZm8ge1xcbiAgICBncmlkLWNvbHVtbjogMi8zO1xcbiAgICBncmlkLXJvdzogMi8zO1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICAgIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X2x1cmtpbmcpOyB9XFxuICAuaXRlbS10cmFjayAuYnRuLnBsYXkge1xcbiAgICBncmlkLWNvbHVtbjogMy80O1xcbiAgICBncmlkLXJvdzogMS8zO1xcbiAgICBtYXJnaW46IDAgMCAwIDEwcHg7IH1cXG4gICAgLml0ZW0tdHJhY2sgLmJ0bi5wbGF5ICpbY2xhc3N8PVxcXCJpY29uXFxcIl0sIC5pdGVtLXRyYWNrIC5idG4ucGxheSAuaWNvbiB7XFxuICAgICAgLS1jb2xvcl8xOiB0cmFuc3BhcmVudDtcXG4gICAgICAtLWNvbG9yXzI6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfd2Fybik7IH1cXG4gICAgLml0ZW0tdHJhY2sgLmJ0bi5wbGF5OmhvdmVyICpbY2xhc3N8PVxcXCJpY29uXFxcIl0sIC5pdGVtLXRyYWNrIC5idG4ucGxheTpob3ZlciAuaWNvbiB7XFxuICAgICAgLS1jb2xvcl8xOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X3dhcm4pO1xcbiAgICAgIC0tY29sb3JfMjogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTsgfVxcblxcbi5wYW5lbC1hbGJ1bUhlYWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5wYW5lbC1hbGJ1bUhlYWQgLnBhbmVsLWFsYnVtSGVhZF9jb3ZlciB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDE2MHB4O1xcbiAgICBoZWlnaHQ6IDE2MHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIG1hcmdpbjogMCAwIDI0cHggMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgZmxvYXQ6IGxlZnQ7IH1cXG4gICAgLnBhbmVsLWFsYnVtSGVhZCAucGFuZWwtYWxidW1IZWFkX2NvdmVyID4gaW1nLCAucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfY292ZXIgPiBjYW52YXMge1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICBvYmplY3QtZml0OiBjb3ZlcjsgfVxcbiAgLnBhbmVsLWFsYnVtSGVhZCAucGFuZWwtYWxidW1IZWFkX2F1dGhvciB7XFxuICAgIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X3dhcm4pOyB9XFxuICAucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfZGVzYyB7XFxuICAgIG1hcmdpbjogMTZweCAwOyB9XFxuICAucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfdGl0bGUge1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfdGl0bGUgPiAqIHtcXG4gICAgICB3aGl0ZS1zcGFjZTogaW5oZXJpdDtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBpbmhlcml0O1xcbiAgICAgIG92ZXJmbG93OiBpbmhlcml0OyB9XFxuICAucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfbGluZSB7XFxuICAgIG1heC1oZWlnaHQ6IDEwMHB4OyB9XFxuICAgIC5wYW5lbC1hbGJ1bUhlYWQgLnBhbmVsLWFsYnVtSGVhZF9saW5lICpbY2xhc3N8PVxcXCJidG5cXFwiXSwgLnBhbmVsLWFsYnVtSGVhZCAucGFuZWwtYWxidW1IZWFkX2xpbmUgKltjbGFzcyo9XFxcImJ0blxcXCJdLCAucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfbGluZSAuYnRuIHtcXG4gICAgICBtYXJnaW46IDhweDsgfVxcbiAgICAgIC5wYW5lbC1hbGJ1bUhlYWQgLnBhbmVsLWFsYnVtSGVhZF9saW5lICpbY2xhc3N8PVxcXCJidG5cXFwiXTpudGgtY2hpbGQoMSksIC5wYW5lbC1hbGJ1bUhlYWQgLnBhbmVsLWFsYnVtSGVhZF9saW5lICpbY2xhc3MqPVxcXCJidG5cXFwiXTpudGgtY2hpbGQoMSksIC5wYW5lbC1hbGJ1bUhlYWQgLnBhbmVsLWFsYnVtSGVhZF9saW5lIC5idG46bnRoLWNoaWxkKDEpIHtcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwOyB9XFxuICAgICAgLnBhbmVsLWFsYnVtSGVhZCAucGFuZWwtYWxidW1IZWFkX2xpbmUgKltjbGFzc3w9XFxcImJ0blxcXCJdOm50aC1sYXN0LWNoaWxkKDEpLCAucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfbGluZSAqW2NsYXNzKj1cXFwiYnRuXFxcIl06bnRoLWxhc3QtY2hpbGQoMSksIC5wYW5lbC1hbGJ1bUhlYWQgLnBhbmVsLWFsYnVtSGVhZF9saW5lIC5idG46bnRoLWxhc3QtY2hpbGQoMSkge1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwOyB9XFxuXFxuLnBhbmVsLWFsYnVtSGVhZCAucGFuZWwtYWxidW1IZWFkX3BhcnQtMSAucGFuZWwtYWxidW1IZWFkX2NvdmVyIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7IH1cXG5cXG4ucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfcGFydC0xIC5wYW5lbC1hbGJ1bUhlYWRfdGl0bGUge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZSwgZGlzcGxheSAwcyAwLjVzO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMjBweCwgLTIwcHgpO1xcbiAgb3BhY2l0eTogMDsgfVxcblxcbi5wYW5lbC1hbGJ1bUhlYWQgLnBhbmVsLWFsYnVtSGVhZF9wYXJ0LTIge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcXG4gIG1heC1oZWlnaHQ6IDI1MHB4OyB9XFxuICAucGFuZWwtYWxidW1IZWFkIC5wYW5lbC1hbGJ1bUhlYWRfcGFydC0yID4gKiB7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7IH1cXG5cXG4ucGFuZWwtYWxidW1IZWFkLm1pbmlfdmVyIC5wYW5lbC1hbGJ1bUhlYWRfcGFydC0xIC5wYW5lbC1hbGJ1bUhlYWRfY292ZXIge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcXG4gIHdpZHRoOiA2MHB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgbWFyZ2luOiAwIDE2cHggMTZweCAwOyB9XFxuXFxuLnBhbmVsLWFsYnVtSGVhZC5taW5pX3ZlciAucGFuZWwtYWxidW1IZWFkX3BhcnQtMSAucGFuZWwtYWxidW1IZWFkX3RpdGxlIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIDAuNXMgZWFzZSwgZGlzcGxheSAwcyAwcztcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4ucGFuZWwtYWxidW1IZWFkLm1pbmlfdmVyIC5wYW5lbC1hbGJ1bUhlYWRfcGFydC0yIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XFxuICBtYXgtaGVpZ2h0OiAwcHg7IH1cXG4gIC5wYW5lbC1hbGJ1bUhlYWQubWluaV92ZXIgLnBhbmVsLWFsYnVtSGVhZF9wYXJ0LTIgPiAqIHtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMHB4KTtcXG4gICAgb3BhY2l0eTogMDsgfVxcblxcbi5wYW5lbC10cmFja1BsYXlpbmcge1xcbiAgd2lkdGg6IHZhcigtLXZpZXdib3hfd2lkdGgpO1xcbiAgaGVpZ2h0OiB2YXIoLS12aWV3Ym94X2hlaWdodCk7XFxuICBtYXgtaGVpZ2h0OiAxMDAlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDEwcHggMjZweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEycHggMTJweCAwIDA7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl9wYW5lbF9iYWNrZ3JvdW5kXzEpO1xcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XFxuICBvdmVyZmxvdzogc2Nyb2xsOyB9XFxuICAucGFuZWwtdHJhY2tQbGF5aW5nOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICAgIHdpZHRoOiAwcHg7IH1cXG4gIC5wYW5lbC10cmFja1BsYXlpbmcgLmJ0bi5jbG9zZV9vcGVuIHtcXG4gICAgbWFyZ2luOiAwIDAgMTZweCAwO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjI1cyBlYXNlOyB9XFxuICAgIC5wYW5lbC10cmFja1BsYXlpbmcgLmJ0bi5jbG9zZV9vcGVuICpbY2xhc3N8PVxcXCJpY29uXFxcIl0sIC5wYW5lbC10cmFja1BsYXlpbmcgLmJ0bi5jbG9zZV9vcGVuIC5pY29uIHtcXG4gICAgICAtLWNvbG9yXzE6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfMik7XFxuICAgICAgLS1zaXplOiAzMnB4O1xcbiAgICAgIG1hcmdpbjogMCAwIDAgLTlweDsgfVxcbiAgICAucGFuZWwtdHJhY2tQbGF5aW5nIC5idG4uY2xvc2Vfb3Blbjpob3ZlciB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpOyB9XFxuICAgIC5wYW5lbC10cmFja1BsYXlpbmcgLmJ0bi5jbG9zZV9vcGVuOmFjdGl2ZSB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpIHNjYWxlKDAuODUpOyB9XFxuICAucGFuZWwtdHJhY2tQbGF5aW5nIC5wYW5lbC10cmFja1BsYXlpbmdfY292ZXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLXZpZXdib3hfd2lkdGgpIC0gMjZweCAqIDIpO1xcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbiAgICBoZWlnaHQ6IGNhbGModmFyKC0tdmlld2JveF93aWR0aCkgLSAyNnB4ICogMik7XFxuICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIG1hcmdpbjogMCBhdXRvIDI0cHggYXV0bztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAucGFuZWwtdHJhY2tQbGF5aW5nIC5wYW5lbC10cmFja1BsYXlpbmdfY292ZXIgPiBpbWcsIC5wYW5lbC10cmFja1BsYXlpbmcgLnBhbmVsLXRyYWNrUGxheWluZ19jb3ZlciA+IGNhbnZhcyB7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgIG9iamVjdC1maXQ6IGNvdmVyOyB9XFxuICAucGFuZWwtdHJhY2tQbGF5aW5nIC5wYW5lbC10cmFja1BsYXlpbmdfdGV4dCB7XFxuICAgIG1hcmdpbjogMjRweCAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzIpOyB9XFxuICAgIC5wYW5lbC10cmFja1BsYXlpbmcgLnBhbmVsLXRyYWNrUGxheWluZ190ZXh0IGg0LCAucGFuZWwtdHJhY2tQbGF5aW5nIC5wYW5lbC10cmFja1BsYXlpbmdfdGV4dCBoNSwgLnBhbmVsLXRyYWNrUGxheWluZyAucGFuZWwtdHJhY2tQbGF5aW5nX3RleHQgaDYge1xcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5X2x1cmtpbmcpOyB9XFxuICAucGFuZWwtdHJhY2tQbGF5aW5nIC5wYW5lbC10cmFja1BsYXlpbmdfY29udHJvbCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogY2FsYyg1MCUgLSAyNHB4KSA0OHB4IGF1dG87IH1cXG4gICAgLnBhbmVsLXRyYWNrUGxheWluZyAucGFuZWwtdHJhY2tQbGF5aW5nX2NvbnRyb2wgLnBhbmVsLXRyYWNrUGxheWluZ19jb250cm9sX2xpbmUgPiAqIHtcXG4gICAgICBtYXJnaW46IDAgMTJweDsgfVxcbiAgICAucGFuZWwtdHJhY2tQbGF5aW5nIC5wYW5lbC10cmFja1BsYXlpbmdfY29udHJvbCAuYnRuLXRtLXBsYXkge1xcbiAgICAgIC0tc2l6ZTogNDhweDsgfVxcbiAgICAucGFuZWwtdHJhY2tQbGF5aW5nIC5wYW5lbC10cmFja1BsYXlpbmdfY29udHJvbCA+IC5wYW5lbC10cmFja1BsYXlpbmdfY29udHJvbF9saW5lIHtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9XFxuICAucGFuZWwtdHJhY2tQbGF5aW5nIC5sb2FkZXJfcGFuZWwge1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl9wYW5lbF9iYWNrZ3JvdW5kXzEpOyB9XFxuICAgIC5wYW5lbC10cmFja1BsYXlpbmcgLmxvYWRlcl9wYW5lbCAqW2NsYXNzfD1cXFwibG9hZGVyXFxcIl0ge1xcbiAgICAgIC0tY29sb3I6IHZhcigtLWNvbG9yX2JhY2tncm91bmQpOyB9XFxuICAgIC5wYW5lbC10cmFja1BsYXlpbmcgLmxvYWRlcl9wYW5lbDpub3QoLmlzX2hpZGRlbikgfiAqIHtcXG4gICAgICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmxpc3QtdHJhY2tzIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LWhlaWdodDogMTAwJTtcXG4gIHBhZGRpbmc6IDEwcHggMDtcXG4gIGJvcmRlci1yYWRpdXM6IDEycHggMTJweCAwIDA7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl9wYW5lbF9iYWNrZ3JvdW5kXzEpO1xcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XFxuICBvdmVyZmxvdzogc2Nyb2xsOyB9XFxuICAubGlzdC10cmFja3M6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG4gICAgd2lkdGg6IDBweDsgfVxcbiAgLmxpc3QtdHJhY2tzIC5saXN0LXRyYWNrc19pdGVtcyB7XFxuICAgIGNvdW50ZXItcmVzZXQ6IGl0ZW1fbnVtYmVyOyB9XFxuICAgIC5saXN0LXRyYWNrcyAubGlzdC10cmFja3NfaXRlbXMgLml0ZW0tdHJhY2sge1xcbiAgICAgIG1hcmdpbjogMTJweCAxOHB4OyB9XFxuICAubGlzdC10cmFja3MgLmJ0bi5jbG9zZV9vcGVuIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbGVmdDogY2FsYyg1MCUgLSA5MHB4KTtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIG1hcmdpbjogLTEwcHggMCAwIDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAgMCAxMnB4IDEycHg7XFxuICAgIHBhZGRpbmc6IDEwcHggMCA4cHggMDsgfVxcbiAgICAubGlzdC10cmFja3MgLmJ0bi5jbG9zZV9vcGVuID4gc3BhbiB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgd2lkdGg6IDE2cHg7XFxuICAgICAgaGVpZ2h0OiAycHg7XFxuICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV9sdXJraW5nKTsgfVxcbiAgICAubGlzdC10cmFja3MgLmJ0bi5jbG9zZV9vcGVuLmlzX2hpZGRlbiB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgLmxpc3QtdHJhY2tzIC5saXN0LXRyYWNrc19oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMThweDtcXG4gICAgbWFyZ2luOiAtMTBweCAwIDAgMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAubGlzdC10cmFja3MgLmxpc3QtdHJhY2tzX2hlYWRlciAuYnRuLmNsb3NlX29wZW4ge1xcbiAgICAgIG1hcmdpbjogMThweCAwIC0xOHB4IDA7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjI1cyBlYXNlOyB9XFxuICAgICAgLmxpc3QtdHJhY2tzIC5saXN0LXRyYWNrc19oZWFkZXIgLmJ0bi5jbG9zZV9vcGVuID4gc3BhbiB7XFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjI1cyBlYXNlOyB9XFxuICAgICAgLmxpc3QtdHJhY2tzIC5saXN0LXRyYWNrc19oZWFkZXIgLmJ0bi5jbG9zZV9vcGVuOmFjdGl2ZSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTExMCUpOyB9XFxuICAgIC5saXN0LXRyYWNrcyAubGlzdC10cmFja3NfaGVhZGVyLmZpeGVkIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IH1cXG4gICAgICAubGlzdC10cmFja3MgLmxpc3QtdHJhY2tzX2hlYWRlci5maXhlZCAuYnRuLmNsb3NlX29wZW4ge1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX3RvcG9ncmFwaHlfd2Fybik7IH1cXG4gICAgICAgIC5saXN0LXRyYWNrcyAubGlzdC10cmFja3NfaGVhZGVyLmZpeGVkIC5idG4uY2xvc2Vfb3BlbiA+IHNwYW4ge1xcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzEpOyB9XFxuICAgICAgICAubGlzdC10cmFja3MgLmxpc3QtdHJhY2tzX2hlYWRlci5maXhlZCAuYnRuLmNsb3NlX29wZW46YWN0aXZlIHtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpOyB9XFxuICAgIC5saXN0LXRyYWNrcyAubGlzdC10cmFja3NfaGVhZGVyLmlzX2hpZGRlbiB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5saXN0LXRyYWNrcy5vcGVuZWQgLmJ0bi5jbG9zZV9vcGVuOmhvdmVyID4gc3BhbjpudGgtY2hpbGQoMSkge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMjVkZWcpIHRyYW5zbGF0ZSgwJSwgLTEwMCUpOyB9XFxuXFxuLmxpc3QtdHJhY2tzLm9wZW5lZCAuYnRuLmNsb3NlX29wZW46aG92ZXIgPiBzcGFuOm50aC1jaGlsZCgyKSB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjVkZWcpIHRyYW5zbGF0ZSgwJSwgLTEwMCUpOyB9XFxuXFxuLmxpc3QtdHJhY2tzOm5vdCgub3BlbmVkKSAuYnRuLmNsb3NlX29wZW46aG92ZXIgPiBzcGFuOm50aC1jaGlsZCgxKSwgLmxpc3QtdHJhY2tzLm9wZW5lZCAubGlzdC10cmFja3NfaGVhZGVyLmZpeGVkIC5idG4uY2xvc2Vfb3Blbjpob3ZlciA+IHNwYW46bnRoLWNoaWxkKDEpIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC0yNWRlZykgdHJhbnNsYXRlKDEwJSwgLTYwJSk7IH1cXG5cXG4ubGlzdC10cmFja3M6bm90KC5vcGVuZWQpIC5idG4uY2xvc2Vfb3Blbjpob3ZlciA+IHNwYW46bnRoLWNoaWxkKDIpLCAubGlzdC10cmFja3Mub3BlbmVkIC5saXN0LXRyYWNrc19oZWFkZXIuZml4ZWQgLmJ0bi5jbG9zZV9vcGVuOmhvdmVyID4gc3BhbjpudGgtY2hpbGQoMikge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMjVkZWcpIHRyYW5zbGF0ZSgtMTAlLCAtNjAlKTsgfVxcblxcbi5sb2FkZXJfcGFuZWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogOTk5OTk7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl9iYWNrZ3JvdW5kKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG5cXG4ubG9hZGVyX3BhbmVsIHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICBvcGFjaXR5OiAxO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMsIHZpc2liaWxpdHkgMHMgMHM7IH1cXG4gIC5sb2FkZXJfcGFuZWwuaXNfaGlkZGVuIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIDFzLCBib3JkZXItcmFkaXVzIDAuM3MgMS4ycywgdmlzaWJpbGl0eSAwcyAxLjVzOyB9XFxuXFxuLmxvYWRlci10MSB7XFxuICB3aWR0aDogOHB4O1xcbiAgaGVpZ2h0OiA4cHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBjb2xvcjogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTtcXG4gIGJhY2tncm91bmQ6IGN1cnJlbnRDb2xvcjtcXG4gIGFuaW1hdGlvbjogYW5pbV9fbG9hZGVyLXQxIDAuM3MgMC4zcyBsaW5lYXIgaW5maW5pdGUgYWx0ZXJuYXRlOyB9XFxuICAubG9hZGVyLXQxOjphZnRlciwgLmxvYWRlci10MTo6YmVmb3JlIHtcXG4gICAgY29udGVudDogJyc7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGJhY2tncm91bmQ6IGN1cnJlbnRDb2xvcjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgdG9wOiAxNXB4O1xcbiAgICBhbmltYXRpb246IGFuaW1fX2xvYWRlci10MSAwLjNzIDAuNDVzIGxpbmVhciBpbmZpbml0ZSBhbHRlcm5hdGU7IH1cXG4gIC5sb2FkZXItdDE6OmFmdGVyIHtcXG4gICAgdG9wOiAtMTVweDtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwczsgfVxcblxcbi5sb2FkZXJfcGFuZWwgLmxvYWRlci10MSB7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyAxcyBlYXNlOyB9XFxuICAubG9hZGVyX3BhbmVsIC5sb2FkZXItdDE6OmJlZm9yZSwgLmxvYWRlcl9wYW5lbCAubG9hZGVyLXQxOjphZnRlciB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIDAuNXMgZWFzZSwgYm9yZGVyLXJhZGl1cyAwLjNzIDAuNXMgMS40IGVhc2UsIGhlaWdodCAwLjVzIDFzIGVhc2U7IH1cXG5cXG4ubG9hZGVyX3BhbmVsLmlzX2hpZGRlbiAubG9hZGVyLXQxIHtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIDAuNXMgZWFzZTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJhY2t3YXJkcztcXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHVuc2V0O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxcbiAgLmxvYWRlcl9wYW5lbC5pc19oaWRkZW4gLmxvYWRlci10MTo6YmVmb3JlLCAubG9hZGVyX3BhbmVsLmlzX2hpZGRlbiAubG9hZGVyLXQxOjphZnRlciB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UsIGhlaWdodCAwLjVzIDAuNXMgZWFzZTtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYmFja3dhcmRzO1xcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB1bnNldDsgfVxcbiAgLmxvYWRlcl9wYW5lbC5pc19oaWRkZW4gLmxvYWRlci10MTo6YmVmb3JlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNXB4KSB0cmFuc2xhdGVYKC01MCUpOyB9XFxuICAubG9hZGVyX3BhbmVsLmlzX2hpZGRlbiAubG9hZGVyLXQxOjphZnRlciB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNXB4KSB0cmFuc2xhdGVYKC01MCUpOyB9XFxuXFxuQGtleWZyYW1lcyBhbmltX19sb2FkZXItdDEge1xcbiAgMCUge1xcbiAgICB3aWR0aDogOHB4OyB9XFxuICAxMDAlIHtcXG4gICAgd2lkdGg6IDgwcHg7IH0gfVxcblxcbi5sb2FkZXItdDIge1xcbiAgLS1jb2xvcjogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8xKTtcXG4gIHdpZHRoOiA4cHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcik7XFxuICBjb2xvcjogdmFyKC0tY29sb3IpO1xcbiAgYW5pbWF0aW9uOiBhbmltX19sb2FkZXItdDIgMC41cyAwLjVzIGxpbmVhciBpbmZpbml0ZSBhbHRlcm5hdGU7IH1cXG4gIC5sb2FkZXItdDI6OmFmdGVyLCAubG9hZGVyLXQyOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiAnJztcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yKTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICBsZWZ0OiAyMHB4O1xcbiAgICBhbmltYXRpb246IGFuaW1fX2xvYWRlci10MiAwLjVzIDAuNzVzIGxpbmVhciBpbmZpbml0ZSBhbHRlcm5hdGU7IH1cXG4gIC5sb2FkZXItdDI6OmJlZm9yZSB7XFxuICAgIGxlZnQ6IC0yMHB4O1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDBzOyB9XFxuXFxuLmxvYWRlcl9wYW5lbCAubG9hZGVyLXQyIHtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIDFzIGVhc2U7IH1cXG4gIC5sb2FkZXJfcGFuZWwgLmxvYWRlci10Mjo6YmVmb3JlLCAubG9hZGVyX3BhbmVsIC5sb2FkZXItdDI6OmFmdGVyIHtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgMC41cyBlYXNlLCBib3JkZXItcmFkaXVzIDAuM3MgMC41cyAxLjQgZWFzZSwgaGVpZ2h0IDAuNXMgMXMgZWFzZTsgfVxcblxcbi5sb2FkZXJfcGFuZWwuaXNfaGlkZGVuIC5sb2FkZXItdDIge1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgMC41cyBlYXNlO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYmFja3dhcmRzO1xcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdW5zZXQ7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XFxuICAubG9hZGVyX3BhbmVsLmlzX2hpZGRlbiAubG9hZGVyLXQyOjpiZWZvcmUsIC5sb2FkZXJfcGFuZWwuaXNfaGlkZGVuIC5sb2FkZXItdDI6OmFmdGVyIHtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZSwgaGVpZ2h0IDAuNXMgMC41cyBlYXNlO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBiYWNrd2FyZHM7XFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHVuc2V0OyB9XFxuICAubG9hZGVyX3BhbmVsLmlzX2hpZGRlbiAubG9hZGVyLXQyOjpiZWZvcmUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCkgdHJhbnNsYXRlWSgtNTAlKTsgfVxcbiAgLmxvYWRlcl9wYW5lbC5pc19oaWRkZW4gLmxvYWRlci10Mjo6YWZ0ZXIge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpIHRyYW5zbGF0ZVkoLTUwJSk7IH1cXG5cXG5Aa2V5ZnJhbWVzIGFuaW1fX2xvYWRlci10MiB7XFxuICAwJSB7XFxuICAgIGhlaWdodDogNDhweDsgfVxcbiAgMTAwJSB7XFxuICAgIGhlaWdodDogNC44cHg7IH0gfVxcblxcbiNwYWdlX211c2ljTGlzdCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG8gMWZyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgcGFkZGluZzogMzJweCAyNHB4IDAgMjRweDsgfVxcbiAgI3BhZ2VfbXVzaWNMaXN0IGhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMzJweDtcXG4gICAgbWFyZ2luOiAwIDAgMTZweCAwOyB9XFxuICAgICNwYWdlX211c2ljTGlzdCBoZWFkZXIgLmJ0bi5yZXNldF9hbGJ1bSB7XFxuICAgICAgd2lkdGg6IDIwcHg7XFxuICAgICAgaGVpZ2h0OiAyMHB4O1xcbiAgICAgIHRyYW5zaXRpb246IGFsbCAuMjVzIGVhc2U7IH1cXG4gICAgICAjcGFnZV9tdXNpY0xpc3QgaGVhZGVyIC5idG4ucmVzZXRfYWxidW06aG92ZXIgKltjbGFzc3w9XFxcImljb25cXFwiXSwgI3BhZ2VfbXVzaWNMaXN0IGhlYWRlciAuYnRuLnJlc2V0X2FsYnVtOmhvdmVyIC5pY29uIHtcXG4gICAgICAgIC0tY29sb3JfMTogdmFyKC0tY29sb3JfdG9wb2dyYXBoeV93YXJuKTsgfVxcbiAgICAgICNwYWdlX211c2ljTGlzdCBoZWFkZXIgLmJ0bi5yZXNldF9hbGJ1bTphY3RpdmUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KSByb3RhdGUoMzYwZGVnKTsgfVxcbiAgI3BhZ2VfbXVzaWNMaXN0IC5wYW5lbC1hbGJ1bUhlYWQge1xcbiAgICBtYXJnaW46IDAgMCAzMnB4IDA7XFxuICAgIGNvbG9yOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzEpOyB9XFxuICAjcGFnZV9tdXNpY0xpc3QgLmxpc3QtdHJhY2tzIHtcXG4gICAgd2lkdGg6IGNhbGMoMTAwJSArIDI0cHggKiAyKTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBtYXJnaW46IDAgMCAwIC0yNHB4O1xcbiAgICB6LWluZGV4OiAyO1xcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC41cyBlYXNlO1xcbiAgICBib3gtc2hhZG93OiAwcHggLTNweCAxNXB4IC0zcHggIzAwMDAwMDczOyB9XFxuICAgICNwYWdlX211c2ljTGlzdCAubGlzdC10cmFja3Mub3BlbmVkIHtcXG4gICAgICBib3gtc2hhZG93OiAwcHggLTdweCA5cHggLTVweCAjMDAwMDAwM2Q7IH1cXG4gICNwYWdlX211c2ljTGlzdCAucGFuZWwtdHJhY2tQbGF5aW5nIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDEwMCU7XFxuICAgIHotaW5kZXg6IDM7XFxuICAgIGJveC1zaGFkb3c6IDBweCAtN3B4IDlweCAtMXB4ICMwMDAwMDAzZDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgY3ViaWMtYmV6aWVyKDAuNiwgMC4wMSwgMC4yNSwgMSk7IH1cXG4gICAgI3BhZ2VfbXVzaWNMaXN0IC5wYW5lbC10cmFja1BsYXlpbmcgPiAqOm5vdCgubG9hZGVyX3BhbmVsKSB7XFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcXG4gICAgICBvcGFjaXR5OiAwO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7IH1cXG4gICAgI3BhZ2VfbXVzaWNMaXN0IC5wYW5lbC10cmFja1BsYXlpbmcub3BlbmVkIHtcXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBjdWJpYy1iZXppZXIoMC42LCAwLjAxLCAwLjI1LCAxKSwgYm9yZGVyLXJhZGl1cyAwLjVzIDAuNHMgY3ViaWMtYmV6aWVyKDAuNiwgMC4wMSwgMC4yNSwgMSk7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpOyB9XFxuICAgICAgI3BhZ2VfbXVzaWNMaXN0IC5wYW5lbC10cmFja1BsYXlpbmcub3BlbmVkID4gKjpub3QoLmxvYWRlcl9wYW5lbCkge1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgMC40NXMgZWFzZTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTsgfVxcbiAgI3BhZ2VfbXVzaWNMaXN0ID4gLmxvYWRlcl9wYW5lbCB7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX3BhbmVsX2JhY2tncm91bmRfMSk7IH1cXG4gICAgI3BhZ2VfbXVzaWNMaXN0ID4gLmxvYWRlcl9wYW5lbCAqW2NsYXNzfD1cXFwibG9hZGVyXFxcIl0ge1xcbiAgICAgIC0tY29sb3I6IHZhcigtLWNvbG9yX2JhY2tncm91bmQpOyB9XFxuICAgICNwYWdlX211c2ljTGlzdCA+IC5sb2FkZXJfcGFuZWwuaXNfaGlkZGVuIHtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XFxuICAgICAgb3BhY2l0eTogMTtcXG4gICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlOyB9XFxuXFxuQGtleWZyYW1lcyBsaXN0LXRyYWNrc19fYW5pbS1mYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgbWF4LWhlaWdodDogMCU7IH1cXG4gIDEwMCUge1xcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKHZhcigtLXZpZXdib3hfaGVpZ2h0KSAqIDAuNyk7IH0gfVxcblxcbmJvZHkge1xcbiAgLS1jb2xvcl9iYWNrZ3JvdW5kOiAjMzEzMDM4O1xcbiAgLS1jb2xvcl9wYW5lbF9iYWNrZ3JvdW5kXzE6ICNmNGY0ZjQ7XFxuICAtLWNvbG9yX3RvcG9ncmFwaHlfMTogI0ZGRkZGRjtcXG4gIC0tY29sb3JfdG9wb2dyYXBoeV8xX3NoYWRlOiAjZjRmNGY0O1xcbiAgLS1jb2xvcl90b3BvZ3JhcGh5XzI6ICMzMTMwMzg7XFxuICAtLWNvbG9yX3RvcG9ncmFwaHlfMl9zaGFkZTogIzVENUI2QTtcXG4gIC0tY29sb3JfdG9wb2dyYXBoeV9sdXJraW5nOiAjOTI5MjlkO1xcbiAgLS1jb2xvcl90b3BvZ3JhcGh5X2x1cmtpbmdfdHI6ICNkOWVkZjc7XFxuICAtLWNvbG9yX3RvcG9ncmFwaHlfbHVya2luZ19zaGFkZTogIzc1ODE4NDtcXG4gIC0tY29sb3JfdG9wb2dyYXBoeV93YXJuOiAjZWY1NDY2OyB9XFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwOyB9XFxuXFxuc3ZnLmFzc2V0cyB7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTsgfVxcblxcbmltZzpub3QoKltzcmNdKSwgaW1nW3NyYz1cXFwiI1xcXCJdIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgfVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxOTlkZWcsICM5NkExQTMgLTEwJSwgIzNhNTk4OCAxMDAlKTtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICAtLXZpZXdib3hfd2lkdGg6IDM2MHB4O1xcbiAgLS12aWV3Ym94X2hlaWdodDogNjQwcHg7IH1cXG4gIGJvZHkgLnBhZ2VfYmFja2dyb3VuZCB7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX2JhY2tncm91bmQpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7IH1cXG4gICAgYm9keSAucGFnZV9iYWNrZ3JvdW5kID4gc3ZnOm50aC1vZi10eXBlKDEpIHtcXG4gICAgICB3aWR0aDogMzU0cHg7XFxuICAgICAgaGVpZ2h0OiAzNjhweDsgfVxcbiAgICBib2R5IC5wYWdlX2JhY2tncm91bmQgPiBzdmc6bnRoLW9mLXR5cGUoMikge1xcbiAgICAgIHdpZHRoOiAxMTRweDtcXG4gICAgICBoZWlnaHQ6IDIzN3B4OyB9XFxuXFxuI3Jvb3Qge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuICAjcm9vdCBtYWluW2lkXj1cXFwicGFnZVxcXCJdIHtcXG4gICAgd2lkdGg6IHZhcigtLXZpZXdib3hfd2lkdGgpO1xcbiAgICBoZWlnaHQ6IHZhcigtLXZpZXdib3hfaGVpZ2h0KTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgICAjcm9vdCBtYWluW2lkXj1cXFwicGFnZVxcXCJdOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICAgICAgd2lkdGg6IDZweDsgfVxcbiAgICAjcm9vdCBtYWluW2lkXj1cXFwicGFnZVxcXCJdOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XFxuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyOiBzb2xpZCAxcHggdmFyKC0tY29sb3JfdG9wb2dyYXBoeV8xLXRyKTtcXG4gICAgICBib3JkZXItcmFkaXVzOiAyMHB4OyB9XFxuICAgICNyb290IG1haW5baWRePVxcXCJwYWdlXFxcIl06Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcl90b3BvZ3JhcGh5XzEpO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7IH1cXG5cXG4jc2NyZWVuIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiB2YXIoLS12aWV3Ym94X3dpZHRoKTtcXG4gIGhlaWdodDogdmFyKC0tdmlld2JveF9oZWlnaHQpO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yX2JhY2tncm91bmQpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgMCAyMHB4IDBweCAjMDAwMDAwMmU7XFxuICBib3JkZXI6IHNvbGlkIDhweCB2YXIoLS1jb2xvcl9iYWNrZ3JvdW5kKTsgfVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAzNzZweCkge1xcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMzc2cHgpIHtcXG4gIGJvZHkge1xcbiAgICAtLXZpZXdib3hfd2lkdGg6IDEwMHZ3O1xcbiAgICAtLXZpZXdib3hfaGVpZ2h0OiAxMDB2aDsgfVxcbiAgI3NjcmVlbiB7XFxuICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7IH0gfVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2ltYWdlcy9pbWdfNDA0LnBuZ1wiOyIsImltcG9ydCAnQHN0eWxlcy9nZW4uc2NzcydcclxuaW1wb3J0IFJlYWN0LCB7IFN1c3BlbnNlLCBsYXp5LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xyXG5cclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4vcmVkdXgvc3RvcmUnXHJcblxyXG5pbXBvcnQge2xvYWRfYWxidW19IGZyb20gJy4vcmVkdXgvYWN0aW9ucy9sb2FkZXJzJ1xyXG5pbXBvcnQge2NoYW5nZV9wYXRofSBmcm9tICcuL3JlZHV4L2FjdGlvbnMvYWxsJ1xyXG5cclxuaW1wb3J0IHtGYWxsYmFja19wcmVsb2FkZXIsIFByZWxvYWRlcn0gZnJvbSAnLi/RgW9tcG9uZW50cy9wYWdlX2VsZW1lbnRzL3ByZWxvYWRlcnMnO1xyXG5cclxuY29uc3QgUGFnZV9tdXNpY0xpc3QgPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgnLi/RgW9tcG9uZW50cy9wYWdlcy9wYWdlX211c2ljTGlzdCcpKTtcclxuXHJcbmZ1bmN0aW9uIHJhbmRvbU51bWJlcihtaW4sIG1heCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4gKVxyXG59XHJcblxyXG5cclxuXHJcbnJlbmRlcihcclxuICA8QXBwIC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JylcclxuKTtcclxuXHJcbmZ1bmN0aW9uIEFwcChwcm9wcykge1xyXG4gIGNvbnN0IFtyZWFkeSwgY2hhbmdlX3JlYWR5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgaWYgKCFyZWFkeSkge1xyXG4gICAgKGZ1bmN0aW9uIGxvYWRfcmFuZG9tX2FsYnVtKCkge1xyXG4gICAgICBsZXQgaWQgPSByYW5kb21OdW1iZXIoMTAxNjIwMDAwLCAxMDE2MjU1NTIpOy8vZm9yIGNoZWNrIHVzZSBpZDogMTAxNjI1NTUyXHJcbiAgICAgIGxvYWRfYWxidW0oaWQpLnRoZW4oKCk9PntcclxuICAgICAgICBjaGFuZ2VfcGF0aCh7XHJcbiAgICAgICAgICBhbGJ1bTogaWQsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjaGFuZ2VfcmVhZHkodHJ1ZSlcclxuXHJcbiAgICAgIH0pLmNhdGNoKGNvZGU9PntcclxuICAgICAgICBsb2FkX3JhbmRvbV9hbGJ1bSgpXHJcbiAgICAgIH0pXHJcbiAgICB9KSgpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcbiAgICAgIDxQcmVsb2FkZXIgaXNfaGlkZGVuPXtyZWFkeX0vPlxyXG4gICAgICA8U3VzcGVuc2UgZmFsbGJhY2s9ezxGYWxsYmFja19wcmVsb2FkZXIvPn0+XHJcbiAgICAgICAgPFBhZ2VfbXVzaWNMaXN0IC8+XHJcbiAgICAgIDwvU3VzcGVuc2U+XHJcbiAgICA8L1Byb3ZpZGVyPlxyXG4gIClcclxufVxyXG4iLCJleHBvcnQgY29uc3QgU0VMRUNUX0lURU1TX1RZUEUgPSBcIlNFTEVDVF9TVUJSRURESVRcIjtcclxuZXhwb3J0IGNvbnN0IFJFUVVFU1RfSVRFTVMgPSBcIlJFUVVFU1RfSVRFTVNcIjtcclxuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfSVRFTVMgPSBcIlJFQ0VJVkVfSVRFTVNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDSEFOR0VfUEFUSCA9IFwiQ0hBTkdFX1BBVEhcIjtcclxuIiwiaW1wb3J0IHtDSEFOR0VfUEFUSCwgU0VMRUNUX0lURU1TX1RZUEUsIFJFUVVFU1RfSVRFTVMsIFJFQ0VJVkVfSVRFTVMgfSBmcm9tICcuLi9hY3Rpb25UeXBlcydcclxuaW1wb3J0ICogYXMgbmFtZSBmcm9tIFwiLi4vcmRfc3RvcmVfc2VjdGlvbnNcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uL3N0b3JlLmpzJ1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcXVlc3RfaXRlbXModHlwZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBSRVFVRVNUX0lURU1TLFxyXG4gICAgaXRlbXNfdHlwZTogdHlwZVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVjZWl2ZV9pdGVtcyh0eXBlLCBqc29uLCBwYXJhbSkge1xyXG4gIGlmIChwYXJhbS5zYXZlX29sZCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogUkVDRUlWRV9JVEVNUyxcclxuICAgICAgaXRlbXNfdHlwZTogdHlwZSxcclxuICAgICAgaXRlbXM6IFtqc29uXSxcclxuICAgICAgc2F2ZV9vbGQ6IHBhcmFtLnNhdmVfb2xkXHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBSRUNFSVZFX0lURU1TLFxyXG4gICAgICBpdGVtc190eXBlOiB0eXBlLFxyXG4gICAgICBpdGVtczoganNvbixcclxuICAgICAgc2F2ZV9vbGQ6IHBhcmFtLnNhdmVfb2xkXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hfaXRlbXModHlwZSwgdXJsID0gbnVsbCwgcGFyYW0gPSB7c2F2ZV9vbGQ6IGZhbHNlLCBmZXRjaF9wcm9wczoge319KSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuXHJcbiAgICBpZiAoIXN0b3JlX3NlY3Rpb25faXNMb2NrZWQodHlwZSkpIHtcclxuICAgICAgZGlzcGF0Y2gocmVxdWVzdF9pdGVtcyh0eXBlKSlcclxuICAgICAgbGV0IGhlYWRfcmVzdWx2ZSwgaGVhZF9yZWplY3Q7XHJcblxyXG4gICAgICBmZXRjaCh1cmwsIHttb2RlOiAnY29ycycsIC4uLnBhcmFtLmZldGNoX3Byb3BzfSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAudGhlbihqc29uID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChqc29uLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZV9pdGVtcyh0eXBlLCBqc29uLCB7Li4ucGFyYW0sIHNhdmVfb2xkOiB0cnVlIH0pKTsgaGVhZF9yZWplY3QoanNvbi5lcnJvci5jb2RlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRpc3BhdGNoKHJlY2VpdmVfaXRlbXModHlwZSwganNvbiwgcGFyYW0pKTsgaGVhZF9yZXN1bHZlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXN1bHZlLCByZWplY3QpPT57aGVhZF9yZXN1bHZlID0gcmVzdWx2ZTsgaGVhZF9yZWplY3QgPSByZWplY3R9KVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZV9wYXRoKHBhdGgpIHtcclxuICBzdG9yZS5kaXNwYXRjaCh7XHJcbiAgICB0eXBlOiBDSEFOR0VfUEFUSCxcclxuICAgIHBhdGg6IHBhdGhcclxuICB9KVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc3RvcmVfc2VjdGlvbl9pc0xvY2tlZCh0eXBlKSB7XHJcbiAgaWYgKHN0b3JlLmdldFN0YXRlKClbbmFtZS5JVEVNU19CWV9UWVBFXVt0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHN0b3JlLmdldFN0YXRlKClbbmFtZS5JVEVNU19CWV9UWVBFXVt0eXBlXS5pc19mZXRjaGluZ1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgc3RvcmUgZnJvbSAnLi4vc3RvcmUuanMnXHJcbmltcG9ydCB7IGZldGNoX2l0ZW1zIH0gZnJvbSAnLi9hbGwnXHJcblxyXG5pbXBvcnQgKiBhcyBuYW1lIGZyb20gXCIuLi9yZF9zdG9yZV9zZWN0aW9uc1wiO1xyXG5pbXBvcnQgKiBhcyBzZXR0aW5ncyBmcm9tIFwiLi4vLi4vcmVzdEFQSV9zZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRfYWxidW0oaWQgPSBcIjEwMTYyNTU1MlwiKSB7XHJcbiAgcmV0dXJuIGZldGNoX2l0ZW1zKFxyXG4gICAgbmFtZS5pdGVtc190eXBlLkFMQlVNUyxcclxuICAgIGBodHRwczovL2RlZXplcmRldnMtZGVlemVyLnAucmFwaWRhcGkuY29tL2FsYnVtLyR7aWR9YCxcclxuICAgIHtcclxuICAgICAgc2F2ZV9vbGQ6IHRydWUsXHJcbiAgICAgIGZldGNoX3Byb3BzOiB7XHJcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIixcclxuICAgICAgXHRcImhlYWRlcnNcIjoge1xyXG4gICAgICBcdFx0XCJ4LXJhcGlkYXBpLWtleVwiOiBzZXR0aW5ncy54X3JhcGlkYXBpX2tleSxcclxuICAgICAgXHRcdFwieC1yYXBpZGFwaS1ob3N0XCI6IHNldHRpbmdzLnhfcmFwaWRhcGlfaG9zdFxyXG4gICAgICBcdH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICkoc3RvcmUuZGlzcGF0Y2gpXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkX3RyYWNrKGlkID0gXCI3MDMxNDkwNTJcIikge1xyXG4gIHJldHVybiBmZXRjaF9pdGVtcyhcclxuICAgIG5hbWUuaXRlbXNfdHlwZS5UUkFDS1MsXHJcbiAgICBgaHR0cHM6Ly9kZWV6ZXJkZXZzLWRlZXplci5wLnJhcGlkYXBpLmNvbS90cmFjay8ke2lkfWAsXHJcbiAgICB7XHJcbiAgICAgIHNhdmVfb2xkOiB0cnVlLFxyXG4gICAgICBmZXRjaF9wcm9wczoge1xyXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCIsXHJcbiAgICAgIFx0XCJoZWFkZXJzXCI6IHtcclxuICAgICAgXHRcdFwieC1yYXBpZGFwaS1rZXlcIjogc2V0dGluZ3MueF9yYXBpZGFwaV9rZXksXHJcbiAgICAgIFx0XHRcIngtcmFwaWRhcGktaG9zdFwiOiBzZXR0aW5ncy54X3JhcGlkYXBpX2hvc3RcclxuICAgICAgXHR9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICApKHN0b3JlLmRpc3BhdGNoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZF90cmFja3MoaWRzID0gW10pIHtcclxuICByZXR1cm4gbXVsdGVfZmV0Y2goJ2h0dHBzOi8vZGVlemVyZGV2cy1kZWV6ZXIucC5yYXBpZGFwaS5jb20vdHJhY2snLCBpZHMsIG5hbWUuaXRlbXNfdHlwZS5UUkFDS1MpXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIG11bHRlX2ZldGNoKHVybCwgaWRzLCB3aGVyZV9zYXZlKSB7XHJcbiAgbGV0IGZpcnN0X2ZldGNoID0gbmV3IFByb21pc2UocmVzb2x2ZT0+e3Jlc29sdmUoKX0pO1xyXG5cclxuICBpZHMuZm9yRWFjaCgoaWQsIGluZGV4KSA9PiB7XHJcbiAgICBpZiAoaW5kZXggPj0gaWRzLmxlbmdodCAtIDEpIHtcclxuICAgICAgcmV0dXJuIGZpcnN0X2ZldGNoLnRoZW4oKCk9PntcclxuICAgICAgICByZXR1cm4gZmV0Y2hfaXRlbXMod2hlcmVfc2F2ZSwgYCR7dXJsfS8ke2lkfS9gLCB7c2F2ZV9vbGQ6IHRydWV9KShzdG9yZS5kaXNwYXRjaClcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpcnN0X2ZldGNoID0gZmlyc3RfZmV0Y2gudGhlbigoKT0+e1xyXG4gICAgICAgIHJldHVybiBmZXRjaF9pdGVtcyh3aGVyZV9zYXZlLCBgJHt1cmx9LyR7aWR9L2AsIHtzYXZlX29sZDogdHJ1ZX0pKHN0b3JlLmRpc3BhdGNoKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxufVxyXG4iLCJleHBvcnQgY29uc3QgaXRlbXNfdHlwZSA9IHtcclxuICBBTEJVTVM6IFwiQUxCVU1TXCIsXHJcbiAgVFJBQ0tTOiBcIlRSQUNLU1wiXHJcbn1cclxuZXhwb3J0IGNvbnN0IHBhdGhfY2h1bmsgPSB7XHJcbiAgQUxCVU06ICdBTEJVTScsXHJcbiAgVFJBQ0s6ICdUUkFDSydcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBJVEVNU19CWV9UWVBFID0gXCJJVEVNU19CWV9UWVBFXCJcclxuZXhwb3J0IGNvbnN0IFBBVEggPSBcIlBBVEhcIlxyXG4iLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IHsgQ0hBTkdFX1BBVEgsIFNFTEVDVF9JVEVNU19UWVBFLCBJTlZBTElEQVRFX0lURU1TX1RZUEUsIFJFUVVFU1RfSVRFTVMsIFJFQ0VJVkVfSVRFTVMgfSBmcm9tICcuLi9hY3Rpb25UeXBlcydcclxuaW1wb3J0ICogYXMgbmFtZSBmcm9tIFwiLi4vcmRfc3RvcmVfc2VjdGlvbnNcIjtcclxuaW1wb3J0IHtpdGVtc19ieV90eXBlfSBmcm9tIFwiLi9pdGVtc19ieV90eXBlXCI7XHJcbmltcG9ydCB7cGF0aF9ieV9pdGVtc30gZnJvbSBcIi4vcGF0aF9ieV9pdGVtc1wiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxubGV0IHJvb3RfcmVkdWNlciA9IHt9XHJcbnJvb3RfcmVkdWNlcltuYW1lLklURU1TX0JZX1RZUEVdID0gaXRlbXNfYnlfdHlwZVxyXG5yb290X3JlZHVjZXJbbmFtZS5QQVRIXSA9IHBhdGhfYnlfaXRlbXNcclxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHJvb3RfcmVkdWNlcilcclxuIiwiaW1wb3J0IHsgUkVRVUVTVF9JVEVNUywgUkVDRUlWRV9JVEVNUyB9IGZyb20gJy4uL2FjdGlvblR5cGVzJ1xyXG5pbXBvcnQgeyBpdGVtc190eXBlIH0gZnJvbSAnLi4vcmRfc3RvcmVfc2VjdGlvbnMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXRlbXNfYnlfdHlwZShzdGF0ZSA9IHt9LCBhY3Rpb24pIHtcclxuICBpZiAoYWN0aW9uLnR5cGUgPT0gUkVRVUVTVF9JVEVNUykge1xyXG4gICAgbGV0IG5ld19zdGF0ZV93aXRoX25ld19ncm91cF9pdGVtcyA9IHsuLi5zdGF0ZX1cclxuICAgIG5ld19zdGF0ZV93aXRoX25ld19ncm91cF9pdGVtc1thY3Rpb24uaXRlbXNfdHlwZV0gPSB7XHJcbiAgICAgIC4uLm5ld19zdGF0ZV93aXRoX25ld19ncm91cF9pdGVtc1thY3Rpb24uaXRlbXNfdHlwZV0sXHJcbiAgICAgIGlzX2ZldGNoaW5nOiB0cnVlLFxyXG4gICAgICBpdGVtczogbmV3X3N0YXRlX3dpdGhfbmV3X2dyb3VwX2l0ZW1zW2FjdGlvbi5pdGVtc190eXBlXT8uaXRlbXMgfHwgW11cclxuICAgIH1cclxuICAgIHJldHVybiBuZXdfc3RhdGVfd2l0aF9uZXdfZ3JvdXBfaXRlbXM7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09IFJFQ0VJVkVfSVRFTVMpIHtcclxuICAgIGxldCBuZXdfaXRlbXMgPSB7Li4uc3RhdGV9XHJcbiAgICBpZiAoYWN0aW9uLnNhdmVfb2xkKSB7XHJcbiAgICAgIGxldCBzeXN0ZW1hdGl6ZWRfaXRlbXMgPSBhY3Rpb24uaXRlbXNcclxuXHJcbiAgICAgIG5ld19pdGVtc1thY3Rpb24uaXRlbXNfdHlwZV0gPSB7XHJcbiAgICAgICAgaXRlbXM6IFsuLi5zdGF0ZVthY3Rpb24uaXRlbXNfdHlwZV0uaXRlbXMsIC4uLnN5c3RlbWF0aXplZF9pdGVtc10sXHJcbiAgICAgICAgaXNfZmV0Y2hpbmc6IGZhbHNlXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXdfaXRlbXNbYWN0aW9uLml0ZW1zX3R5cGVdID0ge1xyXG4gICAgICAgIGl0ZW1zOiBhY3Rpb24uaXRlbXMsXHJcbiAgICAgICAgaXNfZmV0Y2hpbmc6IGZhbHNlXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiB7Li4ubmV3X2l0ZW1zfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgfSBlbHNlIHtyZXR1cm4gc3RhdGV9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gaGFiaXRhdHNfc3lzdGVtYXRpemVyKGl0ZW1zKSB7XHJcbiAgcmV0dXJuIGl0ZW1zLm1hcChpdGVtPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogaXRlbS5pZCxcclxuICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICBwb2tlbW9uX3NwZWNpZXM6IGl0ZW0ucG9rZW1vbl9zcGVjaWVzLm1hcChpdGVtPT5pdGVtLm5hbWUpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZ3Jvd3RoX3JhdGVzX3N5c3RlbWF0aXplcihpdGVtcykge1xyXG4gIHJldHVybiBpdGVtcy5tYXAoaXRlbT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IGl0ZW0uaWQsXHJcbiAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgcG9rZW1vbl9zcGVjaWVzOiBpdGVtLnBva2Vtb25fc3BlY2llcy5tYXAoaXRlbT0+aXRlbS5uYW1lKVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVnZ19ncm91cHNfc3lzdGVtYXRpemVyKGl0ZW1zKSB7XHJcbiAgcmV0dXJuIGl0ZW1zLm1hcChpdGVtPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogaXRlbS5pZCxcclxuICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICBwb2tlbW9uX3NwZWNpZXM6IGl0ZW0ucG9rZW1vbl9zcGVjaWVzLm1hcChpdGVtPT5pdGVtLm5hbWUpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgeyBDSEFOR0VfUEFUSCB9IGZyb20gJy4uL2FjdGlvblR5cGVzJ1xyXG5pbXBvcnQgeyBwYXRoX2NodW5rIH0gZnJvbSAnLi4vcmRfc3RvcmVfc2VjdGlvbnMnXHJcblxyXG5cclxubGV0IHBhdGhfdGVtcGxhdGUgPSB7fVxyXG5wYXRoX3RlbXBsYXRlW3BhdGhfY2h1bmsuQUxCVU1dID0gZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2U/LmdldEl0ZW0oJ3BhdGhfX2FsYnVtJykgfHwgMTAxNjI1NTUyXHJcbnBhdGhfdGVtcGxhdGVbcGF0aF9jaHVuay5UUkFDS10gPSBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZT8uZ2V0SXRlbSgncGF0aF9fdHJhY2snKSB8fCAyMzFcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXRoX2J5X2l0ZW1zKHN0YXRlID0gcGF0aF90ZW1wbGF0ZSwgYWN0aW9uKSB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBDSEFOR0VfUEFUSDpcclxuICAgICAgbGV0IG5ld19wYXRoID0gey4uLnN0YXRlfVxyXG4gICAgICBpZiAoYWN0aW9uLnBhdGguYWxidW0pIHtcclxuICAgICAgICBuZXdfcGF0aFtwYXRoX2NodW5rLkFMQlVNXSA9IGFjdGlvbi5wYXRoLmFsYnVtXHJcbiAgICAgICAgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2U/LnNldEl0ZW0oJ3BhdGhfX2FsYnVtJywgYWN0aW9uLnBhdGguYWxidW0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChhY3Rpb24ucGF0aC50cmFjaykge1xyXG4gICAgICAgIG5ld19wYXRoW3BhdGhfY2h1bmsuVFJBQ0tdID0gYWN0aW9uLnBhdGgudHJhY2tcclxuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZT8uc2V0SXRlbSgncGF0aF9fdHJhY2snLCBhY3Rpb24ucGF0aC50cmFjayk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7Li4ubmV3X3BhdGh9XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9IGZyb20gJ3JlZHV4J1xyXG5jb25zdCBSZWR1eFRodW5rID0gcmVxdWlyZSgncmVkdXgtdGh1bmsnKS5kZWZhdWx0XHJcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcclxuXHJcblxyXG5pbXBvcnQgcm9vdF9yZWR1Y2VyIGZyb20gJy4vcmVkdWNlcnMvYWxsJ1xyXG5cclxubGV0IGluaXRpYWxTdGF0ZSA9IHt9XHJcbmNvbnN0IGxvZ2dlck1pZGRsZXdhcmUgPSBjcmVhdGVMb2dnZXIoKVxyXG5cclxubGV0IHN0b3JlID0gY3JlYXRlU3RvcmUoXHJcbiAgcm9vdF9yZWR1Y2VyLFxyXG4gIGluaXRpYWxTdGF0ZSxcclxuICBhcHBseU1pZGRsZXdhcmUoUmVkdXhUaHVuaywgbG9nZ2VyTWlkZGxld2FyZSlcclxuKVxyXG5cclxuXHJcblxyXG5pbXBvcnQgKiBhcyBuYW1lIGZyb20gXCIuL3JkX3N0b3JlX3NlY3Rpb25zXCI7XHJcbmltcG9ydCB7IGZldGNoX2l0ZW1zIH0gZnJvbSAnLi9hY3Rpb25zL2FsbCdcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JlXHJcbiIsImV4cG9ydCBjb25zdCB4X3JhcGlkYXBpX2tleSA9IFwiZGJiOWM1N2I3OW1zaDE5ZDQ3MDQ5NDgyZTc5ZnAxODVmZGFqc25jM2IzM2I4YzJhODdcIjtcclxuZXhwb3J0IGNvbnN0IHhfcmFwaWRhcGlfaG9zdCA9IFwiZGVlemVyZGV2cy1kZWV6ZXIucC5yYXBpZGFwaS5jb21cIjtcclxuIiwiaW1wb3J0IFJlYWN0LCB7dXNlRWZmZWN0fSBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRmFsbGJhY2tfcHJlbG9hZGVyKHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtwcm9wcy5pc19oaWRkZW4gPyBcImZhbGxiYWNrX2xvYWRlcl9wYW5lbCBpc19oaWRkZW5cIiA6IFwiZmFsbGJhY2tfbG9hZGVyX3BhbmVsXCJ9PlxyXG4gICAgICA8aW1nIHNyYz1cIlwiLz5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERhdGFfcHJlbG9hZGVyKHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtwcm9wcy5pc19oaWRkZW4gPyBcImxvYWRlcl9wYW5lbCBpc19oaWRkZW5cIiA6IFwibG9hZGVyX3BhbmVsXCJ9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRlci10MlwiPjwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFByZWxvYWRlcihwcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17cHJvcHMuaXNfaGlkZGVuID8gXCJsb2FkZXJfcGFuZWwgaXNfaGlkZGVuXCIgOiBcImxvYWRlcl9wYW5lbFwifT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkZXItdDFcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG4iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dlbi5zY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiXSwic291cmNlUm9vdCI6IiJ9