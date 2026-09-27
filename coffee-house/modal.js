const tabButtons = document.querySelectorAll('.tab');
const menuCoffee = document.querySelector('.menu__container_coffee');
const menuTea = document.querySelector('.menu__container_tea');
const menuDessert = document.querySelector('.menu__container_dessert');
const menuItem = document.querySelectorAll('.menu-item');
const refreshButton = document.querySelector('.refresh');
const desktopItem = document.querySelectorAll('.menu-item_desktop');

function switchTab(clickedTab) {
    tabButtons.forEach(tab => tab.classList.remove('tab_active'));
    clickedTab.classList.add('tab_active');

    const allContainers = [menuCoffee, menuTea, menuDessert];
    const currentActiveContainer = allContainers.find(container => 
        container && container.classList.contains('menu__container_active')
    );

    const tabText = clickedTab.textContent.toLowerCase();
    let targetContainer = null;

    if (tabText.includes('coffee')) targetContainer = menuCoffee;
    else if (tabText.includes('tea')) targetContainer = menuTea;
    else if (tabText.includes('dessert')) targetContainer = menuDessert;

    if (currentActiveContainer) {
        currentActiveContainer.classList.remove('is-visible');
        setTimeout(() => {
            currentActiveContainer.classList.remove('menu__container_active');
            if (targetContainer) {
                targetContainer.classList.add('menu__container_active');
                
                setTimeout(() => {
                    targetContainer.classList.add('is-visible');
                }, 10);
            }
        }, 300);
    } else {
        if (targetContainer) {
            targetContainer.classList.add('menu__container_active');
            targetContainer.classList.add('is-visible');
        }
    }
}

tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
        if (tab.classList.contains('tab_active')) return;
        switchTab(tab);
    });
});

if (menuCoffee) {
    menuCoffee.classList.add('menu__container_active');
    menuCoffee.classList.add('is-visible');
}

const activeModal = () => { 
    body.classList.toggle('scroll__lock'); 
};

menuItem.forEach((item) => {
    item.addEventListener("click", () => {
        activeModal();
    });
});

refreshButton.addEventListener("click", () => {
    desktopItem.forEach((item) => {
        item.classList.remove('menu-item_desktop');
        refreshButton.classList.add('hidden');
    });
});

// popupButtonExit.addEventListener("click", function(e) {
//     activePopup();
// });


// popup.addEventListener("click", function(e) {
//     activePopup();
// });


// popupContent.addEventListener("click", function(e) {
//     e.stopPropagation();
// });



// import coffeeArray from './products.json' with {type: 'json'};

// const coffeeName = document.querySelector ('.popup__name');
// const coffeeImg = document.querySelector ('.popup__img');
// const coffeeType = document.querySelector ('.popup__species');
// const coffeeDescription = document.querySelector ('.popup__description');
// const coffeeAge = document.querySelector ('.popup__pets__age');
// const coffeeInoculations = document.querySelector ('.popup__pets__inoculations');
// const coffeeDiseases = document.querySelector ('.popup__pets__diseases');
// const coffeeParasites = document.querySelector ('.popup__pets__parasites');


// sliderItem.forEach((sliderItem) => {
//     sliderItem.addEventListener('click', function(e) {
//         const petId = this.id;
//         petsName.textContent = `${petsArray[petId - 1].name}`;
//         petsImg.src = `${petsArray[petId - 1].img}`;
//         petsType.textContent = `${petsArray[petId - 1].type} - ${petsArray[petId - 1].breed}`;
//         petsDescription.textContent = `${petsArray[petId - 1].description}`;
//         petsAge.textContent = `${petsArray[petId - 1].age}`;
//         petsInoculations.textContent = `${petsArray[petId - 1].inoculations}`;
//         petsDiseases.textContent = `${petsArray[petId - 1].diseases}`;
//         petsParasites.textContent = `${petsArray[petId - 1].parasites}`;
//     });
// });