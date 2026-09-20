const active = () => {
    menuButton.classList.toggle('active');
    menu.classList.toggle ('active');
    menuButtonExit.classList.toggle ('active');
}

let menuButton = document.querySelector('.burger');
let menu = document.querySelector ('.header__navigation');
let menuButtonExit = document.querySelector ('.burger__exit');
let menuLinks = document.querySelectorAll ('.navigation__link');

{menuButton.addEventListener("click", function(e) {
    e.stopPropagation();
    active();
});
}

if (menuButton) {menuButtonExit.addEventListener("click", function(e) {
    e.stopPropagation();
    active();
});
}

menuLinks.forEach((menuLink) => {
    if (menuButton) {menuLink.addEventListener("click", function(e) {
        active();
    });
    }
});

document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == menuButton;
    let menu_is_active = menu.classList.contains('active');
    
    if (!its_menu && !its_hamburger && menu_is_active) {
        active();
    }
})