const userSearchResults: HTMLDivElement = document.querySelector(
    '#users-result'
);
const usersSearchSuggestions: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(
    '.users-search-suggestion'
);

if (userSearchResults.classList.contains('hidden')) {
    userSearchResults.classList.remove('hidden');
}
usersSearchSuggestions.forEach(e =>
    e.addEventListener('click', () => {
        const userSearchInput: HTMLInputElement = document.querySelector(
            '#table-search-users-input',
        );
        userSearchInput.value = e.innerHTML.trim();
        userSearchResults.classList.add('hidden');
    }),
);

