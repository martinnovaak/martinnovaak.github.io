var drake1 =  window.dragula();

function setupDragula(){
    drake1.destroy();
    drake1 =  dragula([].slice.apply(document.querySelectorAll('.nested')),{removeOnSpill: true});
}

setupDragula();

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
        else
            s += nodes[i].className[0]
        if (nodes[i].className === "item")
        {
            s += rec(nodes[i]);
        }
    }
    return s;
}

var sendbutton = document.getElementById("send");

sendbutton.addEventListener("click", function count_()
{
    let s = "";
    let nodes = document.getElementById('cont');//$$('.container')//.children;
    s += rec(nodes);
    document.getElementById("par").innerHTML = s;
});

let cont = document.getElementById("cont");

function add(num)
{
    let elem;
    switch (num)
    {
        case 1:
            elem =  '<div class="1 q"> Jeď dozadu doleva</div>';
            break;
        case 2:
            elem =  '<div class="2 p"> Jeď dozadu</div>';
            break;
        case 3:
            elem =  '<div class="3 q"> Jeď dozadu doprava</div>';
            break;
        case 4:
            elem =  '<div class="4 p"> Jeď doleva</div>';
            break;
        case 5:
            elem =  '<div class="5 stop"> STOP</div>';
            break;
        case 6:
            elem =  '<div class="6 p"> Jeď doprava</div>';
            break;
        case 7:
            elem =  '<div class="7 q"> Jeď dopředu doleva</div>';
            break;
        case 8:
            elem =  '<div class="8 p"> Jeď dopředu</div>';
            break;
        case 9:
            elem =  '<div class="9 q"> Jeď dopředu doprava</div>';
            break;
        case 10:
            elem =  '<div class="l t"> Zatoč doleva</div>';
            break;
        case 11:
            elem =  '<div class="r t"> Zatoč doprava</div>';
            break;
        case 12:
            elem =  '<div class="l s"> Jeď rychle</div>';
            break;
        case 13:
            elem =  '<div class="r s"> Jeď pomalu</div>';
            break;
    }
    cont.innerHTML += elem;
    setupDragula();
}

function addNested()
{
    let elem= '<div class="item">Opakuj <input type="number" class="num"  name="quantity" min="1" max="10" value="5">krát <div class="nested"></div></div>';
    cont.innerHTML += elem;
    setupDragula();
}

function hideAndShow(num)
{
    var element;
    if (num == 1)
        element = document.getElementById("pohyb");
    else if (num == 2)
        element = document.getElementById("zataceni");
    else if (num == 3)
        element = document.getElementById("rychlost");
    else if (num == 4)
        element = document.getElementById("cyklus");
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}