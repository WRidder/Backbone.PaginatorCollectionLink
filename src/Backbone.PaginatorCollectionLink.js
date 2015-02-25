"use strict";

var Backbone = require("backbone");

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
