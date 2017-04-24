var Character = require(__appbase + 'models/character');

module.exports = {

    add: function (data, callback) {
        var character = new Character();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Character.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                character[key] = data[key];
            }
        }

        character.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,character);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Character.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        Character.find(data, function (err, obj) {
            if (err || obj.length === 0) {
                callback(3, data);
            } else {
                callback(1, obj);
            }
        });
    },

    getByName: function(name, strict, callback) {
        if(arguments.length == 2) {
            callback = strict;
            strict = false;
        }

        var lookup = (strict == 'true' || strict === true) ? {'name':name} : {'name':{ "$regex": name, "$options": "i" } };
        this.get(lookup,function (success, message) {
            if (success == 1) {
                callback(success, message[0]);
            }
            else {
                callback(success, message);
            }
        });
    },

    getBySlug: function(slug, strict, callback) {
        if(arguments.length == 2) {
            callback = strict;
            strict = false;
        }

        var lookup = (strict == 'true' || strict === true) ? {'slug':slug} : {'slug':{ "$regex": slug, "$options": "i" } };
        this.get(lookup,function (success, message) {
            if (success == 1) {
                callback(success, message[0]);
            }
            else {
                callback(success, message);
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
        Character.find(function (err, Characters) {
            if (err)
                callback(false,err);
            else
                callback(true,Characters);
        });
    },

    remove: function (id, callback) {
        Character.remove({_id: id}, function(err, resp) {
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
            if (data.hasOwnProperty(key) && !Character.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, Character) {
            // Character exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Character[key] = data[key];
                    }
                }
                Character.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Character);
                    }
                });
            }
            // Character is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, Character);
            }
        });
    },
};
