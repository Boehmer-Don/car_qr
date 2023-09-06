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
const modelContainer: HTMLDivElement =
  document.querySelector('.model-container');
const makeInput: HTMLInputElement = document.querySelector('#make-1');
const modelInput = document.querySelector(
  '#vehicle_model-1',
) as HTMLInputElement;
const makeSuggestionP: HTMLParagraphElement =
  document.querySelector('.make-suggestion');
const modelSuggestionP: HTMLParagraphElement =
  document.querySelector('.model-suggestion');

if (makeInput) {
  makeInput.addEventListener('input', e => {
    let makes: Array<string> = [];
    fetch('/labels/get_makes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({makeTyped: (e.target as HTMLInputElement).value}),
    })
      .then(res => res.json())
      .then(data => {
        makes.push(...data.makes);
        makeContainer.classList.remove('hidden');
        makeContainer.innerHTML = '';
        makes.forEach(make => {
          let clonedMakeSuggestionParagraph: HTMLParagraphElement =
            makeSuggestionP.cloneNode(true) as HTMLParagraphElement;
          clonedMakeSuggestionParagraph.innerHTML = make;
          makeContainer.appendChild(clonedMakeSuggestionParagraph);
        });

        // if make is in db: pull all models for make from db
        // pull all trims for pulled models from db
        const suggestionsGot: NodeListOf<HTMLParagraphElement> =
          document.querySelectorAll('.make-suggestion');
        suggestionsGot.forEach(suggestion => {
          suggestion.addEventListener('click', e => {
            console.log(
              'Suggestion clicked',
              (e.target as HTMLParagraphElement).innerHTML,
            );
            makeInput.value = (e.target as HTMLParagraphElement).innerHTML;
            makeContainer.classList.add('hidden');
            console.log('makeInput.value', makeInput.value);
            let models: Array<string> = [];
            fetch('/labels/get_models', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({makeSelected: makeInput.value}),
            })
              .then(response => response.json())
              .then(data => {
                models.push(...data.models);
                modelContainer.innerHTML = '';
                models.forEach(model => {
                  let clonedModelSuggestionParagraph: HTMLParagraphElement =
                    modelSuggestionP.cloneNode(true) as HTMLParagraphElement;
                  clonedModelSuggestionParagraph.innerHTML = model;
                  modelContainer.appendChild(clonedModelSuggestionParagraph);
                });
              })
              .catch(error => {
                console.error('Error fetching models by make:', error);
              });

            // on click reveal model suggestions
            modelInput.addEventListener('click', e => {
              modelContainer.classList.remove('hidden');
            });
          });
        });
      })
      .catch(error => {
        console.error('Error sending makes data to Flask:', error);
      });
  });
}

makeInput.addEventListener('click', e => {
  makeContainer.classList.toggle('hidden');
});

modelInput.addEventListener('click', e => {
  modelContainer.classList.toggle('hidden');
});
