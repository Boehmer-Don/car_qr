import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

interface LabelLocation {
  id: number;
  name: string;
}

interface ILabel {
  id: number;
  unique_id: string;
  sticker_id: string;
  name: string;
  make: string;
  vehicle_model: string;
  year: string;
  mileage: number;
  color: string;
  trim: string;
  type_of_vehicle: string;
  price: number;
  date_received: string;
  url: string;
  user_id: number;
  views: number;
  gift: string;
  location_object: LabelLocation | null;
}

const $modalElement: HTMLElement = document.querySelector('#labelDetailsModal');


// const addNewMakeModal: HTMLElement = document.querySelector('#addNewMakeModal');
// const addNewModelModal: HTMLElement =
//   document.querySelector('#addNewModelModal');
// const addNewTrimModal: HTMLElement = document.querySelector('#addNewTrimModal');
// const addNewTypeModal: HTMLElement = document.querySelector('#addNewTypeModal');

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => { },
  onShow: () => { },
  onToggle: () => { },
};

function getLabelDetails(label: ILabel) {
  const labelName: HTMLInputElement =
    document.querySelector('#label-edit-name');
  labelName.value = label.name;
  const labelMake: HTMLInputElement =
    document.querySelector('#label-edit-make');
  labelMake.value = label.make;
  const labelModel: HTMLInputElement =
    document.querySelector('#label-edit-model');
  labelModel.value = label.vehicle_model;
  const labelYear: HTMLInputElement =
    document.querySelector('#label-edit-year');
  labelYear.value = label.year;
  const labelMileage: HTMLInputElement = document.querySelector(
    '#label-edit-mileage',
  );
  labelMileage.value = label.mileage.toString();
  const labelColor: HTMLInputElement =
    document.querySelector('#label-edit-color');
  labelColor.value = label.color;
  const labelTrim: HTMLInputElement =
    document.querySelector('#label-edit-trim');
  labelTrim.value = label.trim;
  const labelTypeOfVehicle: HTMLInputElement =
    document.querySelector('#label-edit-type');
  labelTypeOfVehicle.value = label.type_of_vehicle;
  const labelPrice: HTMLInputElement =
    document.querySelector('#label-edit-price');
  labelPrice.value = label.price.toString();
  const labelDateReceived: HTMLInputElement = document.querySelector(
    '#label-edit-date-received',
  );
  if (label.date_received) {
    labelDateReceived.value = label.date_received.split('T')[0];
  }
  const labelUrl: HTMLInputElement = document.querySelector('#label-edit-url');
  labelUrl.value = label.url;
  const selectLabelLocation: HTMLSelectElement = document.querySelector(
    '#label-edit-location',
  );
  const allOptions = Array.from(selectLabelLocation.options);
  if (label.location_object) {
    allOptions.forEach(option => {
      if (option.value === label.location_object?.id.toString()) {
        option.selected = true;
      }
    });
  } else {
    const isEnabledOptions =
      allOptions.filter(option => !option.disabled).length > 1;
    if (!isEnabledOptions) {
      const newOption = document.createElement('option');
      newOption.text = 'Select a location';
      newOption.value = '';
      newOption.selected = true;
      newOption.disabled = true;
      selectLabelLocation.appendChild(newOption);
    }
  }

  const labelViews: HTMLInputElement =
    document.querySelector('#label-edit-views');
  labelViews.value = label.views.toString();
  const labelId: HTMLInputElement = document.querySelector('#label-edit-id');
  labelId.value = label.unique_id.toString();
  const labelUserId: HTMLInputElement = document.querySelector(
    '#label-edit-user-id',
  );
  labelUserId.value = label.user_id.toString();
  const labelUniqueId: HTMLInputElement = document.querySelector(
    '#label-edit-unique-id',
  );
  labelUniqueId.value = label.unique_id;
  const labelStickerIdentifier: HTMLInputElement = document.querySelector(
    '#label-sticker-number',
  );
  labelStickerIdentifier.value = label.sticker_id;
  const labelGift: HTMLInputElement =
    document.querySelector('#label-edit-gift');
  labelGift.value = label.gift;

  const giftPreviewPageUrl: HTMLButtonElement = document.querySelector(
    '#gift-page-preview-button',
  );
  giftPreviewPageUrl.addEventListener('click', () => {
    window.open(`/l/${label.sticker_id}`, '_blank');
  });
  const nextUrl: HTMLInputElement = document.querySelector(
    '#label-edit-next-url',
  );
  nextUrl.value = window.location.href;
  labelDetailsModalWindow.show();
}

const labelDetailsModalWindow: ModalInterface = new Modal(
  $modalElement,
  modalOptions,
);

const labels = document.querySelectorAll('#label_details_button');
labels.forEach(e =>
  e.addEventListener('click', () => {
    getLabelDetails(JSON.parse(e.getAttribute('data-target')));
  }),
);




const closeButton = document.querySelector('#modalCloseButton');
if (closeButton) {
  closeButton.addEventListener('click', () => {
    labelDetailsModalWindow.hide();
  });
}

const decreaseQuantityButton = document.querySelector(
  '#decreaseQuantityButton',
);
const increaseQuantityButton = document.querySelector(
  '#increaseQuantityButton',
);
const totalSum = document.querySelector('#totalSum');
let quantityInput: HTMLInputElement = document.querySelector('#quantityInput');

if (
  decreaseQuantityButton &&
  increaseQuantityButton &&
  totalSum &&
  quantityInput
) {
  decreaseQuantityButton.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity -= 1;
      quantityInput.value = quantity.toString();
    }
    totalSum.innerHTML = '$' + (quantity * 20).toString() + '.00';
  });

  increaseQuantityButton.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    quantity += 1;
    quantityInput.value = quantity.toString();
    totalSum.innerHTML = '$' + (quantity * 20).toString() + '.00';
  });
}

