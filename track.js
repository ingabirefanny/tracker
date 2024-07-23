const expenseList = document.getElementById('expense-list');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const addExpenseBtn = document.getElementById('add-expense');
const updateExpenseBtn = document.getElementById('update-expense');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const filterExpensesBtn = document.getElementById('filter-expenses');
const totalExpensesSpan = document.getElementById('total-expenses');

let expenses = [];
let editIndex = null;

function addExpense() {
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (description.trim() === '' || isNaN(amount) || amount <= 0 || date === '') {
    alert('Please enter a valid description, amount, and date.');
    return;
  }

  const expense = {
    description,
    amount,
    date
  };

  if (editIndex !== null) {
    expenses[editIndex] = expense;
    editIndex = null;
  } else {
    expenses.push(expense);
  }

  renderExpenses();
  clearInputs();
  calculateTotalExpenses();
  toggleEditMode(false);
}

function removeExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  calculateTotalExpenses();
}

function editExpense(index) {
  const expense = expenses[index];
  descriptionInput.value = expense.description;
  amountInput.value = expense.amount;
  dateInput.value = expense.date;
  editIndex = index;
  toggleEditMode(true);
}

function renderExpenses() {
  expenseList.innerHTML = '';

  let filteredExpenses = expenses;

  if (startDateInput.value && endDateInput.value) {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  }

  filteredExpenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.classList.add('expense-item');
    li.innerHTML = `
      <span>${expense.description}</span>
      <span>Kshs${expense.amount.toFixed(2)}</span>
      <span>${expense.date}</span>
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="removeExpense(${index})">Remove</button>
    `;
    expenseList.appendChild(li);
  });
}

function clearInputs() {
  descriptionInput.value = '';
  amountInput.value = '';
  dateInput.value = '';
}

function calculateTotalExpenses() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpensesSpan.textContent = `Kshs${total.toFixed(2)}`;
}

function toggleEditMode(isEditing) {
  addExpenseBtn.style.display = isEditing ? 'none' : 'inline-block';
  updateExpenseBtn.style.display = isEditing ? 'inline-block' : 'none';
}

addExpenseBtn.addEventListener('click', addExpense);
updateExpenseBtn.addEventListener('click', addExpense);
filterExpensesBtn.addEventListener('click', renderExpenses);