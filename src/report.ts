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

  const viewsOptions: Element = document.querySelector('#views_options');
  viewsOptions.addEventListener('change', () => {
    applyFiltersButton.click();
  });
  // prettier-ignore
  const viewsColumnButton: Element = document.querySelector('#views-column-button');
  // prettier-ignore
  const viewsColumnSelectNA: Element = document.querySelector('#views-na');
  // prettier-ignore
  const viewsColumnSelectAsc: Element = document.querySelector('#views-asc');
  // prettier-ignore
  const viewsColumnSelectDesc: Element = document.querySelector('#views-desc');
  viewsColumnButton.addEventListener('click', () => {
    console.log('has attribute selected`');

    if (viewsColumnSelectAsc.hasAttribute('selected')) {
      viewsColumnSelectAsc.removeAttribute('selected');
      viewsColumnSelectDesc.setAttribute('selected', 'selected');
    } else if (viewsColumnSelectDesc.hasAttribute('selected')) {
      viewsColumnSelectDesc.removeAttribute('selected');
      viewsColumnSelectAsc.setAttribute('selected', 'selected');
    }
    applyFiltersButton.click();
  });

  const priceButton: Element = document.querySelector('#price-button');
  const priceInputs: Element = document.querySelector('#price-inputs');
  priceButton.addEventListener('click', () => {
    priceInputs.classList.toggle('hidden');
  });

  const dateReceivedButton: HTMLInputElement =
    document.querySelector('#date_received');
  dateReceivedButton.addEventListener('input', () => {
    applyFiltersButton.click();
  });

  const downloadButton: HTMLButtonElement =
    document.querySelector('#download-button');
  const downloadTrigger: HTMLInputElement = document.querySelector('#download');
  console.log(downloadTrigger.value);
  downloadButton.addEventListener('click', () => {
    downloadTrigger.value = 'true';
    applyFiltersButton.click();
  });
});
