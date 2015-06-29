var User = Backbone.Model.extend({
    defaults: {
        name: '',
        id: 0,
        pictures: []
    },
    initialize: function(){

    },
    setPictures: function(pics) {
        var pictures = this.get('pictures');
        for (var i = 0; i < pics.length; i++) {
            var fecha = new Date(pics[i].created_time);
            var date = fecha.getFullYear().toString();
            date += fecha.getMonth().toString().length == 1 ? '0' + fecha.getMonth().toString() : fecha.getMonth().toString();
            date += fecha.getDate().toString().length == 1 ? '0' + fecha.getDate().toString() : fecha.getDate().toString();
            if(fecha.getFullYear() ==2014){
                pictures.push(new Picture({
                    likes: pics[i].likes ? pics[i].likes.data.length : 0,
                    id: pics[i].id,
                    date:  date,
                    thumbnail: pics[i].images[pics[i].images.length-1].source,
                    url:  pics[i].images[0].source
                }));
            }
        }
        this.set({pictures: pictures});
        app.homelView.renderPictures(this.get('pictures'));
    },
    login: function() {
        var self = this;
         FB.login(function(response){
             $('#login').attr('disabled', true);
             if(response.status == "connected"){
                 self.getPictures(50);
                 $('#login').fadeOut(1000);
             }
         }, {scope: 'user_photos'});

    },
    getPictures: function(index){
        var self = this;
        FB.api('me?fields=photos.limit('+index+'){created_time,images,likes{id}}', function (response) {
            if (response && !response.error && response.photos) {
                var photos = response.photos.data;
                self.setPictures(photos);
                var fecha = new Date(photos[photos.length-1].created_time);
                if(fecha.getFullYear() >=2014){
                    index+=50;
                    self.getPictures(index);
                }
            }
        });
    }
});/**
 * Created by lucas on 19/06/15.
 */
