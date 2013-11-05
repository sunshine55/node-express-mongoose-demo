/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema

/**
 * Comment Schema
 */

var CommentSchema = new Schema({
    article: { type: Schema.ObjectId, ref: 'Article' },
    body: { type: String, default: '' },
    user: { type: Schema.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    slug: { type: String, default: '', index: true },
    level: { type: Number, default: 0, max: 2 }
})

/**
 * Validations
 */

CommentSchema.path('body').validate(function (body) {
    return body.length > 0
}, 'Comment body cannot be blank')

mongoose.model('Comment', CommentSchema)