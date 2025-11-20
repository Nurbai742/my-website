// AutoPremium - Детальная страница автомобиля

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('carDetailContainer')) {
    initCarDetail();
  }
});

function initCarDetail() {
  const carId = localStorage.getItem('selectedCarId');
  
  if (!carId) {
    window.location.href = 'catalog.html';
    return;
  }
  
  const car = carsData.find(c => c.id == carId);
  
  if (!car) {
    window.location.href = 'catalog.html';
    return;
  }
  
  renderCarDetail(car);
}

function renderCarDetail(car) {
  const discount = car.originalPrice 
    ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)
    : 0;
  
  const monthlyPayment = calculateMonthlyPayment(car.price);
  
  document.title = `${car.name} - AutoPremium`;
  
  // Галерея изображений
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = car.image;
    mainImage.alt = car.name;
  }
  
  // Миниатюры (используем то же изображение для примера)
  const thumbnailsContainer = document.getElementById('thumbnails');
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = Array(4).fill(0).map((_, i) => `
      <img src="${car.image}" alt="${car.name}" class="thumbnail ${i === 0 ? 'active' : ''}" 
           onclick="changeMainImage('${car.image}', this)">
    `).join('');
  }
  
  // Информация об автомобиле
  document.getElementById('carName').textContent = car.name;
  document.getElementById('carBrand').textContent = car.brand;
  document.getElementById('carCategory').textContent = car.category;
  
  // Бейджи статуса
  const statusBadge = document.getElementById('statusBadge');
  if (statusBadge) {
    statusBadge.textContent = car.available ? 'В наличии' : 'Под заказ';
    statusBadge.className = `badge badge-status ${car.available ? '' : 'unavailable'}`;
  }
  
  // Цена
  document.getElementById('currentPrice').textContent = formatPrice(car.price);
  
  const oldPriceContainer = document.getElementById('oldPriceContainer');
  if (car.originalPrice && oldPriceContainer) {
    oldPriceContainer.innerHTML = `
      <span class="old-price">${formatPrice(car.originalPrice)}</span>
      <span class="badge badge-discount">-${discount}%</span>
    `;
  }
  
  document.getElementById('monthlyPayment').textContent = `от ${formatPrice(monthlyPayment)} в месяц`;
  
  // Характеристики
  document.getElementById('specYear').textContent = car.year;
  document.getElementById('specMileage').textContent = car.mileage.toLocaleString('kg-kg') + ' км';
  document.getElementById('specEngine').textContent = car.engine;
  document.getElementById('specTransmission').textContent = car.transmission;
  document.getElementById('specFuelType').textContent = car.fuelType;
  
  // Комплектация и опции
  const featuresList = document.getElementById('featuresList');
  if (featuresList && car.features) {
    featuresList.innerHTML = car.features.map(feature => `
      <li><i class="fas fa-check"></i> ${feature}</li>
    `).join('');
  }
  
  // Обработчик кнопки тест-драйва
  const testDriveBtn = document.getElementById('testDriveBtn');
  if (testDriveBtn) {
    testDriveBtn.onclick = () => openTestDriveModal(null, car.id);
  }
}

function changeMainImage(imageSrc, thumbnail) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = imageSrc;
  }
  
  // Обновить активную миниатюру
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.classList.remove('active');
  });
  thumbnail.classList.add('active');
}

function goBackToCatalog() {
  window.location.href = 'catalog.html';
}
