function includeHTML() {
    let file, xhttp;
    let elements = document.querySelectorAll("*");       // Get all elements on the page
    elements.forEach((element) => {
        if(file = element.getAttribute("w3-include-html")) {
            // console.log(element);
            /* Make an HTTP request using the attribute value as the file name */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {element.innerHTML = this.responseText;}
                    if (this.status == 404) {element.innerHTML = "Page not found.";}
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
        }
        
    }); 
    return;
}