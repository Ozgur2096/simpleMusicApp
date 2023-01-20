const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const displayCurrentTime = document.querySelector('#current-time');
const displayWholeTime = document.querySelector('#whole-time');

const songArray = document.querySelectorAll('.song');
// gereksiz yere yazdim bunlari, ustteki satir hallediyor aslinda :)
// songs
// const balalayka1 = document.querySelector('#balalayka1');
// const myFavorite = document.querySelector('#myFavorite');
// const nice = document.querySelector('#nice');
// const myFavorite2 = document.querySelector('#myFavorite2');
// const myFavorite3 = document.querySelector('#myFavorite3');
// const myMelody = document.querySelector('#myMelody');
// const setarehSinging = document.querySelector('#setarehSinging');
// const setarehSinging2 = document.querySelector('#setarehSinging2');
// const seventeen = document.querySelector('#seventeen');
// const song1 = document.querySelector('#song1');
// const song2 = document.querySelector('#song2');
// const viejosTiempos = document.querySelector('#viejosTiempos');
// const viejosTiempos2 = document.querySelector('#viejosTiempos2');
// const yollar = document.querySelector('#yollar');

// Song Titles
const songs = [
  'nice',
  'myFavorite',
  'myFavorite2',
  'myFavorite3',
  'balalayka1',
  'myMelody',
  'setarehSinging',
  'setarehSinging2',
  'seventeen',
  'song1',
  'song2',
  'viejosTiempos',
  'viejosTiempos2',
  'yollar',
];

// Keep track of the songs
let songIndex = 0;

// Initially load song info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.png`;
}

function playSong() {
  musicContainer.classList.add('play');
  play.querySelector('i.fas').classList.remove('fa-play');
  play.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  play.querySelector('i.fas').classList.remove('fa-pause');
  play.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex === songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // my adjustments
  let retSecCurrent = '';
  let retMinCurrent = '';
  currentTime / 60 < 10 ? (retMinCurrent = '0') : (retMinCurrent = '');
  currentTime % 60 < 10 ? (retSecCurrent = '0') : (retSecCurrent = '');
  displayCurrentTime.innerText = `${retMinCurrent}${(currentTime / 60).toFixed(
    0
  )} : ${retSecCurrent}${(currentTime % 60).toFixed(0)}`;

  let retSecWhole = '';
  let retMinWhole = '';
  duration / 60 < 10 ? (retMinWhole = '0') : (retMinWhole = '');
  duration % 60 < 10 ? (retSecWhole = '0') : (retSecWhole = '');
  displayWholeTime.innerText = `${retMinWhole}${Math.floor(
    duration / 60 || 0
  )} : ${retSecWhole}${Math.floor(duration % 60 || 0)}`;

  console.log(duration / 60);
  console.log(duration);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function playSelectedSong(e) {
  let songName = e.target.id;
  loadSong(`${songName}`);
  playSong();
}

// EVENT LISTENERS
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

// Song list
for (let i = 0; i < songArray.length; i++) {
  songArray[i].addEventListener('click', playSelectedSong);
}

// gereksiz yere yazdim bunlari, ustteki satir hallediyor aslinda :)
// balalayka1.addEventListener('click', playSelectedSong);
// myFavorite.addEventListener('click', playSelectedSong);
// nice.addEventListener('click', playSelectedSong);
// myFavorite2.addEventListener('click', playSelectedSong);
// myFavorite3.addEventListener('click', playSelectedSong);
// myMelody.addEventListener('click', playSelectedSong);
// setarehSinging.addEventListener('click', playSelectedSong);
// setarehSinging2.addEventListener('click', playSelectedSong);
// seventeen.addEventListener('click', playSelectedSong);
// song1.addEventListener('click', playSelectedSong);
// song2.addEventListener('click', playSelectedSong);
// viejosTiempos.addEventListener('click', playSelectedSong);
// viejosTiempos2.addEventListener('click', playSelectedSong);
// yollar.addEventListener('click', playSelectedSong);
