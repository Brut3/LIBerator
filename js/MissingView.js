var MissingView = function() {

	this.initialize = function() {
		this.el = $('<div/>');
	};
	
	this.render = function() {
		this.el.html(MissingView.template());
		return this;
	};
	
	this.initialize();
};

MissingView.template = Handlebars.compile($("#missing-view-temp").html());