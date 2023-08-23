import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

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
}

const $modalElement: HTMLElement = document.querySelector('#labelDetailsModal');
const modalDeactivateLabel: HTMLElement = document.querySelector(
  '#labelDeactivateModal',
);
const addNewMakeModal: HTMLElement = document.querySelector('#addNewMakeModal');
const addNewModelModal: HTMLElement =
  document.querySelector('#addNewModelModal');

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {},
  onShow: () => {},
  onToggle: () => {},
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

  const nextUrl: HTMLInputElement = document.querySelector(
    '#label-edit-next-url',
  );
  nextUrl.value = window.location.href;
  labelDetailsModalWindow.show();
}

function deactivateLabel(label: ILabel) {
  const labelInfo: HTMLInputElement = document.querySelector(
    '#label-deactivate-info',
  );
  labelInfo.innerHTML = `${label.name} ${label.make} ${label.vehicle_model} ${label.year} - ${label.sticker_id}`;
  const labelUniqueId: HTMLInputElement = document.querySelector(
    '#label-deactivate-unique-id',
  );
  labelUniqueId.value = label.unique_id;
  const nextUrl: HTMLInputElement = document.querySelector(
    '#label-deactivate-next-url',
  );
  nextUrl.value = window.location.href;
  labelDeactivateModalWindow.show();
}

function createNewMake() {
  const nextUrl: HTMLInputElement =
    document.querySelector('#add-make-next-url');
  nextUrl.value = window.location.href;
  addNewMakeModalWindow.show();
}

function createNewModel() {
  const makeSelectedChoiceField: HTMLSelectElement =
    document.querySelector('.make');
  const nextUrl: HTMLInputElement = document.querySelector(
    '#add-model-next-url',
  );
  nextUrl.value = window.location.href;
  const modelMake: HTMLInputElement = document.querySelector('#model_make');
  modelMake.value = makeSelectedChoiceField.value;
  addNewModelModalWindow.show();
}

const labelDetailsModalWindow: ModalInterface = new Modal(
  $modalElement,
  modalOptions,
);
const labelDeactivateModalWindow: ModalInterface = new Modal(
  modalDeactivateLabel,
  modalOptions,
);
const addNewMakeModalWindow: ModalInterface = new Modal(
  addNewMakeModal,
  modalOptions,
);
const addNewModelModalWindow: ModalInterface = new Modal(
  addNewModelModal,
  modalOptions,
);

const labels = document.querySelectorAll('#label_details_button');
labels.forEach(e =>
  e.addEventListener('click', () => {
    getLabelDetails(JSON.parse(e.getAttribute('data-target')));
  }),
);

const labelDeactivateButtons = document.querySelectorAll(
  '.label-deactivate-button',
);

labelDeactivateButtons.forEach(e =>
  e.addEventListener('click', () => {
    deactivateLabel(JSON.parse(e.getAttribute('data-target')));
  }),
);

const closeButton = document.querySelector('#modalCloseButton');
if (closeButton) {
  closeButton.addEventListener('click', () => {
    labelDetailsModalWindow.hide();
  });
}

const closeDeactivate = document.querySelector('#modalCloseDeactivate');
if (closeDeactivate) {
  closeDeactivate.addEventListener('click', () => {
    labelDeactivateModalWindow.hide();
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

const makeSelectMakeFields = document.querySelectorAll(
  '.make',
) as NodeListOf<HTMLSelectElement>;
let makeSelected: string;
makeSelectMakeFields.forEach(makeSelectMakeField =>
  makeSelectMakeField.addEventListener('change', () => {
    const makeNumber = makeSelectMakeField.getAttribute('data-model');
    const makeId = makeSelectMakeField.getAttribute('id');
    const modelSelect = document.querySelector(
      `#vehicle_model-${makeNumber}`,
    ) as HTMLSelectElement;

    const makeSelected = makeSelectMakeField.value as string;
    if (makeSelected === 'add') {
      createNewMake();
    } else {
      let models: Array<string> = [];
      fetch('/labels/get_models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({makeSelected: makeSelected}),
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
    console.log('modelSelectField.value', modelSelectField.value);
    if (modelSelectField.value === 'add') {
      createNewModel();
    }
  }),
);

const decreaseStickersButton: HTMLButtonElement = document.querySelector(
  '#decreaseStickersButton',
);
const increaseStickersButton: HTMLButtonElement = document.querySelector(
  '#increaseStickersButton',
);
const stickersQuantityInput: HTMLInputElement = document.querySelector(
  '#stickersQuantityInput',
);

if (decreaseStickersButton && increaseStickersButton) {
  decreaseStickersButton.addEventListener('click', () => {
    let quantity = parseInt(stickersQuantityInput.value);
    if (quantity > 1) {
      quantity -= 1;
      stickersQuantityInput.value = quantity.toString();
    }
  });
  increaseStickersButton.addEventListener('click', () => {
    let quantity = parseInt(stickersQuantityInput.value);
    quantity += 1;
    stickersQuantityInput.value = quantity.toString();
  });
}
