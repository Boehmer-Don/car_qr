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
var makeInput = document.querySelector('#make-1');
var modelInput = document.querySelector('#vehicle_model-1');
var makeSuggestionP = document.querySelector('.make-suggestion');
var modelSuggestionP = document.querySelector('.model-suggestion');
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
            // if make is in db: pull all models for make from db
            // pull all trims for pulled models from db
            var suggestionsGot = document.querySelectorAll('.make-suggestion');
            suggestionsGot.forEach(function (suggestion) {
                suggestion.addEventListener('click', function (e) {
                    console.log('Suggestion clicked', e.target.innerHTML);
                    makeInput.value = e.target.innerHTML;
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
                    // on click reveal model suggestions
                    modelInput.addEventListener('click', function (e) {
                        modelContainer.classList.remove('hidden');
                    });
                });
            });
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O29CQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLGVBQUs7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBQztJQUNuQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBQztJQUNwQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9uZXdfbGFiZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ25ld19sYWJlbC50cycpO1xuXG5jb25zdCBzdWdnZXN0aW9uQ29udGFpbmVyczogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4gPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3VnZ2VzdGlvbi1jb250YWluZXInKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgY29uc29sZS5sb2coJ0VzY2FwZSBwcmVzc2VkJyk7XG4gICAgc3VnZ2VzdGlvbkNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9XG59KTtcblxuY29uc3QgbWFrZUNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFrZS1jb250YWluZXInKTtcbmNvbnN0IG1vZGVsQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1jb250YWluZXInKTtcbmNvbnN0IG1ha2VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWtlLTEnKTtcbmNvbnN0IG1vZGVsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI3ZlaGljbGVfbW9kZWwtMScsXG4pIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBtYWtlU3VnZ2VzdGlvblA6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ha2Utc3VnZ2VzdGlvbicpO1xuY29uc3QgbW9kZWxTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3VnZ2VzdGlvbicpO1xuXG5pZiAobWFrZUlucHV0KSB7XG4gIG1ha2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGUgPT4ge1xuICAgIGxldCBtYWtlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGZldGNoKCcvbGFiZWxzL2dldF9tYWtlcycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlVHlwZWQ6IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZX0pLFxuICAgIH0pXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBtYWtlcy5wdXNoKC4uLmRhdGEubWFrZXMpO1xuICAgICAgICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICBtYWtlQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBtYWtlcy5mb3JFYWNoKG1ha2UgPT4ge1xuICAgICAgICAgIGxldCBjbG9uZWRNYWtlU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICAgICAgICAgICAgbWFrZVN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICAgICAgICBjbG9uZWRNYWtlU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSBtYWtlO1xuICAgICAgICAgIG1ha2VDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkTWFrZVN1Z2dlc3Rpb25QYXJhZ3JhcGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpZiBtYWtlIGlzIGluIGRiOiBwdWxsIGFsbCBtb2RlbHMgZm9yIG1ha2UgZnJvbSBkYlxuICAgICAgICAvLyBwdWxsIGFsbCB0cmltcyBmb3IgcHVsbGVkIG1vZGVscyBmcm9tIGRiXG4gICAgICAgIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ha2Utc3VnZ2VzdGlvbicpO1xuICAgICAgICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgICAgICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAnU3VnZ2VzdGlvbiBjbGlja2VkJyxcbiAgICAgICAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50KS5pbm5lckhUTUwsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFrZUlucHV0LnZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50KS5pbm5lckhUTUw7XG4gICAgICAgICAgICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21ha2VJbnB1dC52YWx1ZScsIG1ha2VJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICAgICAgICBmZXRjaCgnL2xhYmVscy9nZXRfbW9kZWxzJywge1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlU2VsZWN0ZWQ6IG1ha2VJbnB1dC52YWx1ZX0pLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4gICAgICAgICAgICAgICAgbW9kZWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgbW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICAgICAgICAgICAgICAgICAgICBtb2RlbFN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgIGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSBtb2RlbDtcbiAgICAgICAgICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbW9kZWxzIGJ5IG1ha2U6JywgZXJyb3IpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gb24gY2xpY2sgcmV2ZWFsIG1vZGVsIHN1Z2dlc3Rpb25zXG4gICAgICAgICAgICBtb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgbWFrZXMgZGF0YSB0byBGbGFzazonLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbm1ha2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufSk7XG5cbm1vZGVsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgbW9kZWxDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==