document.addEventListener('DOMContentLoaded', function () {
  const filterMake: HTMLSelectElement = document.querySelector('#filter-make');
  const filterType: HTMLSelectElement =
    document.querySelector('#type_of_vehicle');
  const filterModel: HTMLSelectElement =
    document.querySelector('#filter-model');
  const applyFiltersButton: HTMLButtonElement = document.querySelector(
    '#apply-filters-button',
  );

  filterMake.addEventListener('change', () => {
    let models: Array<string> = ['All'];
    fetch('/report/get_models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({makeSelected: filterMake.value}),
    })
      .then(response => response.json())
      .then(data => {
        models.push(...data.models);
        console.log('Response from Flask server:', models);
        filterModel.innerHTML = '';
        models.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          filterModel.appendChild(optionElement);
        });
        applyFiltersButton.click();
      })
      .catch(error => {
        console.error('Error sending data to Flask:', error);
      });
  });

  filterModel.addEventListener('change', () => {
    applyFiltersButton.click();
  });

  filterType.addEventListener('change', () => {
    applyFiltersButton.click();
  });

  const viewsButton: Element = document.querySelector('#views-button');
  const viewsArrowDown: Element = document.querySelector('#views-arrow-down');
  const viewsArrowUp: Element = document.querySelector('#views-arrow-up');
  const viewsSelectNA: Element = document.querySelector('#views-na');
  const viewsSelectAsc: Element = document.querySelector('#views-asc');
  const viewsSelectDesc: Element = document.querySelector('#views-desc');
  viewsButton.addEventListener('click', () => {
    viewsArrowDown.classList.toggle('hidden');
    viewsArrowUp.classList.toggle('hidden');
    if (viewsSelectNA.hasAttribute('selected')) {
      console.log('NA');

      viewsSelectNA.removeAttribute('selected');
      viewsSelectDesc.setAttribute('selected', 'selected');
    } else if (viewsSelectAsc.hasAttribute('selected')) {
      console.log('Asc');
      viewsSelectAsc.removeAttribute('selected');
      viewsSelectDesc.setAttribute('selected', 'selected');
    } else if (viewsSelectDesc.hasAttribute('selected')) {
      console.log('Desc');
      viewsSelectDesc.removeAttribute('selected');
      viewsSelectAsc.setAttribute('selected', 'selected');
    }
    applyFiltersButton.click();
  });

  const priceButton: Element = document.querySelector('#price-button');
  const priceInputs: Element = document.querySelector('#price-inputs');
  priceButton.addEventListener('click', () => {
    priceInputs.classList.toggle('hidden');
  });
});
