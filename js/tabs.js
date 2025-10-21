document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-item');
    const contentPanels = document.querySelectorAll('.tab-content');

    if (tabs.length === 0 || contentPanels.length === 0) {
        return; // Exit if no tabs are on the page
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');

            contentPanels.forEach(panel => {
                panel.classList.add('hidden');
            });

            const targetPanel = document.querySelector(`.tab-content[data-tab="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });
});