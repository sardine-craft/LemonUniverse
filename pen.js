var layers = [];
var historyPosition = 0;
history.pushState({position: historyPosition, state: null}, `page: ${historyPosition}`, `?page=${historyPosition}`)

function remember (data) {
    console.log(data);
    if (historyPosition == history.state.position) {
    historyPosition++;
    history.pushState({position: historyPosition, state: data}, `page: ${historyPosition}`, `?page=${historyPosition}`);
    } else {
        history.state = data
    }
}



let sX;
let sY;
var penIsDown = false;
var layerCount = 0;


var mouseX = 0;
var mouseY = 0;
function penDown (e) {
    sX = e.x;
    sY = e.y;
    layerCount++;
    layers.push({
        name: layerCount,
        path: [{
            x: sX,
            y: sY,
            w: ctx.lineWidth
        }
        ]
    });
    ctx.beginPath();
    ctx.moveTo(sX, sY);
    penIsDown = true;
}

function addToPathByLayerName (name, data) {
    return layers.find(p => p.name === name).path.push(data);
}

var smoothing = 2;
function penTo () {
    sX = sX + ((mouseX - sX) * (1 / smoothing));
    sY = sY + ((mouseY - sY) * (1 / smoothing));
    if (penIsDown) {
        ctx.lineTo(sX, sY);
        ctx.stroke();
        addToPathByLayerName(layerCount, {
            x: sX,
            y: sY,
            w: ctx.lineWidth
        });
    }
}

setInterval(penTo, 30);

function clear() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}



function renderLayer() {
    clear(); 
    for (i = 0; i < history.state.state.length; i++) {
        ctx.beginPath();
        ctx.moveTo(layers[i].path[0].x, layers[i].path[0].y);
        for (j = 0; j < history.state.state[i].path.length - 1; j++) {
            // ctx.lineWidth = history.state.state[i].path[j].w;
            // ctx.beginPath();
            // ctx.moveTo(history.state.state[i].path[j].x, history.state.state[i].path[j].y)
            let px = history.state.state[i].path[j + 1].x;
            let py = history.state.state[i].path[j + 1].y
            ctx.lineTo(px, py);
            // ctx.stroke();
        }
        ctx.stroke();
        
    }
}

display.addEventListener("mousedown", penDown);
display.addEventListener("mousemove", (e) => {mouseX = e.x; mouseY = e.y; return;});
display.addEventListener("mouseup", (e) => {penIsDown = false; remember(layers); renderLayer(); return;});
window.addEventListener("popstate", function () {renderLayer(); historyPosition = history.state.position; layers = history.state.state; return});