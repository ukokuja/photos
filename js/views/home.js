app.HomeView = Backbone.View.extend({

    events:{
        "click #login":"login",
        "click .thumbnail" : "openModal"
    },
    initialize: function(){
        window.fbAsyncInit = function() {
            console.info('FB jssdk loaded');
            FB.init({
                appId: '301006363311722'
            });
        };
        // Load the SDK Asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
        this.user = new User();
    },
    render:function () {
        this.$el.html(this.template());
        return this;
    },
    renderPictures: function(pics){
        pics.sort(function(a,b){return b.attributes.likes - a.attributes.likes});
        $("#fb").removeClass("col-md-12 col-md-3").addClass("col-md-3");
        $("#picture-container").addClass("col-md-9");
        for(var i = 0; i<pics.length; i++){
            var pic = pics[i].attributes;
            var templatePicture = '<div class="col-md-3 col-md-offset-1 well each">';
            templatePicture += '<a class="thumbnail">';
            templatePicture += '<img data-picture="'+pic.url+'" class="eachPicture" src="'+pic.thumbnail+'">';
            templatePicture += '</a>';
            templatePicture += '<div class="caption">';
            templatePicture += '<p><i class="fa fa-thumbs-up"></i> '+pic.likes+' Likes</p>';
            templatePicture += '<p class="text-capitalize" ><i class="fa fa-clock-o"></i> '+moment(pic.date, "YYYYMMDD", 'en').fromNow();+'</p>';
            templatePicture += '</div></div>';
            $("#picture-container").append(templatePicture);
        }
    },
    openModal: function(w){
        var b = $(w.target).attr('data-picture');
        var modal = $("#modalPicture");
        modal.find('img').attr("src", b);
        modal.modal({show: true});
    },
    login: function(){
        this.user.login();
    }
    /**/

});