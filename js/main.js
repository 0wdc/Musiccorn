const dataMusic = [
    {
    id: '011084534',
    artist: 'ELEK34KA ЯECORDS',
    track: 'Look Back at Me',
    poster: 'images/pic1.jpg',
    mp3: 'audio/011084534.mp3',
    },
    {
    id: '045455546',
    artist: 'ELEK34KA ЯECORDS',
    track: 'Got That Good',
    poster: 'images/pic2.jpg',
    mp3: 'audio/045455546.mp3',
    },
    {
    id: '080088465',
    artist: 'ELEK34KA ЯECORDS',
    track: 'It Was a Good Day',
    poster: 'images/pic3.jpg',
    mp3: 'audio/080088465.mp3',
    },
    {
    id: '248486554',
    artist: 'ELEK34KA ЯECORDS',
    track: 'Got 5 On It',
    poster: 'images/pic4.jpg',
    mp3: 'audio/248486554.mp3',
    },
    {
    id: '311514564',
    artist: 'ELEK34KA ЯECORDS',
    track: 'They Reminisce Over You',
    poster: 'images/pic5.jpg',
    mp3: 'audio/311514564.mp3',
    },
    {
    id: '605484531',
    artist: 'ELEK34KA ЯECORDS',
    track: 'Tha Crossroads',
    poster: 'images/pic6.jpg',
    mp3: 'audio/605484531.mp3',
    },
    {
    id: '646554865',
    artist: 'ELEK34KA ЯECORDS',
    track: "Know The Ledge",
    poster: 'images/pic7.jpg',
    mp3: "audio/646554865.mp3",
    },
    {
    id: '708074545',
    artist: 'ELEK34KA ЯECORDS',
    track: 'Insane In The Brain',
    poster: 'images/pic8.jpg',
    mp3: 'audio/708074545.mp3',
    },
    {
    id: '804153454',
    artist: 'ELEK34KA ЯECORDS',
    track: 'N.Y. State Of Mind',
    poster: 'images/pic9.jpg',
    mp3: 'audio/804153454.mp3',
    },
    {
    id: '845554645',
    artist: 'ELEK34KA ЯECORDS',
    track: 'Welcome To The Terrordome',
    poster: 'images/pic10.jpg',
    mp3: 'audio/845554645.mp3',
    },
    {
    id: '879878884',
    artist: 'ELEK34KA ЯECORDS',
    track: 'Playaz Club',
    poster: 'images/pic11.jpg',
    mp3: 'audio/879878884.mp3',
    },
    {
    id: '884564845',
    artist: 'ELEK34KA ЯECORDS',
    track: '93" Till Infinity',
    poster: 'images/pic12.jpg',
    mp3: 'audio/884564845.mp3',
    },
];
let playlist = [];
const favoriteList = localStorage.getItem('favorite')
? JSON.parse(localStorage.getItem('favorite'))
: [];
const audio = new Audio();
const headerLogo = document.querySelector('.header__logo');
const favoriteBtn = document.querySelector('.header__favorite-btn');
const tracksCard = document.getElementsByClassName('track');
const player = document.querySelector('.player');
const catalogContainer = document.querySelector('.catalog__container');
const playerProgressInput = document.querySelector('.player__progress-input');
const playerTimePassed = document.querySelector('.player__time-passed');
const playerTimeTotal = document.querySelector('.player__time-total');
const pauseBtn = document.querySelector('.player__icon_pause');
const stopBtn = document.querySelector('.player__controller-stop');
const prevBtn = document.querySelector('.player__controller-prev');
const nextBtn = document.querySelector('.player__controller-next');
const likeBtn = document.querySelector('.player__controller-like');
const muteBtn = document.querySelector('.player__controller-mute');
const playerVolumeInput = document.querySelector('.player__volume-input');
const trackInfoTitle = document.querySelector('.player__title');
const trackInfoArtist = document.querySelector('.player__artist');
const catalogAllBtn = document.createElement('button');
catalogAllBtn.classList.add('catalog__btn-all');
catalogAllBtn.innerHTML = `
    <span>Watch All</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
    </svg>
`;
const pausePlayer = () => {
    const trackActive = document.querySelector('.track_active');
    if (audio.paused){
        audio.play();
        pauseBtn.classList.remove('player__icon-play');
        trackActive.classList.remove('track_pause');
    }
    else {
        audio.pause();
        pauseBtn.classList.add('player__icon-play');
        trackActive.classList.add('track_pause');
    }
};
const playMusic = (event) => {
    event.preventDefault();
    const trackActive = event.currentTarget;
    if(trackActive.classList.contains('track_active')) {
        pausePlayer(trackActive);
        return;
    };
    let i = 0;
    const id = trackActive.dataset.idTrack;
    const index = favoriteList.indexOf(id);
    if (index !== -1) {
        likeBtn.classList.add('player__icon_like_active');
    }
    else {
        likeBtn.classList.remove('player__icon_like_active');
    }
    const track = playlist.find((item, index) => {
        i = index;
        return id === item.id;
    });
    audio.src = track.mp3;
    trackInfoTitle.textContent = track.track;
    trackInfoArtist.textContent = track.artist;
    audio.play();
    pauseBtn.classList.remove('player__icon_play');
    player.classList.add('player_active');
    const prevTrack = i === 0 ? playlist.length - 1 : i - 1;
    const nextTrack = i + 1 === playlist.length ? 0 : i + 1;
    prevBtn.dataset.idTrack = playlist[prevTrack].id;
    nextBtn.dataset.idTrack = playlist[nextTrack].id;
    likeBtn.dataset.idTrack = id;
    audio.addEventListener('ended', () => {
        nextBtn.dispatchEvent(new Event('click', {bubbles : true}))
    })
    for (let i = 0; i < tracksCard.length; i++) {
        if(id === tracksCard[i].dataset.idTrack) {
            tracksCard[i].classList.add('track_active');
        }
        else{
            tracksCard[i].classList.remove('track_active');
        }
    }
    
}
const addHandlerTrack = () =>{
for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].addEventListener('click', playMusic);
}};
pauseBtn.addEventListener('click', pausePlayer);
stopBtn.addEventListener('click', () => {
    audio.src = '';
    player.classList.remove('player_active');
    document.querySelector('track_active').classList.remove('track_active');
});
const createCard = (data) => {
    const card = document.createElement('card');
    card.href = '#';
    card.classList.add('catalog__item', 'track');
    card.dataset.idTrack = data.id;
    card.innerHTML = `
                <div class="track-img-wrap">
                    <img class="track__poster" src="${data.poster}" alt="${data.artist} ${data.track}" width="180" height="180">
                </div>
                <div class="track__info">
                    <p class="track__title">${data.track}</p>
                    <p class="track__artist">${data.artist}</p>
                </div>
                `;
    return card;
}
const renderCatalog = (dataList) => {
    playlist = [...dataList];
    catalogContainer.textContent = '';
    const listCards = dataList.map(createCard);
    catalogContainer.append(...listCards);
    addHandlerTrack();
}
const checkCount = (i = 1) => {
    tracksCard[0]
    if (catalogContainer.clientHeight > tracksCard[0].clientHeight * 3){
        tracksCard[tracksCard.length - 1].style.display = 'none';
        checkCount(i + 1);
    }
    else if (i !== 1) {
        catalogContainer.append(catalogAllBtn);
    }
};
const updateTimer = () => {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progress = (currentTime / duration) * playerProgressInput.max;
    playerProgressInput.value = progress ? progress : 0;
    const minutesPassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';
    const minutesDuration = Math.floor(duration / 60) || '0';
    const secondsDuration = Math.floor(duration % 60) || '0';
    playerTimePassed.textContent = `${minutesPassed}:${secondsPassed < 10 ? '0' + secondsPassed : secondsPassed}`
    playerTimeTotal.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' + secondsDuration : secondsDuration}`
};
const init = () => {
    audio.volume = localStorage.getItem('volume') || 1;
    playerVolumeInput.value = audio.volume * 100;
    renderCatalog(dataMusic);
    catalogAllBtn.addEventListener('click', () => {
        [...tracksCard].forEach((trackCard) => {
            trackCard.style.display = '';
            catalogAllBtn.remove();
        });
    });
    prevBtn.addEventListener('click', playMusic);
    nextBtn.addEventListener('click', playMusic);
    audio.addEventListener('timeupdate', updateTimer);
    playerProgressInput.addEventListener('change', () => {
        const progress = playerProgressInput.value;
        audio.currentTime = (progress / playerProgressInput.max) * audio.duration;
    });
    favoriteBtn.addEventListener('click', () => {
        const data = dataMusic.filter((item) => favoriteList.includes(item.id))
        renderCatalog(data);
        checkCount();
    });
    headerLogo.addEventListener('click', () => {
        renderCatalog(dataMusic);
        checkCount();
    });
    likeBtn.addEventListener('click', () => {
        const index = favoriteList.indexOf(likeBtn.dataset.idTrack);
        if (index === -1) {
            favoriteList.push(likeBtn.dataset.idTrack); 
            likeBtn.classList.add('player__icon_like_active');
        }
        else {
            favoriteList.splice(index, 1);
            likeBtn.classList.remove('player__icon_like_active');
        }
        localStorage.setItem('favorite', JSON.stringify(favoriteList));
    });
    playerVolumeInput.addEventListener('input', () => {
        const value = playerVolumeInput.value;
        audio.volume = value / 100;
    });
    muteBtn.addEventListener('click', () => {
        if(audio.volume) {
            localStorage.setItem('volume', audio.volume);
            audio.volume = 0;
            muteBtn.classList.add('player__icon-mute-off');
            playerProgressInput.value = 0;
        }
        else {
            audio.volume = localStorage.getItem('volume');
            muteBtn.classList.remove('player__icon-mute-off');
            playerProgressInput.value = 100;
        }
    })
};
init();