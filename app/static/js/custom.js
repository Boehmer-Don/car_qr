/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/custom.ts ***!
  \***********************/
document.addEventListener('DOMContentLoaded', function () {
    var basic_plan = document.querySelector("#basic_plan_card");
    var advanced_plan = document.querySelector("#advanced_plan_card");
    var basicPlanButton = document.querySelector("#basic_radio");
    var advancedPlanButton = document.querySelector("#advanced_radio");
    basic_plan.addEventListener("click", function () {
        basic_plan.classList.add("indigo");
        advanced_plan.classList.remove("indigo");
        // basicPlanButton.style.display = "none";
        if (basicPlanButton.checked == true) {
            basicPlanButton.checked = false;
        }
        else {
            basicPlanButton.checked = true;
        }
    });
    advanced_plan.addEventListener("click", function () {
        advanced_plan.classList.add("indigo");
        basic_plan.classList.remove("indigo");
        // basicPlanButton.style.display = "none";
        if (advancedPlanButton.checked == true) {
            advancedPlanButton.checked = false;
        }
        else {
            advancedPlanButton.checked = true;
        }
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY3VzdG9tLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO0lBQzFDLElBQU0sVUFBVSxHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN2RSxJQUFNLGFBQWEsR0FBWSxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDN0UsSUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakYsSUFBTSxrQkFBa0IsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRXZGLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDakMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekMsMENBQTBDO1FBRTFDLElBQUksZUFBZSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDakMsZUFBZSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbkM7YUFBTTtZQUNILGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQ3BDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRDLDBDQUEwQztRQUUxQyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDcEMsa0JBQWtCLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN0QzthQUFNO1lBQ0gsa0JBQWtCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvY3VzdG9tLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYmFzaWNfcGxhbjogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmFzaWNfcGxhbl9jYXJkXCIpO1xuICAgIGNvbnN0IGFkdmFuY2VkX3BsYW46IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkdmFuY2VkX3BsYW5fY2FyZFwiKTtcbiAgICBjb25zdCBiYXNpY1BsYW5CdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Jhc2ljX3JhZGlvXCIpO1xuICAgIGNvbnN0IGFkdmFuY2VkUGxhbkJ1dHRvbjogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWR2YW5jZWRfcmFkaW9cIik7XG5cbiAgICBiYXNpY19wbGFuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGJhc2ljX3BsYW4uY2xhc3NMaXN0LmFkZChcImluZGlnb1wiKTtcbiAgICAgICAgYWR2YW5jZWRfcGxhbi5jbGFzc0xpc3QucmVtb3ZlKFwiaW5kaWdvXCIpO1xuXG4gICAgICAgIC8vIGJhc2ljUGxhbkJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICAgICAgaWYgKGJhc2ljUGxhbkJ1dHRvbi5jaGVja2VkID09IHRydWUpIHtcbiAgICAgICAgICAgIGJhc2ljUGxhbkJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNpY1BsYW5CdXR0b24uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFkdmFuY2VkX3BsYW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgYWR2YW5jZWRfcGxhbi5jbGFzc0xpc3QuYWRkKFwiaW5kaWdvXCIpO1xuICAgICAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmRpZ29cIik7XG5cbiAgICAgICAgLy8gYmFzaWNQbGFuQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICBpZiAoYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkdmFuY2VkUGxhbkJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9