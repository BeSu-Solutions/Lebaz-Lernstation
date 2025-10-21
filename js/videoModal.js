document.addEventListener('DOMContentLoaded', function () {
    const videoModal = document.getElementById('video-modal');
    const closeModalButton = document.getElementById('close-video-modal');
    const videoPlayer = document.getElementById('video-player');
    const openModalButtons = document.querySelectorAll('.open-video-modal-trigger');

    if (!videoModal || !closeModalButton || !videoPlayer || openModalButtons.length === 0) {
        return; // Exit if no video modal elements are on the page
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoSrc = this.dataset.videoSrc;
            
            if (videoSrc) {
                videoPlayer.src = videoSrc;
                videoPlayer.load();
                videoModal.classList.remove('hidden');
                videoPlayer.play();
            }
        });
    });

    const closeModal = () => {
        videoModal.classList.add('hidden');
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.src = "";
    };

    closeModalButton.addEventListener('click', closeModal);
    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal) closeModal();
    });
});