import { productsData } from './products.js';

// ========================================================
// 2. ИНИЦИАЛИЗАЦИЯ И ПОИСК БАЗОВЫХ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА
// ========================================================
const tabButtons = document.querySelectorAll('.tab');
const menuCoffee = document.querySelector('.menu__container_coffee');
const menuTea = document.querySelector('.menu__container_tea');
const menuDessert = document.querySelector('.menu__container_dessert');
const refreshButton = document.querySelector('.refresh');
const desktopItem = document.querySelectorAll('.menu-item_desktop');
const modal = document.querySelector('.modal');
const coffeeForm = document.querySelector('#coffee-form');

// Глобальные переменные для калькулятора цен
let currentProduct = null;
let basePrice = 0;

const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalImg = modal.querySelector('.modal-preview img');
const modalPrice = modal.querySelector('.price');

// ========================================================
// 3. ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ТАБОВ И КАТЕГОРИЙ МЕНЮ
// ========================================================
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

if (refreshButton) {
    refreshButton.addEventListener("click", () => {
        desktopItem.forEach((item) => {
            item.classList.remove('menu-item_desktop');
            refreshButton.classList.add('hidden');
        });
    });
}

// ========================================================
// 4. ДИНАМИЧЕСКОЕ ЗАПОЛНЕНИЕ КОНТЕНТА МОДАЛКИ ПРИ КЛИКЕ
// ========================================================
function initModalEvents() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            // Вытаскиваем имя продукта из текстового содержимого карточки каталога
            const productName = item.querySelector('.menu__name').textContent.trim();
            
            // Ищем совпадение в импортированном массиве объектов
            currentProduct = productsData.find(p => p.name === productName);
            
            if (!currentProduct) return;

            basePrice = parseFloat(currentProduct.price);

            // Наполняем текстовые узлы описания и названия
            if (modalTitle) modalTitle.textContent = currentProduct.name;
            if (modalDescription) modalDescription.textContent = currentProduct.description;
            
            // Клонируем изображение из карточки каталога в модальное окно
            const imgElement = item.querySelector('.menu__image');
            if (modalImg && imgElement) {
                modalImg.src = imgElement.src;
                modalImg.alt = currentProduct.name;
            }

            // Динамически меняем тексты объемов на радио-кнопках (ml или g)
            const sizeInputs = modal.querySelectorAll('input[name="size"]');
            const sizeKeys = ['s', 'm', 'l'];
            sizeInputs.forEach((input, index) => {
                const key = sizeKeys[index];
                const label = input.closest('.custom-radio');
                if (label && currentProduct.sizes[key]) {
                    // Точечно находим .tab-text и меняем только его
                    const tabTextElement = label.querySelector('.tab-text');
                    if (tabTextElement) {
                        tabTextElement.textContent = currentProduct.sizes[key].size;
                    }
                }
            });

            // Динамически меняем подписи добавок на чекбоксах (Sugar, Cinnamon, Jam и т.д.)
            const additiveInputs = modal.querySelectorAll('input[name="additives"]');
            additiveInputs.forEach((input, index) => {
                const label = input.closest('.custom-checkbox');
                if (label && currentProduct.additives[index]) {
                    // Точечно находим .tab-text и меняем только его
                    const tabTextElement = label.querySelector('.tab-text');
                    if (tabTextElement) {
                        tabTextElement.textContent = currentProduct.additives[index].name;
                    }
                }
            });

            // Возвращаем форму в дефолтное положение (сброс старых галочек)
            if (coffeeForm) coffeeForm.reset();

            // Рассчитываем стартовую цену и открываем окно
            updateTotalPrice();
            modal.showModal();
        });
    });
}

// ========================================================
// 5. ИНТЕГРИРОВАННЫЙ СМАРТ-КАЛЬКУЛЯТОР СТОИМОСТИ (Total)
// ========================================================
function updateTotalPrice() {
    if (!currentProduct) return;

    let total = basePrice;

    // 1. Прибавляем наценку за выбранный размер (Radio)
    const selectedSizeInput = modal.querySelector('input[name="size"]:checked');
    if (selectedSizeInput) {
        const sizeKey = selectedSizeInput.value;
        if (currentProduct.sizes[sizeKey]) {
            total += parseFloat(currentProduct.sizes[sizeKey]['add-price']);
        }
    }

    // 2. Подсчет чекбоксов по их порядковому индексу в форме
    const checkedAdditiveInputs = modal.querySelectorAll('input[name="additives"]:checked');
    checkedAdditiveInputs.forEach((checkbox) => {
        const allAdditiveInputs = Array.from(modal.querySelectorAll('input[name="additives"]'));
        const index = allAdditiveInputs.indexOf(checkbox);
        
        if (index !== -1 && currentProduct.additives[index]) {
            total += parseFloat(currentProduct.additives[index]['add-price']);
        }
    });

    // Выводим результат в тег цены
    if (modalPrice) {
        modalPrice.textContent = `$${total.toFixed(2)}`;
    }
}

// Перехватываем событие 'change' на форме для мгновенного пересчета цены
if (coffeeForm) {
    coffeeForm.addEventListener('change', updateTotalPrice);
}

// ========================================================
// 6. КОРРЕСПОНДЕНТСКОЕ ПЛАВНОЕ ЗАКРЫТИЕ ОКНА (АНИМАЦИИ)
// ========================================================
function closeModalWithAnimation() {
    modal.classList.add('is-closing');
    
    modal.addEventListener('animationend', function handleAnimationEnd(event) {
        if (event.animationName === 'modal-fade-out') {
            modal.close();
            modal.classList.remove('is-closing');
            modal.removeEventListener('animationend', handleAnimationEnd);
        }
    });
}

modal.addEventListener('click', (event) => {
    const isClickInsideContent = event.target.closest('.modal-content');
    const isCloseButtonClick = event.target.classList.contains('btn-close') || event.target.closest('.btn-close');

    if (!isClickInsideContent || isCloseButtonClick) {
        event.preventDefault();
        closeModalWithAnimation();
    }
});

modal.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeModalWithAnimation();
});

// Запускаем инициализацию событий клика сразу при загрузке скрипта
initModalEvents();