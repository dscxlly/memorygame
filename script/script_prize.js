document.getElementById("open-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
});

document.getElementById("download-btn").addEventListener("click", function(){
    window.location.href = "index.html";
});

