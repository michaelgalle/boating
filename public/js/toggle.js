// Vars 
let scrollspyBtn = document.querySelector('#scrollspy-button');
let menu = document.querySelector('#menu');
let mobileLogo = document.querySelector('#mobile-logo');

// Functions
function setToggleState() {
    if (window.innerWidth >= 1200) {
        //alert("Greater than 1200px");
        menu.className = 'toggled';
        scrollspyBtn.className = 'toggledIcon';
        mobileLogo.className='hide';
    } else {
        //alert("Less than 1200px");
        menu.className = 'untoggled';
        scrollspyBtn.className = 'untoggledIcon';
        mobileLogo.className='show';
    }
}

function toggleMenu() { 
    if (menu.className === 'toggled') {
        // If showing menu then hide it
        menu.className = 'untoggled';
        scrollspyBtn.className = 'untoggledIcon';
        mobileLogo.className='show';
    } else {
        // If not showing menu  then show it
        menu.className = 'toggled';
        scrollspyBtn.className = 'toggledIcon';
        mobileLogo.className='hide';
    }
}

function hideMenu(event) {
    if (window.innerWidth <= 1200) {
        if(!menu.contains(event.target) && !scrollspyBtn.contains(event.target)) {   // User click anything but menu or scrollspy button will cause the menu to close
            menu.className = 'untoggled';
            scrollspyBtn.className = 'untoggledIcon';
            //alert("You clicked away from the menu or scrollspy button so the menu closed");
        }
    }
}

function touchShow(event) {
    console.log(event.target);
}

// Event listeners
window.addEventListener('load', setToggleState, false);
window.addEventListener('resize', setToggleState, false);
scrollspyBtn.addEventListener('click', toggleMenu, false);
window.addEventListener('click', function(event) {hideMenu(event)}, false);                 // Close menu when user clicks, scrolls or touches away 
window.addEventListener('scroll', function(event) {hideMenu(event)}, false); 
window.addEventListener('touchstart', function(event) {hideMenu(event)}, false);