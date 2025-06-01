const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expenses = amounts.filter(a => a < 0).reduce((acc, val) => acc + val, 0).toFixed(2);

  balanceEl.innerText = `$${total}`;
  incomeEl.innerText = `+$${income}`;
  expensesEl.innerText = `-$${Math.abs(expenses)}`;
}

function renderTransaction(transaction) {
  const li = document.createElement('li');
  li.classList.add(transaction.amount < 0 ? 'expense' : 'income');

  li.innerHTML = `
    ${transaction.text} <span>${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">×</button>
  `;

  transactionList.appendChild(li);
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') return;

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  init();
  text.value = '';
  amount.value = '';
});

function init() {
  transactionList.innerHTML = '';
  transactions.forEach(renderTransaction);
  updateValues();
}

init();
