window.onload = function() {
    autoslide();
    arrowRightClick();
    arrowLeftClick();
    watchclick();
}

const watchclick = () => {
    document.querySelector('body').addEventListener("click", (e) => {
    console.log(e.target);
})}

const control1 = document.querySelector('.control_1');
const control2 = document.querySelector('.control_2');
const control3 = document.querySelector('.control_3');

const favouritesSlider = document.querySelector('.favourites__slider__track');

const arrowLeft = document.querySelector('.favourites__arrows_left');
const arrowRight = document.querySelector('.favourites__arrows_right');

const removeColored = () => {
    control1.classList.remove('control_colored');
    control2.classList.remove('control_colored');
    control3.classList.remove('control_colored');
}

const removePosition = () => {
    favouritesSlider.classList.remove('slider__position1');
    favouritesSlider.classList.remove('slider__position2');
    favouritesSlider.classList.remove('slider__position3');
}

function arrowLeftClick () {
    if (control3.classList.contains('control_colored')) {
        removeColored();
        control2.classList.add('control_colored');
        removePosition();
        favouritesSlider.classList.add('slider__position2');
    }    else if (control2.classList.contains('control_colored')) {
        removeColored();
        control1.classList.add('control_colored');
        removePosition();
        favouritesSlider.classList.add('slider__position1');
    }   else if (control1.classList.contains('control_colored')) {
        removeColored();
        control3.classList.add('control_colored');
        removePosition();
        favouritesSlider.classList.add('slider__position3');
    }
}

function arrowRightClick () {
    clearTimeout (timer);
    if (control1.classList.contains('control_colored')) {
        removeColored();
        control2.classList.add('control_colored');
        removePosition();
        favouritesSlider.classList.add('slider__position2');
    }   else if (control2.classList.contains('control_colored')) {
        removeColored();
        control3.classList.add('control_colored');
        removePosition();
        favouritesSlider.classList.add('slider__position3');
    }  else if (control3.classList.contains('control_colored')) {
        removeColored();
        control1.classList.add('control_colored');
        removePosition();
        favouritesSlider.classList.add('slider__position1');
    }
}

function autoslide () {
    timer = setTimeout(arrowRightClick, 7000);
    loop();
}

function loop () {
    setTimeout(autoslide, 7000);
}

arrowRight.addEventListener("click", arrowRightClick);
arrowLeft.addEventListener("click", arrowLeftClick);