console.log('new_label.ts');

const suggestionContainers: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.suggestion-container');

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    suggestionContainers.forEach(container => {
      container.classList.add('hidden');
    });
  }
});

const makeContainer: HTMLDivElement = document.querySelector('.make-container');
const modelContainer: HTMLDivElement =
  document.querySelector('.model-container');
const trimContainer: HTMLDivElement = document.querySelector('.trim-container');
const typeContainer: HTMLDivElement = document.querySelector('.type-container');

const makeInput: HTMLInputElement = document.querySelector('#make-1');
const modelInput = document.querySelector(
  '#vehicle_model-1',
) as HTMLInputElement;
const trimInput: HTMLInputElement = document.querySelector('#label-1-trim');
const typeInput: HTMLInputElement = document.querySelector('#label-1-type');

const makeWarning: HTMLParagraphElement =
  document.querySelector('.make-warning');
const modelWarning: HTMLParagraphElement =
  document.querySelector('.model-warning');

const makeSuggestionP: HTMLParagraphElement =
  document.querySelector('.make-suggestion');
const modelSuggestionP: HTMLParagraphElement =
  document.querySelector('.model-suggestion');
const trimSuggestionP: HTMLParagraphElement =
  document.querySelector('.trim-suggestion');
const typeSuggestionP: HTMLParagraphElement =
  document.querySelector('.type-suggestion');

function selectMake() {
  const suggestionsGot: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll('.make-suggestion');
  suggestionsGot.forEach(suggestion => {
    suggestion.addEventListener('click', e => {
      makeInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
      makeContainer.classList.add('hidden');
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

      modelWarning.classList.add('hidden');
      modelInput.value = '';

      modelInput.addEventListener('click', e => {
        modelContainer.classList.remove('hidden');
        selectModel();
      });
    });
  });
}

function selectModel() {
  const suggestionsGot: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll('.model-suggestion');
  suggestionsGot.forEach(suggestion => {
    suggestion.addEventListener('click', e => {
      modelInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
      modelContainer.classList.add('hidden');

      let trims: Array<string> = [];
      fetch('/labels/get_trims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelSelected: modelInput.value}),
      })
        .then(response => response.json())
        .then(data => {
          trims.push(...data.trims);
          trimContainer.innerHTML = '';
          trims.forEach(trim => {
            let clonedTrimSuggestionParagraph: HTMLParagraphElement =
              trimSuggestionP.cloneNode(true) as HTMLParagraphElement;
            clonedTrimSuggestionParagraph.innerHTML = trim;
            trimContainer.appendChild(clonedTrimSuggestionParagraph);
          });

          makeInput.value = data.make;
          makeWarning.classList.add('hidden');
          typeInput.value = data.type;

          selectTrim();
        })
        .catch(error => {
          console.error('Error fetching trims by model:', error);
        });

      modelInput.addEventListener('click', e => {
        modelContainer.classList.remove('hidden');
      });
    });
  });
}

function selectTrim() {
  const suggestionsGot: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll('.trim-suggestion');
  suggestionsGot.forEach(suggestion => {
    suggestion.addEventListener('click', e => {
      trimInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
      trimContainer.classList.add('hidden');
    });
  });
}

function selectType() {
  const suggestionsGot: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll('.type-suggestion');
  suggestionsGot.forEach(suggestion => {
    suggestion.addEventListener('click', e => {
      typeInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
      typeContainer.classList.add('hidden');
    });
  });
}

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
        if (data.makes.length === 0) {
          console.log('data.makes.length === 0', data.makes);
          makeInput.classList.add('text-indigo-500');
          makeWarning.classList.remove('hidden');
        } else {
          console.log('data.makes.length != 0', data.makes);
          makeInput.classList.remove('text-indigo-500');
          makeWarning.classList.add('hidden');
          makes.push(...data.makes);
          makeContainer.classList.add('hidden');
          makeContainer.innerHTML = '';
          makes.forEach(make => {
            let clonedMakeSuggestionParagraph: HTMLParagraphElement =
              makeSuggestionP.cloneNode(true) as HTMLParagraphElement;
            clonedMakeSuggestionParagraph.innerHTML = make;
            makeContainer.appendChild(clonedMakeSuggestionParagraph);
          });

          selectMake();
        }
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

trimInput.addEventListener('click', e => {
  trimContainer.classList.toggle('hidden');
});

typeInput.addEventListener('click', e => {
  typeContainer.classList.toggle('hidden');
});

if (modelInput) {
  modelInput.addEventListener('input', e => {
    let models: Array<string> = [];
    fetch('/labels/get_models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({modelTyped: modelInput.value}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.models.length === 0) {
          modelInput.classList.add('text-indigo-500');
          modelWarning.classList.remove('hidden');
        } else {
          modelInput.classList.remove('text-indigo-500');
          modelWarning.classList.add('hidden');
          models.push(...data.models);
          modelContainer.innerHTML = '';
          models.forEach(model => {
            let clonedModelSuggestionParagraph: HTMLParagraphElement =
              modelSuggestionP.cloneNode(true) as HTMLParagraphElement;
            clonedModelSuggestionParagraph.innerHTML = model;
            modelContainer.appendChild(clonedModelSuggestionParagraph);
          });

          selectModel();
        }
      })
      .catch(error => {
        console.error('Error fetching all models:', error);
      });
  });
}

selectMake();
selectModel();
selectTrim();
selectType();

const labelForm: HTMLFormElement = document.querySelector('#label-form');
const codeInput: HTMLInputElement = document.querySelector(
  '#label-1-sticker-number',
);
const codeExistsError: HTMLParagraphElement = document.querySelector(
  '.sticker-code-exists-error',
);
const codeNotPendingError: HTMLParagraphElement = document.querySelector(
  '.sticker-code-not-pending-error',
);
let isError: boolean = false;
if (codeInput) {
  codeInput.addEventListener('input', e => {
    fetch('/labels/check_label_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({codeTyped: codeInput.value}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.pending === false) {
          codeNotPendingError.classList.remove('hidden');
          codeInput.classList.add('text-red-700');
          codeInput.classList.add('border-2');
          codeInput.classList.add('bg-red-100');
          codeInput.classList.add('focus:border-red-700');
          isError = true;
        } else {
          codeNotPendingError.classList.add('hidden');
          codeInput.classList.remove('text-red-700');
          codeInput.classList.remove('border-2');
          codeInput.classList.remove('bg-red-100');
          codeInput.classList.remove('focus:border-red-700');
          isError = false;
        }

        if (data.exists === true) {
          codeNotPendingError.classList.add('hidden');
          codeExistsError.classList.remove('hidden');
          codeInput.classList.add('text-red-700');
          codeInput.classList.add('border-2');
          codeInput.classList.add('bg-red-100');
          codeInput.classList.add('focus:border-red-700');
          isError = true;
        } else {
          codeExistsError.classList.add('hidden');
          codeInput.classList.remove('text-red-700');
          codeInput.classList.remove('border-2');
          codeInput.classList.remove('bg-red-100');
          codeInput.classList.remove('focus:border-red-700');
          isError = false;
        }
      })
      .catch(error => {
        console.error('Error fetching sticker number:', error);
      });
  });
}

labelForm.addEventListener('submit', e => {
  if (isError) {
    e.preventDefault();
  }
});
