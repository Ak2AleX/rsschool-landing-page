let menuButton = document.querySelector('.burger');
let menu = document.querySelector ('.header__navigation');
let menuButtonExit = document.querySelector ('.burger__exit');
let menuLinks = document.querySelectorAll ('.navigation__link');
let body = document.querySelector ('body');

{menuButton.addEventListener("click", function(e) {
    e.stopPropagation();
    toggleMenu();
});
}

if (menuButton) {menuButtonExit.addEventListener("click", function(e) {
    e.stopPropagation();
    toggleMenu();
});
}

menuLinks.forEach((menuLink) => {
    if (menuButton) {menuLink.addEventListener("click", function(e) {
        toggleMenu();
    });
    }
});

document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == menuButton;
    const isMenuExit = menuButtonExit && (target === menuButtonExit || menuButtonExit.contains(target));
    let menu_is_active = menu.classList.contains('active');
    
    if (!its_menu && !its_hamburger && !isMenuExit && menu_is_active) {
        toggleMenu();
    }
})

const toggleMenu = () => {
    menuButton.classList.toggle('active');
    menu.classList.toggle ('active');
    if (menuButtonExit) menuButtonExit.classList.toggle('active');
    body.classList.toggle ('active');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
        toggleMenu();
    }
});