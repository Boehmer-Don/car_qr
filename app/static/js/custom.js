/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/custom.ts ***!
  \***********************/
document.addEventListener('DOMContentLoaded', function () {
    var basic_plan = document.querySelector('#basic_plan_card');
    var advanced_plan = document.querySelector('#advanced_plan_card');
    var basicPlanButton = document.querySelector('#basic_radio');
    var advancedPlanButton = document.querySelector('#advanced_radio');
    basic_plan.addEventListener('click', function () {
        basic_plan.classList.add('indigo');
        basic_plan.classList.add('text-white');
        advanced_plan.classList.remove('indigo');
        advanced_plan.classList.remove('text-white');
        // basicPlanButton.style.display = "none";
        if (basicPlanButton.checked == true) {
            basicPlanButton.checked = false;
        }
        else {
            basicPlanButton.checked = true;
            basicPlanButton.style.display = "none";
        }
    });
    advanced_plan.addEventListener('click', function () {
        advanced_plan.classList.add('indigo');
        advanced_plan.classList.add('text-white');
        basic_plan.classList.remove('indigo');
        basic_plan.classList.remove('text-white');
        // basicPlanButton.style.display = "none";
        if (advancedPlanButton.checked == true) {
            advancedPlanButton.checked = false;
        }
        else {
            advancedPlanButton.checked = true;
            advancedPlanButton.style.display = "none";
        }
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY3VzdG9tLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO0lBQzVDLElBQU0sVUFBVSxHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN2RSxJQUFNLGFBQWEsR0FBWSxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDN0UsSUFBTSxlQUFlLEdBQ25CLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDekMsSUFBTSxrQkFBa0IsR0FDdEIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRTVDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDbkMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFN0MsMENBQTBDO1FBRTFDLElBQUksZUFBZSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDbkMsZUFBZSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDakM7YUFBTTtZQUNMLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQy9CLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUN4QztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUN0QyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxQywwQ0FBMEM7UUFFMUMsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ3RDLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDcEM7YUFBTTtZQUNMLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDbEMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDM0M7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2N1c3RvbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBjb25zdCBiYXNpY19wbGFuOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jhc2ljX3BsYW5fY2FyZCcpO1xuICBjb25zdCBhZHZhbmNlZF9wbGFuOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkdmFuY2VkX3BsYW5fY2FyZCcpO1xuICBjb25zdCBiYXNpY1BsYW5CdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYXNpY19yYWRpbycpO1xuICBjb25zdCBhZHZhbmNlZFBsYW5CdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZHZhbmNlZF9yYWRpbycpO1xuXG4gIGJhc2ljX3BsYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYmFzaWNfcGxhbi5jbGFzc0xpc3QuYWRkKCdpbmRpZ28nKTtcbiAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5hZGQoJ3RleHQtd2hpdGUnKTtcbiAgICBhZHZhbmNlZF9wbGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2luZGlnbycpO1xuICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LnJlbW92ZSgndGV4dC13aGl0ZScpO1xuXG4gICAgLy8gYmFzaWNQbGFuQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgIGlmIChiYXNpY1BsYW5CdXR0b24uY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICBiYXNpY1BsYW5CdXR0b24uY2hlY2tlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXNpY1BsYW5CdXR0b24uY2hlY2tlZCA9IHRydWU7XG4gICAgICBiYXNpY1BsYW5CdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfSk7XG5cbiAgYWR2YW5jZWRfcGxhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBhZHZhbmNlZF9wbGFuLmNsYXNzTGlzdC5hZGQoJ2luZGlnbycpO1xuICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LmFkZCgndGV4dC13aGl0ZScpO1xuICAgIGJhc2ljX3BsYW4uY2xhc3NMaXN0LnJlbW92ZSgnaW5kaWdvJyk7XG4gICAgYmFzaWNfcGxhbi5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LXdoaXRlJyk7XG5cbiAgICAvLyBiYXNpY1BsYW5CdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgaWYgKGFkdmFuY2VkUGxhbkJ1dHRvbi5jaGVja2VkID09IHRydWUpIHtcbiAgICAgIGFkdmFuY2VkUGxhbkJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkdmFuY2VkUGxhbkJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIGFkdmFuY2VkUGxhbkJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9