const newLabelDetails = document.querySelectorAll('.new_label_details');
newLabelDetails.forEach(e =>
  e.addEventListener('click', () => {
    const parentDiv = e.parentElement;
    const nextDivToParent = parentDiv.nextElementSibling;
    nextDivToParent.classList.toggle('hidden');
  }),
);

const subTotal = document.querySelector('#sub-total');
const taxes = document.querySelector('#taxes');
const total = document.querySelector('#total');
const quantityStr = document.querySelector('#labels-quantity');
const quantity = quantityStr ? parseInt(quantityStr.innerHTML) : 0;

if (subTotal && taxes && total) {
  subTotal.innerHTML = '$' + (quantity * 20).toString() + '.00';
  const taxes_value = Math.round(quantity * 20 * 0.13 * 100) / 100;
  taxes.innerHTML = '$' + taxes_value.toFixed(2).toString();
  const total_value = Math.round(quantity * 20 * 1.13 * 100) / 100;
  total.innerHTML = '$' + total_value.toFixed(2).toString();
}

const makeSelectFields = document.querySelectorAll(
  '.make',
) as NodeListOf<HTMLSelectElement>;
makeSelectFields.forEach(makeSelectField =>
  makeSelectField.addEventListener('change', () => {
    const makeNumber = makeSelectField.getAttribute('data-model');
    const modelSelect = document.querySelector(
      `#vehicle_model-${makeNumber}`,
    ) as HTMLSelectElement;

    const makeSelected = makeSelectField.value as string;
    if (makeSelected === 'add') {
      // createMakeModel();
    } else {
      let models: Array<string> = [];
      fetch('/labels/get_models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ makeSelected: makeSelected }),
      })
        .then(response => response.json())
        .then(data => {
          models.push(...data.models);
          modelSelect.innerHTML = '';
          let optionElement = document.createElement('option');
          optionElement.value = '';
          optionElement.textContent = 'Select a model';
          modelSelect.appendChild(optionElement);
          models.forEach(option => {
            let optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            modelSelect.appendChild(optionElement);
          });

          optionElement = document.createElement('option');
          optionElement.value = 'add';
          optionElement.textContent = 'Add New Model';
          modelSelect.appendChild(optionElement);
        })
        .catch(error => {
          console.error('Error sending data to Flask:', error);
        });
    }
  }),
);

const modelSelectFields: NodeListOf<HTMLSelectElement> =
  document.querySelectorAll('.model');
modelSelectFields.forEach(modelSelectField =>
  modelSelectField.addEventListener('change', () => {
    if (modelSelectField.value === 'add') {
      // createMakeModel();
    } else {
      fetch('/labels/get_trims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelSelected: modelSelectField.value }),
      })
        .then(response => response.json())
        .then(data => {
          const trimSelect = document.querySelector(
            `#label-${modelSelectField.getAttribute('data-trim')}-trim`,
          ) as HTMLSelectElement;
          trimSelect.innerHTML = '';
          let optionElement = document.createElement('option');
          optionElement.value = '';
          optionElement.textContent = 'Select a trim';
          trimSelect.appendChild(optionElement);
          data.trims.forEach((option: string) => {
            let optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            trimSelect.appendChild(optionElement);
          });

          optionElement = document.createElement('option');
          optionElement.value = 'add';
          optionElement.textContent = 'Add New Trim';
          trimSelect.appendChild(optionElement);
        })
        .catch(error => {
          console.error('Error sending data to Flask:', error);
        });
    }
  }),
);


const labelDeleteButtons: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.label-delete-button');
const deleteHints: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.cart-delete-hint');
labelDeleteButtons.forEach(e =>
  e.addEventListener('mouseover', () => {
    e.parentElement
      .querySelector('.cart-delete-hint')
      .classList.remove('hidden');
  }),
);
labelDeleteButtons.forEach(e =>
  e.addEventListener('mouseleave', () => {
    e.parentElement.querySelector('.cart-delete-hint').classList.add('hidden');
  }),
);

const labelEditButtons: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.label-edit-button');
const editHints: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.cart-edit-hint');
labelEditButtons.forEach(e =>
  e.addEventListener('mouseover', () => {
    e.parentElement.querySelector('.cart-edit-hint').classList.remove('hidden');
  }),
);
labelEditButtons.forEach(e =>
  e.addEventListener('mouseleave', () => {
    e.parentElement.querySelector('.cart-edit-hint').classList.add('hidden');
  }),
);

const selectAllGenericLabelsBtn = document.querySelector(
  '#select-all-generic-labels',
);

if (selectAllGenericLabelsBtn) {
  selectAllGenericLabelsBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i] as HTMLInputElement; // Type casting
      if (checkbox.checked == false) {
        checkbox.checked = true;
        selectAllGenericLabelsBtn.textContent = 'Unselect all';
      } else {
        checkbox.checked = false;
        selectAllGenericLabelsBtn.textContent = 'Select all';
      }
    }
  });
}

const labelsAmountInput = document.querySelector<HTMLInputElement>(
  '#labels-amount-input',
);
let debounceTimeout: NodeJS.Timeout | undefined;

const checkboxes = document.querySelectorAll<HTMLInputElement>(
  'input[type="checkbox"]',
);

labelsAmountInput?.addEventListener('input', () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    const amount = parseInt(labelsAmountInput.value);
    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = index < amount;
    });
  }, 250);
});
