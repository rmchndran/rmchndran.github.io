



document.addEventListener('DOMContentLoaded', function() {
    const fetch_id = document.body.getAttribute('data-uuid'); //Retrieves the uuid once the HTML has loaded completely.
    const ochre_url = 'https://ochre.lib.uchicago.edu/ochre?uuid=';
    var display = document.getElementById('called-container'); //Stores the intended 'display' element as a variable.
    var table = null; //This is a flag to prevent the duplication of inner display elements.


    function getXml(uuid) { 
        return fetch(ochre_url + uuid, {redirect:'follow'}) //Initiates the network request. 
        .then(output => {
            if(!output.ok) throw new Error(`Request Invalid ${error}`); // Indicates if the request was not '200' HTTP.
            return output.text(); //Extracts text content (XML strings).
        })
        .then(text_output => {
            const parser = new DOMParser();
            return parser.parseFromString(text_output,'text/xml'); //Returns XML document.
        });
    }

    function xml(data) {
        const property = data.querySelectorAll('property'); //Extracts all 'property' tags from new XML Doc.
        let add_uuid = ''; //
        
        if(!table) { //Verifies that a table hasn't been created yet.
            table = document.createElement('table');
            table.setAttribute('class','table table-hover');
            tbody = document.createElement('tbody');
            table.appendChild(tbody);
            display.appendChild(table);
        }

        property.forEach(p => { //This iterates over each property tag.
            const string = p.querySelector('string'); //Stores string tags.
            const value = p.querySelector('value'); //Stores value tags.

            if(string && value) { //Verifies that no data is missing.
                var row = document.createElement('tr');
                var strCell = document.createElement('td');
                var valCell = document.createElement('td');
                strCell.innerHTML = `<strong>${string.textContent}</strong>`;
                valCell.innerHTML = `<strong>${value.textContent}</strong>`;
                row.appendChild(strCell);
                row.appendChild(valCell);
                tbody.appendChild(row);

                if(string.textContent == 'Associated text') { 
                    const titleLocation = document.getElementById('api-fetch-title'); 
                    titleLocation.innerHTML = `<u><strong>~ ${value.textContent} ~</strong></u><br><br>`;
                    add_uuid = value.getAttribute('uuid'); //Stores nested uuid for second iteration.
                }
            }
        });

        display.appendChild(table); //Appends new table to the HTML display.
        return add_uuid; //Ensures nested uuid is accessible.
    }

    getXml(fetch_id) //Here the fetch is actually intiated.
        .then(xml) //Predefined functions called appropriately.
        .then(add_uuid => {
            if(add_uuid) { //Passes nested uuid back through if needed.
                return getXml(add_uuid)
                    .then(xml)
            }

        })
        .catch(error => {
            console.error("Another Problem:", error); //Catches any error in the fetch process.
            display.innerHTML = 'Error!!' + error.message; //Displays the error in the HTML.
    });

});


    // function processParsedXML(xmlDocument) {
    //     const allElements = xmlDocument.documentElement;
    //     sortNodes(allElements);
    // }

    // function sortNodes(elNodes) {
    //     let uuid_list = '';
    //     let rawtext = '';

    //     switch(elNodes.nodeType) {
    //         case 1:
    //             let value, string = null;
    //             let nodeArray = Array.from(elNodes.children);
    //             for(const node of nodeArray) {
    //                 if((node.querySelector('value'))){
    //                     value = node.textContent;
    //                 }
    //                 if((node.querySelector('string'))){
    //                     string = node.textContent;
    //                 } 
    //                 if(value && string) {
    //                     var row = document.createElement('tr');
    //                     var strCell = document.createElement('td');
    //                     var valCell = document.createElement('td');
    //                     strCell.innerHTML = `<strong>${string}</strong>`;
    //                     valCell.innerHTML = `<strong>${value}</strong>`;
    //                     row.appendChild(strCell);
    //                     row.appendChild(valCell);
    //                     tbody.appendChild(row);
    //                 }
    //             } break;
    //         case 2: 
    //             if (elNodes.hasAttribute('uuid')) {
    //                 uuid_list += ` ${elNodes.getAttribute('uuid')} |`;
    //             }  break; 
    //         case 3:
    //             rawtext += `Text from ${elNodes.nodeName} : ${elNodes.textContent.trim()}`;
    //             break;
            
    //         case 4:
    //             default:
    //                 break;
    //     }

    // }

    //     getXml(fetch_id)
    //         .then(processParsedXML)

    // });






