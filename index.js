     const $ = document.querySelector.bind(document);
     const $$ = document.querySelectorAll.bind(document);
     const status = $('.status');
     const title =  $('.title');
     const timeLeft = $('.time .left');
     const timeRight = $('.time .right');
     const imageCD =  $('.cd img');
     const audio =  $('#audio');
     const range = $('#progress');
     const toggleBtn = $('.btn-toggle-play');
     const runBtn = $('.fa-play-circle');
     const pauseBtn = $('.fa-pause-circle');
     const playlist = $('.playlist');
     const backBtn = $('.btn-backward');
     const nextBtn = $('.btn-forward');
     const repeatBtn = $('.btn-repeat');
     const randomBtn = $('.btn-random');
         const app = {
           isPlaying: false,
           isRandom: false,
           isLoop: false,
           currentIndex: 0,
           songs : [
             {
               name: 'Bài Này Chill Phết',
               singer: 'Đen ft. Min',
               path: './assets/music/song1.mp3',
               image: './assets/image/song1.jpg'
             },
             {
               name: 'Đi Về Nhà',
               singer: 'Đen x Justatee',
               path: './assets/music/song2.mp3',
               image: './assets/image/song2.jpg'
             },
             {
               name: 'Lối Nhỏ',
               singer: 'Đen ft Phương Anh Đào',
               path: './assets/music/song3.mp3',
               image: './assets/image/song3.jpg'
             },
             {
               name: 'Làm gì phải hốt',
               singer: 'JustaTee x Hoàng Thùy Linh x Đen',
               path: './assets/music/song4.mp3',
               image: './assets/image/song4.jpg'
             },
             {
               name: 'Señorita',
               singer: 'Shawn Mendes, Camila Cabello',
               path: './assets/music/song5.mp3',
               image: './assets/image/song5.jpg'
             },
             {
               name: 'When We Were Young',
               singer: 'Adele',
               path: './assets/music/song6.mp3',
               image: './assets/image/song6.jpg'
             },
             {
               name: 'Blank Space',
               singer: 'Taylor Swift',
               path: './assets/music/song7.mp3',
               image: './assets/image/song7.jpg'
             },
             {
               name: 'Too Good At Goodbyes',
               singer: 'Sam Smith',
               path: './assets/music/song8.mp3',
               image: './assets/image/song8.jpg'
             },
             {
               name: `We don't talk any more`,
               singer: 'Charlie Puth, Selena Gomez',
               path: './assets/music/song9.mp3',
               image: './assets/image/song9.jpg'
             },
             {
               name: 'Imagination',
               singer: 'Shawn Mendes',
               path: './assets/music/song10.mp3',
               image: './assets/image/song10.jpg'
             },
           ],
           render: function () {
             const html = this.songs.map((song, index)=> {
               return `
               <div class="song ${index === this.currentIndex ? 'song-active' : ''}" data-index="${index}">
               <div class="thumb center"><img src="${song.image}" alt="" height="60px" width="60px"></div> 
               <div class="info">
                 <h3 class="song-name">${song.name}</h3>
                 <div class="singer">${song.singer} </div>
               </div>
               </div>
             `
             }).join('');
             playlist.innerHTML = html;
           },
           defineProperties: function() {
             Object.defineProperties(this, {
               currentSong: {
                 get: function () {
                   return this.songs[this.currentIndex];
                 }
               },
             }  )
           },
           loadCurrentSong() {
             const currentSong = this.currentSong;
             title.innerText = currentSong.name;
             imageCD.src = currentSong.image;
             audio.src = currentSong.path;
           },
           handleEvents: function() {
                  const _this = this;
                  let startSecond = 0;
                  let minuteLeft = 0;
                  // scroll and opacity thumb
                  const cd = $('.cd img');
                  const cdWidth = cd.offsetWidth;

                  const cdAnimate = cd.animate([
                      {transform: 'rotate(360deg)'}
                  ], {
                      duration: 10000,
                      iterations: Infinity,
                  })
                  cdAnimate.pause();
                  // thu phóng ảnh CD
                  document.onscroll = function () {
                    const scroll = window.scrollY
                    const newCdWidth = cdWidth - scroll;
                    newCdWidth <= 20 ? cd.style.width = 0 : cd.style.width = newCdWidth + 'px'; 
                    cd.style.opacity = newCdWidth / cdWidth;
                  }
                  // toggle play btn song
                  toggleBtn.onclick = () => {
                    if(_this.isPlaying) {
                      audio.pause(); 
                    }
                    else {
                      audio.play();  
                    }
                  }
                  // listen event play or pause;
                  audio.onplay = () => {
                    _this.isPlaying = true;
                    runBtn.style.display = 'none';
                    pauseBtn.style.display = 'block';
                    status.innerText = 'Now Playing';
                    cdAnimate.play();
                  }
                  audio.onpause = () => {
                      _this.isPlaying = false;
                      runBtn.style.display = 'block';
                      pauseBtn.style.display = 'none';
                      status.innerText = 'Pause';
                      cdAnimate.pause();
                  }
                  //next btn
                  nextBtn.onclick = () => {
                    startSecond = 0;
                    minuteLeft = 0;
                    if(_this.isRandom) {
                    
                      _this.randomSong();
                    }
                    else {
                      _this.nextSong();
                    }
                    audio.play();
                    this.render();
                  }
                  //back btn
                  backBtn.onclick = () => {
                    startSecond = 0;
                    minuteLeft = 0;
                    if(_this.isRandom) {
                      _this.randomSong();
                    }
                    else {
                      _this.prevSong();
                    }
                    audio.play();
                    this.render();
                  }
                  // random btn
                  randomBtn.onclick = () => {
                    if(_this.isLoop) {
                      alert("Please turn off loop function!")
                    }else {
                      _this.isRandom = !_this.isRandom;
                      randomBtn.classList.toggle('active',_this.isRandom);
                    }                
                  }
                  // repeat btn
                  repeatBtn.onclick = () => {
                    if(_this.isRandom) {
                      alert("Please turn off random function!")
                    }else {
                      _this.isLoop = !_this.isLoop;
                      repeatBtn.classList.toggle('active',_this.isLoop);
                    }
                   
                  }
                  // audio end and next song;
                  audio.onended = () => {
                      minuteLeft = 0;
                      startSecond = 0;
                      if(_this.isLoop) {
                        audio.play();
                      }else {
                        nextBtn.click();
                      }
                  }
                  // progressing song
                  audio.ontimeupdate = () => {          
                    if(audio.duration) {
                      const progress = Math.floor((audio.currentTime / audio.duration)*100 )
                      range.value = progress;
                    }     
                  }
                    //show duration song 
                    audio.onplaying = () => {
                    const minutes = Math.floor(audio.duration/60);
                    const seconds = Math.floor(audio.duration - minutes*60);
                    //show time right
                    timeRight.innerText = _this.formatTime(minutes,'0',2)+':'+_this.formatTime(seconds,'0',2); 
                  }
                  // count time;
                  setInterval(() => {
                      if(_this.isPlaying) {  
                      // show time left
                      if(startSecond >= 60) {
                        minuteLeft++;
                        startSecond = 0;
                      }
                      timeLeft.innerText = _this.formatTime(minuteLeft,'0',2)+':'+_this.formatTime(startSecond,'0',2);
                      startSecond++;
                    }
                  },1000)
                  // tua song
                  range.onchange = (event) => {
                      const  seekTime = Math.floor(audio.duration / 100* event.target.value)
                      audio.currentTime = seekTime;
                      if(audio.currentTime >= 60) {
                          minuteLeft = Math.floor(audio.currentTime/60);
                          startSecond = Math.floor(audio.currentTime - minuteLeft*60);
                      }
                      else {
                          startSecond =  audio.currentTime;
                          minuteLeft = 0;
                      }
                  } 
                  //click song 
                  playlist.onclick = (e)=> {
                    const songClick = e.target.closest('.song');
                    if(songClick) {
                      _this.currentIndex = Number(songClick.getAttribute("data-index"));
                      songClick.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                      startSecond = 0;
                      minuteLeft = 0;
                      _this.loadCurrentSong();
                      _this.render();
                      audio.play();
                    }
                  }      
           },
           nextSong: function() {
             this.currentIndex++;
             if(this.currentIndex >= this.songs.length) {
               this.currentIndex = 0;
             }
             this.loadCurrentSong();
           },
           prevSong: function() {
             this.currentIndex--;
             if(this.currentIndex < 0) {
               this.currentIndex = this.songs.length - 1;
             }
             this.loadCurrentSong();
           },
           randomSong: function() {
             let newIndex;
             do {
               newIndex = Math.floor(Math.random()* this.songs.length);
             } while (newIndex === this.currentIndex);
             this.currentIndex = newIndex
             this.loadCurrentSong();
           },
           formatTime : function(string,pad,length) {
             return (new Array(length+1).join(pad)+string).slice(-length);
           },
           start: function() {
             /* định nghĩa các thuộc tính cho Object */
             this.defineProperties();
             /* Load current song */
             this.loadCurrentSong();
             /* Lắng nghe xử lí các sự kiện DOM events */
             this.handleEvents();
             /* Render playlist */
             this.render();
           },
         }
app.start()
         