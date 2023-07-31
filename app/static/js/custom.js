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
    var planChosen = document.querySelector('#plan_chosen');
    var planChosenData = planChosen.dataset.plan;
    console.log(planChosenData);
    if (planChosenData != "advanced") {
        basic_plan.classList.add('indigo');
        basic_plan.classList.add('text-white');
        advanced_plan.classList.remove('indigo');
        advanced_plan.classList.remove('text-white');
        basicPlanButton.checked = true;
    }
    else {
        advanced_plan.classList.add('indigo');
        advanced_plan.classList.add('text-white');
        basic_plan.classList.remove('indigo');
        basic_plan.classList.remove('text-white');
        advancedPlanButton.checked = true;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0wsa0JBQWtCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNsQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUMzQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvY3VzdG9tLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJhc2ljX3BsYW46IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmFzaWNfcGxhbl9jYXJkJyk7XG4gIGNvbnN0IGFkdmFuY2VkX3BsYW46IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWR2YW5jZWRfcGxhbl9jYXJkJyk7XG4gIGNvbnN0IGJhc2ljUGxhbkJ1dHRvbjogSFRNTElucHV0RWxlbWVudCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jhc2ljX3JhZGlvJyk7XG4gIGNvbnN0IGFkdmFuY2VkUGxhbkJ1dHRvbjogSFRNTElucHV0RWxlbWVudCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkdmFuY2VkX3JhZGlvJyk7XG5cbiAgY29uc3QgcGxhbkNob3NlbjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxhbl9jaG9zZW4nKTtcbiAgdmFyIHBsYW5DaG9zZW5EYXRhID0gcGxhbkNob3Nlbi5kYXRhc2V0LnBsYW47XG4gIGNvbnNvbGUubG9nKHBsYW5DaG9zZW5EYXRhKTtcblxuICBpZiAocGxhbkNob3NlbkRhdGEgIT0gXCJhZHZhbmNlZFwiKSB7XG4gICAgYmFzaWNfcGxhbi5jbGFzc0xpc3QuYWRkKCdpbmRpZ28nKTtcbiAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5hZGQoJ3RleHQtd2hpdGUnKTtcbiAgICBhZHZhbmNlZF9wbGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2luZGlnbycpO1xuICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LnJlbW92ZSgndGV4dC13aGl0ZScpO1xuICAgIGJhc2ljUGxhbkJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBhZHZhbmNlZF9wbGFuLmNsYXNzTGlzdC5hZGQoJ2luZGlnbycpO1xuICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LmFkZCgndGV4dC13aGl0ZScpO1xuICAgIGJhc2ljX3BsYW4uY2xhc3NMaXN0LnJlbW92ZSgnaW5kaWdvJyk7XG4gICAgYmFzaWNfcGxhbi5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LXdoaXRlJyk7XG4gICAgYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xuICB9XG5cbiAgYmFzaWNfcGxhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5hZGQoJ2luZGlnbycpO1xuICAgIGJhc2ljX3BsYW4uY2xhc3NMaXN0LmFkZCgndGV4dC13aGl0ZScpO1xuICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LnJlbW92ZSgnaW5kaWdvJyk7XG4gICAgYWR2YW5jZWRfcGxhbi5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LXdoaXRlJyk7XG5cbiAgICAvLyBiYXNpY1BsYW5CdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgaWYgKGJhc2ljUGxhbkJ1dHRvbi5jaGVja2VkID09IHRydWUpIHtcbiAgICAgIGJhc2ljUGxhbkJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhc2ljUGxhbkJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIGJhc2ljUGxhbkJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9KTtcblxuICBhZHZhbmNlZF9wbGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LmFkZCgnaW5kaWdvJyk7XG4gICAgYWR2YW5jZWRfcGxhbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LXdoaXRlJyk7XG4gICAgYmFzaWNfcGxhbi5jbGFzc0xpc3QucmVtb3ZlKCdpbmRpZ28nKTtcbiAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtd2hpdGUnKTtcblxuICAgIC8vIGJhc2ljUGxhbkJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICBpZiAoYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=