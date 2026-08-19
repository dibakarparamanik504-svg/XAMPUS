/* =========================================================
   XAMPUS SPLASH SCREEN
   Automatic Home Redirect
   ========================================================= */


/* ---------------------------------------------------------
   ELEMENT
   --------------------------------------------------------- */

const progress =
    document.getElementById("loaderProgress");


/* ---------------------------------------------------------
   SETTINGS
   --------------------------------------------------------- */

/*
    Splash duration

    0 → 100%

    এখানে 2200 milliseconds
    অর্থাৎ প্রায় 2.2 seconds।
*/

const splashDuration = 2200;


/* ---------------------------------------------------------
   START TIME
   --------------------------------------------------------- */

const startTime = performance.now();


/* ---------------------------------------------------------
   LOADING ANIMATION
   --------------------------------------------------------- */

function animateLoading(currentTime) {

    const elapsed =
        currentTime - startTime;


    let percentage =
        (elapsed / splashDuration) * 100;


    /*
        100% এর বেশি হতে দিচ্ছি না
    */

    percentage =
        Math.min(percentage, 100);


    /*
        Progress bar update
    */

    progress.style.width =
        percentage + "%";


    /*
        Complete হলে Home Page
    */

    if (percentage >= 100) {

        goToHome();

        return;

    }


    /*
        Continue animation
    */

    requestAnimationFrame(
        animateLoading
    );

}


/* ---------------------------------------------------------
   HOME REDIRECT
   --------------------------------------------------------- */

function goToHome() {

    /*
        Small delay রাখা হয়েছে
        যাতে শেষ frame smooth দেখায়।
    */

    setTimeout(() => {

        window.location.replace(
            "Frontend/home/home.html"
        );

    }, 100);

}


/* ---------------------------------------------------------
   START
   --------------------------------------------------------- */

requestAnimationFrame(
    animateLoading
);