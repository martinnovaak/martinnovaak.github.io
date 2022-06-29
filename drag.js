function dragElement(element, handler) {
    var x_new = 0, y_new = 0, x_old = 0, y_old = 0;
    handler.onmousedown = dragMouseDown;

    function dragMouseDown(e)
    {
        e.preventDefault();
        x_old = e.clientX;
        y_old = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e)
    {
        e.preventDefault();
        x_new = x_old - e.clientX;
        y_new = y_old - e.clientY;
        x_old = e.clientX;
        y_old = e.clientY;
        element.style.top = (element.offsetTop - y_new) + "px";
        element.style.left = (element.offsetLeft - x_new) + "px";
    }

    function closeDragElement()
    {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}