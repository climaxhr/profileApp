var ProfileApp = function (userOptions){

 var options = $.extend({

}, userOptions);

var thisApp = this;
options.userId = false;

var service = new Service({
  "serviceURL" : 'apps/profileApp/profileApp.php'
  });

thisApp.show = function(showOptions){

	$.extend(options, showOptions);

	if( options.userId == uid ){
		$(".profile-private").show();
	} else {
		$(".profile-private").hide();
	}

	service.post("load", [options.userId], function(rec){



			rec = JSON.parse(rec);
			



			$("#profile-name").text(rec.name );
			$("#profile-last-name").text( rec.last_name);
			$("#profile-titule").text(rec.titule);
			$("#profile-modal").modal("show");
	});

	

}

/* */
thisApp.hide = function(){
 // guiApp.showWidget(".widget-notifications");

}

/* */


/* */
thisApp.init = function(){
guiApp.registerLink("My profile", function(){
	profileApp.show({"userId" : uid});
}, "app");
  thisApp.events();

}

thisApp.changePassword = function(){

var oldPass = $("#old-pass").val();
var newPass = $("#new-pass").val();
var newPass2 = $("#new-pass2").val();
if(newPass2 != newPass){
	guiApp.infoAlert("New passwords are not the same, please check and try again!");
$("#new-pass2").focus();
return;
}

$("#btn-pass-change").attr("disabled", true);
	service.post("changePassword", new Array(oldPass, newPass), function(rec){

if( rec === true ){
	$(".pass-reset").val('');
$("#btn-pass-change").attr("disabled", false);
	guiApp.infoAlert("Your password has been reseted!");
} else {
	$("#btn-pass-change").attr("disabled", false);
	guiApp.toast(rec,10000);
};

	});
}


/* */
thisApp.events = function(){
$("#btn-pass-change").click(function(e){
	thisApp.changePassword();
});
    


}

thisApp.init();

$(".editable").inPlace({
	"onChange" : function(el){
		   var data = JSON.parse($(el).attr("dat"));
                      var table = data[0];
                      var column = data[1];
		console.log("Changing"+table+" "+column);
	}
});
}



$.fn.renderObject = function(options) {


	var settings = $.extend({
		"classList" : "editable testclass",
		"templateEl" : '<div style="width:100%; border-bottom:1px solid #f3f3f3;" ></div>' ,
		"keyAs" : "id",
		"valueAs" : "data",
		"skipKey" : false,
		"useOnly" : false,
		"onComplete" : false,
		"skipValue" : false
	}, options);

var elements=[];
var obj = this[0];
	$(Object.keys(obj)).each(function (index, item) {
		if(settings.skipValue == obj[item])return;
		var clone = settings.templateEl.clone();
		clone.addClass(settings.classList);
		clone.attr(settings.keyAs, item);
		if (settings.valueAs == "content") {
			clone.html( obj[item])
		} else {
			clone.attr(settings.valueAs, obj[item]);
		}
		
		elements.push(clone);
	
	});  

	if (settings.onComplete)settings.onComplete();
  return elements;                
     };


$.fn.inPlace = function(options) {


	var settings = $.extend({
	}, options);

	var inputTemplate = '<input type="text" style="width:100%; background-color:#edfbfe;border:none;" class="edit-in-place-input" value="" />';

	$(this).keypress(function (e) {
		var key = e.which;
		if(key == 13)
		{
			finish(this);
		}
	});  

	$(this).mouseenter(function (e) {
	
	$(this).css("color","red")

	});  
$(this).mouseleave(function (e) {
	
	$(this).css("color","inherit")

	});  

	this.on('change',function(){
		settings.onChange(this);
	});

	this.click(function() {

		if(!$(this).hasClass("editing-in-place")){
                        $(this).addClass("editing-in-place");
                        var text = $(this).text();
                        $(this).html(inputTemplate);
                        $(this).find("input.edit-in-place-input").val(text);
                        $(this).find("input.edit-in-place-input").focus();
                    }      
                });

	this.focusout(function() {
		finish(this);
	});

	function finish(el){
		if($(el).hasClass("editing-in-place")){
                        // wrap element
                        $(el).removeClass("editing-in-place");
                        var text =  $(el).find("input.edit-in-place-input").val();
                        $(el).find("input.edit-in-place-input").remove();
                        $(el).text(text);
						return el;
                    }
                }
                    //return this;
     };

//implementation
/*     
$("body").prepend($(rec).renderObject({
	"templateEl": $("#object-key-template"),
	"valueAs" : "content",
	"classList" : "editable",
	"onComplete" : $(".editable").inPlace()
}));
*/