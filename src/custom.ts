document.addEventListener('DOMContentLoaded', function () {
  const basic_plan: Element = document.querySelector('#basic_plan_card');
  const advanced_plan: Element = document.querySelector('#advanced_plan_card');
  const basicPlanButton: HTMLInputElement =
    document.querySelector('#basic_radio');
  const advancedPlanButton: HTMLInputElement =
    document.querySelector('#advanced_radio');

  const planChosen: HTMLDivElement = document.querySelector('#plan_chosen');
  if (planChosen) {
    const planChosenData = planChosen.dataset.plan;

    if (planChosenData != 'Advanced Plan') {
      basic_plan.classList.add('indigo');
      basic_plan.classList.add('text-white');
      advanced_plan.classList.remove('indigo');
      advanced_plan.classList.remove('text-white');
      basicPlanButton.checked = true;
    } else {
      advanced_plan.classList.add('indigo');
      advanced_plan.classList.add('text-white');
      basic_plan.classList.remove('indigo');
      basic_plan.classList.remove('text-white');
      advancedPlanButton.checked = true;
    }

    basic_plan.addEventListener('click', () => {
      basic_plan.classList.add('indigo');
      basic_plan.classList.add('text-white');
      advanced_plan.classList.remove('indigo');
      advanced_plan.classList.remove('text-white');

      if (basicPlanButton.checked == true) {
        basicPlanButton.checked = false;
      } else {
        basicPlanButton.checked = true;
        basicPlanButton.style.display = 'none';
      }
    });

    advanced_plan.addEventListener('click', () => {
      advanced_plan.classList.add('indigo');
      advanced_plan.classList.add('text-white');
      basic_plan.classList.remove('indigo');
      basic_plan.classList.remove('text-white');

      if (advancedPlanButton.checked == true) {
        advancedPlanButton.checked = false;
      } else {
        advancedPlanButton.checked = true;
        advancedPlanButton.style.display = 'none';
      }
    });
  }
});

const cleanEmail: HTMLInputElement =
  document.querySelector('.clean_email_input');
if (cleanEmail) {
  cleanEmail.addEventListener('input', (e: any) => {
    if (e.target.value) {
      const inputText = e.target.value.replace(/[^\w\d_.@-]/gi, '');
      e.target.value = inputText;
    }
  });
}

const cleanNameInputs = document.querySelectorAll('.clean_name_input');
if (cleanNameInputs) {
  cleanNameInputs.forEach(cleanNameInput => {
    cleanNameInput.addEventListener('input', (e: any) => {
      if (e.target.value) {
        const inputText = e.target.value.replace(/[^\w\d\s.-]/gi, '');
        e.target.value = inputText;
      }
    });
  });
}

const cleanNumberInputs: NodeListOf<HTMLInputElement> =
  document.querySelectorAll('.clean_number_input');
cleanNumberInputs.forEach(cleanNumberInput => {
  cleanNumberInput.addEventListener('input', (e: any) => {
    if (e.target.value) {
      const inputText = e.target.value.replace(/[^\d]/gi, '');
      e.target.value = inputText;
    }
  });
});

const cleanPhone: HTMLInputElement =
  document.querySelector('.clean_phone_input');
if (cleanPhone) {
  cleanPhone.addEventListener('input', (e: any) => {
    if (e.target.value) {
      const x = e.target.value
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value =
        x[1] +
        (x[2] ? `-${x[2]}` : '') +
        (x[3] ? `-${x[3]}` : '') +
        (x[4] ? `-${x[4]}` : '');
    }
  });
}
