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
            basicPlanButton.style.display = "none";
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
            advancedPlanButton.style.display = "none";
        }
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY3VzdG9tLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO0lBQzFDLElBQU0sVUFBVSxHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN2RSxJQUFNLGFBQWEsR0FBWSxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDN0UsSUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakYsSUFBTSxrQkFBa0IsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRXZGLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDakMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekMsMENBQTBDO1FBRTFDLElBQUksZUFBZSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDakMsZUFBZSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbkM7YUFBTTtZQUNILGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQy9CLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUMxQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUNwQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0QywwQ0FBMEM7UUFFMUMsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ3BDLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDdEM7YUFBTTtZQUNILGtCQUFrQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDbEMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDN0M7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2N1c3RvbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGJhc2ljX3BsYW46IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Jhc2ljX3BsYW5fY2FyZFwiKTtcbiAgICBjb25zdCBhZHZhbmNlZF9wbGFuOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZHZhbmNlZF9wbGFuX2NhcmRcIik7XG4gICAgY29uc3QgYmFzaWNQbGFuQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNiYXNpY19yYWRpb1wiKTtcbiAgICBjb25zdCBhZHZhbmNlZFBsYW5CdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkdmFuY2VkX3JhZGlvXCIpO1xuXG4gICAgYmFzaWNfcGxhbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5hZGQoXCJpbmRpZ29cIik7XG4gICAgICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LnJlbW92ZShcImluZGlnb1wiKTtcblxuICAgICAgICAvLyBiYXNpY1BsYW5CdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAgIGlmIChiYXNpY1BsYW5CdXR0b24uY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBiYXNpY1BsYW5CdXR0b24uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmFzaWNQbGFuQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgYmFzaWNQbGFuQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWR2YW5jZWRfcGxhbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBhZHZhbmNlZF9wbGFuLmNsYXNzTGlzdC5hZGQoXCJpbmRpZ29cIik7XG4gICAgICAgIGJhc2ljX3BsYW4uY2xhc3NMaXN0LnJlbW92ZShcImluZGlnb1wiKTtcblxuICAgICAgICAvLyBiYXNpY1BsYW5CdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAgIGlmIChhZHZhbmNlZFBsYW5CdXR0b24uY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBhZHZhbmNlZFBsYW5CdXR0b24uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9