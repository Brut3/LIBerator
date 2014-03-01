var ProjectView = function(project) {

	this.initialize = function() {
		this.el = $('<div/>');
	};
	
	this.render = function() {
		this.el.html(ProjectView.template(project) + ProjectView.sourceListTemplate(project));
		return this;
	};
	
	this.initialize();
};

Handlebars.registerHelper('source-item', function () {
  var source = app.store.returnById(app.store.resources, this.sourceId, function() {});
  var authors = "";
  for(var i=0,j=source.authors.length; i<j; i++){
    authors += source.authors[i].firstName.charAt(0) + ". " + source.authors[i].lastName + ", ";
  };
  return new Handlebars.SafeString(
  	"<h3>" + source.title + "</h3>" + "<p>" + authors + "</p>"
  );
});

ProjectView.template = Handlebars.compile($("#project-nav-temp").html());
ProjectView.sourceListTemplate = Handlebars.compile($("#project-sources-li-temp").html()); 
 
