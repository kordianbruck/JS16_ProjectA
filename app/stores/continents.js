var Continent = require(__appbase + 'models/continent');

module.exports = {

    add: function (data, callback) {
        var continent = new Continent();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Continent.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                continent[key] = data[key];
            }
        }

        continent.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,continent);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Continent.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        Continent.find(data, function(err,obj)
        {
            if(obj.length === 0)
                callback(3,data);
            else
                callback(1, obj);
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
        Continent.find(function (err, continents) {
            if (err)
                callback(false,err);
            else
                callback(true,continents);
        });
    },

    remove: function (id, callback) {
        Continent.remove({_id: id}, function(err, resp) {
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
            if (data.hasOwnProperty(key) && !Continent.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, continent) {
            // Continent exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Continent[key] = data[key];
                    }
                }
                Continent.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Continent);
                    }
                });
            }
            // Continent is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, continent);
            }
        });
    },
};