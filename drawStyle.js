function setToDefault () {
    var gradient = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
    gradient.addColorStop("0.25", "magenta");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("0.75", "red");
    var noise = document.getElementById("noise");
    var texture = ctx.createPattern(noise, "repeat");
    ctx.globalAlpha = "0.7";
    ctx.strokeStyle = texture;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
}

setToDefault();