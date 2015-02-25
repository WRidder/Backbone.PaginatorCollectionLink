(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Backbone"));
	else if(typeof define === 'function' && define.amd)
		define(["Backbone"], factory);
	else if(typeof exports === 'object')
		exports["Backbone.PaginatorCollectionLink"] = factory(require("Backbone"));
	else
		root["Backbone.PaginatorCollectionLink"] = factory(root["Backbone"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Backbone = __webpack_require__(1);

	var PaginatorCollectionLink = Backbone.PaginatorCollectionLink = function(sourceCollection, pageableOptions) {
		// Create pageable collection
		var pageableCol = new Backbone.PageableCollection(sourceCollection.models, pageableOptions);

		// Attach event handlers
		var modelAdd = function(model, collection) {
			if (collection === sourceCollection && !pageableCol.contains(model)) {
				pageableCol.add(model);
			}
			if (collection === pageableCol && !sourceCollection.contains(model)) {
				sourceCollection.add(model);
			}
		};
		sourceCollection.on("add", modelAdd);
		pageableCol.on("add", modelAdd);

		var modelRemove = function(model, collection) {
			if (collection === sourceCollection && pageableCol.contains(model)) {
				pageableCol.remove(model);
			}
			if (collection === pageableCol && sourceCollection.contains(model)) {
				sourceCollection.remove(model);
			}
		};
		sourceCollection.on("remove", modelRemove);
		pageableCol.on("remove", modelRemove);
	 /*
		var collectionReset = function(collection) {
			pageableCol.reset(collection.models);
		};
		sourceCollection.on("reset", collectionReset);*/

		// Return pageable collection
		return pageableCol;
	};

	module.exports = PaginatorCollectionLink;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
