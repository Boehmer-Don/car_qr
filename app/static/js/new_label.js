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
var makeInput = document.querySelector('#make-1');
var makeSuggestionP = document.querySelector('.make-suggestion');
if (makeInput) {
    makeInput.addEventListener('input', function (e) {
        makeContainer.classList.remove('hidden');
        var clonedMakeSuggestionParagraph = makeSuggestionP.cloneNode(true);
        clonedMakeSuggestionParagraph.innerHTML = e.target.value;
        makeContainer.appendChild(clonedMakeSuggestionParagraph);
    });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbmV3X2xhYmVsLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU1QixJQUFNLG9CQUFvQixHQUN4QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUVyRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFdBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsb0JBQW9CLENBQUMsT0FBTyxDQUFDLG1CQUFTO1lBQ3BDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILElBQU0sYUFBYSxHQUFtQixRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDaEYsSUFBTSxTQUFTLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEUsSUFBTSxlQUFlLEdBQ25CLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU3QyxJQUFJLFNBQVMsRUFBRTtJQUNiLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBQztRQUNuQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxJQUFJLDZCQUE2QixHQUMvQixlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBeUIsQ0FBQztRQUMxRCw2QkFBNkIsQ0FBQyxTQUFTLEdBQ3JDLENBQUMsQ0FBQyxNQUNILENBQUMsS0FBSyxDQUFDO1FBQ1IsYUFBYSxDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0NBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvbmV3X2xhYmVsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKCduZXdfbGFiZWwudHMnKTtcblxuY29uc3Qgc3VnZ2VzdGlvbkNvbnRhaW5lcnM6IE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1Z2dlc3Rpb24tY29udGFpbmVyJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgIGNvbnNvbGUubG9nKCdFc2NhcGUgcHJlc3NlZCcpO1xuICAgIHN1Z2dlc3Rpb25Db250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KTtcbiAgfVxufSk7XG5cbmNvbnN0IG1ha2VDb250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ha2UtY29udGFpbmVyJyk7XG5jb25zdCBtYWtlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFrZS0xJyk7XG5jb25zdCBtYWtlU3VnZ2VzdGlvblA6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ha2Utc3VnZ2VzdGlvbicpO1xuXG5pZiAobWFrZUlucHV0KSB7XG4gIG1ha2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGUgPT4ge1xuICAgIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgbGV0IGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICBtYWtlU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IChcbiAgICAgIGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgICApLnZhbHVlO1xuICAgIG1ha2VDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkTWFrZVN1Z2dlc3Rpb25QYXJhZ3JhcGgpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==