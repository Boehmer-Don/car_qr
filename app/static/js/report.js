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
        console.log('viewsOptions selected');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVwb3J0LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO0lBQzVDLElBQU0sVUFBVSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdFLElBQU0sVUFBVSxHQUNkLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM3QyxJQUFNLFdBQVcsR0FDZixRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFDLElBQU0sa0JBQWtCLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQ2xFLHVCQUF1QixDQUN4QixDQUFDO0lBRUYsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtRQUNwQyxJQUFJLE1BQU0sR0FBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsb0JBQW9CLEVBQUU7WUFDMUIsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUMsQ0FBQztTQUN2RCxDQUFDO2FBQ0MsSUFBSSxDQUFDLGtCQUFRLElBQUksZUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQzthQUNqQyxJQUFJLENBQUMsY0FBSTtZQUNSLE1BQU0sQ0FBQyxJQUFJLE9BQVgsTUFBTSxFQUFTLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsV0FBVyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBTTtnQkFDbkIsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkQsYUFBYSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0JBQzdCLGFBQWEsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2dCQUNuQyxXQUFXLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLGVBQUs7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1FBQ3JDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtRQUNwQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUVILElBQU0sWUFBWSxHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUNILGtCQUFrQjtJQUNsQixJQUFNLGlCQUFpQixHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNsRixrQkFBa0I7SUFDbEIsSUFBTSxtQkFBbUIsR0FBWSxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pFLGtCQUFrQjtJQUNsQixJQUFNLG9CQUFvQixHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0Usa0JBQWtCO0lBQ2xCLElBQU0scUJBQXFCLEdBQVksUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3RSxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDMUMsSUFBSSxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDaEQsbUJBQW1CLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hELHFCQUFxQixDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDNUQ7YUFBTSxJQUFJLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN4RCxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQscUJBQXFCLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUM1RDthQUFNLElBQUkscUJBQXFCLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pELHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzNEO1FBQ0Qsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFNLFdBQVcsR0FBWSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JFLElBQU0sV0FBVyxHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckUsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUNwQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUVILElBQU0sa0JBQWtCLEdBQ3RCLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDM0Msa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9yZXBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZmlsdGVyTWFrZTogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLW1ha2UnKTtcbiAgY29uc3QgZmlsdGVyVHlwZTogSFRNTFNlbGVjdEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0eXBlX29mX3ZlaGljbGUnKTtcbiAgY29uc3QgZmlsdGVyTW9kZWw6IEhUTUxTZWxlY3RFbGVtZW50ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLW1vZGVsJyk7XG4gIGNvbnN0IGFwcGx5RmlsdGVyc0J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjYXBwbHktZmlsdGVycy1idXR0b24nLFxuICApO1xuXG4gIGZpbHRlck1ha2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGxldCBtb2RlbHM6IEFycmF5PHN0cmluZz4gPSBbJ0FsbCddO1xuICAgIGZldGNoKCcvcmVwb3J0L2dldF9tb2RlbHMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWFrZVNlbGVjdGVkOiBmaWx0ZXJNYWtlLnZhbHVlfSksXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4gICAgICAgIGZpbHRlck1vZGVsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBtb2RlbHMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICBvcHRpb25FbGVtZW50LnZhbHVlID0gb3B0aW9uO1xuICAgICAgICAgIG9wdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSBvcHRpb247XG4gICAgICAgICAgZmlsdGVyTW9kZWwuYXBwZW5kQ2hpbGQob3B0aW9uRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIGRhdGEgdG8gRmxhc2s6JywgZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGZpbHRlck1vZGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgfSk7XG5cbiAgZmlsdGVyVHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xuXG4gIGNvbnN0IHZpZXdzT3B0aW9uczogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3c19vcHRpb25zJyk7XG4gIHZpZXdzT3B0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3ZpZXdzT3B0aW9ucyBzZWxlY3RlZCcpO1xuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uQnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWNvbHVtbi1idXR0b24nKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0TkE6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlld3MtbmEnKTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHZpZXdzQ29sdW1uU2VsZWN0QXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWFzYycpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgY29uc3Qgdmlld3NDb2x1bW5TZWxlY3REZXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWRlc2MnKTtcbiAgdmlld3NDb2x1bW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKHZpZXdzQ29sdW1uU2VsZWN0TkEuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdE5BLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIHZpZXdzQ29sdW1uU2VsZWN0RGVzYy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgfSBlbHNlIGlmICh2aWV3c0NvbHVtblNlbGVjdEFzYy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykpIHtcbiAgICAgIHZpZXdzQ29sdW1uU2VsZWN0QXNjLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIHZpZXdzQ29sdW1uU2VsZWN0RGVzYy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgfSBlbHNlIGlmICh2aWV3c0NvbHVtblNlbGVjdERlc2MuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICB2aWV3c0NvbHVtblNlbGVjdERlc2MucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgdmlld3NDb2x1bW5TZWxlY3RBc2Muc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgIH1cbiAgICBhcHBseUZpbHRlcnNCdXR0b24uY2xpY2soKTtcbiAgfSk7XG5cbiAgY29uc3QgcHJpY2VCdXR0b246IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpY2UtYnV0dG9uJyk7XG4gIGNvbnN0IHByaWNlSW5wdXRzOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaWNlLWlucHV0cycpO1xuICBwcmljZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwcmljZUlucHV0cy5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgfSk7XG5cbiAgY29uc3QgZGF0ZVJlY2VpdmVkQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZV9yZWNlaXZlZCcpO1xuICBkYXRlUmVjZWl2ZWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgYXBwbHlGaWx0ZXJzQnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=