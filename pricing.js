// Function to fetch exchange rate from API
async function fetchExchangeRate(baseCurrency, targetCurrency) {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
  const data = await response.json();
  return data.rates[targetCurrency];
}

// Function to convert USD to INR
async function usdToInr(amount) {
  const exchangeRate = await fetchExchangeRate('USD', 'INR');
  return amount * exchangeRate;
}

// Function to convert INR to USD
async function inrToUsd(amount) {
  const exchangeRate = await fetchExchangeRate('INR', 'USD');
  return amount * exchangeRate;
}

// Event listener for converting USD to INR
document.getElementById("convertToInr").addEventListener("click", async function() {
  const usdAmount = parseFloat(prompt("Enter amount in USD"));
  if (!isNaN(usdAmount)) {
    const inrAmount = await usdToInr(usdAmount);
    alert(`${usdAmount} USD is approximately ${inrAmount.toFixed(2)} INR`);
  } else {
    alert("Invalid input. Please enter a valid number.");
  }
});

// Event listener for converting INR to USD
document.getElementById("convertToUsd").addEventListener("click", async function() {
  const inrAmount = parseFloat(prompt("Enter amount in INR"));
  if (!isNaN(inrAmount)) {
    const usdAmount = await inrToUsd(inrAmount);
    alert(`${inrAmount} INR is approximately ${usdAmount.toFixed(2)} USD`);
  } else {
    alert("Invalid input. Please enter a valid number.");
  }
});
