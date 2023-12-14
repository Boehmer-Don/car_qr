/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./src/users_search_result.ts ***!
  \************************************/
var userSearchResults = document.querySelector('#users-result');
var usersSearchSuggestions = document.querySelectorAll('.users-search-suggestion');
if (userSearchResults.classList.contains('hidden')) {
    userSearchResults.classList.remove('hidden');
}
usersSearchSuggestions.forEach(function (e) {
    return e.addEventListener('click', function () {
        var userSearchInput = document.querySelector('#table-search-users-input');
        userSearchInput.value = e.innerHTML.trim();
        userSearchResults.classList.add('hidden');
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdXNlcnNfc2VhcmNoX3Jlc3VsdC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU0saUJBQWlCLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQzVELGVBQWUsQ0FDbEIsQ0FBQztBQUNGLElBQU0sc0JBQXNCLEdBQXFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDdEYsMEJBQTBCLENBQzdCLENBQUM7QUFFRixJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDaEQsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNoRDtBQUNELHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxXQUFDO0lBQzVCLFFBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDeEIsSUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQzVELDJCQUEyQixDQUM5QixDQUFDO1FBQ0YsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0FBTkYsQ0FNRSxDQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvdXNlcnNfc2VhcmNoX3Jlc3VsdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1c2VyU2VhcmNoUmVzdWx0czogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjdXNlcnMtcmVzdWx0J1xuKTtcbmNvbnN0IHVzZXJzU2VhcmNoU3VnZ2VzdGlvbnM6IE5vZGVMaXN0T2Y8SFRNTFBhcmFncmFwaEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAnLnVzZXJzLXNlYXJjaC1zdWdnZXN0aW9uJ1xuKTtcblxuaWYgKHVzZXJTZWFyY2hSZXN1bHRzLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcbiAgICB1c2VyU2VhcmNoUmVzdWx0cy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cbnVzZXJzU2VhcmNoU3VnZ2VzdGlvbnMuZm9yRWFjaChlID0+XG4gICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdXNlclNlYXJjaElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICcjdGFibGUtc2VhcmNoLXVzZXJzLWlucHV0JyxcbiAgICAgICAgKTtcbiAgICAgICAgdXNlclNlYXJjaElucHV0LnZhbHVlID0gZS5pbm5lckhUTUwudHJpbSgpO1xuICAgICAgICB1c2VyU2VhcmNoUmVzdWx0cy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KSxcbik7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==