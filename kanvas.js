var w, h, platno, c, r;
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

    let star = new Konva.Star({
        x: 57,
        y: 60,
        fill: "yellow",
        outerRadius: 50,
        innerRadius: 20,
    });
    layer.add(star);

    var imageObj = new Image();
    imageObj.onload = function () {
        robot = new Konva.Image({
            x: 50,
            y: 50,
            image: imageObj,
            width: 106,
            height: 118,
        });

        // add the shape to the layer
        layer.add(robot);
    };
    imageObj.src = 'robot.png';
    layer.draw();
}

let ok = true;

element = document.getElementById("left")
element.addEventListener("click", g);

var i = 0;
s = "666222444888";

function g(){
    if (ok){
        ok = false;
        i = 0;
        go();
    }
}

function go(){
    if (i < s.length){
        make(s.charAt(i));
        i++;
    }
    else{
        ok = true;
    }
}

function make(a) {
    var k,l;
    switch(a){
        case '6':
            k = 100;
            l = 0;
            break;
        case '8':
            k = 0;
            l = - 100;
            break;
        case '2':
            k = 0;
            l = 100;
            break;
        case '4':
            k = -100;
            l = 0;
            break;
    }
    let tween = new Konva.Tween({
        node: star,
        duration: 1,
        x: star.x() + k,
        y: star.y() + l,
        onFinish: function() {
            go();
        },
    });
    tween.play();
}