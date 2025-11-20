// AutoPremium - Модальные окна

// Открыть модальное окно тест-драйва
function openTestDriveModal(event, carId) {
  if (event) {
    event.stopPropagation();
  }
  
  const car = carsData.find(c => c.id === carId);
  if (!car) return;
  
  const modal = document.getElementById('testDriveModal');
  const modalCarImage = document.getElementById('modalCarImage');
  const modalCarName = document.getElementById('modalCarName');
  
  if (modalCarImage && modalCarName) {
    modalCarImage.src = car.image;
    modalCarName.textContent = car.name;
  }
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Закрыть модальное окно
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Обработка формы тест-драйва
document.addEventListener('DOMContentLoaded', function() {
  const testDriveForm = document.getElementById('testDriveForm');
  if (testDriveForm) {
    testDriveForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const carName = document.getElementById('modalCarName').textContent;
      const formData = {
        name: document.getElementById('tdName').value,
        phone: document.getElementById('tdPhone').value,
        email: document.getElementById('tdEmail').value,
        date: document.getElementById('tdDate').value,
        comment: document.getElementById('tdComment').value,
        car: carName
      };
      
      console.log('Заявка на тест-драйв:', formData);
      
      showToast('Заявка на тест-драйв отправлена!', 
        `Мы свяжемся с вами в течение 30 минут для записи на ${carName}`);
      
      closeModal('testDriveModal');
      this.reset();
    });
  }
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Закрытие модального окна при нажатии Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
});
