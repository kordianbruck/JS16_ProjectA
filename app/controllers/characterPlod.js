module.exports = {
    /**
     * @api {post} /api/plod?token=XYZ Add characters PLOD
     * @apiVersion 0.0.1
     * @apiName Add
     * @apiGroup CharacterPlod  
     *
     * @apiParam {token} Essential. Please ask @kordianbruck for API access token. Make your request in this query: http://got-api.bruck.me/api/plod?token=XYZ
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 201 OK
     *     {"message" : "Success", "data" : [characterplod]}
     *
     * @apiError (400) message: 'Error. Property not valid to schema.', errorProperty: message 
     * @apiErrorExample {json} NotFound     *      HTTP/1.1 404
     *      { message: 'Failure. No character PLOD with that name existing!', data: lookup };
     *
     * @apiDescription Add new character PLOD values. Take a look at https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/characterPlod.js to understand how the JSON-body should look like.
     */
    add: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');
        charactersPlodStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });

    },

    /**
     * @api {post} /api/plod/find Get characters PLOD
     * @apiVersion 0.0.1
     * @apiName Get
     * @apiGroup CharacterPlod  
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : [characterplod]}
     *
     * @apiError (404) message: 'Failure. No character PLOD with that data existing!',data: message 
     * @apiError (400) message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message
     *
     * @apiDescription Get character PLOD values. The request should be in the body.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/characterPlod.js" target="_blank">characterPlod model</a>.
     */
    get: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');
        charactersPlodStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/plod Get all characters PLOD
     * @apiVersion 0.0.1
     * @apiName GetAll
     * @apiGroup CharacterPlod  
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {characterplod}
     *
     * @apiError (404) message: 'Failure. No character PLOD with that data existing!'
     *
     * @apiDescription Get all character PLOD values.
     */
    getAll: function (req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getAll(function(success,characters) {
            if(success)
                res.status(200).json(characters);
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!'});

        });
    },

    /**
     * @api {get} /api/plod/byCount/:count Get all characters PLOD
     * @apiVersion 0.0.1
     * @apiName GetByPlod
     * @apiGroup CharacterPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {characterplod}
     *
     * @apiError (404) message: 'Failure. No character PLOD with that data existing!'
     *
     * @apiDescription Get character PLOD values, limited by :count parameter. PLOD values are sorted in descending order.
     */
    getByPLOD: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getByPLOD(req.params.count, function(success, message) {
            if(success)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!'});
        });
    },

    /**
     * @api {get} /api/plod/bySlug/:slug Get character plods by slug
     * @apiVersion 0.0.1
     * @apiName GetBySlug
     * @apiGroup CharacterPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message": "Success", "data": [characterplod]}
     *
     * @apiDescription Get character PLOD values by the slug of the character like Jon_Snow.
     */
    getBySlug: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getBySlug(req.params.slug, function(success, message) {
            if(success)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!'});
        });
    },

    /**
     * @api {get} /api/plod/byName/:name Get character plods by name
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup CharacterPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message": "Success", "data": [characterplod]}
     *
     * @apiDescription Get character PLOD values by the name of the character like Jon Snow.
     */
    getByName: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getByName(req.params.name, function(success, message) {
            if(success)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!'});
        });
    },

    /**
     * @api {get} /api/plod/byId/:id Get characters PLOD by :id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup CharacterPlod  
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Failure. No character PLOD with that data existing!', data: message
     *
     * @apiDescription Get character PLOD values by :id
     */
    getById: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/plod/byAlgorithm/:algorithm Get characters PLOD by :algorithm.
     * @apiVersion 0.0.1
     * @apiName GetByAlgorithm
     * @apiGroup CharacterPlod  
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Failure. No character PLOD with that data existing!', data: message
     *
     * @apiError (400) message: 'Error.', error: message
     *
     * @apiDescription Get character PLOD values by :algorithm. Algorithm is of type String and serves as a distinction between Project B, Group 6, Group 7 etc. as well as other PLOD methods. As of April 4th, there is "gotplod" and "gotarffplod" in the DB.
     */
    getByAlgorithm: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getByAlgorithm(req.params.algorithm, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 2)
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {put} /api/plod/edit/:id Edit characters PLOD by :id
     * @apiVersion 0.0.1
     * @apiName EditPlod
     * @apiGroup CharacterPlod  
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Error. No character exsiting with that id', id: :id
     *
     * @apiError (400) message: 'Error: Bad request. No such property.', errorProperty: message 
     *
     * @apiError (400) message: 'Error.', error: message
     *
     * @apiDescription Edit character PLOD values by :id
     */
    edit: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.edit(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No character exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {delete} /api/plod/remove/:id Delete characters PLOD by :id
     * @apiVersion 0.0.1
     * @apiName DeletePlod
     * @apiGroup CharacterPlod  
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Error. No PLOD existing with that id', id: :id
     *
     * @apiError (400) message: 'Error: Bad request. No such property.', errorProperty: message
     *
     * @apiError (400) message: 'Error.', error: message 
     *
     * @apiDescription Delete character PLOD values by :id
     */
    remove: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.remove(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No PLOD existing with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    }
};
