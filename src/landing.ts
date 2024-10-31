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
