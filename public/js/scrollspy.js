let sections = document.querySelectorAll('section');
let menu_links = document.querySelectorAll('a');

function showPos() {
    let scrollPosition = window.scrollY - 400;                  // Current scroll position
    sections.forEach(section => {                         // Callback function in forEach()
        if(scrollPosition >= section.offsetTop) {         // This will be TRUE for ALL sections above the current scroll position 
            menu_links.forEach(menu_link => {                  // but the LAST section where the if statement is TRUE is the one we care about
                menu_link.classList.remove('active');          // because we remove the 'active' state from all the links (except the LAST section that was TRUE)  
                if(section.getAttribute("id") === menu_link.getAttribute("href").substring(1)) {   
                    menu_link.classList.add('active');         // and we add the 'active' state to the corresponding menu_link 
                }
            });
        }
    } );
   //console.log(window.scrollY + 50);
}

document.addEventListener("scroll", showPos, false);