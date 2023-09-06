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
function selectModel() {
    console.log('selectModel()');
    var suggestionsGot = document.querySelectorAll('.model-suggestion');
    suggestionsGot.forEach(function (suggestion) {
        suggestion.addEventListener('click', function (e) {
            console.log('Model suggestion clicked', e.target.innerHTML);
            modelInput.value = e.target.innerHTML.replace(/\s+/g, '');
            modelContainer.classList.add('hidden');
            console.log('modelInput.value', modelInput.value);
            // let models: Array<string> = [];
            // fetch('/labels/get_models', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({makeSelected: makeInput.value}),
            // })
            //   .then(response => response.json())
            //   .then(data => {
            //     models.push(...data.models);
            //     modelContainer.innerHTML = '';
            //     models.forEach(model => {
            //       let clonedModelSuggestionParagraph: HTMLParagraphElement =
            //         modelSuggestionP.cloneNode(true) as HTMLParagraphElement;
            //       clonedModelSuggestionParagraph.innerHTML = model;
            //       modelContainer.appendChild(clonedModelSuggestionParagraph);
            //     });
            //   })
            //   .catch(error => {
            //     console.error('Error fetching models by make:', error);
            //   });
            // modelInput.addEventListener('click', e => {
            //   modelContainer.classList.remove('hidden');
            // });
            // pull all trims for pulled models from db
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
            var suggestionsGot = document.querySelectorAll('.make-suggestion');
            suggestionsGot.forEach(function (suggestion) {
                suggestion.addEventListener('click', function (e) {
                    console.log('Make suggestion clicked', e.target.innerHTML);
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
                    modelInput.addEventListener('click', function (e) {
                        modelContainer.classList.remove('hidden');
                        selectModel();
                    });
                    // pull all trims for pulled models from db
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
selectModel();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztnQkFDM0QsOEJBQThCLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDakQsY0FBYyxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3BDLFdBQVcsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxlQUFLO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxXQUFXLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9uZXdfbGFiZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ25ld19sYWJlbC50cycpO1xuXG5jb25zdCBzdWdnZXN0aW9uQ29udGFpbmVyczogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4gPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3VnZ2VzdGlvbi1jb250YWluZXInKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgY29uc29sZS5sb2coJ0VzY2FwZSBwcmVzc2VkJyk7XG4gICAgc3VnZ2VzdGlvbkNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9XG59KTtcblxuY29uc3QgbWFrZUNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFrZS1jb250YWluZXInKTtcbmNvbnN0IG1vZGVsQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1jb250YWluZXInKTtcbmNvbnN0IG1ha2VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWtlLTEnKTtcbmNvbnN0IG1vZGVsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI3ZlaGljbGVfbW9kZWwtMScsXG4pIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBtYWtlU3VnZ2VzdGlvblA6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ha2Utc3VnZ2VzdGlvbicpO1xuY29uc3QgbW9kZWxTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3VnZ2VzdGlvbicpO1xuXG5mdW5jdGlvbiBzZWxlY3RNb2RlbCgpIHtcbiAgY29uc29sZS5sb2coJ3NlbGVjdE1vZGVsKCknKTtcbiAgY29uc3Qgc3VnZ2VzdGlvbnNHb3Q6IE5vZGVMaXN0T2Y8SFRNTFBhcmFncmFwaEVsZW1lbnQ+ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kZWwtc3VnZ2VzdGlvbicpO1xuICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnTW9kZWwgc3VnZ2VzdGlvbiBjbGlja2VkJyxcbiAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50KS5pbm5lckhUTUwsXG4gICAgICApO1xuICAgICAgbW9kZWxJbnB1dC52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MLnJlcGxhY2UoXG4gICAgICAgIC9cXHMrL2csXG4gICAgICAgICcnLFxuICAgICAgKTtcbiAgICAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgY29uc29sZS5sb2coJ21vZGVsSW5wdXQudmFsdWUnLCBtb2RlbElucHV0LnZhbHVlKTtcbiAgICAgIC8vIGxldCBtb2RlbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgIC8vIGZldGNoKCcvbGFiZWxzL2dldF9tb2RlbHMnLCB7XG4gICAgICAvLyAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgLy8gICBoZWFkZXJzOiB7XG4gICAgICAvLyAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VTZWxlY3RlZDogbWFrZUlucHV0LnZhbHVlfSksXG4gICAgICAvLyB9KVxuICAgICAgLy8gICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAvLyAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgLy8gICAgIG1vZGVscy5wdXNoKC4uLmRhdGEubW9kZWxzKTtcbiAgICAgIC8vICAgICBtb2RlbENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgIC8vICAgICBtb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAvLyAgICAgICBsZXQgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAvLyAgICAgICAgIG1vZGVsU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgLy8gICAgICAgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1vZGVsO1xuICAgICAgLy8gICAgICAgbW9kZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoKTtcbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vICAgfSlcbiAgICAgIC8vICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBtb2RlbHMgYnkgbWFrZTonLCBlcnJvcik7XG4gICAgICAvLyAgIH0pO1xuXG4gICAgICAvLyBtb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAvLyAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgLy8gfSk7XG5cbiAgICAgIC8vIHB1bGwgYWxsIHRyaW1zIGZvciBwdWxsZWQgbW9kZWxzIGZyb20gZGJcbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChtYWtlSW5wdXQpIHtcbiAgbWFrZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZSA9PiB7XG4gICAgbGV0IG1ha2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZmV0Y2goJy9sYWJlbHMvZ2V0X21ha2VzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VUeXBlZDogKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlfSksXG4gICAgfSlcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIG1ha2VzLnB1c2goLi4uZGF0YS5tYWtlcyk7XG4gICAgICAgIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIG1ha2VDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1ha2VzLmZvckVhY2gobWFrZSA9PiB7XG4gICAgICAgICAgbGV0IGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgICAgICBtYWtlU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgICAgIGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1ha2U7XG4gICAgICAgICAgbWFrZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRNYWtlU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ha2Utc3VnZ2VzdGlvbicpO1xuICAgICAgICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgICAgICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAnTWFrZSBzdWdnZXN0aW9uIGNsaWNrZWQnLFxuICAgICAgICAgICAgICAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYWtlSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTDtcbiAgICAgICAgICAgIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWFrZUlucHV0LnZhbHVlJywgbWFrZUlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIGxldCBtb2RlbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgICAgICAgIGZldGNoKCcvbGFiZWxzL2dldF9tb2RlbHMnLCB7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VTZWxlY3RlZDogbWFrZUlucHV0LnZhbHVlfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGVscy5wdXNoKC4uLmRhdGEubW9kZWxzKTtcbiAgICAgICAgICAgICAgICBtb2RlbENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBtb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1vZGVsO1xuICAgICAgICAgICAgICAgICAgbW9kZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBtb2RlbHMgYnkgbWFrZTonLCBlcnJvcik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICBzZWxlY3RNb2RlbCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHB1bGwgYWxsIHRyaW1zIGZvciBwdWxsZWQgbW9kZWxzIGZyb20gZGJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyBtYWtlcyBkYXRhIHRvIEZsYXNrOicsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxubWFrZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG59KTtcblxubW9kZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICBtb2RlbENvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbn0pO1xuXG5pZiAobW9kZWxJbnB1dCkge1xuICBtb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZSA9PiB7XG4gICAgbGV0IG1vZGVsczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGZldGNoKCcvbGFiZWxzL2dldF9tb2RlbHMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bW9kZWxUeXBlZDogbW9kZWxJbnB1dC52YWx1ZX0pLFxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgbW9kZWxzLnB1c2goLi4uZGF0YS5tb2RlbHMpO1xuICAgICAgICBtb2RlbENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgIGxldCBjbG9uZWRNb2RlbFN1Z2dlc3Rpb25QYXJhZ3JhcGg6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgICAgICAgICAgIG1vZGVsU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgICAgIGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSBtb2RlbDtcbiAgICAgICAgICBtb2RlbENvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRNb2RlbFN1Z2dlc3Rpb25QYXJhZ3JhcGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZygnYmVmb3JlIFNlbGVjdE1vZGVsKCknKTtcbiAgICAgICAgc2VsZWN0TW9kZWwoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBhbGwgbW9kZWxzOicsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuc2VsZWN0TW9kZWwoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==