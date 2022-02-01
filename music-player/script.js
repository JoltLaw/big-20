const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const currentTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const title =  document.getElementById("title")
const image = document.querySelector("img")
const artist = document.getElementById("artist")
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn  = document.getElementById("next");

// Music 
const songs = [ 
    
    {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
},
{
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
},
{
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
},
{
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/ Jacinto Design",
}
]

// check if playing
let isPlaying = false
// current song 
var songIndex = 0;

// update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}

// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
    playBtn.setAttribute("title", "Pause");
    music.play();
}
// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
    playBtn.setAttribute("title", "Play");
    music.pause();
}



// prev song 
function prevSong() {
    songIndex--;
    if (songIndex <0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();

}

// Next song 
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong();
  
}

// onload - select first song
loadSong(songs[songIndex]);

// update progress bar & time
function updateProgressBar(e){
if (isPlaying = true) {
    const {duration, currentTime} = e.srcElement;
    //  update progress bar
    const progressPercent = (currentTime / duration) *100;
    progress.style.width = `${progressPercent}%`;
    // calc time for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    };
    // delay duration switch to avoid NaN
    if(durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    };
     // calc time for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    };
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}
}

// set progress bar
function setProgressBar(e) {
const width = this.clientWidth;
 const clickX = e.offsetX;
 const {duration} = music;
 music.currentTime = `${(clickX / width) * duration}`;
}

// play or pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar)
music.addEventListener("ended", nextSong)