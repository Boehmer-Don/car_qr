/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/report.ts ***!
  \***********************/
document.addEventListener('DOMContentLoaded', function () {
    var filterMake = document.querySelector('#filter-make');
    var filterType = document.querySelector('#type_of_vehicle');
    var filterModel = document.querySelector('#filter-model');
    var applyFiltersButton = document.querySelector('#apply-filters-button');
    filterMake.addEventListener('change', function () {
        var models = ['All'];
        fetch('/report/get_models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ makeSelected: filterMake.value }),
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            models.push.apply(models, data.models);
            filterModel.innerHTML = '';
            models.forEach(function (option) {
                var optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                filterModel.appendChild(optionElement);
            });
            applyFiltersButton.click();
        })
            .catch(function (error) {
            console.error('Error sending data to Flask:', error);
        });
    });
    filterModel.addEventListener('change', function () {
        applyFiltersButton.click();
    });
    filterType.addEventListener('change', function () {
        applyFiltersButton.click();
    });
    var viewsOptions = document.querySelector('#views_options');
    viewsOptions.addEventListener('change', function () {
        applyFiltersButton.click();
    });
    // prettier-ignore
    var viewsColumnButton = document.querySelector('#views-column-button');
    // prettier-ignore
    var viewsColumnSelectNA = document.querySelector('#views-na');
    // prettier-ignore
    var viewsColumnSelectAsc = document.querySelector('#views-asc');
    // prettier-ignore
    var viewsColumnSelectDesc = document.querySelector('#views-desc');
    viewsColumnButton.addEventListener('click', function () {
        console.log('has attribute selected`');
        if (viewsColumnSelectAsc.hasAttribute('selected')) {
            viewsColumnSelectAsc.removeAttribute('selected');
            viewsColumnSelectDesc.setAttribute('selected', 'selected');
        }
        else if (viewsColumnSelectDesc.hasAttribute('selected')) {
            viewsColumnSelectDesc.removeAttribute('selected');
            viewsColumnSelectAsc.setAttribute('selected', 'selected');
        }
        applyFiltersButton.click();
    });
    var priceButton = document.querySelector('#price-button');
    var priceInputs = document.querySelector('#price-inputs');
    priceButton.addEventListener('click', function () {
        priceInputs.classList.toggle('hidden');
    });
    var dateReceivedButton = document.querySelector('#date_received');
    dateReceivedButton.addEventListener('input', function () {
        applyFiltersButton.click();
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFdkMsSUFBSSxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDakQsb0JBQW9CLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELHFCQUFxQixDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDNUQ7YUFBTSxJQUFJLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6RCxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEQsb0JBQW9CLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMzRDtRQUNELGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBTSxXQUFXLEdBQVksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyRSxJQUFNLFdBQVcsR0FBWSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JFLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDcEMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFNLGtCQUFrQixHQUN0QixRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDM0Msa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzNDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcmVwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGZpbHRlck1ha2U6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlci1tYWtlJyk7XG4gIGNvbnN0IGZpbHRlclR5cGU6IEhUTUxTZWxlY3RFbGVtZW50ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdHlwZV9vZl92ZWhpY2xlJyk7XG4gIGNvbnN0IGZpbHRlck1vZGVsOiBIVE1MU2VsZWN0RWxlbWVudCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlci1tb2RlbCcpO1xuICBjb25zdCBhcHBseUZpbHRlcnNCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI2FwcGx5LWZpbHRlcnMtYnV0dG9uJyxcbiAgKTtcblxuICBmaWx0ZXJNYWtlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gWydBbGwnXTtcbiAgICBmZXRjaCgnL3JlcG9ydC9nZXRfbW9kZWxzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VTZWxlY3RlZDogZmlsdGVyTWFrZS52YWx1ZX0pLFxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgbW9kZWxzLnB1c2goLi4uZGF0YS5tb2RlbHMpO1xuICAgICAgICBmaWx0ZXJNb2RlbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbW9kZWxzLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICBjb25zdCBvcHRpb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgb3B0aW9uRWxlbWVudC52YWx1ZSA9IG9wdGlvbjtcbiAgICAgICAgICBvcHRpb25FbGVtZW50LnRleHRDb250ZW50ID0gb3B0aW9uO1xuICAgICAgICAgIGZpbHRlck1vZGVsLmFwcGVuZENoaWxkKG9wdGlvbkVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyBkYXRhIHRvIEZsYXNrOicsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBmaWx0ZXJNb2RlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xuXG4gIGZpbHRlclR5cGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcblxuICBjb25zdCB2aWV3c09wdGlvbnM6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlld3Nfb3B0aW9ucycpO1xuICB2aWV3c09wdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uQnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWNvbHVtbi1idXR0b24nKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0TkE6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlld3MtbmEnKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0QXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWFzYycpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgY29uc3Qgdmlld3NDb2x1bW5TZWxlY3REZXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWRlc2MnKTtcbiAgdmlld3NDb2x1bW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2hhcyBhdHRyaWJ1dGUgc2VsZWN0ZWRgJyk7XG5cbiAgICBpZiAodmlld3NDb2x1bW5TZWxlY3RBc2MuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdEFzYy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdERlc2Muc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgIH0gZWxzZSBpZiAodmlld3NDb2x1bW5TZWxlY3REZXNjLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgdmlld3NDb2x1bW5TZWxlY3REZXNjLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIHZpZXdzQ29sdW1uU2VsZWN0QXNjLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xuXG4gIGNvbnN0IHByaWNlQnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaWNlLWJ1dHRvbicpO1xuICBjb25zdCBwcmljZUlucHV0czogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmljZS1pbnB1dHMnKTtcbiAgcHJpY2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHJpY2VJbnB1dHMuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gIH0pO1xuXG4gIGNvbnN0IGRhdGVSZWNlaXZlZEJ1dHRvbjogSFRNTElucHV0RWxlbWVudCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGVfcmVjZWl2ZWQnKTtcbiAgZGF0ZVJlY2VpdmVkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9