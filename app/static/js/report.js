/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/report.ts ***!
  \***********************/
document.addEventListener('DOMContentLoaded', function () {
    var filterMake = document.querySelector('#filter-make');
    var filterModel = document.querySelector('#filter-model');
    var applyFiltersButton = document.querySelector('#apply-filters-button');
    filterMake.addEventListener('change', function () {
        var models = ['All'];
        fetch('/report/makefilter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ makeSelected: filterMake.value }),
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            models.push.apply(models, data.models);
            console.log('Response from Flask server:', models);
            filterModel.innerHTML = '';
            models.forEach(function (option) {
                var optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                filterModel.appendChild(optionElement);
            });
            setTimeout(function () {
                applyFiltersButton.click();
            }, 2000);
        })
            .catch(function (error) {
            console.error('Error sending data to Flask:', error);
        });
    });
    var viewsButton = document.querySelector('#views-button');
    var viewsArrowDown = document.querySelector('#views-arrow-down');
    var viewsArrowUp = document.querySelector('#views-arrow-up');
    var viewsSelectNA = document.querySelector('#views-na');
    var viewsSelectAsc = document.querySelector('#views-asc');
    var viewsSelectDesc = document.querySelector('#views-desc');
    viewsButton.addEventListener('click', function () {
        viewsArrowDown.classList.toggle('hidden');
        viewsArrowUp.classList.toggle('hidden');
        if (viewsSelectNA.hasAttribute('selected')) {
            console.log('NA');
            viewsSelectNA.removeAttribute('selected');
            viewsSelectDesc.setAttribute('selected', 'selected');
        }
        else if (viewsSelectAsc.hasAttribute('selected')) {
            console.log('Asc');
            viewsSelectAsc.removeAttribute('selected');
            viewsSelectDesc.setAttribute('selected', 'selected');
        }
        else if (viewsSelectDesc.hasAttribute('selected')) {
            console.log('Desc');
            viewsSelectDesc.removeAttribute('selected');
            viewsSelectAsc.setAttribute('selected', 'selected');
        }
        applyFiltersButton.click();
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDdEQ7YUFBTSxJQUFJLGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixjQUFjLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLGVBQWUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ3REO2FBQU0sSUFBSSxlQUFlLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsZUFBZSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNyRDtRQUNELGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcmVwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGZpbHRlck1ha2U6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlci1tYWtlJyk7XG4gIGNvbnN0IGZpbHRlck1vZGVsOiBIVE1MU2VsZWN0RWxlbWVudCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlci1tb2RlbCcpO1xuICBjb25zdCBhcHBseUZpbHRlcnNCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI2FwcGx5LWZpbHRlcnMtYnV0dG9uJyxcbiAgKTtcblxuICBmaWx0ZXJNYWtlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gWydBbGwnXTtcbiAgICBmZXRjaCgnL3JlcG9ydC9tYWtlZmlsdGVyJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VTZWxlY3RlZDogZmlsdGVyTWFrZS52YWx1ZX0pLFxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgbW9kZWxzLnB1c2goLi4uZGF0YS5tb2RlbHMpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcG9uc2UgZnJvbSBGbGFzayBzZXJ2ZXI6JywgbW9kZWxzKTtcbiAgICAgICAgZmlsdGVyTW9kZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1vZGVscy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgIG9wdGlvbkVsZW1lbnQudmFsdWUgPSBvcHRpb247XG4gICAgICAgICAgb3B0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICAgICAgICBmaWx0ZXJNb2RlbC5hcHBlbmRDaGlsZChvcHRpb25FbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIGRhdGEgdG8gRmxhc2s6JywgZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHZpZXdzQnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWJ1dHRvbicpO1xuICBjb25zdCB2aWV3c0Fycm93RG93bjogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3cy1hcnJvdy1kb3duJyk7XG4gIGNvbnN0IHZpZXdzQXJyb3dVcDogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3cy1hcnJvdy11cCcpO1xuICBjb25zdCB2aWV3c1NlbGVjdE5BOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLW5hJyk7XG4gIGNvbnN0IHZpZXdzU2VsZWN0QXNjOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdzLWFzYycpO1xuICBjb25zdCB2aWV3c1NlbGVjdERlc2M6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlld3MtZGVzYycpO1xuICB2aWV3c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB2aWV3c0Fycm93RG93bi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB2aWV3c0Fycm93VXAuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgaWYgKHZpZXdzU2VsZWN0TkEuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICBjb25zb2xlLmxvZygnTkEnKTtcblxuICAgICAgdmlld3NTZWxlY3ROQS5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB2aWV3c1NlbGVjdERlc2Muc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgIH0gZWxzZSBpZiAodmlld3NTZWxlY3RBc2MuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICBjb25zb2xlLmxvZygnQXNjJyk7XG4gICAgICB2aWV3c1NlbGVjdEFzYy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB2aWV3c1NlbGVjdERlc2Muc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgIH0gZWxzZSBpZiAodmlld3NTZWxlY3REZXNjLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgY29uc29sZS5sb2coJ0Rlc2MnKTtcbiAgICAgIHZpZXdzU2VsZWN0RGVzYy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB2aWV3c1NlbGVjdEFzYy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGFwcGx5RmlsdGVyc0J1dHRvbi5jbGljaygpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9