/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/new_label.ts ***!
  \**************************/
console.log('new_label.ts');
var suggestionContainers = document.querySelectorAll('.suggestion-container');
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        console.log('Escape pressed');
        suggestionContainers.forEach(function (container) {
            container.classList.add('hidden');
        });
    }
});
var makeContainer = document.querySelector('.make-container');
var modelContainer = document.querySelector('.model-container');
var trimContainer = document.querySelector('.trim-container');
var typeContainer = document.querySelector('.type-container');
var makeInput = document.querySelector('#make-1');
var modelInput = document.querySelector('#vehicle_model-1');
var trimInput = document.querySelector('#label-1-trim');
var typeInput = document.querySelector('#label-1-type');
var makeSuggestionP = document.querySelector('.make-suggestion');
var modelSuggestionP = document.querySelector('.model-suggestion');
var trimSuggestionP = document.querySelector('.trim-suggestion');
var typeSuggestionP = document.querySelector('.type-suggestion');
function selectMake() {
    var suggestionsGot = document.querySelectorAll('.make-suggestion');
    suggestionsGot.forEach(function (suggestion) {
        suggestion.addEventListener('click', function (e) {
            console.log('Make suggestion clicked', e.target.innerHTML);
            makeInput.value = e.target.innerHTML.trim();
            makeContainer.classList.add('hidden');
            console.log('makeInput.value', makeInput.value);
            var models = [];
            fetch('/labels/get_models', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ makeSelected: makeInput.value }),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                models.push.apply(models, data.models);
                modelContainer.innerHTML = '';
                models.forEach(function (model) {
                    var clonedModelSuggestionParagraph = modelSuggestionP.cloneNode(true);
                    clonedModelSuggestionParagraph.innerHTML = model;
                    modelContainer.appendChild(clonedModelSuggestionParagraph);
                });
            })
                .catch(function (error) {
                console.error('Error fetching models by make:', error);
            });
            modelInput.addEventListener('click', function (e) {
                modelContainer.classList.remove('hidden');
                selectModel();
            });
        });
    });
}
function selectModel() {
    var suggestionsGot = document.querySelectorAll('.model-suggestion');
    suggestionsGot.forEach(function (suggestion) {
        suggestion.addEventListener('click', function (e) {
            console.log('Model suggestion clicked', e.target.innerHTML);
            modelInput.value = e.target.innerHTML.trim();
            modelContainer.classList.add('hidden');
            console.log('modelInput.value', modelInput.value);
            var trims = [];
            fetch('/labels/get_trims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ modelSelected: modelInput.value }),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                trims.push.apply(trims, data.trims);
                trimContainer.innerHTML = '';
                trims.forEach(function (trim) {
                    var clonedTrimSuggestionParagraph = trimSuggestionP.cloneNode(true);
                    clonedTrimSuggestionParagraph.innerHTML = trim;
                    trimContainer.appendChild(clonedTrimSuggestionParagraph);
                });
                makeInput.value = data.make;
                typeInput.value = data.type;
                selectTrim();
            })
                .catch(function (error) {
                console.error('Error fetching trims by model:', error);
            });
            modelInput.addEventListener('click', function (e) {
                modelContainer.classList.remove('hidden');
            });
        });
    });
}
function selectTrim() {
    var suggestionsGot = document.querySelectorAll('.trim-suggestion');
    suggestionsGot.forEach(function (suggestion) {
        suggestion.addEventListener('click', function (e) {
            console.log('Trim suggestion clicked', e.target.innerHTML);
            trimInput.value = e.target.innerHTML;
            trimContainer.classList.add('hidden');
            console.log('trimInput.value', trimInput.value);
        });
    });
}
function selectType() {
    var suggestionsGot = document.querySelectorAll('.type-suggestion');
    suggestionsGot.forEach(function (suggestion) {
        suggestion.addEventListener('click', function (e) {
            console.log('Type suggestion clicked', e.target.innerHTML);
            typeInput.value = e.target.innerHTML;
            typeContainer.classList.add('hidden');
            console.log('typeInput.value', typeInput.value);
        });
    });
}
if (makeInput) {
    makeInput.addEventListener('input', function (e) {
        var makes = [];
        fetch('/labels/get_makes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ makeTyped: e.target.value }),
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            makes.push.apply(makes, data.makes);
            makeContainer.classList.remove('hidden');
            makeContainer.innerHTML = '';
            makes.forEach(function (make) {
                var clonedMakeSuggestionParagraph = makeSuggestionP.cloneNode(true);
                clonedMakeSuggestionParagraph.innerHTML = make;
                makeContainer.appendChild(clonedMakeSuggestionParagraph);
            });
            selectMake();
            // const suggestionsGot: NodeListOf<HTMLParagraphElement> =
            //   document.querySelectorAll('.make-suggestion');
            // suggestionsGot.forEach(suggestion => {
            //   suggestion.addEventListener('click', e => {
            //     console.log(
            //       'Make suggestion clicked',
            //       (e.target as HTMLParagraphElement).innerHTML,
            //     );
            //     makeInput.value = (e.target as HTMLParagraphElement).innerHTML;
            //     makeContainer.classList.add('hidden');
            //     console.log('makeInput.value', makeInput.value);
            //     let models: Array<string> = [];
            //     fetch('/labels/get_models', {
            //       method: 'POST',
            //       headers: {
            //         'Content-Type': 'application/json',
            //       },
            //       body: JSON.stringify({makeSelected: makeInput.value}),
            //     })
            //       .then(response => response.json())
            //       .then(data => {
            //         models.push(...data.models);
            //         modelContainer.innerHTML = '';
            //         models.forEach(model => {
            //           let clonedModelSuggestionParagraph: HTMLParagraphElement =
            //             modelSuggestionP.cloneNode(true) as HTMLParagraphElement;
            //           clonedModelSuggestionParagraph.innerHTML = model;
            //           modelContainer.appendChild(clonedModelSuggestionParagraph);
            //         });
            //       })
            //       .catch(error => {
            //         console.error('Error fetching models by make:', error);
            //       });
            //     modelInput.addEventListener('click', e => {
            //       modelContainer.classList.remove('hidden');
            //       selectModel();
            //     });
            //   });
            // });
        })
            .catch(function (error) {
            console.error('Error sending makes data to Flask:', error);
        });
    });
}
makeInput.addEventListener('click', function (e) {
    makeContainer.classList.toggle('hidden');
});
modelInput.addEventListener('click', function (e) {
    modelContainer.classList.toggle('hidden');
});
trimInput.addEventListener('click', function (e) {
    console.log('trimInput clicked');
    trimContainer.classList.toggle('hidden');
});
typeInput.addEventListener('click', function (e) {
    console.log('typeInput clicked');
    console.log(typeContainer);
    typeContainer.classList.toggle('hidden');
});
if (modelInput) {
    modelInput.addEventListener('input', function (e) {
        var models = [];
        fetch('/labels/get_models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ modelTyped: modelInput.value }),
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            models.push.apply(models, data.models);
            modelContainer.innerHTML = '';
            models.forEach(function (model) {
                var clonedModelSuggestionParagraph = modelSuggestionP.cloneNode(true);
                clonedModelSuggestionParagraph.innerHTML = model;
                modelContainer.appendChild(clonedModelSuggestionParagraph);
            });
            console.log('before SelectModel()');
            selectModel();
        })
            .catch(function (error) {
            console.error('Error fetching all models:', error);
        });
    });
}
selectMake();
selectModel();
selectTrim();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxDQUFDO2dCQUNqRCxjQUFjLENBQUMsV0FBVyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDcEMsV0FBVyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLGVBQUs7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELFVBQVUsRUFBRSxDQUFDO0FBQ2IsV0FBVyxFQUFFLENBQUM7QUFDZCxVQUFVLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9uZXdfbGFiZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ25ld19sYWJlbC50cycpO1xuXG5jb25zdCBzdWdnZXN0aW9uQ29udGFpbmVyczogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4gPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3VnZ2VzdGlvbi1jb250YWluZXInKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgY29uc29sZS5sb2coJ0VzY2FwZSBwcmVzc2VkJyk7XG4gICAgc3VnZ2VzdGlvbkNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9XG59KTtcblxuY29uc3QgbWFrZUNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFrZS1jb250YWluZXInKTtcbmNvbnN0IG1vZGVsQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1jb250YWluZXInKTtcbmNvbnN0IHRyaW1Db250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyaW0tY29udGFpbmVyJyk7XG5jb25zdCB0eXBlQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50eXBlLWNvbnRhaW5lcicpO1xuXG5jb25zdCBtYWtlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFrZS0xJyk7XG5jb25zdCBtb2RlbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyN2ZWhpY2xlX21vZGVsLTEnLFxuKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3QgdHJpbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhYmVsLTEtdHJpbScpO1xuY29uc3QgdHlwZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhYmVsLTEtdHlwZScpO1xuXG5jb25zdCBtYWtlU3VnZ2VzdGlvblA6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ha2Utc3VnZ2VzdGlvbicpO1xuY29uc3QgbW9kZWxTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3VnZ2VzdGlvbicpO1xuY29uc3QgdHJpbVN1Z2dlc3Rpb25QOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cmltLXN1Z2dlc3Rpb24nKTtcbmNvbnN0IHR5cGVTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHlwZS1zdWdnZXN0aW9uJyk7XG5cbmZ1bmN0aW9uIHNlbGVjdE1ha2UoKSB7XG4gIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ha2Utc3VnZ2VzdGlvbicpO1xuICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnTWFrZSBzdWdnZXN0aW9uIGNsaWNrZWQnLFxuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTCxcbiAgICAgICk7XG4gICAgICBtYWtlSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTC50cmltKCk7XG4gICAgICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgY29uc29sZS5sb2coJ21ha2VJbnB1dC52YWx1ZScsIG1ha2VJbnB1dC52YWx1ZSk7XG4gICAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBmZXRjaCgnL2xhYmVscy9nZXRfbW9kZWxzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlU2VsZWN0ZWQ6IG1ha2VJbnB1dC52YWx1ZX0pLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4gICAgICAgICAgbW9kZWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgbW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgbGV0IGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICAgICAgICAgICAgICBtb2RlbFN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICAgICAgICAgIGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSBtb2RlbDtcbiAgICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbW9kZWxzIGJ5IG1ha2U6JywgZXJyb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgbW9kZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgc2VsZWN0TW9kZWwoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0TW9kZWwoKSB7XG4gIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGVsLXN1Z2dlc3Rpb24nKTtcbiAgc3VnZ2VzdGlvbnNHb3QuZm9yRWFjaChzdWdnZXN0aW9uID0+IHtcbiAgICBzdWdnZXN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgJ01vZGVsIHN1Z2dlc3Rpb24gY2xpY2tlZCcsXG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MLFxuICAgICAgKTtcbiAgICAgIG1vZGVsSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTC50cmltKCk7XG4gICAgICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIGNvbnNvbGUubG9nKCdtb2RlbElucHV0LnZhbHVlJywgbW9kZWxJbnB1dC52YWx1ZSk7XG5cbiAgICAgIGxldCB0cmltczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgZmV0Y2goJy9sYWJlbHMvZ2V0X3RyaW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttb2RlbFNlbGVjdGVkOiBtb2RlbElucHV0LnZhbHVlfSksXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIHRyaW1zLnB1c2goLi4uZGF0YS50cmltcyk7XG4gICAgICAgICAgdHJpbUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICB0cmltcy5mb3JFYWNoKHRyaW0gPT4ge1xuICAgICAgICAgICAgbGV0IGNsb25lZFRyaW1TdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgICAgICAgIHRyaW1TdWdnZXN0aW9uUC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgICAgICAgICBjbG9uZWRUcmltU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSB0cmltO1xuICAgICAgICAgICAgdHJpbUNvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRUcmltU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBtYWtlSW5wdXQudmFsdWUgPSBkYXRhLm1ha2U7XG4gICAgICAgICAgdHlwZUlucHV0LnZhbHVlID0gZGF0YS50eXBlO1xuXG4gICAgICAgICAgc2VsZWN0VHJpbSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRyaW1zIGJ5IG1vZGVsOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIG1vZGVsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgbW9kZWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFRyaW0oKSB7XG4gIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRyaW0tc3VnZ2VzdGlvbicpO1xuICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnVHJpbSBzdWdnZXN0aW9uIGNsaWNrZWQnLFxuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTCxcbiAgICAgICk7XG4gICAgICB0cmltSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTDtcbiAgICAgIHRyaW1Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICBjb25zb2xlLmxvZygndHJpbUlucHV0LnZhbHVlJywgdHJpbUlucHV0LnZhbHVlKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFR5cGUoKSB7XG4gIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtc3VnZ2VzdGlvbicpO1xuICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnVHlwZSBzdWdnZXN0aW9uIGNsaWNrZWQnLFxuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTCxcbiAgICAgICk7XG4gICAgICB0eXBlSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTDtcbiAgICAgIHR5cGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICBjb25zb2xlLmxvZygndHlwZUlucHV0LnZhbHVlJywgdHlwZUlucHV0LnZhbHVlKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChtYWtlSW5wdXQpIHtcbiAgbWFrZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZSA9PiB7XG4gICAgbGV0IG1ha2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZmV0Y2goJy9sYWJlbHMvZ2V0X21ha2VzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VUeXBlZDogKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlfSksXG4gICAgfSlcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIG1ha2VzLnB1c2goLi4uZGF0YS5tYWtlcyk7XG4gICAgICAgIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIG1ha2VDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1ha2VzLmZvckVhY2gobWFrZSA9PiB7XG4gICAgICAgICAgbGV0IGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgICAgICBtYWtlU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgICAgIGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1ha2U7XG4gICAgICAgICAgbWFrZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRNYWtlU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGVjdE1ha2UoKTtcblxuICAgICAgICAvLyBjb25zdCBzdWdnZXN0aW9uc0dvdDogTm9kZUxpc3RPZjxIVE1MUGFyYWdyYXBoRWxlbWVudD4gPVxuICAgICAgICAvLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWtlLXN1Z2dlc3Rpb24nKTtcbiAgICAgICAgLy8gc3VnZ2VzdGlvbnNHb3QuZm9yRWFjaChzdWdnZXN0aW9uID0+IHtcbiAgICAgICAgLy8gICBzdWdnZXN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgLy8gICAgICAgJ01ha2Ugc3VnZ2VzdGlvbiBjbGlja2VkJyxcbiAgICAgICAgLy8gICAgICAgKGUudGFyZ2V0IGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50KS5pbm5lckhUTUwsXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgbWFrZUlucHV0LnZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50KS5pbm5lckhUTUw7XG4gICAgICAgIC8vICAgICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ21ha2VJbnB1dC52YWx1ZScsIG1ha2VJbnB1dC52YWx1ZSk7XG4gICAgICAgIC8vICAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICAgIC8vICAgICBmZXRjaCgnL2xhYmVscy9nZXRfbW9kZWxzJywge1xuICAgICAgICAvLyAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgLy8gICAgICAgaGVhZGVyczoge1xuICAgICAgICAvLyAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIC8vICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlU2VsZWN0ZWQ6IG1ha2VJbnB1dC52YWx1ZX0pLFxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAvLyAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgLy8gICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4gICAgICAgIC8vICAgICAgICAgbW9kZWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIC8vICAgICAgICAgbW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgbGV0IGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICAgICAgICAvLyAgICAgICAgICAgICBtb2RlbFN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICAgICAgLy8gICAgICAgICAgIGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSBtb2RlbDtcbiAgICAgICAgLy8gICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgIH0pXG4gICAgICAgIC8vICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbW9kZWxzIGJ5IG1ha2U6JywgZXJyb3IpO1xuICAgICAgICAvLyAgICAgICB9KTtcblxuICAgICAgICAvLyAgICAgbW9kZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAvLyAgICAgICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgLy8gICAgICAgc2VsZWN0TW9kZWwoKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyAgIH0pO1xuICAgICAgICAvLyB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIG1ha2VzIGRhdGEgdG8gRmxhc2s6JywgZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5tYWtlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgbWFrZUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbn0pO1xuXG5tb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufSk7XG5cbnRyaW1JbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICBjb25zb2xlLmxvZygndHJpbUlucHV0IGNsaWNrZWQnKTtcbiAgdHJpbUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbn0pO1xuXG50eXBlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgY29uc29sZS5sb2coJ3R5cGVJbnB1dCBjbGlja2VkJyk7XG4gIGNvbnNvbGUubG9nKHR5cGVDb250YWluZXIpO1xuICB0eXBlQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufSk7XG5cbmlmIChtb2RlbElucHV0KSB7XG4gIG1vZGVsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBlID0+IHtcbiAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZmV0Y2goJy9sYWJlbHMvZ2V0X21vZGVscycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttb2RlbFR5cGVkOiBtb2RlbElucHV0LnZhbHVlfSksXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4gICAgICAgIG1vZGVsQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBtb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgbGV0IGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICAgICAgICAgICAgbW9kZWxTdWdnZXN0aW9uUC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgICAgICAgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1vZGVsO1xuICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdiZWZvcmUgU2VsZWN0TW9kZWwoKScpO1xuICAgICAgICBzZWxlY3RNb2RlbCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGFsbCBtb2RlbHM6JywgZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5zZWxlY3RNYWtlKCk7XG5zZWxlY3RNb2RlbCgpO1xuc2VsZWN0VHJpbSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9