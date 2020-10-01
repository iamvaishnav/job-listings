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
const items = document.querySelectorAll('.item');

let closeBtn;
let itemName;
let passArray = [];

tags.forEach(current => {
    current.addEventListener('click', () => {

        if (!(passArray.includes(current.textContent))) {
            applyFilters(current);
            passArray.push(current.textContent);
        }

    })

})



function applyFilters(tag) {


    filterContainer.style.display = 'flex';
    let el = '<div class="filter-item"> <span class="item-name">%HTML%</span><span class="close"><img src="img/icon-remove.svg" alt="remove"></span></div>';
    let newEl = el.replace('%HTML%', tag.textContent)
    filterArea.insertAdjacentHTML('beforeend', newEl);
    closeBtn = document.querySelectorAll('.close');
    closeTag();
    itemsFilter(tag.textContent);

}

// clear button

clear.addEventListener('click', clearFilters)

//function to clear filter container

function clearFilters() {
    filterContainer.style.display = 'none';
    for (let i = 0; i < filterArea.childNodes.length;) {
        filterArea.childNodes[i].remove();

    }
    passArray.splice(0, passArray.length);

    itemsShow();
}

//function to clear the tag

function closeTag() {

    closeBtn.forEach(current => {

        current.addEventListener('click', (event) => {

            if (event.target.classList.contains('close')) {

                updatePassArray(event.target.parentNode.firstElementChild.textContent);
                event.target.parentNode.remove();

            } else {

                updatePassArray(event.target.parentNode.parentNode.firstElementChild.textContent);
                event.target.parentNode.parentNode.remove();

            }
            if (filterArea.childElementCount === 0) {

                clearFilters();
            }

        })

    })
}
// function to update pass array

function updatePassArray(value) {
    passArray.forEach((current, index, arr) => {
        if (current === value) {
            arr[index] = '';
        }
    })

}

// function to hide items

function itemsHide() {
    items.forEach(current => current.style.display = 'none')
}

// function to show all items

function itemsShow() {
    items.forEach(current => current.style.display = 'grid')
}

// toggle display of items boxes

function itemsFilter(tag) {


    items.forEach(current => {

        let languages = current.dataset.languages.split(',');
        let tools = current.dataset.tools.split(',')

        if (current.dataset.role === tag || current.dataset.level === tag) {

            current.style.display = 'grid';

        }

        languages.forEach(curr => {

            if (curr === tag) {
                current.style.display = 'grid';
            }

        })

        tools.forEach(curr => {

            if (curr === tag) {
                current.style.display = 'grid';
            }

        })

    })
}