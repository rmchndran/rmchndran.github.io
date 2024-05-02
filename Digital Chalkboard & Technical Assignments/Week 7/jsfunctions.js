
//lastItem():

//This function takes an array of strings and returns an alphabetised list & its last item.

function sortFruits(array) {
    const sorted = [...array].sort((a,b) => a.localeCompare(b));
    const output = sorted[sorted.length - 1];
    return{
        sorted, output
    }
}

//This function takes a sorted array, an index-specific item and an HTML element ID. It verifies the ID exists and then pushes
//the pre-processed inputs to the HTML page.

function pushToHTML(outputId,sorted,output) {
    const displayLocation = document.getElementById(outputId);
    if(!displayLocation) {
        throw new Error(`No element with id ${outputId} found.`)
    }
    displayLocation.innerHTML = `<br>i) <strong>The alphabetised list is as follows:</strong><br>${sorted.join(', ')}.<br>ii) The 'last item' is ${output}.`;
}

//This function is called on the HTML page and integrates the methods above in a streamlined manner.
function lastItem(fruitArray, outputId) {
    const { sorted, output } = sortFruits(fruitArray);
    pushToHTML(outputId, sorted, output);
}



