function cleanPath (path, margin) {
    //Idea is to look at the angle between two points, then take the angle from a third point to the first point.
    //then a with the first and the fourth and so on.
    //if the angle is similar enough (to a degree determined by the margin) to the first measurement, remove the next point.
    //if it's not, then use that next point as the start.
    let ref = 1; 
    let refAngle = 0;
    let angle = 0;
    var newPath = [path[0]];
    for (let p in path) {
        if (Math.abs(refAngle - angle) > margin) {
            refAngle = angle;
            newPath.push(path[p]);
            ref = p;
        }
        angle = (path[ref].y - path[p].y) / (path[ref].x - path[p].x);
    }
    newPath.push(path[path.length - 1]);
    return newPath;
}

function clean(index) {
console.log(layers[index].path);
layers[index].path = cleanPath(layers[index].path, 0.02);
console.log(layers[index].path);
}

