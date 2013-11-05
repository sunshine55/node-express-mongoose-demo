/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Comment = mongoose.model('Comment')
    , shortId = require('shortid')

/**
 * Create comment
 */

exports.create = function (req, res) {
    var id = shortId.generate()
    var article = req.article
    var user = req.user
    var slug = req.params.slug ? (req.params.slug + '-' + id) : id
    var level = slug.split('-').length - 1

    var comment = new Comment({
        article: article._id,
        body: req.body.body,
        user: user._id,
        slug: slug,
        level: level
    })

    if (!req.body.body) return res.redirect('/articles/' + article.id)

    article.addComment(user, comment, function(err) {
        if (err) return res.render('500')

        comment.save(function(err) {
            if (err) return res.render('500');
        })

        res.redirect('/articles/' + article.id)
    })
}


