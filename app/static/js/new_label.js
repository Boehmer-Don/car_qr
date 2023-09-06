/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/new_label.ts ***!
  \**************************/
console.log('new_label.ts');
var makeContainer = document.querySelector('.make-container');
var makeInput = document.querySelector('#make-1');
var makeSuggestionP = document.querySelector('.make-suggestion');
if (makeInput) {
    makeInput.addEventListener('input', function (e) {
        console.log('makeInput changed');
        makeContainer.classList.remove('hidden');
        var clonedMakeSuggestionParagraph = makeSuggestionP.cloneNode(true);
        clonedMakeSuggestionParagraph.innerHTML = e.target.value;
        makeContainer.appendChild(clonedMakeSuggestionParagraph);
    });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbmV3X2xhYmVsLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU1QixJQUFNLGFBQWEsR0FBbUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2hGLElBQU0sU0FBUyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RFLElBQU0sZUFBZSxHQUNuQixRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFN0MsSUFBSSxTQUFTLEVBQUU7SUFDYixTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksNkJBQTZCLEdBQy9CLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUF5QixDQUFDO1FBQzFELDZCQUE2QixDQUFDLFNBQVMsR0FDckMsQ0FBQyxDQUFDLE1BQ0gsQ0FBQyxLQUFLLENBQUM7UUFDUixhQUFhLENBQUMsV0FBVyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9uZXdfbGFiZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ25ld19sYWJlbC50cycpO1xuXG5jb25zdCBtYWtlQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWtlLWNvbnRhaW5lcicpO1xuY29uc3QgbWFrZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21ha2UtMScpO1xuY29uc3QgbWFrZVN1Z2dlc3Rpb25QOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWtlLXN1Z2dlc3Rpb24nKTtcblxuaWYgKG1ha2VJbnB1dCkge1xuICBtYWtlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBlID0+IHtcbiAgICBjb25zb2xlLmxvZygnbWFrZUlucHV0IGNoYW5nZWQnKTtcbiAgICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIGxldCBjbG9uZWRNYWtlU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICAgICAgbWFrZVN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBjbG9uZWRNYWtlU3VnZ2VzdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSAoXG4gICAgICBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgKS52YWx1ZTtcbiAgICBtYWtlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=