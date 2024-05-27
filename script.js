document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const video = document.createElement('video');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error("Ошибка доступа к веб-камере: ", err);
        });
    } else {
        alert("Веб-камера не поддерживается вашим устройством");
    }

    video.addEventListener('play', () => {
        function drawFrame() {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Применение эффекта воды
            ctx.globalAlpha = 0.6;
            ctx.filter = 'blur(5px)';
            ctx.drawImage(canvas, 0, 5, canvas.width, canvas.height - 10);
            ctx.filter = 'none';
            ctx.globalAlpha = 1.0;

            requestAnimationFrame(drawFrame);
        }

        drawFrame();
    });
});
