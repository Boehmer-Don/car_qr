import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

// /*
//  * $editUserModal: required
//  * options: optional
//  */

// // For your js code

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const $modalElement: HTMLElement = document.querySelector('#editUserModal');
const $modalresendInviteElement: HTMLElement = document.querySelector('#resendInviteModal');
const $addUserModalElement: HTMLElement =
  document.querySelector('#add-user-modal');

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

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const resenrInviteModal: ModalInterface = new Modal($modalresendInviteElement, modalOptions);
const addModal: ModalInterface = new Modal($addUserModalElement, modalOptions);

const $buttonElements = document.querySelectorAll('.user-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editUser(JSON.parse(e.getAttribute('data-target')));
  }),
);

const resendInviteButtons = document.querySelectorAll('.resend-invite-button');
resendInviteButtons.forEach(e =>
  e.addEventListener('click', () => {
    const user = JSON.parse(e.getAttribute('data-target'));
    console.log("resendInviteButtons click user: ", user);

    resendInvite(user);
  }),
);

// closing add edit modal
const $buttonClose = document.querySelector('#modalCloseButton');
if ($buttonClose) {
  $buttonClose.addEventListener('click', () => {
    modal.hide();
  });
}

const resendInviteButtonClose = document.querySelector('#resendInviteModalCloseButton');
if ($buttonClose) {
  resendInviteButtonClose.addEventListener('click', () => {
    resenrInviteModal.hide();
  });
}

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-users',
);
const searchInputButton = document.querySelector('#table-search-user-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-user-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-user-id');
      const response = await fetch(`/user/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function editUser(user: IUser) {
  let input: HTMLInputElement = document.querySelector('#user-edit-firstname');
  input.value = user.first_name;
  input = document.querySelector('#user-edit-lastname');
  input.value = user.last_name;
  input = document.querySelector('#user-edit-id');
  input.value = user.id.toString();
  input = document.querySelector('#user-edit-email');
  input.value = user.email;
  input = document.querySelector('#user-edit-password');
  input.value = '*******';
  input = document.querySelector('#user-edit-password_confirmation');
  input.value = '*******';
  input = document.querySelector('#user-edit-next_url');
  input.value = window.location.href;
  modal.show();
}

function resendInvite(user: IUser) {
  let input: HTMLInputElement = document.querySelector('#resend-invite-id');
  console.log("user: ", user);
  console.log('resend-invite-id', input);
  input.value = user.id.toString();
  input = document.querySelector('#resend-invite-email');
  console.log('resend-invite-email', input);
  input.value = user.email;
  input = document.querySelector('#resend-invite-next_url');
  console.log('resend-invite-next_url', input);
  input.value = window.location.href;
  resenrInviteModal.show();
}
