var app = {

	initialize : function() {
		var self = this;
		this.projectURL = /^#project\/(\d{1,})/;
		this.newSourceURL = /^#project\/(\d{1,})\/addsource\/newsource/;
		this.addSourceURL = /^#project\/(\d{1,})\/addsource/;
		this.newProjectURL = /^#newproject/;
		this.missingViewURL = /(\S*)\/missing$/;
		this.prevPages = [];
		self.registerEvents();
		this.store = new MemoryStore(function() {
			self.route();
		});
	},

	registerEvents : function() {
		var self = this;
		$(window).on('hashchange', $.proxy(this.route, this));
	},

	route : function() {
		var self = this;
		var hash = window.location.hash;
		console.log("Routing: " + hash);
		if (!hash) {
			this.homePage = new ProjectsView(this.store).render();
			this.slidePage(this.homePage, "home");
			return;
		}
		var matchMissing = hash.match(this.missingViewURL);
		if (matchMissing) {
			console.log("Matched Missing! " + matchMissing);
			self.slidePage(new MissingView().render(), "missing");
			return;
		}
		
		//New Source
		var matchNewSource = hash.match(this.newSourceURL);
		if (matchNewSource) {
			self.slidePage(new NewSourceView({id : matchNewSource[1]}, this.store).render(), "newsource");
			return;
		}
		
		//Add Source
		var matchAddSource = hash.match(this.addSourceURL);
		if (matchAddSource) {
			self.slidePage(new AddSourceView({id : matchAddSource[1]}, this.store).render(), "addsource");
			return;
		}
		//Project
		var matchProject = hash.match(this.projectURL);
		if (matchProject) {
			self.store.findById(self.store.projects, Number(matchProject[1]), function(project) {
				self.slidePage(new ProjectView(project).render(), "project");
			});
			return;
		}
		//New Project
		var matchNewProject = hash.match(this.newProjectURL);
		if (matchNewProject) {
			self.slidePage(new NewProjectView().render(), "newproject");
		}
		

	},

	slidePage : function(page, name) {

		var currentPageDest, self = this;

		// If there is no current page (app just started) -> No transition: Position new page in the view port
		if (!this.currentPage) {
			$(page.el).attr('class', 'page stage-center').attr('id', 'homePage');
			$('body').append(page.el);
			this.currentPage = page;
			this.prevPages.push(name);
			//trigger navbar reflow with custom event
			window.dispatchEvent(new CustomEvent('resize', {}));
			return;
		}
	
		// Cleaning up: remove old pages that were moved out of the viewport
		$('.stage-right, .stage-left').not('#homePage').remove();
			
		if (name === this.prevPages[this.prevPages.length-2]) {
			console.log("Popping: " + this.prevPages[this.prevPages.length-1]);
			this.prevPages.pop();
			// Always apply a Back transition (slide from left) when we go back
			$(page.el).attr('class', 'page stage-left');
			currentPageDest = "stage-right";
		} else {
			// Forward transition (slide from right)
			console.log("Pushing: " + name);
			this.prevPages.push(name);
			$(page.el).attr('class', 'page stage-right');
			currentPageDest = "stage-left";
		}

		$('body').append(page.el);

		// Wait until the new page has been added to the DOM...
		setTimeout(function() {
			// Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
			$(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
			// Slide in the new page
			$(page.el).attr('class', 'page stage-center transition');
			self.currentPage = page;
		});
		window.dispatchEvent(new CustomEvent('resize', {}));
	},
};

app.initialize();
(function() {
		var init = function() {
			// Make sure the dialog is in the DOM
			if (document.querySelector('#my-dialog')) {
				var dialog = new fries.Dialog({
					selector : '#my-dialog',
					callbackOk : function() {
						var toast = new fries.Toast({
							content : "Pressed OK",
							duration : fries.Toast.duration.SHORT
						});

						this.hide();
						// this refers to the dialog
					},
					callbackCancel : function() {
						var toast = new fries.Toast({
							content : "Pressed Cancel",
							duration : fries.Toast.duration.SHORT
						});

						this.hide();
						// this refers to the dialog
					}
				});

				document.querySelector('#open-dialog').addEventListener('touchend', function(e) {
					e.preventDefault();
					dialog.show();
				}, false);
			}

			document.querySelector('#show-toast').addEventListener('touchend', function() {
				var toast = new fries.Toast({
					content : "Hi, I'm a Toast notification."
				});

			}, false);
		};

		var detect = function() {
			if (navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i) 
			|| navigator.userAgent.match(/iPhone/i) 
			|| navigator.userAgent.match(/iPad/i) 
			|| navigator.userAgent.match(/iPod/i) 
			|| navigator.userAgent.match(/BlackBerry/i) 
			|| navigator.userAgent.match(/Windows Phone/i)) {
				return true;
			} else {
				return false;
			}
		};

		// To enable touch events on desktop
		// Remove this when building in PhoneGap
		if (detect) {
			//window.onload = new FingerBlast('body');
		}
	}()); 