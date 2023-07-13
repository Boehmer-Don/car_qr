document.addEventListener('DOMContentLoaded', function () {
    const basic_plan = document.querySelector("#basic_plan_card");
    const advanced_plan = document.querySelector("#advanced_plan_card");
    const basicPlanButton = document.querySelector("#basic_radio");
    const advancedPlanButton = document.querySelector("#advanced_radio");

    basic_plan.addEventListener("click", () => {
        basic_plan.classList.add("indigo");
        advanced_plan.classList.remove("indigo");

        // basicPlanButton.style.display = "none";

        if (basicPlanButton.checked == true) {
            basicPlanButton.checked = false;
        } else {
            basicPlanButton.checked = true;
        }
    });

    advanced_plan.addEventListener("click", () => {
        advanced_plan.classList.add("indigo");
        basic_plan.classList.remove("indigo");

        // basicPlanButton.style.display = "none";

        if (advancedPlanButton.checked == true) {
            advancedPlanButton.checked = false;
        } else {
            advancedPlanButton.checked = true;
        }
    });
});