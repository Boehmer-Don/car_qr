console.log('new_label.ts');

const suggestionContainers: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.suggestion-container');

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    console.log('Escape pressed');
    suggestionContainers.forEach(container => {
      container.classList.add('hidden');
    });
  }
});

const makeContainer: HTMLDivElement = document.querySelector('.make-container');
const makeInput: HTMLInputElement = document.querySelector('#make-1');
const makeSuggestionP: HTMLParagraphElement =
  document.querySelector('.make-suggestion');

if (makeInput) {
  makeInput.addEventListener('input', e => {
    makeContainer.classList.remove('hidden');
    let clonedMakeSuggestionParagraph: HTMLParagraphElement =
      makeSuggestionP.cloneNode(true) as HTMLParagraphElement;
    clonedMakeSuggestionParagraph.innerHTML = (
      e.target as HTMLInputElement
    ).value;
    makeContainer.appendChild(clonedMakeSuggestionParagraph);
  });
}
