export function graphSwitchers() {
  const btnRight: HTMLButtonElement = document.querySelector(
    `#graph-switcher-btn-right`,
  );
  const btnLeft: HTMLButtonElement = document.querySelector(
    `#graph-switcher-btn-left`,
  );

  const inputDatepickerElement: HTMLInputElement = document.querySelector(
    `#date-input-datepicker`,
  );

  const btnGetLabelViews: HTMLButtonElement = document.querySelector(
    `#button-get-label-views`,
  );
  const btnGetLabelLocations: HTMLButtonElement = document.querySelector(
    `#button-get-label-locations`,
  );

  btnLeft.addEventListener('click', () => {
    btnRight.classList.remove('text-blue-700');
    btnLeft.classList.add('text-blue-700');
    btnGetLabelLocations.classList.remove('hidden');
    btnGetLabelViews.classList.add('hidden');
  });
  btnRight.addEventListener('click', () => {
    btnLeft.classList.remove('text-blue-700');
    btnRight.classList.add('text-blue-700');
    btnGetLabelViews.classList.remove('hidden');
    btnGetLabelLocations.classList.add('hidden');
  });
  inputDatepickerElement.addEventListener('click', () => {
    // remove useless buttons Today
    const todayButtons: NodeList = document.querySelectorAll('.today-btn');
    Array.from(todayButtons).forEach(function (element) {
      element.parentElement.classList.add('justify-center');
      element.parentNode.removeChild(element);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  graphSwitchers();
});
