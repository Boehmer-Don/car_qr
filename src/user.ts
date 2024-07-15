// const addModal: ModalInterface = new Modal($addUserModalElement, modalOptions);

const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-users',
);
const searchInputButton = document.querySelector('#table-search-user-button');

let searchTimeoutId: NodeJS.Timeout | null = null;

function performSearch() {
  const url = new URL(window.location.href);
  url.searchParams.set('q', searchInput.value);
  window.location.href = url.href;
}

function debounceSearch() {
  if (searchTimeoutId) {
    clearTimeout(searchTimeoutId);
  }
  searchTimeoutId = setTimeout(() => {
    performSearch();
  }, 2000);
}

if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    performSearch();
  });

  searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      performSearch();
    }
  });

  searchInput.addEventListener('input', debounceSearch);
}

const deleteButtons = document.querySelectorAll('.delete-user-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-user-id');
      const response = await fetch(`/user/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200 || response.status == 404) {
        location.reload();
      }
    }
  });
});
