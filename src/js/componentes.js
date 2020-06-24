/* CSS */
import './../css/componentes.css';
/* DOM */
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// Store listItems
const listItems = [];

let dragStartIndex;

// Drag Start
const dragStart = (index) => {
    // console.log('Event: ', 'dragstart');
    const elemStart = index.target.parentNode.getAttribute('data-index');
    dragStartIndex = +elemStart;
    // console.log(dragStartIndex);
};

// Drag Over
const dragOver = (e) => {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
};

// Swap list Items that are drag and drop
const swapItems = (fromIndex, toIndex) => {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
};

// Drag Drop
const dragDrop = (index) => {
    // console.log('Event: ', 'drop');
    const person = index.target.parentNode; 
    const dragEndIndex = +index.target.parentNode.getAttribute('data-index');
    // console.log(dragEndIndex); 
    swapItems(dragStartIndex, dragEndIndex);
    person.classList.remove('over');
};

// Drag Enter
const dragEnter = (index) => {
    // console.log('Event: ', 'dragenter');
    const person = index.target.parentNode; 
    person.classList.add('over');
};

// Drag Leave
const dragLeave = (index) => {
    // console.log('Event: ', 'dragleave');
    const person = index.target.parentNode; 
    person.classList.remove('over');
};

// Add Drag Events
const addEventListeners = () => {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart, false);
    });

    dragListItems.forEach((item) => {
        item.addEventListener('dragover', dragOver, false);
        item.addEventListener('drop', dragDrop, false);
        item.addEventListener('dragenter', dragEnter, false); 
        item.addEventListener('dragleave', dragLeave, false);
    });
};

// Insert list items into DOM
const createList = () => {
    [...richestPeople]
    .map((a) => {
            return { value: a, sort: Math.random() };
        })
        .sort((a, b) => {
            return a.sort - b.sort
        })
        .map((a) => {
            return a.value
        })
        .forEach((person, index) => {
            // console.log(person);
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });

        addEventListeners();
};

// Check the order of list items
const checkOrder = () => {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable')
        .innerText.trim();

        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
};

/* ************************************************************ */
const events = () => {
    // console.log('Event Listeners');
    check.addEventListener('click', checkOrder);
};
/* ************************************************************ */
const init = () => {
    console.log('Sortable List');
    createList();
    events();
};
/* ************************************************************ */
export {
    init
}