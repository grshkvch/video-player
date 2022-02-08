// Variables
const video = document.querySelector('.video');
const play = document.querySelector('.play-pause-container');
const playBtn = document.querySelector('.play-button');
const volumeBtn = document.querySelector('.volume-button-container');
const volume = document.querySelector('.volume-bar');
const progressBar = document.querySelector('.progress-bar');
const progressBarFilled = document.querySelector('.progress-bar-filled');
const time = document.querySelector('.controls-time');
const fullScreen = document.querySelector('.full-screen-container');
const poster = document.querySelector('.poster');
const playerContainer = document.querySelector('.player-container');

// Poster
function hidePoster() {
    poster.classList.add('hidden');
    playerContainer.classList.add('active');

}
poster.addEventListener('click', hidePoster);
playBtn.addEventListener('click', hidePoster);


// Play-pause-video
function toggleVideoStatus() {
    if (video.paused) {
        video.play()
        play.classList.add('playing');
        playBtn.classList.add('playing');
    } else {
        video.pause()
        play.classList.remove('playing');
        playBtn.classList.remove('playing');
    }
}

play.addEventListener('click', toggleVideoStatus);
playBtn.addEventListener('click', toggleVideoStatus);


// Time
function updateTime() {
    // Minutes
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    let minutesDuration = Math.floor(video.duration / 60);
    if (minutesDuration < 10) {
        minutesDuration = '0' + minutesDuration;
    }
    // Seconds
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    let secondsDuration = Math.floor(video.duration) 
    if (secondsDuration < 10) {
        secondsDuration = '0' + secondsDuration;
    }

    time.innerHTML = `${minutes}:${seconds} / ${minutesDuration}:${secondsDuration}`
}

video.addEventListener('timeupdate', updateTime);


// Progress
function updateProgress() {
    const currentProgress = (video.currentTime / video.duration) * 100
    progressBarFilled.style.width = `${currentProgress}%`

    updatePlayBtn();
    }


function moveProgress(event) {
    const moveProgress = (event.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = moveProgress;
    console.log(event)
}

function updatePlayBtn() {
    if(video.ended) {
        playBtn.classList.remove('playing');   
        play.classList.remove('playing');
}
}

video.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', moveProgress);


// Volume
function volumeUpdate() {
    video.volume = volume.value;
    volumeBar();
}

function toggleVolume() {    
        if (video.volume === 0) {
            video.volume = 1;
            volume.value = 1;
            volumeBtn.classList.remove('muted')
        } else {
            video.volume = 0;
            volume.value = 0;
            volumeBtn.classList.add('muted')
        }
        console.log(volume.value)
}

function volumeBar() {
    if (video.volume === 0) {
        volumeBtn.classList.add('muted')
    } else {
        volumeBtn.classList.remove('muted')
    }
    console.log(volume.value)
}

volume.addEventListener('change', volumeUpdate)
volumeBtn.addEventListener('click', toggleVolume)



// Fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen() || video.webkitRequestFullScreen() || video.mozRequestFullScreen() || video.msRequestFullscreen();
    } else {
        video.exitFullscreen() || video.webkitExitFullScreen() || video.mozExitFullScreen() || video.msExitFullscreen();
    }
}

fullScreen.addEventListener('click', toggleFullscreen)
playBtn.addEventListener('dblclick', toggleFullscreen)
