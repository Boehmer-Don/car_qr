document.addEventListener('DOMContentLoaded', function () {
  const basic_plan: Element = document.querySelector('#basic_plan_card');
  const advanced_plan: Element = document.querySelector('#advanced_plan_card');
  const basicPlanButton: HTMLInputElement =
    document.querySelector('#basic_radio');
  const advancedPlanButton: HTMLInputElement =
    document.querySelector('#advanced_radio');
  console.log(basic_plan, advanced_plan);
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
const cleanGiftInput = document.querySelector('.clean_gift_input');
if (cleanGiftInput) {
  cleanGiftInput.addEventListener('input', (e: any) => {
    if (e.target.value) {
      const inputText = e.target.value.replace(/[^\w$\d\s.-]/gi, '');
      e.target.value = inputText;
    }
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

const pricingButton: Element = document.querySelector('#pricing_button');
if (pricingButton) {
  pricingButton.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#pricing').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

const contactButton: Element = document.querySelector('#contact_button');
if (contactButton) {
  contactButton.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#contacts').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

const firstArrowButton: Element = document.querySelector('#first_arrow');
if (firstArrowButton) {
  firstArrowButton.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#second_section').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

const secondArrowButtons = document.querySelectorAll('.second_arrow');

secondArrowButtons.forEach(secondArrowButton => {
  secondArrowButton.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#fourth_section').scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Select the elements to reveal
const revealElements = document.querySelectorAll('.reveal-element');

// Create an Intersection Observer instance
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('qr-code')) {
          entry.target.classList.add('flipInY');
          entry.target.classList.add('animated');
          entry.target.classList.add('reveal'); // Add the "reveal" class to trigger the animation
        } else {
          entry.target.classList.add('reveal'); // Add the "reveal" class to trigger the animation
          observer.unobserve(entry.target); // Stop observing once revealed
        }
      }
    });
  },
  {threshold: 0.5},
); // Adjust the threshold as needed

// Start observing each reveal element
revealElements.forEach(element => {
  observer.observe(element);
});

const landing_mobile_menu_button: HTMLButtonElement = document.querySelector(
  '#landing_mobile_menu_button',
);
const landing_mobile_menu: HTMLDivElement = document.querySelector(
  '#landing_mobile_menu',
);
const footer: HTMLElement = document.querySelector('footer');
const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section');
if (landing_mobile_menu_button) {
  landing_mobile_menu_button.addEventListener('click', () => {
    landing_mobile_menu.classList.toggle('hidden');
    footer.classList.toggle('hidden');
    sections.forEach(section => {
      section.classList.toggle('hidden');
    });
  });
}

const mobile_pricing: HTMLDivElement =
  document.querySelector('#mobile_pricing');
const mobile_contacts: HTMLDivElement =
  document.querySelector('#mobile_contact');

if (mobile_pricing) {
  mobile_pricing.addEventListener('click', () => {
    landing_mobile_menu.classList.toggle('hidden');
    footer.classList.toggle('hidden');
    sections.forEach(section => {
      section.classList.toggle('hidden');
    });
    document.querySelector('#pricing').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

if (mobile_contacts) {
  mobile_contacts.addEventListener('click', () => {
    landing_mobile_menu.classList.toggle('hidden');
    footer.classList.toggle('hidden');
    sections.forEach(section => {
      section.classList.toggle('hidden');
    });
    document.querySelector('#contacts').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

const mobileThemeButton: HTMLButtonElement = document.querySelector(
  '#theme-toggle-wrapper',
);
const mobileMenuButton: HTMLButtonElement = document.querySelector(
  '#mobile-menu-button',
);
if (mobileThemeButton) {
  mobileThemeButton.addEventListener('click', () => {
    mobileMenuButton.click();
  });
}
