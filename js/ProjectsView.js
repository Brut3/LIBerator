var ProjectsView = function(store) {

	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		//this.el.on('keyup', '.search-key', this.findByName);
	};

	this.render = function() {
		this.el.html(ProjectsView.navTemplate() + ProjectsView.liTemplate(store.projects));
		return this;
	};

	this.findByName = function() {
		store.findByName(store.projects, $('.search-key').val(), function(projects) {
			$('.project-list').html(ProjectsView.liTemplate(projects));
		});
	};

	this.initialize();
};

ProjectsView.navTemplate = Handlebars.compile($("#projects-nav-temp").html());
ProjectsView.liTemplate = Handlebars.compile($("#project-li-temp").html());
