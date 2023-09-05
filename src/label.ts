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
  gift: string;
}

const $modalElement: HTMLElement = document.querySelector('#labelDetailsModal');
const modalDeactivateLabel: HTMLElement = document.querySelector(
  '#labelDeactivateModal',
);
const addNewMakeModal: HTMLElement = document.querySelector('#addNewMakeModal');
const addNewModelModal: HTMLElement =
  document.querySelector('#addNewModelModal');
const addNewTrimModal: HTMLElement = document.querySelector('#addNewTrimModal');
const addNewTypeModal: HTMLElement = document.querySelector('#addNewTypeModal');

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
  const labelGift: HTMLInputElement =
    document.querySelector('#label-edit-gift');
  labelGift.value = label.gift;

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

function createNewTrim() {
  const nextUrl: HTMLInputElement =
    document.querySelector('#add-trim-next-url');
  nextUrl.value = window.location.href;
  addNewTrimModalWindow.show();
}

function createNewType() {
  const nextUrl: HTMLInputElement =
    document.querySelector('#add-type-next-url');
  nextUrl.value = window.location.href;
  addNewTypeModalWindow.show();
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
const addNewTrimModalWindow: ModalInterface = new Modal(
  addNewTrimModal,
  modalOptions,
);
const addNewTypeModalWindow: ModalInterface = new Modal(
  addNewTypeModal,
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

const closeMakeModal = document.querySelector('#modalMakeClose');
if (closeMakeModal) {
  closeMakeModal.addEventListener('click', () => {
    addNewMakeModalWindow.hide();
  });
}

const closeModelModal = document.querySelector('#modalModelClose');
if (closeModelModal) {
  closeModelModal.addEventListener('click', () => {
    addNewModelModalWindow.hide();
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
      createMakeModel();
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
    console.log('model selected', modelSelectField.value);
    if (modelSelectField.value === 'add') {
      createMakeModel();
    } else {
      console.log('starting fetch');
      fetch('/labels/get_trims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelSelected: modelSelectField.value}),
      })
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
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

const selectTrim: HTMLSelectElement = document.querySelector('#label-1-trim');
if (selectTrim) {
  selectTrim.addEventListener('change', () => {
    const trimSelected = selectTrim.value;
    if (trimSelected === 'add') {
      createMakeModel();
    }
  });
}

const selectType: HTMLSelectElement = document.querySelector('#label-1-type');
if (selectType) {
  selectType.addEventListener('change', () => {
    const typeSelected = selectType.value;
    if (typeSelected === 'add') {
      createMakeModel();
    }
  });
}

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

const addMakeModelModal: HTMLElement =
  document.querySelector('#addMakeModelModal');

const addMakeModelModalWindow: ModalInterface = new Modal(
  addMakeModelModal,
  modalOptions,
);

function createMakeModel() {
  const nextUrl: HTMLInputElement = document.querySelector(
    '#add-create-model-next-url',
  );
  const labelCode: HTMLInputElement = document.querySelector(
    '#label-1-sticker-number',
  );
  const gift: HTMLInputElement = document.querySelector('#label-1-gift');
  const labelName: HTMLInputElement = document.querySelector('#label-1-name');
  const year: HTMLInputElement = document.querySelector('#label-1-year');
  const mileage: HTMLInputElement = document.querySelector('#label-1-mileage');
  const colour: HTMLInputElement = document.querySelector('#label-1-color');
  const price: HTMLInputElement = document.querySelector('#label-1-price');
  const url: HTMLInputElement = document.querySelector('#label-1-url');
  console.log('labelCode', labelCode.value);
  console.log('gift', gift.value);
  console.log('labelName', labelName.value);
  console.log('year', year.value);
  console.log('mileage', mileage.value);
  console.log('colour', colour.value);
  console.log('price', price.value);
  console.log('url', url.value);
  const labelCodeFormInput: HTMLInputElement = document.querySelector(
    '#add-create-model-code',
  );
  labelCodeFormInput.value = labelCode.value;
  const giftFormInput: HTMLInputElement = document.querySelector(
    '#add-create-model-gift',
  );
  giftFormInput.value = gift.value;
  const labelNameFormInput: HTMLInputElement = document.querySelector(
    '#add-create-model-name',
  );
  labelNameFormInput.value = labelName.value;
  const yearFormInput: HTMLInputElement = document.querySelector(
    '#add-create-model-year',
  );
  yearFormInput.value = year.value;
  const mileageFormInput: HTMLInputElement = document.querySelector(
    '#add-create-model-mileage',
  );
  mileageFormInput.value = mileage.value;
  const colourFormInput: HTMLInputElement = document.querySelector(
    '#add-create-model-color',
  );
  colourFormInput.value = colour.value;
  const priceFormInput: HTMLInputElement = document.querySelector(
    '#add-create-model-price',
  );
  priceFormInput.value = price.value;
  const urlFormInput: HTMLInputElement = document.querySelector(
    '#add-create-model-url',
  );
  urlFormInput.value = url.value;
  nextUrl.value = window.location.href;
  addMakeModelModalWindow.show();
}

const addMakeModel: HTMLButtonElement =
  document.querySelector('#add-make-model');

if (addMakeModel) {
  addMakeModel.addEventListener('click', () => {
    createMakeModel();
  });
}

const closeAddMakeModal = document.querySelector('#modalAddModelClose');
if (closeAddMakeModal) {
  closeAddMakeModal.addEventListener('click', () => {
    addMakeModelModalWindow.hide();
  });
}
