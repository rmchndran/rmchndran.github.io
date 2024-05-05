
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

//promptCategories()

function getCategories() {
    let categoryCount = parseInt(prompt(`Enter Between Two & Four Categories -- Choose Wisely!`));
    while(categoryCount < 2 || categoryCount > 4 || isNaN(categoryCount)) {
        categoryCount = parseInt(prompt(`Invalid Entry! Enter Between Two & Four Categories!`));
    }
    combineCats(categoryCount);


}

function combineCats(categories, catArray=[]) {
    if(catArray.length < categories) {
        let catEntry = prompt(`Enter Category (${catArray.length + 1} of ${categories})`);
        catArray.push(catEntry);
        combineCats(categories, catArray)
    } else {
        populateCategories(catArray)
    }

function populateCategories(catArray, catEntries=[], counter=0) {
    if(counter < catArray.length) {
        let itemEntry = prompt(`Enter an item for the following category: ${catArray[counter]}`);
        catEntries.push(`${itemEntry}`);
        populateCategories(catArray, catEntries, counter + 1);
    } else {
        outputTo = document.getElementById("display-sort-items");
        outputTo.innerHTML = `Your Categories were ${catArray.join(', ')} & Your Entries were ${catEntries.join(', ')}<br>
        Also, I've sorted them for you: ${[...catEntries].sort().join(", ")}`;
    }
}

}

document.getElementById('sortCategories').addEventListener('click',getCategories);





