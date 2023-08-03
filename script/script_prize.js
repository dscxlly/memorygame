document.getElementById("open-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
});

/*document.getElementById("download-btn").addEventListener("click", function(){
    window.location.href = "index.html";
});

function downloadFile() {
    var link = document.createElement('a');
    link.href = 'img/leaf.png';
    link.download = 'gift';
    link.click();
  }

  document.getElementById("closebtn").addEventListener("click", function(){
    window.location.href = "index.html";
});*/

function twoFunctions() {
    downloadFile();
    closebtn();
}

function downloadFile() {
    var link = document.createElement('a');
    link.href = 'gift/BabesGift.zip';
    link.download = 'HappyBirthday';
    link.click();
};

function closebtn() {
    setTimeout(function() {
    window.location.href = "index.html";
}, 3000);
};