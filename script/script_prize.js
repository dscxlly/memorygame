document.getElementById("open-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
});

document.getElementById("download-btn").addEventListener("click", function(){
    window.location.href = "index.html";
});

function downloadFile() {
    var link = document.createElement('a');
    link.href = 'img/leaf.png';
    link.download = 'gift';
    link.click();
  }