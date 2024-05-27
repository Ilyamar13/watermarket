document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();

            video.addEventListener('play', () => {
                function drawFrame() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    requestAnimationFrame(drawFrame);
                }
                drawFrame();
            });
        })
        .catch(err => {
            console.error("Ошибка доступа к веб-камере: ", err);
        });
    } else {
        alert("Веб-камера не поддерживается вашим устройством");
    }
});
