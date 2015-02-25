var subjects=['I','You','Bob','John','Sue','Kate','The lizard people', 'Titanic'];
var verbs=['will search for','will get','will find','attained','found','will','will accept','accepted'];
var objects=['Billy','an apple','a Triforce','the treasure','a sheet of paper'];
var endings=['.',', right?','.',', like I said.','.',', oh noes!'];

function generateTitle() {
	return subjects[Math.round(Math.random()*(subjects.length-1))]+' '+verbs[Math.round(Math.random()*(verbs.length-1))]+' '+objects[Math.round(Math.random()*(objects.length-1))]+endings[Math.round(Math.random()*(endings.length-1))];
}

// Define a collection
var baseCollection = new Backbone.Collection([], {
	comparator: "title"
});
for (var i = 0; i < 15; i++) {
	baseCollection.add({
		title: generateTitle(),
		showVirtual: Math.random() > 0.5
	});
}

var virtualCollection = new VirtualCollection(baseCollection, {
	comparator: "title",
	filter: {
		showVirtual: true
	}
});

// Itemview
var movieItemView = Marionette.ItemView.extend({
	tagName: "li",
	className: 'listItem',
	template: "#movie-list-item",
	modelEvents: {
		"change": "render"
	},
	templateHelpers: function() {
		return {
			btnclass: (this.model.get("showVirtual")) ? "btn-success" : "btn-warning",
			btntext: "show: " + this.model.get("showVirtual")
		}
	},
	ui: {
		removebtn: '.btn-danger',
		truebtn: '.truebtn'
	},
	triggers: {
		'click @ui.removebtn': 'movie:delete',
		'click @ui.truebtn': 'movie:changeshow'
	}
});

// Composite view
var MovieCompViewFull = Marionette.CompositeView.extend({
	template: "#movie-list",
	ui: {
		btnAdd: '.btnadditem'
	},
	events: {
		'click @ui.btnAdd': 'addItem'
	},
	addItem: function() {
		this.collection.add({
			title: generateTitle(),
			showVirtual: Math.random() > 0.5
		});
	},
	templateHelpers: function () {
		return {
			title: "Full collection"
		}
	},
	childViewContainer: ".panel-body",
	childView: movieItemView
});

var MovieCompViewVirtual = MovieCompViewFull.extend({
	templateHelpers: function () {
		return {
			title: "Virtual collection (filter: show=true)"
		}
	},
	addItem: function() {
		this.collection.add({
			title: generateTitle(),
			showVirtual: true
		});
	}
});

// Create a region
var rm = new Marionette.RegionManager();
rm.addRegion("container_col1", "#col1");
rm.addRegion("container_col2", "#col2");

// Full collection view
	// Create instance of composite view
	var movieCompViewInstanceFull = new MovieCompViewFull({
		collection: baseCollection
	});

	// Controller event listeners
	movieCompViewInstanceFull.on("childview:movie:delete", function (view) {
		// Remove model from collection; 'this' revers to the scope of the composite view
		this.collection.remove(view.model);
	});

	movieCompViewInstanceFull.on("childview:movie:changeshow", function (view) {
		// Remove model from collection; 'this' revers to the scope of the composite view
		view.model.set("showVirtual", !view.model.get("showVirtual"));
	});

	// Show the collectionView
	rm.get('container_col1').show(movieCompViewInstanceFull);

// Virtual collection view
	// Create instance of composite view
	var movieCompViewInstanceVirtual = new MovieCompViewVirtual({
		collection: virtualCollection
	});

	// Controller event listeners
	movieCompViewInstanceVirtual.on("childview:movie:delete", function (view) {
		// Remove model from collection; 'this' revers to the scope of the composite view
		this.collection.remove(view.model);
	});

	movieCompViewInstanceVirtual.on("childview:movie:changeshow", function (view) {
		// Remove model from collection; 'this' revers to the scope of the composite view
		view.model.set("showVirtual", !view.model.get("showVirtual"));
	});

	// Show the collectionView
	rm.get('container_col2').show(movieCompViewInstanceVirtual);

// Setup grid
var PageableTitles = Backbone.PageableCollection.extend({
	mode: "client"
});

var pageableTitles = new PageableTitles(virtualCollection.models,{
	state: {
		firstPage: 0,
		currentPage: 0,
		pageSize: 4
	}
});

// Set up a grid to use the pageable collection
var columns = [{
		name: "title",
		label: "Title",
		cell: "string"
	},
	{
		name: "showVirtual",
		label: "Show in virtual",
		cell: "boolean"
	}];

var pageableGrid = new Backgrid.Grid({
	columns: columns,
	collection: pageableTitles
});

// Render the grid
var $col3 = $("#col3");

// Initialize a client-side filter to filter on the client
// mode pageable collection's cache.
var filter = new Backgrid.Extension.ClientSideFilter({
	collection: pageableTitles,
	fields: ['title']
});

// Render the filter
$col3.append(filter.render().el);

// Render the grid
$col3.append(pageableGrid.render().el);

// Initialize the paginator
var paginator = new Backgrid.Extension.Paginator({
	collection: pageableTitles
});

// Render the paginator
$col3.append(paginator.render().el);

// Add some space to the filter and move it to the right
$(filter.el).css({float: "right", margin: "20px"});