// Retrieve total from localStorage
const totalAmountLabel = document.getElementById('totalAmountLabel');
const total = localStorage.getItem('total');
if (total) {
    totalAmountLabel.textContent = total;
} else {
    totalAmountLabel.textContent = '0.00';
}
