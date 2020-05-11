/* obtained this function "getRandomInt(max)" from Mozilla. Thanks! The rest is by me! */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createGrid( gridWidthRows, gridHeightColumns, gridName, parentElementId ) {

    let grid = document.createElement("div");

        grid.style.gridTemplateRows = "repeat(" + gridWidthRows + ", minmax(min-content, max-content)";
        grid.style.gridTemplateColumns = "repeat(" + gridHeightColumns + ", minmax(min-content, max-content)";

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

function createMulticoloredGrid( thisManyRows, thisManyColumns, gridName, appendToThisParentElement ) {
    let rows = thisManyRows;
    let columns = thisManyColumns;
    let totalSize = thisManyRows * thisManyColumns;
    createGrid(thisManyRows, thisManyColumns, ""+gridName, appendToThisParentElement);
    for (let i = 0; i < totalSize; i++ ) {
        if ( i % 2 == 1 ) {
            addRandomColors(gridName+"-item", ""+i, "0.4s", "1.70s");
        }
        else if (i == 0 ) {
            addRandomColors(gridName+"-item", ""+i, "0.4s", "1.7s");
        }
        else {
            addRandomColors(gridName+"-item", ""+i, "0.2s", "2s");
        }
    }
}

function askUserForGridSize( usersInputSize, appendGridHere ) {

    let usersInput = usersInputSize;
        usersInput = usersInput.trim();
    let usersInputArray = usersInput.split("x");
    let gridWidthRows = +usersInputArray[0];
    let gridHeightColumns = +usersInputArray[1];

    if ( !( isNaN( gridWidthRows ) ) && gridWidthRows != 0 && !( isNaN( gridHeightColumns ) ) && gridHeightColumns != 0 && !(usersInputArray[2]) && usersInputArray[2] != 0 ) {
        createMulticoloredGrid( gridWidthRows, gridHeightColumns, "grid", ""+appendGridHere );
    }
    else {
        getUserInputAndReturnAGrid( appendGridHere );
    }
}

function getUserInputAndReturnAGrid( appendToThisParentElement ) {
    let myDiv = document.getElementById( appendToThisParentElement );
    let myTextBox = myDiv.appendChild( document.createElement("input") );
        myTextBox.setAttribute("type", "text");
        myTextBox.setAttribute("placeholder", "Enter grid size. Example: 10x10");
        myTextBox.className = "pretty-textbox";

    let mySubmitButton = myDiv.appendChild(document.createElement("button") );
        mySubmitButton.setAttribute("type", "submit");
        mySubmitButton.className = "pretty-submit-button";
        mySubmitButton.innerText = "Submit";
        mySubmitButton.addEventListener( "click", () => { 
            let textBoxValue = myTextBox.value;
            myTextBox.remove();
            mySubmitButton.remove();
            askUserForGridSize( textBoxValue, appendToThisParentElement );
        }, true );
}