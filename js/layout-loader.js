document.addEventListener("DOMContentLoaded", function() {
    // ... (This part remains the same: fetching header/footer)
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const contentWrapper = document.querySelector('.content-wrapper');
    const cacheBuster = `?t=${new Date().getTime()}`;

    const fetchPromises = [];
    if (headerPlaceholder) {
        const headerSrc = headerPlaceholder.dataset.headerSrc;
        if (headerSrc) {
            fetchPromises.push(
                fetch(`${headerSrc}${cacheBuster}`)
                    .then(response => response.text())
                    .then(html => { headerPlaceholder.innerHTML = html; })
            );
        }
    }
    if (footerPlaceholder) {
        const footerSrc = footerPlaceholder.dataset.footerSrc;
        if (footerSrc) {
            fetchPromises.push(
                fetch(`${footerSrc}${cacheBuster}`)
                    .then(response => response.text())
                    .then(html => { footerPlaceholder.innerHTML = html; })
            );
        }
    }

    Promise.all(fetchPromises)
        .then(() => {
            // Ensure setActiveNav runs *after* header HTML is injected
            setActiveNav(); 
            if (contentWrapper) {
                contentWrapper.classList.add('loaded');
            }
        })
        .catch(error => console.error("Error loading layout partials:", error));
});

// ===================================================================
// HELPER FUNCTION FOR ICON STYLING (Reversible)
// ===================================================================
/**
 * Applies the correct style to a navigation icon based on its state.
 * @param {HTMLImageElement} img - The image element of the icon.
 * @param {boolean} isActive - Whether the icon should be in the active state.
 * @param {boolean} useFilter - If true, uses grayscale filter; otherwise, swaps src.
 */
function applyIconStyle(img, isActive) {
    if (!img) return;
    
    // Read the global config variable (set by config.js)
    const useFilter = typeof USE_GRAYSCALE_FILTER !== 'undefined' ? USE_GRAYSCALE_FILTER : true; // Default to true if not defined
    
    // Determine the correct source path based on the method
    let targetSrc = '';
    if (useFilter) {
        // Always use the color (active) source when using filters
        targetSrc = img.dataset.activeSrc || img.src; // Fallback to current src if needed
    } else {
        // Use active or inactive source based on state
        targetSrc = isActive ? (img.dataset.activeSrc || img.src) : (img.dataset.inactiveSrc || img.src);
    }

    // Set the image source if it's different
    if (img.src !== targetSrc) {
        img.src = targetSrc;
    }

    // Apply or remove the filter based on the method and state
    if (useFilter) {
        img.style.filter = isActive ? 'grayscale(0%)' : 'grayscale(100%)';
    } else {
        img.style.filter = ''; // Ensure filter is removed if using image swap
    }
}

// ===================================================================
// CIRCULAR NAVIGATION LOGIC (Combined with Reversible Styling)
// ===================================================================
/**
 * Creates a circular, center-focused navigation for the header.
 * Displays a fixed number of icons with the active one centered.
 */
function setActiveNav() {
    // --- Configuration ---
    const visibleIcons = 5; // Must be an odd number
    if (visibleIcons % 2 === 0) {
        console.error("setActiveNav Configuration Error: visibleIcons must be an odd number.");
        return; 
    }

    const navContainer = document.getElementById('nav-scroll-container');
    const navViewport = document.getElementById('nav-viewport');
    if (!navContainer || !navViewport) {
        // Return if elements aren't ready/present yet
        return;
    }

    // Store the original set of links the first time, ensuring they exist
    if (!window.originalNavLinks) {
         const initialLinks = Array.from(navContainer.querySelectorAll(':scope > a.nav-tab'));
         if (initialLinks.length > 0) {
             window.originalNavLinks = initialLinks;
         } else {
             // If no links found initially, exit and maybe try again later if content loads async
             return;
         }
    }
    const originalLinks = window.originalNavLinks;
    const totalCount = originalLinks.length;

    if (totalCount === 0) {
        return; // No links to work with
    }

    // --- 1. Find the index of the currently active page ---
    const currentPage = window.location.pathname.split('/').pop();
    let activeOriginalIndex = originalLinks.findIndex(link => {
        const href = link.getAttribute('href');
        return href && href.split('/').pop() === currentPage;
    });
    if (activeOriginalIndex === -1) activeOriginalIndex = 0; // Default to first

    // --- 2. Calculate the indices of the icons to display ---
    const indicesToShow = [];
    const centerOffset = Math.floor(visibleIcons / 2); 
    for (let i = -centerOffset; i <= centerOffset; i++) {
        const index = (activeOriginalIndex + i + totalCount) % totalCount;
        indicesToShow.push(index);
    }

    // --- 3. Rebuild the visible nav container ---
    navContainer.innerHTML = ''; // Clear current icons
    indicesToShow.forEach(index => {
        const originalLink = originalLinks[index];
        if (originalLink) {
            const clone = originalLink.cloneNode(true); 
            const img = clone.querySelector('img');
            
            // Apply INACTIVE style to all clones initially using the helper
            applyIconStyle(img, false);
            clone.classList.remove('active'); // Ensure active class is removed from clone

            navContainer.appendChild(clone);
        }
    });

    // --- 4. Highlight the centered active icon ---
    const displayedLinks = navContainer.querySelectorAll('.nav-tab');
    const centerIndexInDisplay = centerOffset; 

    if (displayedLinks.length > centerIndexInDisplay) {
        const activeLinkInDisplay = displayedLinks[centerIndexInDisplay];
        activeLinkInDisplay.classList.add('active'); // Add styling class (e.g., scale)
        const activeImg = activeLinkInDisplay.querySelector('img');
        
        // Apply ACTIVE style using the helper
        applyIconStyle(activeImg, true);
    }

    // --- 5. Set viewport width ---
    const iconWidth = 48;  // w-12 = 3rem = 48px
    const gapWidth = 24;   // space-x-3 = 0.75rem = 12px
    const totalViewportWidth = (visibleIcons * iconWidth) + ((visibleIcons - 1) * gapWidth);
    navViewport.style.width = `${totalViewportWidth}px`;

    // --- 6. Reveal the container ---
    // No scrolling needed with the cloning method
    navViewport.classList.add('loaded');
}