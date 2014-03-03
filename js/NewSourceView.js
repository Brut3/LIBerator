var NewSourceView = function(id, store) {

	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '.spinner-item', this.changeSpinnerValue);
		this.el.on('click', '.spinner-item', this.showButtons);
		this.el.on('click', '#confirm-url', this.showWebForm);
		this.el.on('click', '#choose-button', this.showBookForm);
		this.el.on('click', '#new-source-action', this.createSource);
	};

	this.render = function() {
		this.el.html(NewSourceView.navTemplate(id) + NewSourceView.formTemplate());
		return this;
	};

	this.createSource = function() {
			var title = $("#title").val();
			var category = $("#category").val().trim();
			var authors = $("#author").val().trim().split(", ");
			var authArr = [];
			for(var i=0,j=authors.length; i<j; i++){
			  var name = authors[i].split(" ");
			  authArr.push({firstName : name[0], lastName : name[1]});
			};
			var resource = {
				title : title,
				category : category,
				authors : authArr
			};
			
			app.store.addObject(app.store.resources, resource);
			console.log(app.store.resources);
	};

	this.changeSpinnerValue = function(event) {
		var id = $(event.target).parent().parent().siblings(".toggle-spinner").attr("id");
		var category = $(this).text();
		$("#" + id).text(category);
		$("#category").val(category);

	};

	this.showButtons = function() {
		var element = $(".form-actions");
		if (element.length !== 0) {
			element.remove();
		};
		var category = $("#category").val().trim();
		console.log(category);
		var buttonsHTML = "";
		if (category === "Web page") {
			buttonsHTML = NewSourceView.buttonTemplate({
				url : "url"
			});
		} else {
			buttonsHTML = NewSourceView.buttonTemplate({
				url : ""
			});
		}
		$("#newsource").append(buttonsHTML);

	};
	
	this.showWebForm = function () {
		var url = $("#url").val().trim();
		$(".form-actions").remove();
		$("#newsource").append(NewSourceView.webDetailsFormTemplate({url : url}));
		$("#new-source-action").prop('disabled', false);
		window.dispatchEvent(new CustomEvent('resize', {}));
	};
	
	this.showBookForm = function () {
		$(".form-actions").remove();
		$("#newsource").append(NewSourceView.bookDetailsFormTemplate({file : "dummy_file.pdf"}));
		$("#new-source-action").prop('disabled', false);
		window.dispatchEvent(new CustomEvent('resize', {}));
	};
	
	this.initialize();
};

NewSourceView.navTemplate = Handlebars.compile($("#new-source-nav-temp").html());
NewSourceView.formTemplate = Handlebars.compile($("#new-source-form-temp").html());
NewSourceView.buttonTemplate = Handlebars.compile($("#file-url-buttons-temp").html());
NewSourceView.webDetailsFormTemplate = Handlebars.compile($("#web-details-form-temp").html());
NewSourceView.bookDetailsFormTemplate = Handlebars.compile($("#book-details-temp").html());
Handlebars.registerPartial("title-author", $("#title-author-temp").html());

