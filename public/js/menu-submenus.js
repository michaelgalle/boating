document.addEventListener("DOMContentLoaded", function() {
    // 1. Toggle submenu and scroll to section on main menu click
    document.querySelectorAll('.main-menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to section
            const sectionId = this.getAttribute('href').replace('#', '');
            const sectionElem = document.getElementById(sectionId);
            if (sectionElem) sectionElem.scrollIntoView({ behavior: "smooth" });

            // Toggle submenu
            const submenuId = this.getAttribute('data-submenu');
            const submenu = document.getElementById(submenuId);
            if (submenu) {
                // Optionally close other submenus
                document.querySelectorAll('.submenu').forEach(ul => {
                    if (ul !== submenu) ul.style.display = "none";
                });
                // Toggle this submenu
                submenu.style.display = (submenu.style.display === "block") ? "none" : "block";
            }
        });
    });

    // 2. Dynamically populate submenus from h2 headers in HTML files
    const menuSections = [
        { submenuId: "submenu1", file: "html/Section-1-Terminology.html", sectionId: "Section-1-Terminology" },
        { submenuId: "submenu2", file: "html/Section-2-Safety.html", sectionId: "Section-2-Safety" },
        { submenuId: "submenu3", file: "html/Section-3-Laws.html", sectionId: "Section-3-Laws" },
        { submenuId: "submenu4", file: "html/Section-4-Navigation.html", sectionId: "Section-4-Navigation" },
        { submenuId: "submenu5", file: "html/Section-5-Pre-Departure.html", sectionId: "Section-5-Pre-Departure" },
        { submenuId: "submenu6", file: "html/Section-6-Operation.html", sectionId: "Section-6-Operation" },
        { submenuId: "submenu7", file: "html/Section-7-Emergencies.html", sectionId: "Section-7-Emergencies" },
    ];

    menuSections.forEach(section => {
        fetch(section.file)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const h2s = doc.querySelectorAll("h2");
                const submenu = document.getElementById(section.submenuId);
                h2s.forEach(h2 => {
                    const li = document.createElement("li");
                    li.className = "sub-nav-item";
                    const a = document.createElement("a");
                    a.className = "menu-nav-link";
                    a.textContent = h2.textContent;
                    a.href = h2.id ? `#${h2.id}` : `#${section.sectionId}`;
                    a.addEventListener("click", function(e) {
                        e.preventDefault();
                        const targetId = h2.id ? h2.id : section.sectionId;
                        const targetElem = document.getElementById(targetId);
                        if (targetElem) targetElem.scrollIntoView({ behavior: "smooth" });
                    });
                    li.appendChild(a);
                    submenu.appendChild(li);
                });
                // Hide submenu by default
                submenu.style.display = "none";
            });
    });
});