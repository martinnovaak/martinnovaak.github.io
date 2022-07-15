var w, h, platno, c, r, posX = 0, posY = 0;
var robot, star;

platno = document.getElementById("canvas")

function createCanvas() {
    w = platno.offsetWidth;
    h = platno.offsetHeight;
    r = 5;
    c = 6;

    var stage = new Konva.Stage({
        container: 'konva-holder',
        width: 1.04 * w,
        height: 1.04 * h,
    });

// then create layer
    var layer = new Konva.Layer();
    stage.add(layer);

    for (i = 0; i < c; i++) {
        for (j = 0; j < r; j++) {
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
            x: w / 80,
            y: w / 80+ w/c*0.08,
            image: imageObj,
            width: w / c * 0.94,
            height: h / r * 0.80,
        });
        robot.offsetX(robot.width() / 2);
        robot.offsetY(robot.height() / 2);
        robot.x(robot.x() + robot.width() / 2);
        robot.y(robot.y() + robot.height() / 2);
        robot.rotate(270);
        layer.add(robot);
    };
    imageObj.src = 'robot.png';
    layer.draw();
}


let ok = true;
var i;
var command;

function g(es){
    if (ok){
        command = es;
        ok = false;
        i = 0;
        go();
    }
}

function go(){
    if (posX == c - 1 && posY == r - 1) {
        star.destroy();
    }
    if (i < command.length){
        make(command.charAt(i));
        i++;
    }
    else{
        ok = true;
    }
}

function make(a) {
    var k,l,rot;
    rot = robot.rotation();
    if(a === 'k') {
        if (rot%360 == 0) {
            k = 0;
            (posY == r - 1) ? l = 0 : (l = h/r, posY++) ;
        }
        else if(rot%360 == 90) {
            (posX == 0) ? k = 0 : (k = -w / c, posX--);
            l = 0;
        }
        else if(rot%360 == 180) {
            k = 0;
            (posY == 0) ? l = 0 : (l = -h/r, posY--) ;
        }
        else if (rot%360 == 270) {
            (posX == c - 1) ? k = 0 : (k = w / c, posX++);
            l = 0;
        }
    } else if (a === 'l'){
        k = 0;
        l = 0;
        rot += 90;
    }
    new Konva.Tween({
        node: robot,
        duration: 0.5,
        x: robot.x() + k,
        y: robot.y() + l,
        rotation: rot,
        onFinish: function(){go();},
    }).play();
}