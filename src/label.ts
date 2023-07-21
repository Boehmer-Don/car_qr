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
}

const $modalElement: HTMLElement = document.querySelector('#labelDetailsModal');

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
        console.log('user id: ');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    },
};

function getLabelDetails(label: ILabel) {
    console.log('label: ', label);

    const labelName: HTMLInputElement = document.querySelector('#label-edit-name');
    labelName.value = label.name;
    const labelMake: HTMLInputElement = document.querySelector('#label-edit-make');
    labelMake.value = label.make;
    const labelModel: HTMLInputElement = document.querySelector('#label-edit-model');
    labelModel.value = label.vehicle_model;
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
    labelDateReceived.value = label.date_received;
    const labelUrl: HTMLInputElement = document.querySelector('#label-edit-url');
    labelUrl.value = label.url;
    const labelActive: HTMLInputElement = document.querySelector('#label-edit-active');
    labelActive.checked = label.active;
    const labelId: HTMLInputElement = document.querySelector('#label-edit-id');
    labelId.value = label.id.toString();
    const labelUserId: HTMLInputElement = document.querySelector('#label-edit-user-id');
    labelUserId.value = label.user_id.toString();
    // const labelUniqueId: HTMLInputElement = document.querySelector('#label-edit-unique-id');
    // labelUniqueId.value = label.unique_id;

    const nextUrl: HTMLInputElement = document.querySelector('#label-edit-next-url');
    nextUrl.value = window.location.href;
    labelDetailsModalWindow.show();
}

const labelDetailsModalWindow: ModalInterface = new Modal($modalElement, modalOptions);

const labels = document.querySelectorAll('#label_details_button');
labels.forEach(e =>
    e.addEventListener('click', () => {
        console.log('label details button clicked');

        getLabelDetails(JSON.parse(e.getAttribute('data-target')));
    }),
);

const closeButton = document.querySelector('#modalCloseButton');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        console.log('close button clicked');

        labelDetailsModalWindow.hide();
    });
}
