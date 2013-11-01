/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Comment = mongoose.model('Comment')

/**
 * Create comment
 */

exports.create = function (req, res) {
    var article = req.article
    var user = req.user
    var parent = req.params.rpl ? req.params.rpl : null
    var comment = new Comment({
        article: article._id,
        body: req.body.body,
        user: user._id,
        parent: parent
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


