    document.addEventListener('DOMContentLoaded', function () {
        // AOS Initialization
        AOS.init({
            duration: 800,
            once: true
        });

        // --- MOBILE MENU SCRIPT ---
        const menuIcon = document.querySelector('.mobile-menu-icon');
        const closeIcon = document.querySelector('.mobile-menu-close');
        // Note: overlay is commented out in HTML, so we rely on body class and nav-links transition
        const navLinks = document.querySelector('.navbar-links');

        const openMenu = () => { document.body.classList.add('mobile-menu-active'); };
        const closeMenu = () => { document.body.classList.remove('mobile-menu-active'); };

        if (menuIcon) { menuIcon.addEventListener('click', openMenu); }
        if (closeIcon) { closeIcon.addEventListener('click', closeMenu); }
        // if (overlay) { overlay.addEventListener('click', closeMenu); } // Removed as overlay HTML is commented
        if (navLinks) {
            navLinks.addEventListener('click', (e) => {
                // Close menu if a link is clicked
                if (e.target.tagName === 'A' && e.target.href) {
                     closeMenu();
                }
            });
        }
        
        // --- STATS COUNTER SCRIPT ---
        const statsCounter = document.getElementById('stats-counter');
        const animateCounter = (el, goal) => {
            let current = 0;
            const duration = 1500;
            const stepTime = Math.max(1, Math.floor(duration / goal)); 
            const timer = setInterval(() => {
                current += 1;
                el.textContent = current;
                if (current >= goal) { 
                    el.textContent = goal; 
                    clearInterval(timer);
                }
            }, stepTime);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(statsCounter, 100); 
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.5 }); 

        if (statsCounter) {
            // Observe the parent card to start the animation when it enters the viewport
            const heroStatsCard = statsCounter.closest('.hero-stats-card');
            if (heroStatsCard) {
                counterObserver.observe(heroStatsCard);
            }
        }


        // --- FAQ ACCORDION SCRIPT ---
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                         otherItem.classList.remove('active');
                    }
                });
                
                // Toggle the clicked item
                if (!isActive) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });

    });

    // --- PRELOADER SCRIPT ---
    window.addEventListener('load', function () {
        AOS.refresh();
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            document.body.classList.add('loaded');
        }
    });


    // for exam js
        document.addEventListener('DOMContentLoaded', function () {
            // AOS Initialization
            AOS.init({ duration: 800, once: true });
            
            // ** Mobile Menu Script **
            const menuIcon = document.querySelector('.mobile-menu-icon');
            const closeIcon = document.querySelector('.mobile-menu-close');
            const navLinks = document.querySelector('.navbar-links');
            const openMenu = () => { document.body.classList.add('mobile-menu-active'); };
            const closeMenu = () => { document.body.classList.remove('mobile-menu-active'); };
            if (menuIcon) { menuIcon.addEventListener('click', openMenu); }
            if (closeIcon) { closeIcon.addEventListener('click', closeMenu); }
            if (navLinks) {
                 navLinks.addEventListener('click', (e) => {
                     if (e.target.tagName === 'A' && e.target.href) {
                         closeMenu();
                     }
                 });
             }

            // ** Preloader Script **
            window.addEventListener('load', function () {
                AOS.refresh();
                const preloader = document.querySelector('.preloader');
                if (preloader) {
                    document.body.classList.add('loaded');
                }
            });

            // Initial filter call (to ensure visibility on load)
            filterBooks();
        });

        // ** Search Filter Script **
        function filterBooks() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
            const booksGrid = document.getElementById('booksGrid');
            const books = booksGrid.querySelectorAll('.book-card');
            const noResultsMessage = document.getElementById('noResultsMessage');
            
            let visibleCount = 0;

            books.forEach(book => {
                // Get data from attributes and card content
                const keywords = book.getAttribute('data-keywords').toLowerCase();
                const title = book.querySelector('h4').textContent.toLowerCase();
                
                // Check if the search input matches the title or keywords
                const matchesSearch = title.includes(searchInput) || keywords.includes(searchInput);

                if (matchesSearch) {
                    book.style.display = 'block';
                    visibleCount++;
                } else {
                    book.style.display = 'none';
                }
            });

            // Show/Hide No Results Message
            if (visibleCount === 0) {
                noResultsMessage.style.display = 'block';
                booksGrid.style.display = 'block'; // Ensure block layout for centering no results message
            } else {
                noResultsMessage.style.display = 'none';
                booksGrid.style.display = 'grid'; // Set back to grid layout
            }
        }