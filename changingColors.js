/* obtained this function "getRandomInt(max)" from Mozilla. Thanks! The rest is by me! */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createCircleElement( unique_id, appendToThisParentElement ) {
    let circle = document.createElement("div");
        appendToThisParentElement.appendChild(circle);
}

function createGrid( gridWidthRows, gridHeightColumns, gridName, parentElementId ) {

    let grid = document.createElement("div");

        grid.style.gridTemplateRows = "repeat(" + gridWidthRows + ", auto";
        grid.style.gridTemplateColumns = "repeat(" + gridHeightColumns + ", auto";

        grid.style.display = "grid";
        grid.id = gridName;

        let theParent = document.getElementById(parentElementId);
            theParent.appendChild(grid);

        let totalNumberOfGridItems = (+gridWidthRows)*(+gridHeightColumns);
        let createdGrid = document.getElementById(gridName);

        for (let i = 0; i < totalNumberOfGridItems; i++ ) {
            let newItem = document.createElement("div");
                newItem.id = gridName + "-" + i;
                newItem.className = gridName + "-item";
            createdGrid.appendChild(newItem);
        }

}

function generateRandomColors() {
    let random_number1 = getRandomInt(360);
    let random_number2 = getRandomInt(100);
    let random_number3 = getRandomInt(100);

    let colorString = "hsl( " + random_number1 + ", " + random_number2 + "%, " + random_number3 + "% )";
    return colorString;

}

function addRandomColors(elementClassName, element_node, delay, animationDuration) {
    let myElement = document.getElementsByClassName(""+elementClassName)[element_node];
    let className = myElement.className;
    let color1 = myElement.style.getPropertyValue("--color-2");
        if (!color1) {
            color1 = generateRandomColors();
        }
    let color2 = generateRandomColors();
    let styleString = "--color-1: " + color1 + "; --color-2: " + color2 + ";" + "background-color: " + color1;
    let newElement = document.createElement("div");
        myElement.replaceWith(newElement);
        newElement.setAttribute("style", styleString);
        newElement.className = className;
        newElement.id = myElement.id;
        newElement.style.animationName = "animate-through-random-colors";
        newElement.style.animationDelay = delay;
        newElement.style.animationDuration = animationDuration;
        newElement.addEventListener("animationend", () => addRandomColors(elementClassName, element_node, delay, animationDuration), true);

}