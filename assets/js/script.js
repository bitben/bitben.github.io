function loadMorePost()
{
    $('.spinner').fadeIn('slow', function() {
        var postpath = $("a#load:first").attr('href') + '/' + 'index.html';
        $("a#load").remove();
        $.get(postpath, function(data) {
            if (data != '') {
                $('.spinner').fadeOut('slow', function() {
                    $(data).find("#post, a#load").fadeIn(1000).insertAfter("div#post:last");
                });
            }
        });
    });
}

$(document).ready(function() {
    $.ajax({
    type: 'GET',
    url: '/data/latest-post.json',
    data: { get_param: 'value' },
    dataType: 'json',
    success: function (data) {
        $.each(data, function(index, item) {
            var sidebardata = '<div class="item"> <div class="row"> <div class="col-md-4"> <img src="'+item.image_xsmall+'"> </div> <div class="col-md-8"><a href="'+item.url+'">'+item.title+'</a></div></div>';
            $(sidebardata).appendTo(".quick-links");
            return index < 4;
        });
    }
});

    $(window).scroll(function() {
        var link = $("a#load").attr('href');
        if (link != null) {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                loadMorePost();
            }
        }
    });
});
