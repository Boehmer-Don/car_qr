/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/report.ts ***!
  \***********************/
document.addEventListener('DOMContentLoaded', function () {
    var filterMake = document.querySelector('#filter-make');
    var filterModel = document.querySelector('#filter-model');
    var filterType = document.querySelector('#type_of_vehicle');
    var filterTrim = document.querySelector('#trim_filter');
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
    filterTrim.addEventListener('change', function () {
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
    var downloadButton = document.querySelector('#download-button');
    var downloadTrigger = document.querySelector('#download');
    downloadButton.addEventListener('click', function () {
        downloadTrigger.value = 'true';
        applyFiltersButton.click();
    });
    var excludeList = document.querySelector('#exclude');
    var deleteFromReportButtons = document.querySelectorAll('.delete-from-report');
    deleteFromReportButtons.forEach(function (deleteFromReport) {
        deleteFromReport.addEventListener('click', function () {
            if (excludeList.value === 'None') {
                excludeList.value = "".concat(deleteFromReport.getAttribute('data-target'), ",");
                applyFiltersButton.click();
                return;
            }
            excludeList.value += "".concat(deleteFromReport.getAttribute('data-target'), ",");
            applyFiltersButton.click();
        });
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM3QyxJQUFNLGVBQWUsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQ3ZDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQy9CLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBTSxXQUFXLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekUsSUFBTSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQ3ZELHFCQUFxQixDQUN0QixDQUFDO0lBQ0YsdUJBQXVCLENBQUMsT0FBTyxDQUFDLFVBQUMsZ0JBQXlCO1FBQ3hELGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUN6QyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssTUFBTSxFQUFFO2dCQUNoQyxXQUFXLENBQUMsS0FBSyxHQUFHLFVBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFHLENBQUM7Z0JBQ3ZFLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMzQixPQUFPO2FBQ1I7WUFDRCxXQUFXLENBQUMsS0FBSyxJQUFJLFVBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFHLENBQUM7WUFDeEUsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3JlcG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBjb25zdCBmaWx0ZXJNYWtlOiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItbWFrZScpO1xuICBjb25zdCBmaWx0ZXJNb2RlbDogSFRNTFNlbGVjdEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItbW9kZWwnKTtcbiAgY29uc3QgZmlsdGVyVHlwZTogSFRNTFNlbGVjdEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0eXBlX29mX3ZlaGljbGUnKTtcbiAgY29uc3QgZmlsdGVyVHJpbTogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdHJpbV9maWx0ZXInKTtcbiAgY29uc3QgYXBwbHlGaWx0ZXJzQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNhcHBseS1maWx0ZXJzLWJ1dHRvbicsXG4gICk7XG5cbiAgZmlsdGVyTWFrZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgbGV0IG1vZGVsczogQXJyYXk8c3RyaW5nPiA9IFsnQWxsJ107XG4gICAgZmV0Y2goJy9yZXBvcnQvZ2V0X21vZGVscycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttYWtlU2VsZWN0ZWQ6IGZpbHRlck1ha2UudmFsdWV9KSxcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIG1vZGVscy5wdXNoKC4uLmRhdGEubW9kZWxzKTtcbiAgICAgICAgZmlsdGVyTW9kZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1vZGVscy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgIG9wdGlvbkVsZW1lbnQudmFsdWUgPSBvcHRpb247XG4gICAgICAgICAgb3B0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICAgICAgICBmaWx0ZXJNb2RlbC5hcHBlbmRDaGlsZChvcHRpb25FbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgZGF0YSB0byBGbGFzazonLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgZmlsdGVyTW9kZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcblxuICBmaWx0ZXJUeXBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgfSk7XG4gIGZpbHRlclRyaW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcblxuICBjb25zdCB2aWV3c09wdGlvbnM6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlld3Nfb3B0aW9ucycpO1xuICB2aWV3c09wdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uQnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWNvbHVtbi1idXR0b24nKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0TkE6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlld3MtbmEnKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0QXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWFzYycpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgY29uc3Qgdmlld3NDb2x1bW5TZWxlY3REZXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWRlc2MnKTtcbiAgdmlld3NDb2x1bW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKHZpZXdzQ29sdW1uU2VsZWN0QXNjLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgdmlld3NDb2x1bW5TZWxlY3RBc2MucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgdmlld3NDb2x1bW5TZWxlY3REZXNjLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgICB9IGVsc2UgaWYgKHZpZXdzQ29sdW1uU2VsZWN0RGVzYy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykpIHtcbiAgICAgIHZpZXdzQ29sdW1uU2VsZWN0RGVzYy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdEFzYy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcblxuICBjb25zdCBwcmljZUJ1dHRvbjogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmljZS1idXR0b24nKTtcbiAgY29uc3QgcHJpY2VJbnB1dHM6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpY2UtaW5wdXRzJyk7XG4gIHByaWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHByaWNlSW5wdXRzLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICB9KTtcblxuICBjb25zdCBkYXRlUmVjZWl2ZWRCdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlX3JlY2VpdmVkJyk7XG4gIGRhdGVSZWNlaXZlZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgfSk7XG5cbiAgY29uc3QgZG93bmxvYWRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQtYnV0dG9uJyk7XG4gIGNvbnN0IGRvd25sb2FkVHJpZ2dlcjogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCcpO1xuICBkb3dubG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkb3dubG9hZFRyaWdnZXIudmFsdWUgPSAndHJ1ZSc7XG4gICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xuXG4gIGNvbnN0IGV4Y2x1ZGVMaXN0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4Y2x1ZGUnKTtcbiAgY29uc3QgZGVsZXRlRnJvbVJlcG9ydEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICcuZGVsZXRlLWZyb20tcmVwb3J0JyxcbiAgKTtcbiAgZGVsZXRlRnJvbVJlcG9ydEJ1dHRvbnMuZm9yRWFjaCgoZGVsZXRlRnJvbVJlcG9ydDogRWxlbWVudCkgPT4ge1xuICAgIGRlbGV0ZUZyb21SZXBvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoZXhjbHVkZUxpc3QudmFsdWUgPT09ICdOb25lJykge1xuICAgICAgICBleGNsdWRlTGlzdC52YWx1ZSA9IGAke2RlbGV0ZUZyb21SZXBvcnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpfSxgO1xuICAgICAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXhjbHVkZUxpc3QudmFsdWUgKz0gYCR7ZGVsZXRlRnJvbVJlcG9ydC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyl9LGA7XG4gICAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==