/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Imager = require('imager')
    , env = process.env.NODE_ENV || 'development'
    , config = require('../../config/config')[env]
    , imagerConfig = require(config.root + '/config/imager.js')
    , Schema = mongoose.Schema
    , fs = require('fs')
    , path = require('path')
    , mkdirp = require('mkdirp')

/**
 * Getters
 */

var getTags = function (tags) {
    return tags.join(',')
}

/**
 * Setters
 */

var setTags = function (tags) {
    return tags.split(',')
}

/**
 * Article Schema
 */

var ArticleSchema = new Schema({
    title: {type: String, default: '', trim: true},
    body: {type: String, default: '', trim: true},
    user: {type: Schema.ObjectId, ref: 'User'},
    tags: {type: [], get: getTags, set: setTags},
    image: { type: String, default: '' },
    createdAt: {type: Date, default: Date.now}
})

/**
 * Validations
 */

ArticleSchema.path('title').validate(function (title) {
    return title.length > 0
}, 'Article title cannot be blank')

ArticleSchema.path('body').validate(function (body) {
    return body.length > 0
}, 'Article body cannot be blank')

/**
 * Pre-remove hook


ArticleSchema.pre('remove', function (next) {
    var imager = new Imager(imagerConfig, 'S3')
    var files = this.image.files

    // if there are files associated with the item, remove from the cloud too
    imager.remove(files, function (err) {
        if (err) return next(err)
    }, 'article')

    next()
})*/

/**
 * Methods
 */

ArticleSchema.methods = {

    /**
     * Save article and upload image
     *
     * @param {Object} images
     * @param {Function} cb
     * @api private
     */

    uploadAndSave: function (username, image, cb) {
        var self, cdnUri, newPath;

        if (!image) return this.save(cb);

        self = this;
        cdnUri = path.join(__dirname, '/../../uploads/', username);
        newPath = path.join(cdnUri, image.name);

        fs.readFile(image.path, function (err, data) {
            if(err) return cb(err);
            mkdirp(cdnUri, function(err) {
                fs.writeFile(newPath, data, function (err) {
                    if(err) return cb(err);
                });
            });
        });
        self.image = username + '/' + image.name;
        self.save(cb);
    },

    /**
     * Add comment
     *
     * @param {User} user
     * @param {Object} comment
     * @param {Function} cb
     * @api private
     */

    addComment: function (user, comment, cb) {
        var notify = require('../mailer/notify')

        notify.comment({
            article: this,
            currentUser: user,
            comment: comment.body
        })

        this.save(cb)
    }

}

/**
 * Statics
 */

ArticleSchema.statics = {

    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    load: function (id, cb) {
        this.findOne({ _id: id })
            .populate('user', 'name email username')
            .exec(cb)
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function (options, cb) {
        var criteria = options.criteria || {}

        this.find(criteria)
            .populate('user', 'name username')
            .sort({createdAt: -1})// sort by date, descending order
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }

}

mongoose.model('Article', ArticleSchema)
