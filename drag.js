let drake =  window.dragula();

function setupDragula(){
    drake.destroy();
    drake = dragula([].slice.apply(document.querySelectorAll('.nested')),{removeOnSpill: true});
}

let cont = document.getElementById("cont");

function add(num) {
    let elem = (num === 1) ?  '<div class="k p"> KROK </div>' : '<div class="l t"> VPRAVO-VBOK </div>';
    cont.insertAdjacentHTML("beforeend", elem);
    setupDragula();
}

function addNested(num) {
    let elem;
    if(num === 1) {
        elem = '<div class="for">OPAKUJ ' +
        '<input type="number" class="num" min="1" max="10" value="3">krát' +
        '<div class="nested"></div></div>';
    } else if(num === 2) {
        elem = '<div class="while">DOKUD NENÍ ' +
        '<select class="sel">' +
        '<option value="obstacle">PŘEKÁŽKA</option>' +
        '<option value="north">SEVER</option>' +
        '<option value="south">JIH</option>' +
        '<option value="west">ZÁPAD</option>' +
        '<option value="east">VÝCHOD</option>' +
        '</select> <div class="nested"></div></div>';
    } else if(num === 3) {
        elem = '<div class="if">KDYŽ ' +
        '<select class="sel">' +
        '<option value="obstacle">Překážka</option>' +
        '<option value="north">Sever</option>' +
        '<option value="south">Jih</option>' +
        '<option value="west">Západ</option>' +
        '<option value="east">Východ</option>' +
        '</select> <div class="nested"></div></div>';
    }
    cont.insertAdjacentHTML("beforeend", elem);
    setupDragula();
}

function rec(element) {
    let s = "", node;
    let nodes = element.children;
    for (let i = 0; i < nodes.length; i++) {
        node = nodes[i].className;
        if(node === "nested") {
            if (rec(nodes[i]) !== "")
                s += ("{" + rec(nodes[i])+ "}");
        } else if(node === "num") {
            s += nodes[i].value;
        } else if(node === "for" || node === "while") {
            s += 'c';
            s += rec(nodes[i]);
        } else if(node === "if") {
            s += "p";
            s += rec(nodes[i]);
        } else if(node === "sel") {
            s += nodes[i].value[0]; // n - sever, s - jih, w - západ, e - východ, o - překážka
        } else
            s += node[0];
    }
    return s;
}

document.getElementById("send").addEventListener("click", function count_() {
    let nodes = document.getElementById('cont');
    let s = rec(nodes);
    g(s);
});

document.getElementById("delete").addEventListener("click", () => { cont.innerHTML = ''; createCanvas();});