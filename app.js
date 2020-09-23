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

//filter functionality
const filterContainer = document.querySelector('.filter-container')
const tags = document.querySelectorAll('.tags');
const clear = document.querySelector('.clear');
const filterArea = document.querySelector('.filters');
let closeBtn;
let itemName;
let passArray = [];
tags.forEach(current => {
    current.addEventListener('click', () => {

        if (!(passArray.includes(current.textContent))) {
            applyFilters(current);
            passArray.push(current.textContent)
        }

    })
})

function applyFilters(tag) {

    filterContainer.style.display = 'flex';
    let el = '<div class="filter-item"> <span class="item-name">%HTML%</span><span class="close"><img src="img/icon-remove.svg" alt="remove"></span></div>';
    let newEl = el.replace('%HTML%', tag.textContent)
    filterArea.insertAdjacentHTML('beforeend', newEl);
    closeBtn = document.querySelectorAll('.close');
    console.log(closeBtn)
}

// clear button
clear.addEventListener('click', () => {
    filterContainer.style.display = 'none';
    for (let i = 0; i < filterArea.childNodes.length;) {
        filterArea.childNodes[i].remove();

    }
    passArray.splice(0, passArray.length);
})

//function to clear the tag
/*
function closeTag() {
    closeBtn.forEach(current => {

        current.addEventListener('click', (event) => {
            console.log(current);
            console.log(event);
        })
        console.error('not invoked yet')
    })


}

closeTag();
*/