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
            makeInput.value = e.target.innerHTML.replace(/\s+/g, '');
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
            modelInput.value = e.target.innerHTML.replace(/\s+/g, '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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N0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDcEMsV0FBVyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLGVBQUs7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELFVBQVUsRUFBRSxDQUFDO0FBQ2IsV0FBVyxFQUFFLENBQUM7QUFDZCxVQUFVLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9uZXdfbGFiZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ25ld19sYWJlbC50cycpO1xuXG5jb25zdCBzdWdnZXN0aW9uQ29udGFpbmVyczogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4gPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3VnZ2VzdGlvbi1jb250YWluZXInKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgY29uc29sZS5sb2coJ0VzY2FwZSBwcmVzc2VkJyk7XG4gICAgc3VnZ2VzdGlvbkNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9XG59KTtcblxuY29uc3QgbWFrZUNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFrZS1jb250YWluZXInKTtcbmNvbnN0IG1vZGVsQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1jb250YWluZXInKTtcbmNvbnN0IHRyaW1Db250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyaW0tY29udGFpbmVyJyk7XG5jb25zdCB0eXBlQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50eXBlLWNvbnRhaW5lcicpO1xuXG5jb25zdCBtYWtlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFrZS0xJyk7XG5jb25zdCBtb2RlbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyN2ZWhpY2xlX21vZGVsLTEnLFxuKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3QgdHJpbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhYmVsLTEtdHJpbScpO1xuY29uc3QgdHlwZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhYmVsLTEtdHlwZScpO1xuXG5jb25zdCBtYWtlU3VnZ2VzdGlvblA6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ha2Utc3VnZ2VzdGlvbicpO1xuY29uc3QgbW9kZWxTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3VnZ2VzdGlvbicpO1xuY29uc3QgdHJpbVN1Z2dlc3Rpb25QOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cmltLXN1Z2dlc3Rpb24nKTtcbmNvbnN0IHR5cGVTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHlwZS1zdWdnZXN0aW9uJyk7XG5cbmZ1bmN0aW9uIHNlbGVjdE1ha2UoKSB7XG4gIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ha2Utc3VnZ2VzdGlvbicpO1xuICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnTWFrZSBzdWdnZXN0aW9uIGNsaWNrZWQnLFxuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTCxcbiAgICAgICk7XG4gICAgICBtYWtlSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTC5yZXBsYWNlKFxuICAgICAgICAvXFxzKy9nLFxuICAgICAgICAnJyxcbiAgICAgICk7XG4gICAgICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgY29uc29sZS5sb2coJ21ha2VJbnB1dC52YWx1ZScsIG1ha2VJbnB1dC52YWx1ZSk7XG4gICAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBmZXRjaCgnL2xhYmVscy9nZXRfbW9kZWxzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlU2VsZWN0ZWQ6IG1ha2VJbnB1dC52YWx1ZX0pLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4gICAgICAgICAgbW9kZWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgbW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgbGV0IGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICAgICAgICAgICAgICBtb2RlbFN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICAgICAgICAgIGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSBtb2RlbDtcbiAgICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbW9kZWxzIGJ5IG1ha2U6JywgZXJyb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgbW9kZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgc2VsZWN0TW9kZWwoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0TW9kZWwoKSB7XG4gIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGVsLXN1Z2dlc3Rpb24nKTtcbiAgc3VnZ2VzdGlvbnNHb3QuZm9yRWFjaChzdWdnZXN0aW9uID0+IHtcbiAgICBzdWdnZXN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgJ01vZGVsIHN1Z2dlc3Rpb24gY2xpY2tlZCcsXG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MLFxuICAgICAgKTtcbiAgICAgIG1vZGVsSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTC5yZXBsYWNlKFxuICAgICAgICAvXFxzKy9nLFxuICAgICAgICAnJyxcbiAgICAgICk7XG4gICAgICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIGNvbnNvbGUubG9nKCdtb2RlbElucHV0LnZhbHVlJywgbW9kZWxJbnB1dC52YWx1ZSk7XG5cbiAgICAgIGxldCB0cmltczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgZmV0Y2goJy9sYWJlbHMvZ2V0X3RyaW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttb2RlbFNlbGVjdGVkOiBtb2RlbElucHV0LnZhbHVlfSksXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIHRyaW1zLnB1c2goLi4uZGF0YS50cmltcyk7XG4gICAgICAgICAgdHJpbUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICB0cmltcy5mb3JFYWNoKHRyaW0gPT4ge1xuICAgICAgICAgICAgbGV0IGNsb25lZFRyaW1TdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgICAgICAgIHRyaW1TdWdnZXN0aW9uUC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgICAgICAgICBjbG9uZWRUcmltU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSB0cmltO1xuICAgICAgICAgICAgdHJpbUNvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRUcmltU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzZWxlY3RUcmltKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdHJpbXMgYnkgbW9kZWw6JywgZXJyb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgbW9kZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0VHJpbSgpIHtcbiAgY29uc3Qgc3VnZ2VzdGlvbnNHb3Q6IE5vZGVMaXN0T2Y8SFRNTFBhcmFncmFwaEVsZW1lbnQ+ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHJpbS1zdWdnZXN0aW9uJyk7XG4gIHN1Z2dlc3Rpb25zR290LmZvckVhY2goc3VnZ2VzdGlvbiA9PiB7XG4gICAgc3VnZ2VzdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICdUcmltIHN1Z2dlc3Rpb24gY2xpY2tlZCcsXG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MLFxuICAgICAgKTtcbiAgICAgIHRyaW1JbnB1dC52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MO1xuICAgICAgdHJpbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIGNvbnNvbGUubG9nKCd0cmltSW5wdXQudmFsdWUnLCB0cmltSW5wdXQudmFsdWUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0VHlwZSgpIHtcbiAgY29uc3Qgc3VnZ2VzdGlvbnNHb3Q6IE5vZGVMaXN0T2Y8SFRNTFBhcmFncmFwaEVsZW1lbnQ+ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwZS1zdWdnZXN0aW9uJyk7XG4gIHN1Z2dlc3Rpb25zR290LmZvckVhY2goc3VnZ2VzdGlvbiA9PiB7XG4gICAgc3VnZ2VzdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICdUeXBlIHN1Z2dlc3Rpb24gY2xpY2tlZCcsXG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MLFxuICAgICAgKTtcbiAgICAgIHR5cGVJbnB1dC52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MO1xuICAgICAgdHlwZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIGNvbnNvbGUubG9nKCd0eXBlSW5wdXQudmFsdWUnLCB0eXBlSW5wdXQudmFsdWUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuaWYgKG1ha2VJbnB1dCkge1xuICBtYWtlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBlID0+IHtcbiAgICBsZXQgbWFrZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBmZXRjaCgnL2xhYmVscy9nZXRfbWFrZXMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWFrZVR5cGVkOiAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWV9KSxcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgbWFrZXMucHVzaCguLi5kYXRhLm1ha2VzKTtcbiAgICAgICAgbWFrZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgbWFrZUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbWFrZXMuZm9yRWFjaChtYWtlID0+IHtcbiAgICAgICAgICBsZXQgY2xvbmVkTWFrZVN1Z2dlc3Rpb25QYXJhZ3JhcGg6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgICAgICAgICAgIG1ha2VTdWdnZXN0aW9uUC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgICAgICAgY2xvbmVkTWFrZVN1Z2dlc3Rpb25QYXJhZ3JhcGguaW5uZXJIVE1MID0gbWFrZTtcbiAgICAgICAgICBtYWtlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZWN0TWFrZSgpO1xuXG4gICAgICAgIC8vIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgICAgIC8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ha2Utc3VnZ2VzdGlvbicpO1xuICAgICAgICAvLyBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgICAgICAvLyAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAvLyAgICAgICAnTWFrZSBzdWdnZXN0aW9uIGNsaWNrZWQnLFxuICAgICAgICAvLyAgICAgICAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTCxcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vICAgICBtYWtlSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTDtcbiAgICAgICAgLy8gICAgIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnbWFrZUlucHV0LnZhbHVlJywgbWFrZUlucHV0LnZhbHVlKTtcbiAgICAgICAgLy8gICAgIGxldCBtb2RlbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgICAgLy8gICAgIGZldGNoKCcvbGFiZWxzL2dldF9tb2RlbHMnLCB7XG4gICAgICAgIC8vICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAvLyAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC8vICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgLy8gICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VTZWxlY3RlZDogbWFrZUlucHV0LnZhbHVlfSksXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC8vICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAvLyAgICAgICAgIG1vZGVscy5wdXNoKC4uLmRhdGEubW9kZWxzKTtcbiAgICAgICAgLy8gICAgICAgICBtb2RlbENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgLy8gICAgICAgICBtb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICBsZXQgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgIC8vICAgICAgICAgICAgIG1vZGVsU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgICAvLyAgICAgICAgICAgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1vZGVsO1xuICAgICAgICAvLyAgICAgICAgICAgbW9kZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoKTtcbiAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBtb2RlbHMgYnkgbWFrZTonLCBlcnJvcik7XG4gICAgICAgIC8vICAgICAgIH0pO1xuXG4gICAgICAgIC8vICAgICBtb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIC8vICAgICAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAvLyAgICAgICBzZWxlY3RNb2RlbCgpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vICAgfSk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgbWFrZXMgZGF0YSB0byBGbGFzazonLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbm1ha2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufSk7XG5cbm1vZGVsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgbW9kZWxDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG59KTtcblxudHJpbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGNvbnNvbGUubG9nKCd0cmltSW5wdXQgY2xpY2tlZCcpO1xuICB0cmltQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufSk7XG5cbnR5cGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICBjb25zb2xlLmxvZygndHlwZUlucHV0IGNsaWNrZWQnKTtcbiAgY29uc29sZS5sb2codHlwZUNvbnRhaW5lcik7XG4gIHR5cGVDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG59KTtcblxuaWYgKG1vZGVsSW5wdXQpIHtcbiAgbW9kZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGUgPT4ge1xuICAgIGxldCBtb2RlbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBmZXRjaCgnL2xhYmVscy9nZXRfbW9kZWxzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21vZGVsVHlwZWQ6IG1vZGVsSW5wdXQudmFsdWV9KSxcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIG1vZGVscy5wdXNoKC4uLmRhdGEubW9kZWxzKTtcbiAgICAgICAgbW9kZWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1vZGVscy5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICAgICAgICBsZXQgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgICAgICBtb2RlbFN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICAgICAgICBjbG9uZWRNb2RlbFN1Z2dlc3Rpb25QYXJhZ3JhcGguaW5uZXJIVE1MID0gbW9kZWw7XG4gICAgICAgICAgbW9kZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2JlZm9yZSBTZWxlY3RNb2RlbCgpJyk7XG4gICAgICAgIHNlbGVjdE1vZGVsKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYWxsIG1vZGVsczonLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbnNlbGVjdE1ha2UoKTtcbnNlbGVjdE1vZGVsKCk7XG5zZWxlY3RUcmltKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=