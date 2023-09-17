/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/new_label.ts ***!
  \**************************/
console.log('new_label.ts');
var suggestionContainers = document.querySelectorAll('.suggestion-container');
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        suggestionContainers.forEach(function (container) {
            container.classList.add('hidden');
        });
    }
});
// const makeContainer: HTMLDivElement = document.querySelector('.make-container');
// const modelContainer: HTMLDivElement =
//   document.querySelector('.model-container');
// const trimContainer: HTMLDivElement = document.querySelector('.trim-container');
// const typeContainer: HTMLDivElement = document.querySelector('.type-container');
// const makeInput: HTMLInputElement = document.querySelector('#make-1');
// const modelInput = document.querySelector(
//   '#vehicle_model-1',
// ) as HTMLInputElement;
// const trimInput: HTMLInputElement = document.querySelector('#label-1-trim');
// const typeInput: HTMLInputElement = document.querySelector('#label-1-type');
// const makeWarning: HTMLParagraphElement =
//   document.querySelector('.make-warning');
// const modelWarning: HTMLParagraphElement =
//   document.querySelector('.model-warning');
// const makeSuggestionP: HTMLParagraphElement =
//   document.querySelector('.make-suggestion');
// const modelSuggestionP: HTMLParagraphElement =
//   document.querySelector('.model-suggestion');
// const trimSuggestionP: HTMLParagraphElement =
//   document.querySelector('.trim-suggestion');
// const typeSuggestionP: HTMLParagraphElement =
//   document.querySelector('.type-suggestion');
// function selectMake() {
//   const suggestionsGot: NodeListOf<HTMLParagraphElement> =
//     document.querySelectorAll('.make-suggestion');
//   suggestionsGot.forEach(suggestion => {
//     suggestion.addEventListener('click', e => {
//       makeInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
//       makeContainer.classList.add('hidden');
//       let models: Array<string> = [];
//       fetch('/labels/get_models', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({makeSelected: makeInput.value}),
//       })
//         .then(response => response.json())
//         .then(data => {
//           models.push(...data.models);
//           modelContainer.innerHTML = '';
//           models.forEach(model => {
//             let clonedModelSuggestionParagraph: HTMLParagraphElement =
//               modelSuggestionP.cloneNode(true) as HTMLParagraphElement;
//             clonedModelSuggestionParagraph.innerHTML = model;
//             modelContainer.appendChild(clonedModelSuggestionParagraph);
//           });
//         })
//         .catch(error => {
//           console.error('Error fetching models by make:', error);
//         });
//       modelWarning.classList.add('hidden');
//       modelInput.value = '';
//       modelInput.addEventListener('click', e => {
//         modelContainer.classList.remove('hidden');
//         selectModel();
//       });
//     });
//   });
// }
// function selectModel() {
//   const suggestionsGot: NodeListOf<HTMLParagraphElement> =
//     document.querySelectorAll('.model-suggestion');
//   suggestionsGot.forEach(suggestion => {
//     suggestion.addEventListener('click', e => {
//       modelInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
//       modelContainer.classList.add('hidden');
//       let trims: Array<string> = [];
//       fetch('/labels/get_trims', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({modelSelected: modelInput.value}),
//       })
//         .then(response => response.json())
//         .then(data => {
//           trims.push(...data.trims);
//           trimContainer.innerHTML = '';
//           trims.forEach(trim => {
//             let clonedTrimSuggestionParagraph: HTMLParagraphElement =
//               trimSuggestionP.cloneNode(true) as HTMLParagraphElement;
//             clonedTrimSuggestionParagraph.innerHTML = trim;
//             trimContainer.appendChild(clonedTrimSuggestionParagraph);
//           });
//           makeInput.value = data.make;
//           makeWarning.classList.add('hidden');
//           typeInput.value = data.type;
//           selectTrim();
//         })
//         .catch(error => {
//           console.error('Error fetching trims by model:', error);
//         });
//       modelInput.addEventListener('click', e => {
//         modelContainer.classList.remove('hidden');
//       });
//     });
//   });
// }
// function selectTrim() {
//   const suggestionsGot: NodeListOf<HTMLParagraphElement> =
//     document.querySelectorAll('.trim-suggestion');
//   suggestionsGot.forEach(suggestion => {
//     suggestion.addEventListener('click', e => {
//       trimInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
//       trimContainer.classList.add('hidden');
//     });
//   });
// }
// function selectType() {
//   const suggestionsGot: NodeListOf<HTMLParagraphElement> =
//     document.querySelectorAll('.type-suggestion');
//   suggestionsGot.forEach(suggestion => {
//     suggestion.addEventListener('click', e => {
//       typeInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
//       typeContainer.classList.add('hidden');
//     });
//   });
// }
// if (makeInput) {
//   makeInput.addEventListener('input', e => {
//     let makes: Array<string> = [];
//     fetch('/labels/get_makes', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({makeTyped: (e.target as HTMLInputElement).value}),
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.makes.length === 0) {
//           console.log('data.makes.length === 0', data.makes);
//           makeInput.classList.add('text-indigo-500');
//           makeWarning.classList.remove('hidden');
//         } else {
//           console.log('data.makes.length != 0', data.makes);
//           makeInput.classList.remove('text-indigo-500');
//           makeWarning.classList.add('hidden');
//           makes.push(...data.makes);
//           makeContainer.innerHTML = '';
//           makes.forEach(make => {
//             let clonedMakeSuggestionParagraph: HTMLParagraphElement =
//               makeSuggestionP.cloneNode(true) as HTMLParagraphElement;
//             clonedMakeSuggestionParagraph.innerHTML = make;
//             makeContainer.appendChild(clonedMakeSuggestionParagraph);
//           });
//           selectMake();
//         }
//       })
//       .catch(error => {
//         console.error('Error sending makes data to Flask:', error);
//       });
//   });
// }
// makeInput.addEventListener('click', e => {
//   makeContainer.classList.toggle('hidden');
// });
// modelInput.addEventListener('click', e => {
//   modelContainer.classList.toggle('hidden');
// });
// trimInput.addEventListener('click', e => {
//   trimContainer.classList.toggle('hidden');
// });
// typeInput.addEventListener('click', e => {
//   typeContainer.classList.toggle('hidden');
// });
// if (modelInput) {
//   modelInput.addEventListener('input', e => {
//     let models: Array<string> = [];
//     fetch('/labels/get_models', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({modelTyped: modelInput.value}),
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.models.length === 0) {
//           modelInput.classList.add('text-indigo-500');
//           modelWarning.classList.remove('hidden');
//         } else {
//           modelInput.classList.remove('text-indigo-500');
//           modelWarning.classList.add('hidden');
//           models.push(...data.models);
//           modelContainer.innerHTML = '';
//           models.forEach(model => {
//             let clonedModelSuggestionParagraph: HTMLParagraphElement =
//               modelSuggestionP.cloneNode(true) as HTMLParagraphElement;
//             clonedModelSuggestionParagraph.innerHTML = model;
//             modelContainer.appendChild(clonedModelSuggestionParagraph);
//           });
//           selectModel();
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching all models:', error);
//       });
//   });
// }
// selectMake();
// selectModel();
// selectTrim();
// selectType();
// const labelForm: HTMLFormElement = document.querySelector('#label-form');
// const codeInput: HTMLInputElement = document.querySelector(
//   '#label-1-sticker-number',
// );
// const codeExistsError: HTMLParagraphElement = document.querySelector(
//   '.sticker-code-exists-error',
// );
// const codeNotPendingError: HTMLParagraphElement = document.querySelector(
//   '.sticker-code-not-pending-error',
// );
// let isError: boolean = false;
// if (codeInput) {
//   codeInput.addEventListener('input', e => {
//     fetch('/labels/check_label_code', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({codeTyped: codeInput.value}),
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.pending === false) {
//           codeNotPendingError.classList.remove('hidden');
//           codeInput.classList.add('text-red-700');
//           codeInput.classList.add('border-2');
//           codeInput.classList.add('bg-red-100');
//           codeInput.classList.add('focus:border-red-700');
//           isError = true;
//         } else {
//           codeNotPendingError.classList.add('hidden');
//           codeInput.classList.remove('text-red-700');
//           codeInput.classList.remove('border-2');
//           codeInput.classList.remove('bg-red-100');
//           codeInput.classList.remove('focus:border-red-700');
//           isError = false;
//         }
//         if (data.exists === true) {
//           codeNotPendingError.classList.add('hidden');
//           codeExistsError.classList.remove('hidden');
//           codeInput.classList.add('text-red-700');
//           codeInput.classList.add('border-2');
//           codeInput.classList.add('bg-red-100');
//           codeInput.classList.add('focus:border-red-700');
//           isError = true;
//         } else {
//           codeExistsError.classList.add('hidden');
//           codeInput.classList.remove('text-red-700');
//           codeInput.classList.remove('border-2');
//           codeInput.classList.remove('bg-red-100');
//           codeInput.classList.remove('focus:border-red-700');
//           isError = false;
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching sticker number:', error);
//       });
//   });
// }
// labelForm.addEventListener('submit', e => {
//   if (isError) {
//     e.preventDefault();
//   }
// });

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNaLFdBQVc7QUFDWCwwQkFBMEI7QUFDMUIsa0VBQWtFO0FBQ2xFLFlBQVk7QUFDWixRQUFRO0FBQ1IsSUFBSTtBQUVKLDhDQUE4QztBQUM5QyxtQkFBbUI7QUFDbkIsMEJBQTBCO0FBQzFCLE1BQU07QUFDTixNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL25ld19sYWJlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmxvZygnbmV3X2xhYmVsLnRzJyk7XG5cbmNvbnN0IHN1Z2dlc3Rpb25Db250YWluZXJzOiBOb2RlTGlzdE9mPEhUTUxEaXZFbGVtZW50PiA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWdnZXN0aW9uLWNvbnRhaW5lcicpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XG4gIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICBzdWdnZXN0aW9uQ29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG4vLyBjb25zdCBtYWtlQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWtlLWNvbnRhaW5lcicpO1xuLy8gY29uc3QgbW9kZWxDb250YWluZXI6IEhUTUxEaXZFbGVtZW50ID1cbi8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWNvbnRhaW5lcicpO1xuLy8gY29uc3QgdHJpbUNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHJpbS1jb250YWluZXInKTtcbi8vIGNvbnN0IHR5cGVDb250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR5cGUtY29udGFpbmVyJyk7XG5cbi8vIGNvbnN0IG1ha2VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWtlLTEnKTtcbi8vIGNvbnN0IG1vZGVsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuLy8gICAnI3ZlaGljbGVfbW9kZWwtMScsXG4vLyApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4vLyBjb25zdCB0cmltSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGFiZWwtMS10cmltJyk7XG4vLyBjb25zdCB0eXBlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGFiZWwtMS10eXBlJyk7XG5cbi8vIGNvbnN0IG1ha2VXYXJuaW5nOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4vLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWtlLXdhcm5pbmcnKTtcbi8vIGNvbnN0IG1vZGVsV2FybmluZzogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtd2FybmluZycpO1xuXG4vLyBjb25zdCBtYWtlU3VnZ2VzdGlvblA6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbi8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ha2Utc3VnZ2VzdGlvbicpO1xuLy8gY29uc3QgbW9kZWxTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3VnZ2VzdGlvbicpO1xuLy8gY29uc3QgdHJpbVN1Z2dlc3Rpb25QOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4vLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cmltLXN1Z2dlc3Rpb24nKTtcbi8vIGNvbnN0IHR5cGVTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHlwZS1zdWdnZXN0aW9uJyk7XG5cbi8vIGZ1bmN0aW9uIHNlbGVjdE1ha2UoKSB7XG4vLyAgIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4vLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ha2Utc3VnZ2VzdGlvbicpO1xuLy8gICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuLy8gICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgIG1ha2VJbnB1dC52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MLnRyaW0oKTtcbi8vICAgICAgIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4vLyAgICAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4vLyAgICAgICBmZXRjaCgnL2xhYmVscy9nZXRfbW9kZWxzJywge1xuLy8gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlU2VsZWN0ZWQ6IG1ha2VJbnB1dC52YWx1ZX0pLFxuLy8gICAgICAgfSlcbi8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgICAudGhlbihkYXRhID0+IHtcbi8vICAgICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4vLyAgICAgICAgICAgbW9kZWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4vLyAgICAgICAgICAgbW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xuLy8gICAgICAgICAgICAgbGV0IGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuLy8gICAgICAgICAgICAgICBtb2RlbFN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbi8vICAgICAgICAgICAgIGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSBtb2RlbDtcbi8vICAgICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbW9kZWxzIGJ5IG1ha2U6JywgZXJyb3IpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgbW9kZWxXYXJuaW5nLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuLy8gICAgICAgbW9kZWxJbnB1dC52YWx1ZSA9ICcnO1xuXG4vLyAgICAgICBtb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgICAgICAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuLy8gICAgICAgICBzZWxlY3RNb2RlbCgpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBzZWxlY3RNb2RlbCgpIHtcbi8vICAgY29uc3Qgc3VnZ2VzdGlvbnNHb3Q6IE5vZGVMaXN0T2Y8SFRNTFBhcmFncmFwaEVsZW1lbnQ+ID1cbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kZWwtc3VnZ2VzdGlvbicpO1xuLy8gICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuLy8gICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgIG1vZGVsSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTC50cmltKCk7XG4vLyAgICAgICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblxuLy8gICAgICAgbGV0IHRyaW1zOiBBcnJheTxzdHJpbmc+ID0gW107XG4vLyAgICAgICBmZXRjaCgnL2xhYmVscy9nZXRfdHJpbXMnLCB7XG4vLyAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21vZGVsU2VsZWN0ZWQ6IG1vZGVsSW5wdXQudmFsdWV9KSxcbi8vICAgICAgIH0pXG4vLyAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbi8vICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4vLyAgICAgICAgICAgdHJpbXMucHVzaCguLi5kYXRhLnRyaW1zKTtcbi8vICAgICAgICAgICB0cmltQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuLy8gICAgICAgICAgIHRyaW1zLmZvckVhY2godHJpbSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgY2xvbmVkVHJpbVN1Z2dlc3Rpb25QYXJhZ3JhcGg6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbi8vICAgICAgICAgICAgICAgdHJpbVN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbi8vICAgICAgICAgICAgIGNsb25lZFRyaW1TdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IHRyaW07XG4vLyAgICAgICAgICAgICB0cmltQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZFRyaW1TdWdnZXN0aW9uUGFyYWdyYXBoKTtcbi8vICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICAgIG1ha2VJbnB1dC52YWx1ZSA9IGRhdGEubWFrZTtcbi8vICAgICAgICAgICBtYWtlV2FybmluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbi8vICAgICAgICAgICB0eXBlSW5wdXQudmFsdWUgPSBkYXRhLnR5cGU7XG5cbi8vICAgICAgICAgICBzZWxlY3RUcmltKCk7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdHJpbXMgYnkgbW9kZWw6JywgZXJyb3IpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgbW9kZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuLy8gICAgICAgICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH0pO1xuLy8gICB9KTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gc2VsZWN0VHJpbSgpIHtcbi8vICAgY29uc3Qgc3VnZ2VzdGlvbnNHb3Q6IE5vZGVMaXN0T2Y8SFRNTFBhcmFncmFwaEVsZW1lbnQ+ID1cbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHJpbS1zdWdnZXN0aW9uJyk7XG4vLyAgIHN1Z2dlc3Rpb25zR290LmZvckVhY2goc3VnZ2VzdGlvbiA9PiB7XG4vLyAgICAgc3VnZ2VzdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuLy8gICAgICAgdHJpbUlucHV0LnZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50KS5pbm5lckhUTUwudHJpbSgpO1xuLy8gICAgICAgdHJpbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbi8vICAgICB9KTtcbi8vICAgfSk7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIHNlbGVjdFR5cGUoKSB7XG4vLyAgIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4vLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtc3VnZ2VzdGlvbicpO1xuLy8gICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuLy8gICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgIHR5cGVJbnB1dC52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MLnRyaW0oKTtcbi8vICAgICAgIHR5cGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4vLyAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfVxuXG4vLyBpZiAobWFrZUlucHV0KSB7XG4vLyAgIG1ha2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGUgPT4ge1xuLy8gICAgIGxldCBtYWtlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuLy8gICAgIGZldGNoKCcvbGFiZWxzL2dldF9tYWtlcycsIHtcbi8vICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuLy8gICAgICAgfSxcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlVHlwZWQ6IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZX0pLFxuLy8gICAgIH0pXG4vLyAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbi8vICAgICAgIC50aGVuKGRhdGEgPT4ge1xuLy8gICAgICAgICBpZiAoZGF0YS5tYWtlcy5sZW5ndGggPT09IDApIHtcbi8vICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YS5tYWtlcy5sZW5ndGggPT09IDAnLCBkYXRhLm1ha2VzKTtcbi8vICAgICAgICAgICBtYWtlSW5wdXQuY2xhc3NMaXN0LmFkZCgndGV4dC1pbmRpZ28tNTAwJyk7XG4vLyAgICAgICAgICAgbWFrZVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEubWFrZXMubGVuZ3RoICE9IDAnLCBkYXRhLm1ha2VzKTtcbi8vICAgICAgICAgICBtYWtlSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1pbmRpZ28tNTAwJyk7XG4vLyAgICAgICAgICAgbWFrZVdhcm5pbmcuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4vLyAgICAgICAgICAgbWFrZXMucHVzaCguLi5kYXRhLm1ha2VzKTtcbi8vICAgICAgICAgICBtYWtlQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuLy8gICAgICAgICAgIG1ha2VzLmZvckVhY2gobWFrZSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgY2xvbmVkTWFrZVN1Z2dlc3Rpb25QYXJhZ3JhcGg6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbi8vICAgICAgICAgICAgICAgbWFrZVN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbi8vICAgICAgICAgICAgIGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1ha2U7XG4vLyAgICAgICAgICAgICBtYWtlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoKTtcbi8vICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICAgIHNlbGVjdE1ha2UoKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSlcbi8vICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgbWFrZXMgZGF0YSB0byBGbGFzazonLCBlcnJvcik7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9XG5cbi8vIG1ha2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuLy8gICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuLy8gfSk7XG5cbi8vIG1vZGVsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgbW9kZWxDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4vLyB9KTtcblxuLy8gdHJpbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgIHRyaW1Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4vLyB9KTtcblxuLy8gdHlwZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgIHR5cGVDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4vLyB9KTtcblxuLy8gaWYgKG1vZGVsSW5wdXQpIHtcbi8vICAgbW9kZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGUgPT4ge1xuLy8gICAgIGxldCBtb2RlbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbi8vICAgICBmZXRjaCgnL2xhYmVscy9nZXRfbW9kZWxzJywge1xuLy8gICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICB9LFxuLy8gICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21vZGVsVHlwZWQ6IG1vZGVsSW5wdXQudmFsdWV9KSxcbi8vICAgICB9KVxuLy8gICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAgLnRoZW4oZGF0YSA9PiB7XG4vLyAgICAgICAgIGlmIChkYXRhLm1vZGVscy5sZW5ndGggPT09IDApIHtcbi8vICAgICAgICAgICBtb2RlbElucHV0LmNsYXNzTGlzdC5hZGQoJ3RleHQtaW5kaWdvLTUwMCcpO1xuLy8gICAgICAgICAgIG1vZGVsV2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBtb2RlbElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtaW5kaWdvLTUwMCcpO1xuLy8gICAgICAgICAgIG1vZGVsV2FybmluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbi8vICAgICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4vLyAgICAgICAgICAgbW9kZWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4vLyAgICAgICAgICAgbW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xuLy8gICAgICAgICAgICAgbGV0IGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuLy8gICAgICAgICAgICAgICBtb2RlbFN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbi8vICAgICAgICAgICAgIGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSBtb2RlbDtcbi8vICAgICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4vLyAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgICBzZWxlY3RNb2RlbCgpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KVxuLy8gICAgICAgLmNhdGNoKGVycm9yID0+IHtcbi8vICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYWxsIG1vZGVsczonLCBlcnJvcik7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9XG5cbi8vIHNlbGVjdE1ha2UoKTtcbi8vIHNlbGVjdE1vZGVsKCk7XG4vLyBzZWxlY3RUcmltKCk7XG4vLyBzZWxlY3RUeXBlKCk7XG5cbi8vIGNvbnN0IGxhYmVsRm9ybTogSFRNTEZvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhYmVsLWZvcm0nKTtcbi8vIGNvbnN0IGNvZGVJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4vLyAgICcjbGFiZWwtMS1zdGlja2VyLW51bWJlcicsXG4vLyApO1xuLy8gY29uc3QgY29kZUV4aXN0c0Vycm9yOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4vLyAgICcuc3RpY2tlci1jb2RlLWV4aXN0cy1lcnJvcicsXG4vLyApO1xuLy8gY29uc3QgY29kZU5vdFBlbmRpbmdFcnJvcjogSFRNTFBhcmFncmFwaEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuLy8gICAnLnN0aWNrZXItY29kZS1ub3QtcGVuZGluZy1lcnJvcicsXG4vLyApO1xuLy8gbGV0IGlzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbi8vIGlmIChjb2RlSW5wdXQpIHtcbi8vICAgY29kZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZSA9PiB7XG4vLyAgICAgZmV0Y2goJy9sYWJlbHMvY2hlY2tfbGFiZWxfY29kZScsIHtcbi8vICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuLy8gICAgICAgfSxcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtjb2RlVHlwZWQ6IGNvZGVJbnB1dC52YWx1ZX0pLFxuLy8gICAgIH0pXG4vLyAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgICAudGhlbihkYXRhID0+IHtcbi8vICAgICAgICAgaWYgKGRhdGEucGVuZGluZyA9PT0gZmFsc2UpIHtcbi8vICAgICAgICAgICBjb2RlTm90UGVuZGluZ0Vycm9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuLy8gICAgICAgICAgIGNvZGVJbnB1dC5jbGFzc0xpc3QuYWRkKCd0ZXh0LXJlZC03MDAnKTtcbi8vICAgICAgICAgICBjb2RlSW5wdXQuY2xhc3NMaXN0LmFkZCgnYm9yZGVyLTInKTtcbi8vICAgICAgICAgICBjb2RlSW5wdXQuY2xhc3NMaXN0LmFkZCgnYmctcmVkLTEwMCcpO1xuLy8gICAgICAgICAgIGNvZGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdmb2N1czpib3JkZXItcmVkLTcwMCcpO1xuLy8gICAgICAgICAgIGlzRXJyb3IgPSB0cnVlO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIGNvZGVOb3RQZW5kaW5nRXJyb3IuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4vLyAgICAgICAgICAgY29kZUlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtcmVkLTcwMCcpO1xuLy8gICAgICAgICAgIGNvZGVJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdib3JkZXItMicpO1xuLy8gICAgICAgICAgIGNvZGVJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdiZy1yZWQtMTAwJyk7XG4vLyAgICAgICAgICAgY29kZUlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvY3VzOmJvcmRlci1yZWQtNzAwJyk7XG4vLyAgICAgICAgICAgaXNFcnJvciA9IGZhbHNlO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgaWYgKGRhdGEuZXhpc3RzID09PSB0cnVlKSB7XG4vLyAgICAgICAgICAgY29kZU5vdFBlbmRpbmdFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbi8vICAgICAgICAgICBjb2RlRXhpc3RzRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4vLyAgICAgICAgICAgY29kZUlucHV0LmNsYXNzTGlzdC5hZGQoJ3RleHQtcmVkLTcwMCcpO1xuLy8gICAgICAgICAgIGNvZGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdib3JkZXItMicpO1xuLy8gICAgICAgICAgIGNvZGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdiZy1yZWQtMTAwJyk7XG4vLyAgICAgICAgICAgY29kZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2ZvY3VzOmJvcmRlci1yZWQtNzAwJyk7XG4vLyAgICAgICAgICAgaXNFcnJvciA9IHRydWU7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgY29kZUV4aXN0c0Vycm9yLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuLy8gICAgICAgICAgIGNvZGVJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LXJlZC03MDAnKTtcbi8vICAgICAgICAgICBjb2RlSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnYm9yZGVyLTInKTtcbi8vICAgICAgICAgICBjb2RlSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnYmctcmVkLTEwMCcpO1xuLy8gICAgICAgICAgIGNvZGVJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1czpib3JkZXItcmVkLTcwMCcpO1xuLy8gICAgICAgICAgIGlzRXJyb3IgPSBmYWxzZTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSlcbi8vICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHN0aWNrZXIgbnVtYmVyOicsIGVycm9yKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH1cblxuLy8gbGFiZWxGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4ge1xuLy8gICBpZiAoaXNFcnJvcikge1xuLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgfVxuLy8gfSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=