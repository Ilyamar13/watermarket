document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('video');

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
});
