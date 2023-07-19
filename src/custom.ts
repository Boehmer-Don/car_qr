document.addEventListener('DOMContentLoaded', function () {
  const basic_plan: Element = document.querySelector('#basic_plan_card');
  const advanced_plan: Element = document.querySelector('#advanced_plan_card');
  const basicPlanButton: HTMLInputElement =
    document.querySelector('#basic_radio');
  const advancedPlanButton: HTMLInputElement =
    document.querySelector('#advanced_radio');

  basic_plan.addEventListener('click', () => {
    basic_plan.classList.add('indigo');
    basic_plan.classList.add('text-white');
    advanced_plan.classList.remove('indigo');
    advanced_plan.classList.remove('text-white');

    // basicPlanButton.style.display = "none";

    if (basicPlanButton.checked == true) {
      basicPlanButton.checked = false;
    } else {
      basicPlanButton.checked = true;
      basicPlanButton.style.display = "none";
    }
  });

  advanced_plan.addEventListener('click', () => {
    advanced_plan.classList.add('indigo');
    advanced_plan.classList.add('text-white');
    basic_plan.classList.remove('indigo');
    basic_plan.classList.remove('text-white');

    // basicPlanButton.style.display = "none";

    if (advancedPlanButton.checked == true) {
      advancedPlanButton.checked = false;
    } else {
      advancedPlanButton.checked = true;
      advancedPlanButton.style.display = "none";
    }
  });
});
