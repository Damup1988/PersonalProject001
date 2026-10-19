function calculate(a, b, operation) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('Enter two valid numbers.');
  if ((operation === '/' || operation === '%') && b === 0) throw new Error('Cannot divide by zero.');
  const operations = {'+': () => a + b, '-': () => a - b, '*': () => a * b, '/': () => a / b, '%': () => a % b, '**': () => a ** b};
  if (!operations[operation]) throw new Error('Select a valid operation.');
  const result = operations[operation]();
  if (!Number.isFinite(result)) throw new Error('The result is outside the supported number range.');
  return result;
}
if (typeof module !== 'undefined') module.exports = calculate;
if (typeof document !== 'undefined') {
  const form = document.querySelector('form');
  const result = document.querySelector('#result');
  form.addEventListener('submit', event => {
    event.preventDefault();
    try {
      const value = calculate(Number(form.elements.first.value), Number(form.elements.second.value), form.elements.operation.value);
      result.textContent = String(Number(value.toPrecision(12)));
      result.dataset.error = 'false';
    } catch (error) {
      result.textContent = error.message;
      result.dataset.error = 'true';
    }
  });
  form.addEventListener('reset', () => {
    result.textContent = '—';
    result.dataset.error = 'false';
    form.elements.first.focus();
  });
}
