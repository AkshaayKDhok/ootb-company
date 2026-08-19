document.addEventListener("DOMContentLoaded", async () => {

    /* ==========================================
       LOAD SHARED NAVIGATION
    ========================================== */

    const navContainer =
        document.getElementById("site-nav");

    if (navContainer) {

        try {

            const response =
                await fetch("./components/nav.html");

            if (!response.ok) {
                throw new Error(
                    `Navigation failed: ${response.status}`
                );
            }

            const navHTML =
                await response.text();

            navContainer.innerHTML =
                navHTML;

        } catch (error) {

            console.error(
                "OOTB Navigation Error:",
                error
            );

        }

    }


    /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    const navLinks =
        document.querySelectorAll("[data-nav]");


    navLinks.forEach(link => {

        const navTarget =
            link.getAttribute("data-nav");

        let isActive = false;


        if (
            navTarget === "about" &&
            currentPage === "about.html"
        ) {
            isActive = true;
        }


        if (
            navTarget === "ventures" &&
            (
                currentPage === "ventures.html" ||
                currentPage === "indiandoctorsnetwork.html" ||
                currentPage === "indiandentalnetwork.html" ||
                currentPage === "oratorssociety.html"
            )
        ) {
            isActive = true;
        }


        if (
            navTarget === "services" &&
            currentPage === "services.html"
        ) {
            isActive = true;
        }


        if (
            navTarget === "studio" &&
            currentPage === "studio.html"
        ) {
            isActive = true;
        }


        if (
            navTarget === "community" &&
            currentPage === "community.html"
        ) {
            isActive = true;
        }


        if (
            navTarget === "investors" &&
            currentPage === "investors.html"
        ) {
            isActive = true;
        }


        if (
            navTarget === "careers" &&
            currentPage === "careers.html"
        ) {
            isActive = true;
        }


        if (
            navTarget === "contact" &&
            currentPage === "contact.html"
        ) {
            isActive = true;
        }


        if (isActive) {

            link.classList.remove(
                "text-slate-600"
            );

            link.classList.add(
                "text-primary"
            );

            link.classList.remove(
                "after:w-0"
            );

            link.classList.add(
                "after:w-full"
            );

        }

    });


    /* ==========================================
       NAV SCROLL EFFECT
    ========================================== */

    const nav =
        document.getElementById("mainNav");


    if (nav) {

        const updateNavShadow = () => {

            if (window.scrollY > 50) {

                nav.classList.add(
                    "shadow-lg",
                    "shadow-slate-200/50"
                );

            } else {

                nav.classList.remove(
                    "shadow-lg",
                    "shadow-slate-200/50"
                );

            }

        };


        updateNavShadow();


        window.addEventListener(
            "scroll",
            updateNavShadow
        );

    }


    /* ==========================================
       LOAD SHARED FOOTER
    ========================================== */

    const footerContainer =
        document.getElementById("site-footer");


    if (footerContainer) {

        try {

            const response =
                await fetch("./components/footer.txt");

            if (!response.ok) {
                throw new Error(
                    `Footer failed: ${response.status}`
                );
            }

            const footerHTML =
                await response.text();

            footerContainer.innerHTML =
                footerHTML;

        } catch (error) {

            console.error(
                "OOTB Footer Error:",
                error
            );

        }

    }

});