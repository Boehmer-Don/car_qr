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
        if (viewsColumnSelectNA.hasAttribute('selected')) {
            viewsColumnSelectNA.removeAttribute('selected');
            viewsColumnSelectDesc.setAttribute('selected', 'selected');
        }
        else if (viewsColumnSelectAsc.hasAttribute('selected')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3JlcG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBjb25zdCBmaWx0ZXJNYWtlOiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItbWFrZScpO1xuICBjb25zdCBmaWx0ZXJUeXBlOiBIVE1MU2VsZWN0RWxlbWVudCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3R5cGVfb2ZfdmVoaWNsZScpO1xuICBjb25zdCBmaWx0ZXJNb2RlbDogSFRNTFNlbGVjdEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItbW9kZWwnKTtcbiAgY29uc3QgYXBwbHlGaWx0ZXJzQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNhcHBseS1maWx0ZXJzLWJ1dHRvbicsXG4gICk7XG5cbiAgZmlsdGVyTWFrZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgbGV0IG1vZGVsczogQXJyYXk8c3RyaW5nPiA9IFsnQWxsJ107XG4gICAgZmV0Y2goJy9yZXBvcnQvZ2V0X21vZGVscycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlU2VsZWN0ZWQ6IGZpbHRlck1ha2UudmFsdWV9KSxcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIG1vZGVscy5wdXNoKC4uLmRhdGEubW9kZWxzKTtcbiAgICAgICAgZmlsdGVyTW9kZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1vZGVscy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgIG9wdGlvbkVsZW1lbnQudmFsdWUgPSBvcHRpb247XG4gICAgICAgICAgb3B0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICAgICAgICBmaWx0ZXJNb2RlbC5hcHBlbmRDaGlsZChvcHRpb25FbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgZGF0YSB0byBGbGFzazonLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgZmlsdGVyTW9kZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcblxuICBmaWx0ZXJUeXBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgfSk7XG5cbiAgY29uc3Qgdmlld3NPcHRpb25zOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzX29wdGlvbnMnKTtcbiAgdmlld3NPcHRpb25zLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgfSk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBjb25zdCB2aWV3c0NvbHVtbkJ1dHRvbjogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3cy1jb2x1bW4tYnV0dG9uJyk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBjb25zdCB2aWV3c0NvbHVtblNlbGVjdE5BOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLW5hJyk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBjb25zdCB2aWV3c0NvbHVtblNlbGVjdEFzYzogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3cy1hc2MnKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0RGVzYzogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3cy1kZXNjJyk7XG4gIHZpZXdzQ29sdW1uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmICh2aWV3c0NvbHVtblNlbGVjdE5BLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgdmlld3NDb2x1bW5TZWxlY3ROQS5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdERlc2Muc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgIH0gZWxzZSBpZiAodmlld3NDb2x1bW5TZWxlY3RBc2MuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdEFzYy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdERlc2Muc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgIH0gZWxzZSBpZiAodmlld3NDb2x1bW5TZWxlY3REZXNjLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgdmlld3NDb2x1bW5TZWxlY3REZXNjLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIHZpZXdzQ29sdW1uU2VsZWN0QXNjLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xuXG4gIGNvbnN0IHByaWNlQnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaWNlLWJ1dHRvbicpO1xuICBjb25zdCBwcmljZUlucHV0czogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmljZS1pbnB1dHMnKTtcbiAgcHJpY2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHJpY2VJbnB1dHMuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gIH0pO1xuXG4gIGNvbnN0IGRhdGVSZWNlaXZlZEJ1dHRvbjogSFRNTElucHV0RWxlbWVudCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGVfcmVjZWl2ZWQnKTtcbiAgZGF0ZVJlY2VpdmVkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9