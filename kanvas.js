let w, h, c, r, posX = 0, posY = 0;
let robot, star;

let px = [7,0,5];
let py = [0,1,6];
let obsts = 3;

let platno = document.getElementById("konva-holder")

function createCanvas() {
    steps = posX = posY = 0;
    w = platno.offsetWidth;
    h = platno.offsetHeight;
    r = 10;
    c = 10;

    var stage = new Konva.Stage({
        container: 'konva-holder',
        width: 1.04 * w,
        height: 1.04 * h,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    for (let i = 0; i < c; i++) {
        for (let j = 0; j < r; j++) {
            let rect = new Konva.Rect({
                x: i * w / c + w / 80,
                y: j * h / r + w / 80,
                fill: "blue",
                stroke: "orange",
                strokeWidth: w / c / 10,
                width: w / c * 0.94,
                height: h / r * 0.94,
            });
            layer.add(rect);
        }
    }

    for (let i = 0; i < px.length; i++){
        let rect = new Konva.Rect({
            x: px[i] * w / c + w / 80,
            y: py[i] * h / r + w / 80,
            fill: "black",
            stroke: "orange",
            strokeWidth: w / c / 10,
            width: w / c * 0.94,
            height: h / r * 0.94,
        });
        layer.add(rect);
    }


    star = new Konva.Star({
        x:   (c-1/2)*w/c  + w / 120,
        y:   (r-1/2)*h/r  + w / 80,
        fill: "yellow",
        outerRadius: w / (2*c) * 0.94,
        innerRadius: w / (2*c) * 0.47,
    });
    layer.add(star);

    var imageObj = new Image();
    imageObj.onload = function () {
        robot = new Konva.Image({
            x: w / 80 + w/c*0.47,
            y: w / 80 + w/c*0.08 + h/r*0.4,
            image: imageObj,
            width: w / c * 0.94,
            height: h / r * 0.80,
            offsetX: w / c * 0.47,
            offsetY: h / r * 0.4,
            rotation: 270,
        });
        layer.add(robot);
    };
    imageObj.src = 'robot.png';
    layer.draw();
}

let i, command, steps, ok = true;

function g(es){
    if (ok){
        command = es;
        ok = false;
        i = 0;
        go();
    }
}

async function go(){
    while (i < command.length) {
        if (finish()) break;
        let ch = command.charAt(i++);
        if (ch === "}") {
            break;
        } else if (ch === "p") {
            let cond = command.charAt(i++);
            if(command.charAt(i) === "{") {
                if (!condition(cond, "p")) {
                    i++;
                    ignore();
                }
                await go();
            }
        } else if (ch === "c") {
            let cond = command.charAt(i++);
            if (command.charAt(i) === "{") {
                let j = ++i;
                if(isNaN(cond)) {
                    if (!condition(cond, ch)) {
                        ignore();
                    } else {
                        while (condition(cond, "c")) {
                            i = j;
                            await go();
                        }
                    }
                } else {
                    for (let u = 0; u < cond ; u++) {
                        i = j;
                        await go();
                    }
                }
            }
        } else {
            make(ch);
            await new Promise(resolve => setTimeout(resolve, 520));
        }
    }
    if (finish()) {
        star.destroy();
        Swal.fire(
            'Dobrá práce!',
            'Vyřešeno za ' + steps + ' kroků!',
            'success'
        ).then((result) => {steps=0;})
        return;
    }
    ok = true;
}


function finish(){
    return posX === c - 1 && posY === r - 1;
}

function ignore(){
    let exp = 1;
    let found = 0;
    while(found !== exp){
        if(command.charAt(i) === "{")
            exp++;
        else if(command.charAt(i) === "}")
            found++;
        i++;
    }
}

function obstacle(angle){
    if ((angle === 0 && posY === r - 1) || (angle === 90 && posX === 0) || (angle === 180 && posY === 0) || (angle === 270 && posX === c - 1)) {
        return true;
    }
    for(let index = 0; index < obsts; index++){
        if (((angle === 0 && posY === py[index] - 1) && posX === px[index]) || ((angle === 90 && posX === px + 1) && posY === py[index]) || ((angle === 180 && posY === py[index] + 1) && posX === px[index]) || ((angle === 270 && posX === px[index] - 1) && posY === py[index]))
            return true;
    }
    return false;
}

function condition(cond, sender){
    var res, angle = robot.rotation() % 360;
    if(cond === "o") res = obstacle(angle);
    else if(cond === "n") res = angle === 180;
    else if(cond === "s") res = angle === 0;
    else if(cond === "e") res = angle === 270;
    else if(cond === "w") res = angle === 90;
    return (sender === "c")? !res : res;
}

function make(a) {
    var distanceX = 0, distanceY = 0, rot = robot.rotation(), angle = rot % 360;
    if (a === 'k' && !obstacle(angle)) {
        if (angle === 0) {  // JIH
            distanceY = h / r;
            posY++;
        } else if (angle === 90) {   // ZÁPAD
            distanceX = -w / c;
            posX--;
        } else if (angle === 180) {  // SEVER
            distanceY = -h / r;
            posY--;
        } else if (angle === 270) { // VÝCHOD
            distanceX = w / c
            posX++;
        }
    } else if (a === 'l') {
        rot += 90;
    }
    steps++;
    new Konva.Tween({
        node: robot,
        duration: 0.5,
        x: robot.x() + distanceX,
        y: robot.y() + distanceY,
        rotation: rot,
    }).play();
}