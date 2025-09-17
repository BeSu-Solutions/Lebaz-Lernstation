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
            if (contentWrapper) {
                contentWrapper.classList.add('loaded');
            }
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
    // This function finds the current page's filename (e.g., "mischer.html")
    const currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) return;

    const navLinks = document.querySelectorAll('.nav-tab');
    
    navLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('active');

        // Get the filename the link points to
        const linkPage = link.getAttribute('href').split('/').pop();

        // If it matches the current page, add the 'active' class
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}