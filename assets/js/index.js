$(document).ready(function() {
    var gallery     = $('#gallery ul'),
        pics        = gallery.find('li'),
        first_pic   = pics.filter(':first'),
        last_pic    = pics.filter(':last'),
        curr_index  = 1,
        pic_width = 1404; // 1400px + 4px as a slight adjustment

    // initialize 1st pager as active
    $('#pager-' + curr_index).attr('src', 'assets/images/hover-pager.png');
      
    // clone 1st pic and append after last pic
    // clone last pic and append before 1st pic
    first_pic.before(last_pic.clone(true)); 
    last_pic.after(first_pic.clone(true)); 
      
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
                    multiplier = -1;
                    break;
                case 'next':
                    multiplier = 1;
                    break;  
                case 'pager-2':
                    multiplier = 2;
                    break;  
                case 'pager-3':
                    multiplier = 3;
                    break;
                default:
                    multiplier = 1;
                    break;                  
            }

            // if pager is clicked, reset slider before moving to the chosen slide
            if(btn.hasClass('slider__btn-pager')) {
                gallery.css({left: 0 });
                curr_index = multiplier;
            }

            gallery.animate({ left: '+=' + (-pic_width * multiplier) }, function() {
          
                // if previous or next is clicked, add/subtract 1 to index
                if(btn.hasClass('slider__btn-prev-next')) {
                    curr_index += multiplier;  
                }
                
                trigger_loop = (curr_index === 0 || curr_index > pics.length);

                if (trigger_loop) {
                    // move from 1st pic to cloned last pic or last pic to cloned 1st pic
                    curr_index = (curr_index === 0) ? pics.length : 1; 
                    gallery.css({left:  -pic_width * curr_index });
                }

                // change active pager and set the other pagers to default color
                $('#pager-' + curr_index).attr('src', 'assets/images/hover-pager.png');
                $('.slider__btn-pager').not('#pager-' + curr_index).attr('src', 'assets/images/standard-pager.png');
            });   
        }
    });

    $('#btn-pagetop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
});