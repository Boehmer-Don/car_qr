import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

interface ILabel {
    id: number;
    unique_id: string;
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
    active: boolean;
    user_id: number;
    views: number;
}

const $modalElement: HTMLElement = document.querySelector('#labelDetailsModal');
const modalDeactivateLabel: HTMLElement = document.querySelector('#labelDeactivateModal');

const modalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('label details modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    },
};

function getLabelDetails(label: ILabel) {
    const labelName: HTMLInputElement = document.querySelector('#label-edit-name');
    labelName.value = label.name;
    const labelMake: HTMLInputElement = document.querySelector('#label-edit-make');
    labelMake.value = label.make;
    const labelModel: HTMLInputElement = document.querySelector('#label-edit-model');
    labelModel.value = label.vehicle_model;
    console.log(labelModel.value);

    const labelYear: HTMLInputElement = document.querySelector('#label-edit-year');
    labelYear.value = label.year;
    const labelMileage: HTMLInputElement = document.querySelector('#label-edit-mileage');
    labelMileage.value = label.mileage.toString();
    const labelColor: HTMLInputElement = document.querySelector('#label-edit-color');
    labelColor.value = label.color;
    const labelTrim: HTMLInputElement = document.querySelector('#label-edit-trim');
    labelTrim.value = label.trim;
    const labelTypeOfVehicle: HTMLInputElement = document.querySelector('#label-edit-type');
    labelTypeOfVehicle.value = label.type_of_vehicle;
    const labelPrice: HTMLInputElement = document.querySelector('#label-edit-price');
    labelPrice.value = label.price.toString();
    const labelDateReceived: HTMLInputElement = document.querySelector('#label-edit-date-received');
    if (label.date_received) {
        labelDateReceived.value = label.date_received.split('T')[0];
    }
    const labelUrl: HTMLInputElement = document.querySelector('#label-edit-url');
    labelUrl.value = label.url;
    const labelViews: HTMLInputElement = document.querySelector('#label-edit-views');
    labelViews.value = label.views.toString();
    const labelId: HTMLInputElement = document.querySelector('#label-edit-id');
    labelId.value = label.unique_id.toString();
    const labelUserId: HTMLInputElement = document.querySelector('#label-edit-user-id');
    labelUserId.value = label.user_id.toString();
    const labelUniqueId: HTMLInputElement = document.querySelector('#label-edit-unique-id');
    labelUniqueId.value = label.unique_id;
    const nextUrl: HTMLInputElement = document.querySelector('#label-edit-next-url');
    nextUrl.value = window.location.href;
    labelDetailsModalWindow.show();
}

function deactivateLabel(label: ILabel) {
    const labelActive: HTMLInputElement = document.querySelector('#label-deactivate-active');
    console.log("labelActive", labelActive);
    console.log("label.active", label.active);

    labelActive.value = false.toString();
    const labelUniqueId: HTMLInputElement = document.querySelector('#label-deactivate-unique-id');
    labelUniqueId.value = label.unique_id;
    const nextUrl: HTMLInputElement = document.querySelector('#label-deactivate-next-url');
    nextUrl.value = window.location.href;
    labelDeactivateModalWindow.show();
}

const labelDetailsModalWindow: ModalInterface = new Modal($modalElement, modalOptions);
const labelDeactivateModalWindow: ModalInterface = new Modal(modalDeactivateLabel, modalOptions);

const labels = document.querySelectorAll('#label_details_button');
labels.forEach(e =>
    e.addEventListener('click', () => {
        getLabelDetails(JSON.parse(e.getAttribute('data-target')));
    }),
);

const labelDeactivateButtons = document.querySelectorAll('.label-deactivate-button');

labelDeactivateButtons.forEach(e =>
    e.addEventListener('click', () => {
        console.log("deactivate button clicked");

        deactivateLabel(JSON.parse(e.getAttribute('data-target')));
    }),
);

const closeButton = document.querySelector('#modalCloseButton');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        labelDetailsModalWindow.hide();
    });
}

const decreaseQuantityButton = document.querySelector('#decreaseQuantityButton');
const increaseQuantityButton = document.querySelector('#increaseQuantityButton');
const totalSum = document.querySelector('#totalSum');
let quantityInput: HTMLInputElement = document.querySelector('#quantityInput');

if (decreaseQuantityButton && increaseQuantityButton && totalSum && quantityInput) {
    decreaseQuantityButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantity -= 1;
            quantityInput.value = quantity.toString();
        }
        totalSum.innerHTML = "$" + (quantity * 20).toString() + ".00";
    });

    increaseQuantityButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        quantity += 1;
        quantityInput.value = quantity.toString();
        totalSum.innerHTML = "$" + (quantity * 20).toString() + ".00";
    }
    );
}

