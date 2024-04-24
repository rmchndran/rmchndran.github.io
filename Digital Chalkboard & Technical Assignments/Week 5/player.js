var sound = new Howl({
    src: ["Digital Chalkboard & Technical Assignments/Week 5/SweetestPerfection.mp3"],
    onplay: function() {
        requestAnimationFrame(timeleft);
    }, 
    onload: function() {
        timeleft();
    }
});

document.getElementById("play-btn").addEventListener('click', function(){
    if (sound.playing()) {
        sound.pause();
        this.textContent = 'Play';
    } else {
        sound.play();
        this.textContent = 'Pause';
    }
});

function timeleft() {
    var seek = sound.seek() || 0;
    document.getElementById("time-stamp").textContent = formatTime(Math.round(seek));
    if (sound.playing()) {
        requestAnimationFrame(timeleft)
    }
}

function formatTime(secs) {
    var mins = Math.floor(secs/60) || 0;
    var s = (secs-mins*60) || 0;

    return mins + ':' + (s < 10 ? 0:'') + s;
}