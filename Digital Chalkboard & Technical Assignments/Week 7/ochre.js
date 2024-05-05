
document.addEventListener('DOMContentLoaded', function() {
    const fetchID = document.body.getAttribute('data-uuid'); //Retrieves the uuid once the HTML has loaded completely.
    const ochre_url = 'https://ochre.lib.uchicago.edu/ochre?uuid=';
    var display = document.getElementById('called-container'); //Stores the intended 'display' element as a variable.
    var table = null; //This is a flag to prevent the duplication of inner display elements.
    let uuidList = '';

    if(!table) { 
        table = document.createElement('table');
        table.setAttribute('class','table table-hover');
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
        display.appendChild(table);
    }

    function getXml(uuid) { 
        return fetch(ochre_url + uuid, {redirect:'follow'}) //Initiates the network request. 
        .then(output => {
            if(!output.ok) throw new Error(`Request Invalid: ${output.status}`); // Indicates if the request was not valid: '200' HTTP.
            return output.text(); //Extracts text content (XML strings).
        })
        .then(text_output => {
            const parser = new DOMParser();
            const xmlDOC = parser.parseFromString(text_output,'text/xml'); //Returns XML document.
            return xmlDOC;
        });
    }

    function processParsedXML(xmlDocument) {
        const allElements = xmlDocument.documentElement;
        sortNodes(allElements);
    }

    function sortNodes(elNodes) {
        if(elNodes.nodeType === 1 && elNodes.children && elNodes.children.length > 0) {
            Array.from(elNodes.children).forEach(childNode => sortNodes(childNode));
        }

        switch(elNodes.nodeType) {
            case 1:
                processElNode(elNodes);
                break;       
            case 2: 
                processAttrNode(elNodes);
                break;
            case 3:
                processTextNode(elNodes);
                break;
            default:
                processDefaultNode(elNodes);
                break;
                
        }
    }


function processElNode(node) {
    let valueEl = node.querySelector('value'); 
    let stringEl = node.querySelector('string'); 

    let string = stringEl ? stringEl.textContent.trim(): null;
    let value = valueEl ? valueEl.textContent.trim(): null;
    
    if((node.querySelector('value'))) {
         value = node.textContent;
    }

    if((node.querySelector('string'))) {
         string = node.textContent;
    } 
    
    if(value && string) {
        var row = document.createElement('tr');
        var strCell = document.createElement('td');
        var valCell = document.createElement('td');
        strCell.innerHTML = `<strong>${string}</strong>`;
        valCell.innerHTML = `<strong>${value}</strong>`;
        row.appendChild(strCell);
        row.appendChild(valCell);
        tbody.appendChild(row);
    } else {
        console.error("Incomplete Data in Node ,node");
    }

}

function processAttrNode(node) {
    console.log(`> ${node.nodeName}`);
    // if(node.hasAttribute('uuid')) {
    //     let uuidString = node.getAttribute('uuid');
    //     uuidList += ` ${uuidString} |`;
        // getXml(uuidString);
    
}

function processTextNode(node) {
    console.log(`> ${node.nodeName} : ${node.textContent.trim()}`);
}

function processDefaultNode(node) {
    console.log(`> ${node.nodeName}`);
}

getXml(fetchID)
    .then(processParsedXML)
    // .then(() => {
    //     display.appendChild(table);
    // })

.catch(error => {
    console.error("Another Problem:", error); //Catches any error in the fetch process.
    display.innerHTML = 'Error!!' + error.message;

    });
});