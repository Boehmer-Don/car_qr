console.log('new_label.ts');

const makeContainer: HTMLDivElement = document.querySelector('.make-container');
const makeInput: HTMLInputElement = document.querySelector('#make-1');
const makeSuggestionP: HTMLParagraphElement =
  document.querySelector('.make-suggestion');

if (makeInput) {
  makeInput.addEventListener('input', e => {
    console.log('makeInput changed');
    makeContainer.classList.remove('hidden');
    let clonedMakeSuggestionParagraph: HTMLParagraphElement =
      makeSuggestionP.cloneNode(true) as HTMLParagraphElement;
    clonedMakeSuggestionParagraph.innerHTML = (
      e.target as HTMLInputElement
    ).value;
    makeContainer.appendChild(clonedMakeSuggestionParagraph);
  });
}
