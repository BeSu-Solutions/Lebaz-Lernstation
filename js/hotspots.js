document.addEventListener('DOMContentLoaded', function () {
    const hotspots = document.querySelectorAll('.hotspot');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');

    if (!popup || !closePopupButton || hotspots.length === 0) {
        return; // Exit if a hotspot-enabled page isn't loaded
    }

    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const title = this.dataset.title;
            const text = this.dataset.text;
            
            popupTitle.textContent = title;
            popupText.textContent = text;
            
            popup.classList.add('visible', 'opacity-0', '-translate-x-full');
            popup.classList.remove('hidden');

            const hotspotRect = this.getBoundingClientRect();
            const containerRect = this.parentElement.getBoundingClientRect();
            const popupWidth = popup.offsetWidth;
            const viewportWidth = window.innerWidth;

            let top = hotspotRect.top - containerRect.top + hotspotRect.height + 10;
            const spaceOnRight = viewportWidth - hotspotRect.right;
            let left;

            if (spaceOnRight >= popupWidth) {
                left = hotspotRect.left - containerRect.left;
            } else {
                left = hotspotRect.right - containerRect.left - popupWidth;
            }
            
            const containerPadding = 32;
            left = Math.max(containerPadding, left);

            popup.style.top = `${top}px`;
            popup.style.left = `${left}px`;
            popup.classList.remove('opacity-0', '-translate-x-full');
        });
    });

    closePopupButton.addEventListener('click', function() {
        popup.classList.add('hidden');
    });

    document.addEventListener('click', function(event) {
        if (!popup.contains(event.target) && !Array.from(hotspots).some(h => h.contains(event.target))) {
            popup.classList.add('hidden');
        }
    });
});