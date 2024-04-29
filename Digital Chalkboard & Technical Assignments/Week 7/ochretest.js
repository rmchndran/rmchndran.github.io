document.addEventListener('DOMContentLoaded', function() {
    const fetch_id = document.body.getAttribute('data-uuid');
    const ochre_url = 'https://ochre.lib.uchicago.edu/ochre?uuid=';
    const display = document.getElementById('called-container');
    let output = '';


    function getXml(uuid) {
        return fetch(ochre_url + uuid, {redirect:'follow'})
        .then(output => {
            if(!output.ok) throw new Error('Broken Link!');
            return output.text();
        })
        .then(text_output => {
            const parser = new DOMParser();
            return parser.parseFromString(text_output,'text/xml');

        });
    }

    function xml(data) {
        const property = data.querySelectorAll('property');
        let add_uuid = '';

        property.forEach(p => {
            const string = p.querySelector('string');
            const value = p.querySelector('value');

            if(string && value) {
                output += `${string.textContent} | ${value.textContent} | <br><br>`
                if(string.textContent == 'Associated text') {
                    add_uuid = value.getAttribute('uuid');
                }
            }
        });

        display.innerHTML = output;
        return add_uuid;
    }

    getXml(fetch_id)
        .then(xml)
        .then(add_uuid => {
            if(add_uuid) {
                return getXml(add_uuid)
                    .then(xml)
            }

        })
        .catch(error => {
            console.error("Another Problem:", error);
            display.innerHTML = 'Error!!' + error.message;
    });

});
