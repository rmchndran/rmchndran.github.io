function welcome_user() {
    const now = new Date();
    const clicktime = now.getHours();
    let appr_word;

    if (clicktime >= 18 && clicktime <= 23) {
        appr_word = "Good Evening";

    } else if (clicktime >= 12 && clicktime < 18) {
        appr_word = "Good Afternoon"
    } else {
        appr_word = "Good Morning"
    }

    alert(appr_word);

}

document.getElementById("Portal").addEventListener("click", change_page);

function change_page() {
    let i = document.getElementById("Portal");
    console.log("Pre-Click:", i.textContent, i.className);

    i.textContent = "Done";
    i.className = "btn btn-success";
}

function show_visited(event) {
    event.target.style.textDecoration = 'none';
}

var navitems = document.getElementsByClassName("nav-link")

for (let items of navitems) {
    items.addEventListener("click", show_visited)
}



function after_click(event) {
    event.preventDefault();
    event.target.style.textDecoration = 'line-through';
}

var btns = document.getElementsByClassName("col text-center");

for (let items of btns) {
    items.addEventListener("click", after_click);

}

document.addEventListener('DOMContentLoaded', function() {
    var toggleBtns = document.querySelectorAll(".dropdown-menu .dropdown-toggle");
    
    toggleBtns.forEach(function(click){
        click.addEventListener('click', function(menuItem){
            menuItem.stopPropagation();

            var dropdownParentElement = click.parentElement;
            var navDropdown = dropdownParentElement.querySelector('.dropdown-menu');

            if(navDropdown.classList.contains('show')) {
                navDropdown.classList.remove('show')
            } else {
                var toClose = document.querySelectorAll('dropdown-submenu dropdown-menu-show');
                toClose.forEach(function(menu){
                    menu.classList.remove('show');
                });

                navDropdown.classList.add('show');
            }
        });
    });
});




