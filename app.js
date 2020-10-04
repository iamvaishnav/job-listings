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
let filteredItems = [];

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
    itemsHide();

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
    filteredItems.splice(0, filteredItems.length);

    itemsShow();
}

//function to clear the tag

function closeTag() {

    closeBtn.forEach(current => {

        current.addEventListener('click', (event) => {

            if (event.target.classList.contains('close')) {

                updatePassArray(event.target.parentNode.firstElementChild.textContent);
                updateFilteredArray();
                event.target.parentNode.remove();

            } else {

                updatePassArray(event.target.parentNode.parentNode.firstElementChild.textContent);
                updateFilteredArray();
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

//function to update filtered items array

function updateFilteredArray() {
    let deletedItems = [];
    filteredItems.forEach((current, index, arr) => {
        let x = current.lastElementChild.children;
        let count = 0;
        for (let i = 0; i < x.length; i++) {
            passArray.forEach(current => {
                if (current === x[i].textContent) {
                    count++;
                }
            })
        }

        if (count < 1) {
            deletedItems.push(current);
        }
    })

    for (let i = 0; i < deletedItems.length; i++) {
        let index = filteredItems.indexOf(deletedItems[i]);
        filteredItems.splice(index, 1);

    }
    deletedItems.splice(0, deletedItems.length);
    itemsHide();
}

// function to hide items

function itemsHide() {

    items.forEach(current => {

        if (!(filteredItems.includes(current))) {

            current.style.display = 'none';

        } else {
            current.style.display = 'grid'
        }
    })

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

            if (!(filteredItems.includes(current))) {

                filteredItems.push(current);

            }

        }

        languages.forEach(curr => {

            if (curr === tag) {

                if (!(filteredItems.includes(current))) {

                    filteredItems.push(current);

                }
            }

        })

        tools.forEach(curr => {

            if (curr === tag) {

                if (!(filteredItems.includes(current))) {

                    filteredItems.push(current);

                }
            }

        })

    })

}