//change header banner image with viewport

const headerImg = document.getElementById('header-bannner');
const mQ = window.matchMedia("(max-width: 486px)");

function changeHeader() {

    if (mQ.matches) {
        headerImg.src = "img/bg-header-mobile.svg"
    } else {
        headerImg.src = "img/bg-header-desktop.svg"
    }


}

window.addEventListener('resize', changeHeader);