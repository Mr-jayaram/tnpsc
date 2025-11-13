   
        // 1. Preloader
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
        });

        // 2. Mobile Menu Functionality
        const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;
        const openMenu = () => body.classList.add('mobile-menu-active');
        const closeMenu = () => body.classList.remove('mobile-menu-active');
        if (mobileMenuIcon && mobileMenuClose) {
            mobileMenuIcon.addEventListener('click', openMenu);
            mobileMenuClose.addEventListener('click', closeMenu);
            // mobileMenuOverlay.addEventListener('click', closeMenu);
        }
