// AutoPremium - Кредитный калькулятор

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('loanAmount')) {
    initLoanCalculator();
  }
});

function initLoanCalculator() {
  const loanAmountInput = document.getElementById('loanAmount');
  const downPaymentInput = document.getElementById('downPayment');
  const loanTermSelect = document.getElementById('loanTerm');
  
  // Установить начальные значения
  if (loanAmountInput && !loanAmountInput.value) {
    loanAmountInput.value = '3000000';
  }
  if (downPaymentInput && !downPaymentInput.value) {
    downPaymentInput.value = '600000';
  }
  
  // Добавить обработчики событий
  if (loanAmountInput) {
    loanAmountInput.addEventListener('input', calculateLoan);
  }
  if (downPaymentInput) {
    downPaymentInput.addEventListener('input', calculateLoan);
  }
  if (loanTermSelect) {
    loanTermSelect.addEventListener('change', calculateLoan);
  }
  
  // Начальный расчет
  calculateLoan();
}

function calculateLoan() {
  const loanAmountInput = document.getElementById('loanAmount');
  const downPaymentInput = document.getElementById('downPayment');
  const loanTermSelect = document.getElementById('loanTerm');
  
  if (!loanAmountInput || !downPaymentInput || !loanTermSelect) return;
  
  const loanAmount = parseFloat(loanAmountInput.value) || 0;
  const downPayment = parseFloat(downPaymentInput.value) || 0;
  const loanTermMonths = parseInt(loanTermSelect.value) || 12;
  
  // Проверка корректности данных
  if (downPayment >= loanAmount) {
    showCalculationError('Первоначальный взнос не может быть больше или равен стоимости автомобиля');
    return;
  }
  
  if (loanAmount <= 0) {
    showCalculationError('Укажите корректную стоимость автомобиля');
    return;
  }
  
  const principal = loanAmount - downPayment;
  const annualRate = 0.099; // 9.9% годовых
  const monthlyRate = annualRate / 12;
  
  // Формула аннуитетного платежа
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
    (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  
  const totalAmount = monthlyPayment * loanTermMonths + downPayment;
  const totalInterest = totalAmount - loanAmount;
  
  // Обновить результаты
  updateCalculationResults(monthlyPayment, totalAmount, totalInterest);
}

function updateCalculationResults(monthlyPayment, totalAmount, totalInterest) {
  const monthlyPaymentEl = document.getElementById('monthlyPayment');
  const totalAmountEl = document.getElementById('totalAmount');
  const totalInterestEl = document.getElementById('totalInterest');
  
  if (monthlyPaymentEl) {
    monthlyPaymentEl.textContent = formatPrice(Math.round(monthlyPayment));
  }
  if (totalAmountEl) {
    totalAmountEl.textContent = formatPrice(Math.round(totalAmount));
  }
  if (totalInterestEl) {
    totalInterestEl.textContent = formatPrice(Math.round(totalInterest));
  }
  
  // Скрыть сообщение об ошибке
  const errorMessage = document.getElementById('calculationError');
  if (errorMessage) {
    errorMessage.style.display = 'none';
  }
}

function showCalculationError(message) {
  let errorMessage = document.getElementById('calculationError');
  
  if (!errorMessage) {
    const resultsContainer = document.querySelector('.calculator-result');
    if (resultsContainer) {
      errorMessage = document.createElement('div');
      errorMessage.id = 'calculationError';
      errorMessage.style.gridColumn = '1 / -1';
      errorMessage.style.padding = '16px';
      errorMessage.style.background = '#fee2e2';
      errorMessage.style.color = '#dc2626';
      errorMessage.style.borderRadius = '8px';
      errorMessage.style.textAlign = 'center';
      resultsContainer.prepend(errorMessage);
    }
  }
  
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
}

// Обработка формы заявки на кредит
document.addEventListener('DOMContentLoaded', function() {
  const creditApplicationForm = document.getElementById('creditApplicationForm');
  if (creditApplicationForm) {
    creditApplicationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const loanAmount = document.getElementById('loanAmount').value;
      const downPayment = document.getElementById('downPayment').value;
      const loanTerm = document.getElementById('loanTerm').value;
      
      console.log('Заявка на кредит:', {
        loanAmount,
        downPayment,
        loanTerm
      });
      
      showToast('Заявка на кредит отправлена!', 
        'Наш менеджер свяжется с вами в ближайшее время');
    });
  }
});
