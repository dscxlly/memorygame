window.addEventListener('DOMContentLoaded', (event) => {
    const audio = new Audio('song/CORALINE - Måneskin   Instrumental (Karaoke No Vocals).mp3');
    const body = document.querySelector('body');
  
    body.addEventListener('click', function() {
      audio.play();
    });  
});

document.getElementById("open-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
});

document.getElementById("download-btn").addEventListener("click", function(){
    window.location.href = "index.html";
});

