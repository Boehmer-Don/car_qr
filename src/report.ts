document.addEventListener('DOMContentLoaded', function () {
  const filterMake: HTMLSelectElement = document.querySelector('#filter-make');
  const filterModel: HTMLSelectElement =
    document.querySelector('#filter-model');
  const applyFiltersButton: HTMLButtonElement = document.querySelector(
    '#apply-filters-button',
  );

  filterMake.addEventListener('change', () => {
    let models: Array<string>;
    // applyFiltersButton.click();
    fetch('/report/makefilter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({makeSelected: filterMake.value}),
    })
      .then(response => response.json())
      .then(data => {
        models = data.models;
        console.log('Response from Flask server:', models);
        filterModel.innerHTML = '';
        models.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          filterModel.appendChild(optionElement);
        });
      })
      .catch(error => {
        console.error('Error sending data to Flask:', error);
      });
  });
});
