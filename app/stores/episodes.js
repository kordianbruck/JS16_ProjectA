var Episode = require(__appbase + 'models/episode');

module.exports = {

    add: function (data, callback) {
        var episode = new Episode();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Episode.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                episode[key] = data[key];
            }
        }

        episode.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,episode);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Episode.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        Episode.find(data, function(err,obj)
        {
            if(obj.length === 0)
                callback(3,data);
            else
                callback(1, obj);
        });
    },

    //returns the episodes of a specific character
    getEpisodesByCharacter: function(characterName, callback){
	Episode.find({'characters.name' : characterName}, function(err, obj){
	   if(err){
		callback(2, err);
	   }
	   else if (obj.length === 0){
		callback(3, characterName);
	   }
	   else{
		callback(1, obj);
	   }
	});	


    },

    getByName: function(name, callback) {
        this.get({'name':name},function(success,message){
            if(success == 1) {
                callback(success,message[0]);
            }
            else {
                callback(success,message);
            }
        });
    },

    getById: function(id, callback) {
        this.get({'_id': id},function(success,message){
            if(success == 1) {
                callback(success,message[0]);
            }
            else {
                callback(success,message);
            }
        });
    },

    getAll: function (callback) {
        Episode.find(function (err, Episodes) {
            if (err)
                callback(false,err);
            else
                callback(true,Episodes);
        });
    },

    remove: function (id, callback) {
        Episode.remove({_id: id}, function(err, resp) {
            // more than zero entries removed?
            if (resp.result.n > 0)
                callback(true);
            else
                callback(false);
        });

    },

    edit: function (id, data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Episode.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, Episode) {
            // Episode exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Episode[key] = data[key];
                    }
                }
                Episode.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Episode);
                    }
                });
            }
            // Episode is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, Episode);
            }
        });
    },
};
