// AutoPremium - Каталог и фильтрация

let filteredCars = [...carsData];
let selectedBrands = [];
let selectedCategories = [];

// Инициализация каталога
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('catalogCarsGrid')) {
    initCatalog();
  }
});

// Инициализация каталога
function initCatalog() {
  generateBrandFilters();
  generateCategoryFilters();
  renderCars();
  
  // Поиск
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

// Генерация фильтров брендов
function generateBrandFilters() {
  const brandFiltersContainer = document.getElementById('brandFilters');
  if (!brandFiltersContainer) return;
  
  const brands = [...new Set(carsData.map(car => car.brand))].sort();
  
  brandFiltersContainer.innerHTML = brands.map(brand => {
    const count = carsData.filter(car => car.brand === brand).length;
    return `
      <label>
        <input type="checkbox" value="${brand}" onchange="applyFilters()">
        ${brand} <span class="count">(${count})</span>
      </label>
    `;
  }).join('');
}

// Генерация фильтров категорий
function generateCategoryFilters() {
  const categoryFiltersContainer = document.getElementById('categoryFilters');
  if (!categoryFiltersContainer) return;
  
  const categories = [...new Set(carsData.map(car => car.category))].sort();
  
  categoryFiltersContainer.innerHTML = categories.map(category => {
    const count = carsData.filter(car => car.category === category).length;
    return `
      <label>
        <input type="checkbox" value="${category}" onchange="applyFilters()">
        ${category} <span class="count">(${count})</span>
      </label>
    `;
  }).join('');
}

// Получить выбранные чекбоксы
function getCheckedValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  
  const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checkboxes).map(cb => cb.value);
}

// Применить фильтры
function applyFilters() {
  selectedBrands = getCheckedValues('brandFilters');
  selectedCategories = getCheckedValues('categoryFilters');
  
  const searchInput = document.getElementById('searchInput');
  const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
  
  filteredCars = carsData.filter(car => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(car.category);
    const matchesSearch = !searchQuery || 
      car.name.toLowerCase().includes(searchQuery) || 
      car.brand.toLowerCase().includes(searchQuery) ||
      car.category.toLowerCase().includes(searchQuery);
    
    return matchesBrand && matchesCategory && matchesSearch;
  });
  
  renderCars();
}

// Сброс фильтров
function resetFilters() {
  // Снять все чекбоксы
  document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  
  // Очистить поиск
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  
  selectedBrands = [];
  selectedCategories = [];
  filteredCars = [...carsData];
  
  renderCars();
}

// Отрисовка автомобилей
function renderCars() {
  const grid = document.getElementById('catalogCarsGrid');
  const carsCount = document.getElementById('carsCount');
  const catalogTitle = document.getElementById('catalogTitle');
  
  if (!grid) return;
  
  // Обновить заголовок
  if (catalogTitle) {
    let title = 'Все автомобили';
    if (selectedBrands.length > 0 && selectedCategories.length > 0) {
      title = `${selectedBrands.join(', ')} - ${selectedCategories.join(', ')}`;
    } else if (selectedBrands.length > 0) {
      title = selectedBrands.join(', ');
    } else if (selectedCategories.length > 0) {
      title = selectedCategories.join(', ');
    }
    catalogTitle.textContent = title;
  }
  
  // Обновить количество
  if (carsCount) {
    const word = getCarWord(filteredCars.length);
    carsCount.textContent = `Найдено: ${filteredCars.length} ${word}`;
  }
  
  // Отрисовать карточки
  if (filteredCars.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 18px; color: var(--medium-gray); margin-bottom: 16px;">
          Автомобили не найдены
        </p>
        <p style="font-size: 14px; color: var(--medium-gray);">
          Попробуйте изменить поисковый запрос или выбрать другой бренд/категорию
        </p>
        <button class="btn btn-outline" onclick="resetFilters()" style="margin-top: 20px;">
          Сбросить фильтры
        </button>
      </div>
    `;
  } else {
    grid.innerHTML = filteredCars.map(car => createCarCard(car)).join('');
  }
}

// Склонение слова "автомобиль"
function getCarWord(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'автомобилей';
  }
  
  if (lastDigit === 1) {
    return 'автомобиль';
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'автомобиля';
  }
  
  return 'автомобилей';
}
