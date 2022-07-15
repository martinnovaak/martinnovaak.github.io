var drake1 =  window.dragula();

function setupDragula(){
    drake1.destroy();
    drake1 =  dragula([].slice.apply(document.querySelectorAll('.nested')),{removeOnSpill: true});
}

let cont = document.getElementById("cont");

function add(num)
{
    let elem;
    if (num === 1)
        elem =  '<div class="1 p"> KROK </div>';
    else if (num === 2)
        elem =  '<div class="2 t"> VLEVO-VBOK </div>';
    cont.innerHTML += elem;
    setupDragula();
}

function addNested(num)
{
    let elem;
    if(num == 1) {
        elem = '<div class="for">OPAKUJ ' +
        '<input type="number" class="num"  name="quantity" min="1" max="10" value="3">krát' +
        '<div class="nested"></div></div>';
    }
    else if(num == 2){
        elem = '<div class="while">DOKUD ' +
        '<select class="sel" name="dokud">' +
        '<option value="obstacle">PŘEKÁŽKA</option>' +
        '<option value="north">SEVER</option>' +
        '<option value="south">JIH</option>' +
        '<option value="west">ZÁPAD</option>' +
        '<option value="east">VÝCHOD</option>' +
        '</select> <div class="nested"></div></div>';
    }
    else if(num == 3){
        elem = '<div class="if">KDYŽ ' +
        '<select class="sel" name="dokud">' +
        '<option value="obstacle">Překážka</option>' +
        '<option value="north">Sever</option>' +
        '<option value="south">Jih</option>' +
        '<option value="west">Západ</option>' +
        '<option value="east">Východ</option>' +
        '</select> <div class="nested"></div></div>';
    }
    cont.innerHTML += elem;
    setupDragula();
}

function rec(element)
{
    let s = "";
    let nodes = element.children;
    for (let i = 0; i < nodes.length; i++)
    {
        if(nodes[i].className === "nested")
        {
            let pom = rec(nodes[i]);
            if (pom !== "") {
                s += "{";
                s += rec(nodes[i]);
                s += "}";
            }
        }
        else if(nodes[i].className === "num")
        {
            s += nodes[i].value;
        }
        else if(nodes[i].className === "for")
        {
            s += 'i';
            s += rec(nodes[i]);
        }
        else if(nodes[i].className === "while")
        {
            s += 'i';
            s += rec(nodes[i]);
        }
        else if(nodes[i].className === "if")
        {
            s += "x";
            s += rec(nodes[i]);
        }
        else if(nodes[i].className === "sel")
        {
            switch (nodes[i].value)
            {
                case "obstacle":
                    s+="y";
                    break;
                case "north":
                    s+="s";
                    break;
                case "south":
                    s+="f";
                    break;
                case "west":
                    s+="a";
                    break;
                case "east":
                    s+="d";
                    break;
            }
        }
        else
        {
            s += nodes[i].className[0];
        }
    }
    return s;
}

let sendbutton = document.getElementById("send");

sendbutton.addEventListener("click", function count_()
{
    let s = "";
    let nodes = document.getElementById('cont');
    s += rec(nodes);
    document.getElementById("bar").innerHTML = s;
});

let deletebutton = document.getElementById("delete")

deletebutton.addEventListener("click", function() {
    cont.innerHTML = '';
});