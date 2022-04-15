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

function penTo (e) {
    if (penIsDown) {
        ctx.lineTo(e.x, e.y);
        ctx.stroke();
        addToPathByLayerName(layerCount, {
            x: e.x,
            y: e.y,
            w: ctx.lineWidth
        });
    }
}

function clear() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}



function renderLayer() {
    document.getElementById("history").innerText = historyPosition;
    clear(); 
    for (i = 0; i < history.state.state.length; i++) {
        // ctx.beginPath();
        // ctx.moveTo(layers[i].path[0].x, layers[i].path[0].y);
        for (j = 0; j < history.state.state[i].path.length - 1; j++) {
            ctx.lineWidth = history.state.state[i].path[j].w;
            ctx.beginPath();
            ctx.moveTo(history.state.state[i].path[j].x, history.state.state[i].path[j].y)
            ctx.lineTo(history.state.state[i].path[j + 1].x, history.state.state[i].path[j + 1].y);
            ctx.stroke();
        }
        // ctx.stroke();
        
    }
}

display.addEventListener("mousedown", penDown);
display.addEventListener("mousemove", penTo);
display.addEventListener("mouseup", (e) => {penIsDown = false; remember(layers); renderLayer(); return;});
window.addEventListener("popstate", function () {renderLayer(); historyPosition = history.state.position; layers = history.state.state; return});