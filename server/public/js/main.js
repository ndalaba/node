(function () {
    $('document').ready(function () {
        // Prevent default for empty links
        $('[href="#"]').click(function (e) {
            e.preventDefault()
        });

        // Adding data-parent to togglable nav items
        $('#sidenav [data-toggle]').each(function () {
            $(this).attr('data-parent', '#' + $(this).parent().parent().attr('id'));
        });

        /**
         * Trigger window resize to update nvd3 charts
         */
        $('[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            window.dispatchEvent(new Event('resize'));
        });

        /**
         * Enable tooltips everywhere
         */
        //$('[data-toggle="tooltip"]').tooltip();

        /**
         * Enable popovers everywhere
         */
        $('[data-toggle="popover"]').popover();

        // Activate animated progress bar
        $('.bd-toggle-animated-progress').on('click', function () {
            $(this).siblings('.progress').find('.progress-bar-striped').toggleClass('progress-bar-animated')
        });

        /**
         * Enable Custom Scrollbars only for desktop
         */
        var mobileDetect = new MobileDetect(window.navigator.userAgent);

        if (!mobileDetect.mobile()) {
            $('.custom-scrollbar').perfectScrollbar();
        }

    });

})();