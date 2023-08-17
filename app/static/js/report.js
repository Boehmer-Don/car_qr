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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRyxNQUFNLENBQUM7UUFDL0Isa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFNLFdBQVcsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RSxJQUFNLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDdkQscUJBQXFCLENBQ3RCLENBQUM7SUFDRix1QkFBdUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxnQkFBeUI7UUFDeEQsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQ3pDLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxNQUFNLEVBQUU7Z0JBQ2hDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsVUFBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQUcsQ0FBQztnQkFDdkUsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzNCLE9BQU87YUFDUjtZQUNELFdBQVcsQ0FBQyxLQUFLLElBQUksVUFBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQUcsQ0FBQztZQUN4RSxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcmVwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGZpbHRlck1ha2U6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlci1tYWtlJyk7XG4gIGNvbnN0IGZpbHRlclR5cGU6IEhUTUxTZWxlY3RFbGVtZW50ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdHlwZV9vZl92ZWhpY2xlJyk7XG4gIGNvbnN0IGZpbHRlck1vZGVsOiBIVE1MU2VsZWN0RWxlbWVudCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlci1tb2RlbCcpO1xuICBjb25zdCBhcHBseUZpbHRlcnNCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI2FwcGx5LWZpbHRlcnMtYnV0dG9uJyxcbiAgKTtcblxuICBmaWx0ZXJNYWtlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gWydBbGwnXTtcbiAgICBmZXRjaCgnL3JlcG9ydC9nZXRfbW9kZWxzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VTZWxlY3RlZDogZmlsdGVyTWFrZS52YWx1ZX0pLFxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgbW9kZWxzLnB1c2goLi4uZGF0YS5tb2RlbHMpO1xuICAgICAgICBmaWx0ZXJNb2RlbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbW9kZWxzLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICBjb25zdCBvcHRpb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgb3B0aW9uRWxlbWVudC52YWx1ZSA9IG9wdGlvbjtcbiAgICAgICAgICBvcHRpb25FbGVtZW50LnRleHRDb250ZW50ID0gb3B0aW9uO1xuICAgICAgICAgIGZpbHRlck1vZGVsLmFwcGVuZENoaWxkKG9wdGlvbkVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyBkYXRhIHRvIEZsYXNrOicsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBmaWx0ZXJNb2RlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xuXG4gIGZpbHRlclR5cGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcblxuICBjb25zdCB2aWV3c09wdGlvbnM6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlld3Nfb3B0aW9ucycpO1xuICB2aWV3c09wdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uQnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWNvbHVtbi1idXR0b24nKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0TkE6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlld3MtbmEnKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0QXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWFzYycpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgY29uc3Qgdmlld3NDb2x1bW5TZWxlY3REZXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWRlc2MnKTtcbiAgdmlld3NDb2x1bW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKHZpZXdzQ29sdW1uU2VsZWN0QXNjLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgdmlld3NDb2x1bW5TZWxlY3RBc2MucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgdmlld3NDb2x1bW5TZWxlY3REZXNjLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgICB9IGVsc2UgaWYgKHZpZXdzQ29sdW1uU2VsZWN0RGVzYy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykpIHtcbiAgICAgIHZpZXdzQ29sdW1uU2VsZWN0RGVzYy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdEFzYy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcblxuICBjb25zdCBwcmljZUJ1dHRvbjogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmljZS1idXR0b24nKTtcbiAgY29uc3QgcHJpY2VJbnB1dHM6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpY2UtaW5wdXRzJyk7XG4gIHByaWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHByaWNlSW5wdXRzLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICB9KTtcblxuICBjb25zdCBkYXRlUmVjZWl2ZWRCdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlX3JlY2VpdmVkJyk7XG4gIGRhdGVSZWNlaXZlZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgfSk7XG5cbiAgY29uc3QgZG93bmxvYWRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQtYnV0dG9uJyk7XG4gIGNvbnN0IGRvd25sb2FkVHJpZ2dlcjogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCcpO1xuICBkb3dubG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkb3dubG9hZFRyaWdnZXIudmFsdWUgPSAndHJ1ZSc7XG4gICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xuXG4gIGNvbnN0IGV4Y2x1ZGVMaXN0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4Y2x1ZGUnKTtcbiAgY29uc3QgZGVsZXRlRnJvbVJlcG9ydEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICcuZGVsZXRlLWZyb20tcmVwb3J0JyxcbiAgKTtcbiAgZGVsZXRlRnJvbVJlcG9ydEJ1dHRvbnMuZm9yRWFjaCgoZGVsZXRlRnJvbVJlcG9ydDogRWxlbWVudCkgPT4ge1xuICAgIGRlbGV0ZUZyb21SZXBvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoZXhjbHVkZUxpc3QudmFsdWUgPT09ICdOb25lJykge1xuICAgICAgICBleGNsdWRlTGlzdC52YWx1ZSA9IGAke2RlbGV0ZUZyb21SZXBvcnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpfSxgO1xuICAgICAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXhjbHVkZUxpc3QudmFsdWUgKz0gYCR7ZGVsZXRlRnJvbVJlcG9ydC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyl9LGA7XG4gICAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==