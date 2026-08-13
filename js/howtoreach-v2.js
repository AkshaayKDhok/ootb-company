const balewadiPath = `
M210 13
L990 490
L940 540
L580 320
L445 540
`;

const universityPath = `
M1150 670
L1020 585
L955 545
L580 320
L445 540
`;

const routePath = document.getElementById("routePath");
const routeGlow = document.getElementById("routeGlow");
const vehicle = document.getElementById("routeVehicle");
const mapStage = document.querySelector(".map-stage");

const navInstruction = document.getElementById("navInstruction");
const navTitle = document.getElementById("navTitle");
const navSubtext = document.getElementById("navSubtext");
const navIcon = document.getElementById("navIcon");

let animationId;


/* ===========================
   NAVIGATION DIRECTION ICON
=========================== */

function updateNavigationIcon(angle){

    let icon = "↑";

    if(angle >= -22.5 && angle < 22.5){

        icon = "→";

    }else if(angle >= 22.5 && angle < 67.5){

        icon = "↘";

    }else if(angle >= 67.5 && angle < 112.5){

        icon = "↓";

    }else if(angle >= 112.5 && angle < 157.5){

        icon = "↙";

    }else if(angle >= 157.5 || angle < -157.5){

        icon = "←";

    }else if(angle >= -157.5 && angle < -112.5){

        icon = "↖";

    }else if(angle >= -112.5 && angle < -67.5){

        icon = "↑";

    }else if(angle >= -67.5 && angle < -22.5){

        icon = "↗";

    }

    navIcon.textContent = icon;

}

/* ===========================
   DRAW ROUTE
=========================== */

function drawRoute(pathData){

        mapStage.classList.remove(
        "balewadi-arrival",
        "university-arrival"
    );

    if(pathData === balewadiPath){

        mapStage.classList.add("balewadi-arrival");

    }else{

        mapStage.classList.add("university-arrival");

    }
    mapStage.classList.remove("destination-focus");

    document
        .getElementById("destinationCard")
        .classList.remove("show");

    document
        .querySelector(".arrival-title")
        .classList.remove("show");

    document
        .querySelector(".bottom-actions")
        .style.opacity = "1";

    document
        .querySelector(".bottom-actions")
        .style.pointerEvents = "auto";

    cancelAnimationFrame(animationId);

    routePath.setAttribute("d", pathData);

    routeGlow.setAttribute("d", pathData);

    const length = routePath.getTotalLength();

    routePath.style.strokeDasharray = length;

    routeGlow.style.strokeDasharray = length;
    routeGlow.style.strokeDashoffset = length;

    routePath.style.strokeDashoffset = length;

    vehicle.style.opacity = "0";

    navInstruction.classList.add("show");

    let progress = 0;

    function updateNavigation(){

        const percent = progress / length;

        let title;
        let subtext;

        if(percent < 0.18){

            title = "Head towards Baner Road";
            subtext = "Follow the highlighted route";

        }else if(percent < 0.42){

            title = "Continue towards the lane";
            subtext = "Stay on the blue route";

        }else if(percent < 0.68){

            title = "Enter the lane";
            subtext = "Your destination is ahead";

        }else if(percent < 0.90){

            title = "Continue straight";
            subtext = "You're almost there";

        }else{

            title = "Destination ahead";
            subtext = "Out Of The Blue is nearby";

        }

        if(
            navTitle.textContent !== title ||
            navSubtext.textContent !== subtext
        ){

            navInstruction.classList.remove("show");

            setTimeout(() => {

                navTitle.textContent = title;
                navSubtext.textContent = subtext;

                navInstruction.classList.add("show");

            }, 120);

        }

    }


    /* ===========================
       CAMERA + ROUTE ANIMATION
    =========================== */

    function animate(){

        progress += 4;

        if(progress > length){

            progress = length;

        }

        routePath.style.strokeDashoffset =
            length - progress;

        routeGlow.style.strokeDashoffset =
            length - progress;

        updateNavigation();


        const point =
            routePath.getPointAtLength(progress);

        const nextPoint =
            routePath.getPointAtLength(
                Math.min(progress + 1, length)
            );


        const angle =
            Math.atan2(
                nextPoint.y - point.y,
                nextPoint.x - point.x
            ) * 180 / Math.PI;

            updateNavigationIcon(angle);

        vehicle.setAttribute(
            "transform",
            `translate(${point.x},${point.y}) rotate(${angle})`
        );


        const scale = 1.18;

        const x =
            (600 - point.x) * (scale - 1);

        const y =
            (337 - point.y) * (scale - 1);


        mapStage.style.transform =
            `translate(${x}px,${y}px) scale(${scale})`;


        vehicle.style.opacity = "1";


        if(progress < length){

            animationId =
                requestAnimationFrame(animate);

        }else{

    navInstruction.classList.remove("show");

    mapStage.classList.add("destination-focus");

    setTimeout(() => {

        document
            .querySelector(".arrival-title")
            .classList.add("show");

    }, 700);

    setTimeout(() => {

        document
            .getElementById("destinationCard")
            .classList.add("show");

    }, 1100);

    document
        .querySelector(".bottom-actions")
        .style.opacity = "0";

    document
        .querySelector(".bottom-actions")
        .style.pointerEvents = "none";

}

    }

    animate();

}


/* ===========================
   ROUTE BUTTONS
=========================== */

const balewadiBtn =
    document.getElementById("balewadiBtn");

const universityBtn =
    document.getElementById("universityBtn");


balewadiBtn.addEventListener("click", () => {

    balewadiBtn.classList.add("active");

    universityBtn.classList.remove("active");

    mapStage.classList.add("route-switching");

mapStage.classList.remove(
    "destination-focus",
    "balewadi-arrival",
    "university-arrival"
);

mapStage.style.transform = "scale(1)";

setTimeout(() => {

    drawRoute(balewadiPath);

    mapStage.classList.remove("route-switching");

}, 350);

});


universityBtn.addEventListener("click", () => {

    universityBtn.classList.add("active");

    balewadiBtn.classList.remove("active");

    mapStage.classList.add("route-switching");

mapStage.classList.remove(
    "destination-focus",
    "balewadi-arrival",
    "university-arrival"
);

mapStage.style.transform = "scale(1)";

setTimeout(() => {

    drawRoute(universityPath);

    mapStage.classList.remove("route-switching");

}, 350);

});


/* ===========================
   GOOGLE MAPS BUTTON
=========================== */

const googleBtn =
    document.querySelector(".google-btn");


googleBtn.addEventListener("click", () => {

    window.open(
        "https://maps.app.goo.gl/K3KUVFWGJrQwNV8n6",
        "_blank"
    );

});


/* ===========================
   CLOSE DESTINATION CARD
=========================== */

document
    .getElementById("closeCard")
    .addEventListener("click", () => {

        document
            .getElementById("destinationCard")
            .classList.remove("show");

        document
            .querySelector(".arrival-title")
            .classList.remove("show");

        mapStage.classList.remove(
            "destination-focus",
            "balewadi-arrival",
            "university-arrival"
        );

        mapStage.style.transform = "scale(1)";

        document
            .querySelector(".bottom-actions")
            .style.opacity = "1";

        document
            .querySelector(".bottom-actions")
            .style.pointerEvents = "auto";

    });


/* ===========================
   INITIAL STATE
=========================== */

window.addEventListener("load", () => {

    mapStage.style.transform = "scale(1)";

});


/* ===========================
   START
=========================== */

drawRoute(balewadiPath);