describe("A PaginatorCollectionLink using a plain Backbone collection", function () {

	var col;
	beforeEach(function () {
		col = new Backbone.Collection([{id: 2}, {id: 1}, {id: 3}]);
	});

	it("has a source collection of length 3", function () {
		expect(col.length).toBe(3);
	});
});
