// layout-loader.js

document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const contentWrapper = document.querySelector('.content-wrapper');

    const fetchHeader = fetch('_header.html').then(response => response.text());
    const fetchFooter = fetch('_footer.html').then(response => response.text());

    // Wait for both the header and footer to be fetched
    Promise.all([fetchHeader, fetchFooter])
        .then(([headerHtml, footerHtml]) => {
            // Both are loaded, now inject them
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = headerHtml;
            }
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = footerHtml;
            }

            // After injecting, find the nav links and set the active state
            setActiveNav();

            // Finally, reveal the content with a smooth fade-in
            if (contentWrapper) contentWrapper.classList.add('loaded');
        })
        .catch(error => {
            console.error("Error loading layout partials:", error);
            // Even if there's an error, show the content so the page isn't blank
            if (contentWrapper) {
                contentWrapper.classList.add('loaded');
            }
        });
});


function setActiveNav() {
    // --- Configuration ---
    const visibleIcons = 5; 

    const navContainer = document.getElementById('nav-scroll-container');
    const navViewport = document.getElementById('nav-viewport');
    if (!navContainer || !navViewport) return;

    const navLinks = Array.from(navContainer.querySelectorAll('.nav-tab'));
    if (navLinks.length === 0) return;

    // --- 1. Find the active link ---
    const currentPage = window.location.pathname.split('/').pop();
    let activeLink = navLinks.find(link => link.getAttribute('href').split('/').pop() === currentPage) || navLinks[0];
    activeLink.classList.add('active');
    
    // --- 2. Set viewport width using reliable hardcoded values ---
    const iconWidth = 48;
    const gapWidth = 12;
    
    const totalViewportWidth = (visibleIcons * iconWidth) + ((visibleIcons - 1) * gapWidth);
    navViewport.style.width = `${totalViewportWidth}px`;

    // --- 3. Defer measurement and scrolling until the browser is ready to paint ---
    requestAnimationFrame(() => {
        const viewportWidth = navViewport.clientWidth;
        const linkOffsetLeft = activeLink.offsetLeft;
        
        // Ideal position: center of link at center of viewport
        let targetScrollLeft = (linkOffsetLeft + iconWidth / 2) - (viewportWidth / 2);

        // Clamp the value to stay within scrollable bounds
        const maxScrollLeft = navContainer.scrollWidth - viewportWidth;
        targetScrollLeft = Math.max(0, targetScrollLeft);
        targetScrollLeft = Math.min(maxScrollLeft, targetScrollLeft);

        // Apply the scroll instantly on load
        navContainer.scrollTo({
            left: targetScrollLeft,
            behavior: 'auto' 
        });

        // Reveal the container now that it's correctly sized and positioned
        navViewport.classList.add('loaded');
    });
}