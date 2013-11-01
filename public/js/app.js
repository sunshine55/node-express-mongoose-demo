(function ($) {

    // confirmations
    $('.confirm').submit(function (e) {
        e.preventDefault();
        var self = this;
        var msg = 'Are you sure?';
        bootbox.confirm(msg, 'cancel', 'Yes! I am sure', function (action) {
            if (action) {
                $(self).unbind('submit');
                $(self).trigger('submit');
            }
        });
    });

    // tags appearance
    $('#tags').tagsInput({
        'height': '60px',
        'width': '280px'
    });

    // comment reply hidden form
    $('#test_modal').modal({
        backdrop: true,
        keyboard: true,
        show: false
    }).css({
        width: 'auto',
        'margin-left': function () {
            return -($(this).width() / 2);
        }
    });

})(jQuery);
