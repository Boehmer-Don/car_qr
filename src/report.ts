document.addEventListener('DOMContentLoaded', function () {
  const filterMake: HTMLSelectElement = document.querySelector('#filter-make');
  const filterStatus: HTMLSelectElement = document.querySelector('#filter-status');
  const filterModel: HTMLSelectElement =
    document.querySelector('#filter-model');
  const filterType: HTMLSelectElement =
    document.querySelector('#type_of_vehicle');
  const filterTrim: HTMLSelectElement = document.querySelector('#trim_filter');
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
      body: JSON.stringify({ makeSelected: filterMake.value }),
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
  filterTrim.addEventListener('change', () => {
    applyFiltersButton.click();
  });


  if (filterStatus) {
    filterStatus.addEventListener('change', () => {
      applyFiltersButton.click();
    });
  } else {
    console.error('Filter status select not found');
  }




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

  const priceSoldButton: Element = document.querySelector('#price-sold-button');
  const priceSoldInputs: Element = document.querySelector('#price-sold-inputs');
  priceSoldButton.addEventListener('click', () => {
    priceSoldInputs.classList.toggle('hidden');
  });

  const downloadButton: HTMLButtonElement =
    document.querySelector('#download-button');
  const downloadTrigger: HTMLInputElement = document.querySelector('#download');
  downloadButton.addEventListener('click', () => {
    downloadTrigger.value = 'true';
    applyFiltersButton.click();
  });

  const excludeList: HTMLInputElement = document.querySelector('#exclude');
  const deleteFromReportButtons = document.querySelectorAll(
    '.delete-from-report',
  );
  deleteFromReportButtons.forEach((deleteFromReport: Element) => {
    deleteFromReport.addEventListener('click', () => {
      if (excludeList.value === 'None') {
        excludeList.value = `${deleteFromReport.getAttribute('data-target')},`;
        applyFiltersButton.click();
        return;
      }
      excludeList.value += `${deleteFromReport.getAttribute('data-target')},`;
      applyFiltersButton.click();
    });
  });
});
