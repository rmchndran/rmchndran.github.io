
document.getElementById("querySubmit").addEventListener('click', function() {
var display = document.getElementById('displayResponse');
display.innerHTML = "";
var inputArray = [];

//Get data from user input.
function retrieveUserInput() {
    return new Promise(resolve => {
        const inputTypes = document.querySelectorAll("input");
        inputTypes.forEach(input => {
            if(input.getAttribute('placeholder') && input.value.length > 2) {
                let queryCategory = input.getAttribute('placeholder');
                let queryValue = input.value;
                inputArray.push({[queryCategory] : queryValue});
            }
        });
        console.log("Input Retrieved");
        resolve(inputArray);
    });
}

////Create Query Links if applicable & Fetch data.
function doFetching(inputArray,outputArray = []) {
    var forDisplay =[];
    const baseLink = "https://musicbrainz.org/ws/2/";
    return Promise.all(inputArray.map(query => {
        let queryType = Object.keys(query)[0];
        console.log(queryType);
        let queryValue2 = query[queryType];
        console.log(queryValue2);
        return fetch(`${baseLink}${queryType.toLowerCase()}/?query=${encodeURIComponent(queryValue2)}&fmt=json`)
        .then((response) => response.json())
        .then((fetchedData) => {
            for(const fetchItem of fetchedData.artists || []) {
                if(queryType === "Artist") {
                    outputArray.push({name: fetchItem.name , id: fetchItem.id});
                }
                if(queryType === 'Work') {
                    outputArray.push({name: fetchItem.title, id: fetchItem.id});
                } 
    
            }

                outputArray.forEach(item => {
                    const anchor = document.createElement('a');
                    anchor.setAttribute("href", `https://musicbrainz.org/ws/2/${queryType.toLowerCase()}/${item.id}`);
                    anchor.setAttribute("class", "linkToDiscog");
                    anchor.textContent = `${item.name}`;
                    anchor.style.display = 'block';
                    anchor.style.color = '#850000';
                    anchor.style.fontFamily = 'Perpetua';
                    anchor.style.textDecoration = 'underline';
                    display.appendChild(anchor);


                });
                
        });

    }));
    
}


    retrieveUserInput()
        .then(inputArray => doFetching(inputArray))
        .catch(error => {
            console.error("Error Found",error)
            display.innerHTML = "Error" + error.message;
        });

    });








    var works = document.querySelectorAll("linkToDiscog");
    for(w in works) {
        w.addEventListener('click', (evClick) => {
            evClick.preventDefault;
            if(worksRequested) {
                const newTable = document.createElement('table');
                return fetch(`${baseLink}release-group?${queryType.toLowerCase()}=${item.id}&fmt=json`)
                .then(response => response.json())
                .then(fetchedAlbums => {
                    for(const albums in fetchedAlbums.release-groups || []) {
                        for(const albs in albums.title) {
                            var row = document.createElement('tr');
                            var cell = `${albs.textContent()}`;
                            row.appendChild(cell);

                        }
                    }
                })
            } else {
                console.log("No Further Requests");
            }
        });

        function worksRequested() {
            return true;
        }
    }


// function pQuery(responses, queryValue) {
//     console.log(responses);
//     let requestedArray = [];
//     let items = responses.artist;
//     console.log(items);
//     if(items.length === 0) {
//         display.innerHTML = `No data found for your query`;
//     } else {
//         items.forEach(item => {
//             if(queryType === 'artists') {
//                 forDisplay = {name: item.name , id: item.id};
//             } 
//             if(queryType === 'work') {
//                 forDisplay = {name: item.title, id: item.id};
//             }
//             requestedArray.push(forDisplay);
//         });
        // requestedArray.forEach(item => {
        //     var anchor = document.createElement('a');
        //     anchor.setAttribute("href", `"https://musicbrainz.org/ws/2/work/${item.id}"`);
        //     anchor.textContent = item.name;
        //     display.appendChild(anchor);
        // });
        // }
    


//         retrieveUserInput()
//         .then(doFetching)
//         .then(pQuery)
//         .catch(error => {
//             console.error("Error Found", error);
//             display.innerHTML = "Error" + error.message;

//     });
// });

// function processQuery(responses) {
//     let requestedArray = [];
//     responses.forEach(({json}) => {
//         if(!json) {
//             display.innerHTML = `No data found for your query`;
//         } else {
//             let resultType = queryType;
//             let results = json[resultType];
//             console.log(results);
//             if(Array.isArray(results)) {
//                 results.forEach(item => {
//                     requestedArray.push({name: item.name , id: item.id});
//                 });
//             } else {
//                 console.error('Not an Array', results);
//             }
            
            
//         }
        
//     });
//     return requestedArray;
// }

//Return relevant data & clickable links for artist queries.

// function displayFetch(requestedArray) {
//     requestedArray.forEach(item => {
//         var anchor = document.createElement('a');
//         anchor.setAttribute("href", `"https://musicbrainz.org/ws/2/work/${item.id}"`);
//         anchor.textContent = item.name;
//         display.appendChild(anchor);
//     });
// }

//     retrieveUserInput()
//         .then(doFetching)
//         .then(pQuery)
//         .then(displayFetch)
//         .catch(error => {
//             console.error("Error Found", error);
//             display.innerHTML = "Error" + error.message;
//     });
// });

//If intial return data is queried further then return relevant data.


//Old Code:
// inputArray.forEach(function(query) {
//     let queryType = Object.keys(query)[0];
//     switch(queryType) {
//         case 'Work':
//             console.log(query);
//             return fetch(`${baseLink}work/?query=${Object.values(query)}}`), queryType;
//         case 'Artist':
//             console.log(query);
//             return fetch(`${baseLink}artist/?query=${Object.values(query)}}`), queryType;
//         case 'Genre':
//             console.log(query);
//             return fetch(`${baseLink}genre/?query=${Object.values(query)}}`), queryType;
//         default:
//             console.log(query);
//     }
// })

// if(!(fetchResponse.length > 0)) {
//         display.innerHTML = `No data found for your query`;
//     } else {
//         const request = queryType.toLower();
//         const data = fetchResponse.querySelectorAll(`${request}`);
//         data.forEach(function(x) {
//             requestedArray.push(`${x.querySelector('name').textContent} : ${x.getAttribute('id')}`);
//             return requestedArray;
//         })
//     }
// })