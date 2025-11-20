// AutoPremium - Основной JavaScript

// Переключение мобильного меню
function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('mobile-open');
}

// Открытие модального окна обратного звонка
function openCallbackModal() {
  showToast('Функция обратного звонка', 'Скоро будет доступна!');
}

// Форматирование цены
function formatPrice(price) {
  return price.toLocaleString('kg-kg') + ' C';
}

// Вычисление ежемесячного платежа (примерный расчет)
function calculateMonthlyPayment(price) {
  // Предположим: 20% первоначальный взнос, 5 лет, 9.9% годовых
  const downPayment = price * 0.2;
  const loanAmount = price - downPayment;
  const monthlyRate = 0.099 / 12;
  const numPayments = 60; // 5 лет
  
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  return Math.round(monthlyPayment);
}

// Создание HTML карточки автомобиля
function createCarCard(car) {
  const discount = car.originalPrice 
    ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)
    : 0;
  
  const monthlyPayment = calculateMonthlyPayment(car.price);

  return `
    <div class="car-card" onclick="openCarDetail(${car.id})">
      <div class="car-image">
        <img src="${car.image}" alt="${car.name}" loading="lazy">
        <div class="badges">
          <span class="badge badge-year">${car.year}</span>
          ${discount > 0 ? `<span class="badge badge-discount">-${discount}%</span>` : ''}
          <span class="badge badge-status ${car.available ? '' : 'unavailable'}">
            ${car.available ? 'В наличии' : 'Под заказ'}
          </span>
        </div>
      </div>
      <div class="car-info">
        <h3 class="car-name">${car.name}</h3>
        <p class="car-brand">${car.brand}</p>
        
        <div class="car-specs">
          <div class="spec">
            <i class="fas fa-tachometer-alt"></i>
            <span>${car.mileage.toLocaleString('kg-kg')} км</span>
          </div>
          <div class="spec">
            <i class="fas fa-cog"></i>
            <span>${car.transmission}</span>
          </div>
          <div class="spec">
            <i class="fas fa-gas-pump"></i>
            <span>${car.fuelType}</span>
          </div>
          <div class="spec">
            <i class="fas fa-engine"></i>
            <span>${car.engine}</span>
          </div>
        </div>
        
        <div class="car-price">
          <span class="current-price">${formatPrice(car.price)}</span>
          ${car.originalPrice ? `<span class="old-price">${formatPrice(car.originalPrice)}</span>` : ''}
        </div>
        <p class="monthly-payment">от ${formatPrice(monthlyPayment)} в месяц</p>
        
        <button class="btn btn-primary" onclick="openTestDriveModal(event, ${car.id})">
          Записаться на тест-драйв
        </button>
      </div>
    </div>
  `;
}

// Открыть детальную страницу автомобиля
function openCarDetail(carId) {
  localStorage.setItem('selectedCarId', carId);
  window.location.href = 'car-detail.html';
}

// Показать уведомление (toast)
function showToast(title, message) {
  // Удалить предыдущее уведомление, если есть
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <strong>${title}</strong>
    <p>${message}</p>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Обработка формы подписки на рассылку
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      console.log('Подписка на рассылку:', email);
      showToast('Подписка оформлена!', 'Спасибо за подписку на нашу рассылку');
      this.reset();
    });
  }

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// Закрытие мобильного меню при клике вне его
document.addEventListener('click', function(e) {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.burger-menu');
  
  if (nav && burger && nav.classList.contains('mobile-open')) {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('mobile-open');
    }
  }
});
