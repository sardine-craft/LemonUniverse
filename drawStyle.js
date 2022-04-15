function setToDefault () {
    var gradient = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
    gradient.addColorStop("0.25", "magenta");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("0.75", "red");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
}

setToDefault();