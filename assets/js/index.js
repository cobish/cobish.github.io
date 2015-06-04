(function(){
    var menuBtn = document.getElementById("menuBtn"),
        classify = document.getElementById("classify"),
        classifyHeight = 180;

    menuBtn.onclick = function() {
        var curHeight = classify.offsetHeight,
            lastHeight = (curHeight == classifyHeight) ? 0 : classifyHeight,
            speed = (curHeight == classifyHeight) ? -6 : 6;

        var timer = setInterval(function(){
            curHeight += speed;
            classify.style.height = curHeight + "px";

            if (curHeight == lastHeight) {
                clearInterval(timer);
            }
        }, 15);
    };
})();