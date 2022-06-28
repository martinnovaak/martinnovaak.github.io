element = document.getElementById("element")
handler = document.getElementById("elementheader")
dragElement(element, handler);
makeResizable(element,10,10)

dragElement(document.getElementById("up_left"), document.getElementById("up_left_handler"));
makeResizable(document.getElementById("up_left"));

dragElement(document.getElementById("up"), document.getElementById("up_handler"));
makeResizable(document.getElementById("up"));

dragElement(document.getElementById("up_right"), document.getElementById("up_right_handler"));
makeResizable(document.getElementById("up_right"));

dragElement(document.getElementById("left"), document.getElementById("left_handler"));
makeResizable(document.getElementById("left"));

dragElement(document.getElementById("stop"), document.getElementById("stop_handler"));
makeResizable(document.getElementById("stop"));

dragElement(document.getElementById("right"), document.getElementById("right_handler"));
makeResizable(document.getElementById("right"));

dragElement(document.getElementById("down_left"), document.getElementById("down_left_handler"));
makeResizable(document.getElementById("down_left"));

dragElement(document.getElementById("down"), document.getElementById("down_handler"));
makeResizable(document.getElementById("down"));

dragElement(document.getElementById("down_right"), document.getElementById("down_right_handler"));
makeResizable(document.getElementById("down_right"));

dragElement(document.getElementById("rotate_left"), document.getElementById("rotate_left_handler"));
makeResizable(document.getElementById("rotate_left"));

dragElement(document.getElementById("rotate_right"), document.getElementById("rotate_right_handler"));
makeResizable(document.getElementById("rotate_right"));

dragElement(document.getElementById("speed_up"), document.getElementById("speed_up_handler"));
makeResizable(document.getElementById("speed_up"));

dragElement(document.getElementById("speed_down"), document.getElementById("speed_down_handler"));
makeResizable(document.getElementById("speed_down"));