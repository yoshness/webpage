$(document).ready(function() {
    var gallery     = $('#gallery'),
        pics        = gallery.find('.slider__gallery-image'),
        first_pic   = pics.filter(':first'),
        last_pic    = pics.filter(':last'),
        curr_index  = 1,
        pic_width = 25; // width of .slider__gallery-image

    // initialize 1st pager as active and hide previous button
    $('#pager-' + curr_index).attr('src', 'assets/images/hover-pager.png');
    $('#previous').hide();
      
    // clone last pic and append before 1st pic
    first_pic.before(last_pic.clone(true));  
      
    $('.slider__btn-trigger').on('click', function() {

        var btn = $(this);
        var btn_id = btn.attr('id');
        
        if (gallery.is(':not(:animated)')) {

            // do nothing if pager is clicked and you're on that slide already 
            if(btn_id.split('-')[1] == curr_index) {
                return false;
            }

            var trigger_loop = false;
            var multiplier;       

            switch(btn_id) {
                case 'previous':
                    multiplier = -4;
                    curr_index -= 1;
                    break;
                case 'next':
                    multiplier = 4;
                    curr_index += 1;
                    break;  
                case 'pager-2':
                    multiplier = 8;
                    curr_index = 2;
                    break;  
                case 'pager-3':
                    multiplier = 12;
                    curr_index = 3;
                    break;
                default:
                    multiplier = 4;
                    curr_index = 1;
                    break;                  
            }

            // if pager is clicked, reset slider before moving to the chosen slide
            if(btn.hasClass('slider__btn-pager')) {
                gallery.css({ left: 0 + '%' });
            }

            gallery.animate({ left: '+=' + (-pic_width * multiplier + '%') }, function() {

                // change active pager and set the other pagers to default color
                $('#pager-' + curr_index).attr('src', 'assets/images/hover-pager.png');
                $('.slider__btn-pager').not('#pager-' + curr_index).attr('src', 'assets/images/standard-pager.png');

                // hide/show previous and next buttons depending on active image (curr_index)                
                if(curr_index == 1) {
                    $('#previous').hide();
                    $('#next').show();
                }
                else if(curr_index == 3) {
                    $('#previous').show();
                    $('#next').hide();
                }
                else {
                    $('#previous').show();
                    $('#next').show();
                }

            });   
        }
    });

    $('#btn-pagetop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
});