// --- NEW: Tab Functionality Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-item');
    const contentPanels = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get the target tab's data attribute
            const targetTab = tab.dataset.tab;

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active-tab'));
            // Add active class to the clicked tab
            tab.classList.add('active-tab');

            // Hide all content panels
            contentPanels.forEach(panel => {
                panel.classList.add('hidden');
            });

            // Show the corresponding content panel
            const targetPanel = document.querySelector(`.tab-content[data-tab="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });
});