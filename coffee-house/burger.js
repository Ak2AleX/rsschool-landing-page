const menuButton = document.querySelector('.burger');
const menu = document.querySelector ('.header__navigation');
const menuButtonExit = document.querySelector ('.burger__exit');
const menuLinks = document.querySelectorAll ('.navigation__link');
const body = document.querySelector ('body');

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
    const target = e.target;
    const its_menu = target == menu || menu.contains(target);
    const its_hamburger = target == menuButton;
    const isMenuExit = menuButtonExit && (target === menuButtonExit || menuButtonExit.contains(target));
    const menu_is_active = menu.classList.contains('active');
    
    if (!its_menu && !its_hamburger && !isMenuExit && menu_is_active) {
        toggleMenu();
    }
})

const toggleMenu = () => {
    menu.classList.add('menu-animated');
    menuButton.classList.toggle('active');
    menu.classList.toggle ('active');
    if (menuButtonExit) menuButtonExit.classList.toggle('active');
    body.classList.toggle ('active');
}

    const closeMenu = () => {
        // Принудительно отключаем анимацию при резком закрытии (например, при ресайзе)
        menu.classList.remove('menu-animated');
        
        menuButton.classList.remove('active');
        menu.classList.remove('active');
        if (menuButtonExit) menuButtonExit.classList.remove('active');
        body.classList.remove('active');
    };

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
        toggleMenu();
    }
});

const desktopMedia = window.matchMedia('(min-width: 769px)');
    function handleScreenChange(e) {
        if (e.matches && menu.classList.contains('active')) {
            closeMenu();
        }
    }
desktopMedia.addEventListener('change', handleScreenChange);