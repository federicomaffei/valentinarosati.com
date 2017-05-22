
document.addEventListener("DOMContentLoaded", function (event) {

    function setVideoSize(width, height) {
        document.getElementById('video-frame').setAttribute("width", width);
        document.getElementById('video-frame').setAttribute("height", height);
    };

    setVideoSize(window.innerWidth, window.innerHeight);

    window.onresize = function (event) {
        setVideoSize(event.currentTarget.innerWidth, event.currentTarget.innerHeight);
    };
});