// document.addEventListener('DOMContentLoaded', function() {
//     const ochreUrl = "https://ochre.lib.uchicago.edu/ochre?uuid=";
//     const uuid = document.body.getAttribute("data-uuid");

//     fetch(`${ochreUrl}${uuid}`)
//     .then(response => response.text())
//     .then(str => (new window.DOMParser())).parseFromString(str,"text/xml")
//     .then(xml => {console.log(xml); displaydata(xml)
//     })
//     .catch(error => console.error('Error:', error));


// function present(xml) {
//     const data = document.getElementById('called-container');
//     const title = xml.querySelector('title');
//     const description = xml.querySelector('Associated Text');

//     const return_info = `<h5><mark>${title}</mark></h5?>
//                         <p>${'description'}</p>`;
    
//     data.innerHTML = return_info;
// }

// });

// Url = "https://ochre.lib.uchicago.edu/ochre?uuid="
// uuid = "6f18e3a7-a396-46d9-85cb-92674c24cfc0"

// async function present() {
//     // uuid = document.body.getAttribute('data-uuid');
//     const output = await fetch(`"https://ochre.lib.uchicago.edu/${uuid}"`);
//     const txt = await output.text();
//     const Parse = DOMParser();
//     const ochre = Parse.parseFromString(txt,'text/xml');
//     console.log(ochre)
// }

document.addEventListener('DOMContentLoaded', function() {
    let fetch_id = "6f18e3a7-a396-46d9-85cb-92674c24cfc0";
    fetch(`https://ochre.lib.uchicago.edu/ochre?uuid=${fetch_id}`, {
        redirect: 'follow'
    })
        .then ((response) => response.text())
        .then(text => {
            const parser = new DOMParser();
            const data = parser.parseFromString(text,'text/xml');
            const property = data.querySelectorAll('property');
            const strings = data.querySelectorAll('string');
            let uuid ='';
            let output = '';

            for(let p of property) {
                const valueAttributes = p.querySelector('value');
                const string = p.querySelector('string').textContent;
                const value = p.querySelector('value').textContent;
                
            for(let s of strings) {
                if(s.textContent == "Associated text") {
                    uuid = valueAttributes.getAttribute('uuid');

                }
            }

                output += `${string} | ${value}<br>`;
            }
            console.log(output);

            const container = document.getElementById("called-container");
            container.innerHTML = output;

            if(uuid) {
                fetch(`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`, {
                    redirect:'follow'
                })
                .then ((response_2) => response_2.text())
                .then(text2 => {
                    const parser2 = new DOMParser();
                    const data2 = parser2.parseFromString(text2,'text/xml');
                    const div = data2.querySelectorAll('value').textContent;
                    div.forEach(d => {
                        console.log('div:', d);
                    
                    })

                    output += `<br>${div}<br>`;
                    container.innerHTML = output;

                })
                .catch(error => console.error('additional details problematic', error));
            }
        })
        .catch(error => console.error('xml error:', error));
    });

    
    
    
    //     const value = data.querySelectorAll('value');
    //     value.forEach(v => {
    //         console.log('Value:',v.textContent);
    //     });

    //     const string = data.querySelectorAll('string');
    //     string.forEach(s => {
    //         console.log('String:',s.textContent);
    //     });

    // })

  


// let newDiv = document.createElement("div");
            // newDiv.innerHTML = `<p>${string} | ${value}</p>`;
            // document.body.appendChild(newDiv);

            // const nodes = data.querySelectorAll('observations');
            // nodes.forEach(node => {
            //     console.log(node);
            // });