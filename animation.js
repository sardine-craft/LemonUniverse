function Frame (l) {
    this.layers = l;
}

var layers = [];

var openFrame = 0;
var animation = {
    frames: [
    new Frame([])
    ],
    retrieveFrame: function (index) {
        return animation.frames[index];
    },
    saveFrame: function () {
        animation.frames[openFrame].layers = layers;
        history.state.state = layers;
    },
    forward: function () {
        if (openFrame < animation.frames.length - 1) {
        openFrame++;
        layers = animation.frames[openFrame].layers;
        //history.state.state = layers;
        } else {
            alert("there are no more frames to jump to in this direction.");
        }
    },
    backward: function () {
        if (openFrame > 0) {
        openFrame--;
        layers = animation.frames[openFrame].layers;
        //history.state.state = layers;
        } else {
            alert("there are no more frames to jump to in this direction.");
        }
    }
    
}