document.addEventListener('DOMContentLoaded', function() {
    const fetchID = document.body.getAttribute('data-uuid');
    const imageOutput = document.getElementById('fetchedImage');
    const ochre_url = 'https://ochre.lib.uchicago.edu/ochre?uuid=';
    const header = document.getElementById('api-fetch-head');


    function getImg(uuid) {
        if(!uuid || !imageOutput) {
            console.error("UUID or ImageOutput N/A" );
            return;
        }
        
        const fetchUrl = `${ochre_url}${uuid}`;
        console.log("fetching data", fetchUrl);

        fetch(fetchUrl, {redirect:'follow'})
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.text();
            })
            .then((responseData) => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(responseData,'text/xml');
                console.log(xml);
                const resElement = xml.querySelector('resource');
                console.log(resElement);
                if(resElement) {
                    const imgUUID = resElement.getAttribute('uuid');
                    const imgFormat = resElement.getAttribute('format');
                    const imgURL = `${ochre_url}${imgUUID}&format=${imgFormat}`;
                    header.innerHTML = 'Tiwanaku and its Hinterland';
                    header.style.fontFamily = 'Perpetua';
                    header.style.textAlign = 'center';
                    header.style.textDecoration = 'underline'
                    header.style.color = '#850000';
                    header.style.fontWeight = 'bold';
                    imageOutput.src = imgURL + '&preview';
                }
            });   
        }
        getImg(fetchID);
    });