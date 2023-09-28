/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/custom.ts ***!
  \***********************/
// document.addEventListener('DOMContentLoaded', function () {
//   const basic_plan: Element = document.querySelector('#basic_plan_card');
//   const advanced_plan: Element = document.querySelector('#advanced_plan_card');
//   const basicPlanButton: HTMLInputElement =
//     document.querySelector('#basic_radio');
//   const advancedPlanButton: HTMLInputElement =
//     document.querySelector('#advanced_radio');
//   const planChosen: HTMLDivElement = document.querySelector('#plan_chosen');
//   if (planChosen) {
//     const planChosenData = planChosen.dataset.plan;
//     if (planChosenData != 'Advanced Plan') {
//       basic_plan.classList.add('indigo');
//       basic_plan.classList.add('text-white');
//       advanced_plan.classList.remove('indigo');
//       advanced_plan.classList.remove('text-white');
//       basicPlanButton.checked = true;
//     } else {
//       advanced_plan.classList.add('indigo');
//       advanced_plan.classList.add('text-white');
//       basic_plan.classList.remove('indigo');
//       basic_plan.classList.remove('text-white');
//       advancedPlanButton.checked = true;
//     }
//     basic_plan.addEventListener('click', () => {
//       basic_plan.classList.add('indigo');
//       basic_plan.classList.add('text-white');
//       advanced_plan.classList.remove('indigo');
//       advanced_plan.classList.remove('text-white');
//       if (basicPlanButton.checked == true) {
//         basicPlanButton.checked = false;
//       } else {
//         basicPlanButton.checked = true;
//         basicPlanButton.style.display = 'none';
//       }
//     });
//     advanced_plan.addEventListener('click', () => {
//       advanced_plan.classList.add('indigo');
//       advanced_plan.classList.add('text-white');
//       basic_plan.classList.remove('indigo');
//       basic_plan.classList.remove('text-white');
//       if (advancedPlanButton.checked == true) {
//         advancedPlanButton.checked = false;
//       } else {
//         advancedPlanButton.checked = true;
//         advancedPlanButton.style.display = 'none';
//       }
//     });
//   }
// });
var cleanEmail = document.querySelector('.clean_email_input');
if (cleanEmail) {
    cleanEmail.addEventListener('input', function (e) {
        if (e.target.value) {
            var inputText = e.target.value.replace(/[^\w\d_.@-]/gi, '');
            e.target.value = inputText;
        }
    });
}
var cleanNameInputs = document.querySelectorAll('.clean_name_input');
if (cleanNameInputs) {
    cleanNameInputs.forEach(function (cleanNameInput) {
        cleanNameInput.addEventListener('input', function (e) {
            if (e.target.value) {
                var inputText = e.target.value.replace(/[^\w\d\s.-]/gi, '');
                e.target.value = inputText;
            }
        });
    });
}
var cleanGiftInput = document.querySelector('.clean_gift_input');
if (cleanGiftInput) {
    cleanGiftInput.addEventListener('input', function (e) {
        if (e.target.value) {
            var inputText = e.target.value.replace(/[^\w$\d\s.-]/gi, '');
            e.target.value = inputText;
        }
    });
}
var cleanNumberInputs = document.querySelectorAll('.clean_number_input');
cleanNumberInputs.forEach(function (cleanNumberInput) {
    cleanNumberInput.addEventListener('input', function (e) {
        if (e.target.value) {
            var inputText = e.target.value.replace(/[^\d]/gi, '');
            e.target.value = inputText;
        }
    });
});
var cleanPhone = document.querySelector('.clean_phone_input');
if (cleanPhone) {
    cleanPhone.addEventListener('input', function (e) {
        if (e.target.value) {
            var x = e.target.value
                .replace(/\D/g, '')
                .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value =
                x[1] +
                    (x[2] ? "-".concat(x[2]) : '') +
                    (x[3] ? "-".concat(x[3]) : '') +
                    (x[4] ? "-".concat(x[4]) : '');
        }
    });
}
var pricingButton = document.querySelector('#pricing_button');
if (pricingButton) {
    pricingButton.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#pricing').scrollIntoView({
            behavior: 'smooth',
        });
    });
}
var contactButton = document.querySelector('#contact_button');
if (contactButton) {
    contactButton.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#contacts').scrollIntoView({
            behavior: 'smooth',
        });
    });
}
var firstArrowButton = document.querySelector('#first_arrow');
if (firstArrowButton) {
    firstArrowButton.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#second_section').scrollIntoView({
            behavior: 'smooth',
        });
    });
}
var secondArrowButtons = document.querySelectorAll('.second_arrow');
secondArrowButtons.forEach(function (secondArrowButton) {
    secondArrowButton.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#fourth_section').scrollIntoView({
            behavior: 'smooth',
        });
    });
});
// Select the elements to reveal
var revealElements = document.querySelectorAll('.reveal-element');
// Create an Intersection Observer instance
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('qr-code')) {
                entry.target.classList.add('flipInY');
                entry.target.classList.add('animated');
                entry.target.classList.add('reveal'); // Add the "reveal" class to trigger the animation
            }
            else {
                entry.target.classList.add('reveal'); // Add the "reveal" class to trigger the animation
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        }
    });
}, { threshold: 0.5 }); // Adjust the threshold as needed
// Start observing each reveal element
revealElements.forEach(function (element) {
    observer.observe(element);
});
var landing_mobile_menu_button = document.querySelector('#landing_mobile_menu_button');
var landing_mobile_menu = document.querySelector('#landing_mobile_menu');
var footer = document.querySelector('footer');
var sections = document.querySelectorAll('section');
if (landing_mobile_menu_button) {
    landing_mobile_menu_button.addEventListener('click', function () {
        landing_mobile_menu.classList.toggle('hidden');
        footer.classList.toggle('hidden');
        sections.forEach(function (section) {
            section.classList.toggle('hidden');
        });
    });
}
var mobile_pricing = document.querySelector('#mobile_pricing');
var mobile_contacts = document.querySelector('#mobile_contact');
if (mobile_pricing) {
    mobile_pricing.addEventListener('click', function () {
        landing_mobile_menu.classList.toggle('hidden');
        footer.classList.toggle('hidden');
        sections.forEach(function (section) {
            section.classList.toggle('hidden');
        });
        document.querySelector('#pricing').scrollIntoView({
            behavior: 'smooth',
        });
    });
}
if (mobile_contacts) {
    mobile_contacts.addEventListener('click', function () {
        landing_mobile_menu.classList.toggle('hidden');
        footer.classList.toggle('hidden');
        sections.forEach(function (section) {
            section.classList.toggle('hidden');
        });
        document.querySelector('#contacts').scrollIntoView({
            behavior: 'smooth',
        });
    });
}
var mobileThemeButton = document.querySelector('#theme-toggle-wrapper');
var mobileMenuButton = document.querySelector('#mobile-menu-button');
if (mobileThemeButton) {
    mobileThemeButton.addEventListener('click', function () {
        mobileMenuButton.click();
    });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY3VzdG9tLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQThEO0FBQzlELDRFQUE0RTtBQUM1RSxrRkFBa0Y7QUFDbEYsOENBQThDO0FBQzlDLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQsaURBQWlEO0FBRWpELCtFQUErRTtBQUMvRSxzQkFBc0I7QUFDdEIsc0RBQXNEO0FBRXRELCtDQUErQztBQUMvQyw0Q0FBNEM7QUFDNUMsZ0RBQWdEO0FBQ2hELGtEQUFrRDtBQUNsRCxzREFBc0Q7QUFDdEQsd0NBQXdDO0FBQ3hDLGVBQWU7QUFDZiwrQ0FBK0M7QUFDL0MsbURBQW1EO0FBQ25ELCtDQUErQztBQUMvQyxtREFBbUQ7QUFDbkQsMkNBQTJDO0FBQzNDLFFBQVE7QUFFUixtREFBbUQ7QUFDbkQsNENBQTRDO0FBQzVDLGdEQUFnRDtBQUNoRCxrREFBa0Q7QUFDbEQsc0RBQXNEO0FBRXRELCtDQUErQztBQUMvQywyQ0FBMkM7QUFDM0MsaUJBQWlCO0FBQ2pCLDBDQUEwQztBQUMxQyxrREFBa0Q7QUFDbEQsVUFBVTtBQUNWLFVBQVU7QUFFVixzREFBc0Q7QUFDdEQsK0NBQStDO0FBQy9DLG1EQUFtRDtBQUNuRCwrQ0FBK0M7QUFDL0MsbURBQW1EO0FBRW5ELGtEQUFrRDtBQUNsRCw4Q0FBOEM7QUFDOUMsaUJBQWlCO0FBQ2pCLDZDQUE2QztBQUM3QyxxREFBcUQ7QUFDckQsVUFBVTtBQUNWLFVBQVU7QUFDVixNQUFNO0FBQ04sTUFBTTtBQUVOLElBQU0sVUFBVSxHQUNkLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMvQyxJQUFJLFVBQVUsRUFBRTtJQUNkLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFNO1FBQzFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDbEIsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7U0FDNUI7SUFDSCxDQUFDLENBQUMsQ0FBQztDQUNKO0FBRUQsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDdkUsSUFBSSxlQUFlLEVBQUU7SUFDbkIsZUFBZSxDQUFDLE9BQU8sQ0FBQyx3QkFBYztRQUNwQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBTTtZQUM5QyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNsQixJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFDRCxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDbkUsSUFBSSxjQUFjLEVBQUU7SUFDbEIsY0FBYyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQU07UUFDOUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNsQixJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELElBQU0saUJBQWlCLEdBQ3JCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25ELGlCQUFpQixDQUFDLE9BQU8sQ0FBQywwQkFBZ0I7SUFDeEMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBTTtRQUNoRCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2xCLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILElBQU0sVUFBVSxHQUNkLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMvQyxJQUFJLFVBQVUsRUFBRTtJQUNkLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFNO1FBQzFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDbEIsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2lCQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztpQkFDbEIsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dCQUNaLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELElBQU0sYUFBYSxHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN6RSxJQUFJLGFBQWEsRUFBRTtJQUNqQixhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQUs7UUFDM0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ2hELFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxJQUFNLGFBQWEsR0FBWSxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDekUsSUFBSSxhQUFhLEVBQUU7SUFDakIsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxlQUFLO1FBQzNDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUNqRCxRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztDQUNKO0FBRUQsSUFBTSxnQkFBZ0IsR0FBWSxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3pFLElBQUksZ0JBQWdCLEVBQUU7SUFDcEIsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQUs7UUFDOUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDdkQsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXRFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQywyQkFBaUI7SUFDMUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQUs7UUFDL0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDdkQsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGdDQUFnQztBQUNoQyxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUVwRSwyQ0FBMkM7QUFDM0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FDdkMsaUJBQU87SUFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQUs7UUFDbkIsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM5QyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsa0RBQWtEO2FBQ3pGO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtEQUFrRDtnQkFDeEYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQywrQkFBK0I7YUFDbEU7U0FDRjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxFQUNELEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBQyxDQUNqQixDQUFDLENBQUMsaUNBQWlDO0FBRXBDLHNDQUFzQztBQUN0QyxjQUFjLENBQUMsT0FBTyxDQUFDLGlCQUFPO0lBQzVCLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFNLDBCQUEwQixHQUFzQixRQUFRLENBQUMsYUFBYSxDQUMxRSw2QkFBNkIsQ0FDOUIsQ0FBQztBQUNGLElBQU0sbUJBQW1CLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQ2hFLHNCQUFzQixDQUN2QixDQUFDO0FBQ0YsSUFBTSxNQUFNLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0QsSUFBTSxRQUFRLEdBQTRCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvRSxJQUFJLDBCQUEwQixFQUFFO0lBQzlCLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUNuRCxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsaUJBQU87WUFDdEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztDQUNKO0FBRUQsSUFBTSxjQUFjLEdBQ2xCLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1QyxJQUFNLGVBQWUsR0FDbkIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTVDLElBQUksY0FBYyxFQUFFO0lBQ2xCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDdkMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDLGlCQUFPO1lBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDaEQsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELElBQUksZUFBZSxFQUFFO0lBQ25CLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDeEMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDLGlCQUFPO1lBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDakQsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELElBQU0saUJBQWlCLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQ2pFLHVCQUF1QixDQUN4QixDQUFDO0FBQ0YsSUFBTSxnQkFBZ0IsR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FDaEUscUJBQXFCLENBQ3RCLENBQUM7QUFDRixJQUFJLGlCQUFpQixFQUFFO0lBQ3JCLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUMxQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztDQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2N1c3RvbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuLy8gICBjb25zdCBiYXNpY19wbGFuOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jhc2ljX3BsYW5fY2FyZCcpO1xuLy8gICBjb25zdCBhZHZhbmNlZF9wbGFuOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkdmFuY2VkX3BsYW5fY2FyZCcpO1xuLy8gICBjb25zdCBiYXNpY1BsYW5CdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPVxuLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYXNpY19yYWRpbycpO1xuLy8gICBjb25zdCBhZHZhbmNlZFBsYW5CdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPVxuLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZHZhbmNlZF9yYWRpbycpO1xuXG4vLyAgIGNvbnN0IHBsYW5DaG9zZW46IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYW5fY2hvc2VuJyk7XG4vLyAgIGlmIChwbGFuQ2hvc2VuKSB7XG4vLyAgICAgY29uc3QgcGxhbkNob3NlbkRhdGEgPSBwbGFuQ2hvc2VuLmRhdGFzZXQucGxhbjtcblxuLy8gICAgIGlmIChwbGFuQ2hvc2VuRGF0YSAhPSAnQWR2YW5jZWQgUGxhbicpIHtcbi8vICAgICAgIGJhc2ljX3BsYW4uY2xhc3NMaXN0LmFkZCgnaW5kaWdvJyk7XG4vLyAgICAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5hZGQoJ3RleHQtd2hpdGUnKTtcbi8vICAgICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LnJlbW92ZSgnaW5kaWdvJyk7XG4vLyAgICAgICBhZHZhbmNlZF9wbGFuLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtd2hpdGUnKTtcbi8vICAgICAgIGJhc2ljUGxhbkJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgYWR2YW5jZWRfcGxhbi5jbGFzc0xpc3QuYWRkKCdpbmRpZ28nKTtcbi8vICAgICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LmFkZCgndGV4dC13aGl0ZScpO1xuLy8gICAgICAgYmFzaWNfcGxhbi5jbGFzc0xpc3QucmVtb3ZlKCdpbmRpZ28nKTtcbi8vICAgICAgIGJhc2ljX3BsYW4uY2xhc3NMaXN0LnJlbW92ZSgndGV4dC13aGl0ZScpO1xuLy8gICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xuLy8gICAgIH1cblxuLy8gICAgIGJhc2ljX3BsYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5hZGQoJ2luZGlnbycpO1xuLy8gICAgICAgYmFzaWNfcGxhbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LXdoaXRlJyk7XG4vLyAgICAgICBhZHZhbmNlZF9wbGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2luZGlnbycpO1xuLy8gICAgICAgYWR2YW5jZWRfcGxhbi5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LXdoaXRlJyk7XG5cbi8vICAgICAgIGlmIChiYXNpY1BsYW5CdXR0b24uY2hlY2tlZCA9PSB0cnVlKSB7XG4vLyAgICAgICAgIGJhc2ljUGxhbkJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBiYXNpY1BsYW5CdXR0b24uY2hlY2tlZCA9IHRydWU7XG4vLyAgICAgICAgIGJhc2ljUGxhbkJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG4vLyAgICAgYWR2YW5jZWRfcGxhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICAgIGFkdmFuY2VkX3BsYW4uY2xhc3NMaXN0LmFkZCgnaW5kaWdvJyk7XG4vLyAgICAgICBhZHZhbmNlZF9wbGFuLmNsYXNzTGlzdC5hZGQoJ3RleHQtd2hpdGUnKTtcbi8vICAgICAgIGJhc2ljX3BsYW4uY2xhc3NMaXN0LnJlbW92ZSgnaW5kaWdvJyk7XG4vLyAgICAgICBiYXNpY19wbGFuLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtd2hpdGUnKTtcblxuLy8gICAgICAgaWYgKGFkdmFuY2VkUGxhbkJ1dHRvbi5jaGVja2VkID09IHRydWUpIHtcbi8vICAgICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGFkdmFuY2VkUGxhbkJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcbi8vICAgICAgICAgYWR2YW5jZWRQbGFuQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vIH0pO1xuXG5jb25zdCBjbGVhbkVtYWlsOiBIVE1MSW5wdXRFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFuX2VtYWlsX2lucHV0Jyk7XG5pZiAoY2xlYW5FbWFpbCkge1xuICBjbGVhbkVtYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGU6IGFueSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC52YWx1ZSkge1xuICAgICAgY29uc3QgaW5wdXRUZXh0ID0gZS50YXJnZXQudmFsdWUucmVwbGFjZSgvW15cXHdcXGRfLkAtXS9naSwgJycpO1xuICAgICAgZS50YXJnZXQudmFsdWUgPSBpbnB1dFRleHQ7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgY2xlYW5OYW1lSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsZWFuX25hbWVfaW5wdXQnKTtcbmlmIChjbGVhbk5hbWVJbnB1dHMpIHtcbiAgY2xlYW5OYW1lSW5wdXRzLmZvckVhY2goY2xlYW5OYW1lSW5wdXQgPT4ge1xuICAgIGNsZWFuTmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGU6IGFueSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGlucHV0VGV4dCA9IGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1teXFx3XFxkXFxzLi1dL2dpLCAnJyk7XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlID0gaW5wdXRUZXh0O1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmNvbnN0IGNsZWFuR2lmdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFuX2dpZnRfaW5wdXQnKTtcbmlmIChjbGVhbkdpZnRJbnB1dCkge1xuICBjbGVhbkdpZnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlOiBhbnkpID0+IHtcbiAgICBpZiAoZS50YXJnZXQudmFsdWUpIHtcbiAgICAgIGNvbnN0IGlucHV0VGV4dCA9IGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1teXFx3JFxcZFxccy4tXS9naSwgJycpO1xuICAgICAgZS50YXJnZXQudmFsdWUgPSBpbnB1dFRleHQ7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgY2xlYW5OdW1iZXJJbnB1dHM6IE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD4gPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xlYW5fbnVtYmVyX2lucHV0Jyk7XG5jbGVhbk51bWJlcklucHV0cy5mb3JFYWNoKGNsZWFuTnVtYmVySW5wdXQgPT4ge1xuICBjbGVhbk51bWJlcklucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGU6IGFueSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC52YWx1ZSkge1xuICAgICAgY29uc3QgaW5wdXRUZXh0ID0gZS50YXJnZXQudmFsdWUucmVwbGFjZSgvW15cXGRdL2dpLCAnJyk7XG4gICAgICBlLnRhcmdldC52YWx1ZSA9IGlucHV0VGV4dDtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IGNsZWFuUGhvbmU6IEhUTUxJbnB1dEVsZW1lbnQgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYW5fcGhvbmVfaW5wdXQnKTtcbmlmIChjbGVhblBob25lKSB7XG4gIGNsZWFuUGhvbmUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZTogYW55KSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgICBjb25zdCB4ID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgLnJlcGxhY2UoL1xcRC9nLCAnJylcbiAgICAgICAgLm1hdGNoKC8oXFxkezAsM30pKFxcZHswLDN9KShcXGR7MCw0fSkvKTtcbiAgICAgIGUudGFyZ2V0LnZhbHVlID1cbiAgICAgICAgeFsxXSArXG4gICAgICAgICh4WzJdID8gYC0ke3hbMl19YCA6ICcnKSArXG4gICAgICAgICh4WzNdID8gYC0ke3hbM119YCA6ICcnKSArXG4gICAgICAgICh4WzRdID8gYC0ke3hbNF19YCA6ICcnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBwcmljaW5nQnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaWNpbmdfYnV0dG9uJyk7XG5pZiAocHJpY2luZ0J1dHRvbikge1xuICBwcmljaW5nQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaWNpbmcnKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgfSk7XG4gIH0pO1xufVxuXG5jb25zdCBjb250YWN0QnV0dG9uOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhY3RfYnV0dG9uJyk7XG5pZiAoY29udGFjdEJ1dHRvbikge1xuICBjb250YWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhY3RzJykuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3QgZmlyc3RBcnJvd0J1dHRvbjogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaXJzdF9hcnJvdycpO1xuaWYgKGZpcnN0QXJyb3dCdXR0b24pIHtcbiAgZmlyc3RBcnJvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWNvbmRfc2VjdGlvbicpLnNjcm9sbEludG9WaWV3KHtcbiAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IHNlY29uZEFycm93QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWNvbmRfYXJyb3cnKTtcblxuc2Vjb25kQXJyb3dCdXR0b25zLmZvckVhY2goc2Vjb25kQXJyb3dCdXR0b24gPT4ge1xuICBzZWNvbmRBcnJvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3VydGhfc2VjdGlvbicpLnNjcm9sbEludG9WaWV3KHtcbiAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuLy8gU2VsZWN0IHRoZSBlbGVtZW50cyB0byByZXZlYWxcbmNvbnN0IHJldmVhbEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJldmVhbC1lbGVtZW50Jyk7XG5cbi8vIENyZWF0ZSBhbiBJbnRlcnNlY3Rpb24gT2JzZXJ2ZXIgaW5zdGFuY2VcbmNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICBlbnRyaWVzID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgIGlmIChlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxci1jb2RlJykpIHtcbiAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZmxpcEluWScpO1xuICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhbmltYXRlZCcpO1xuICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdyZXZlYWwnKTsgLy8gQWRkIHRoZSBcInJldmVhbFwiIGNsYXNzIHRvIHRyaWdnZXIgdGhlIGFuaW1hdGlvblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdyZXZlYWwnKTsgLy8gQWRkIHRoZSBcInJldmVhbFwiIGNsYXNzIHRvIHRyaWdnZXIgdGhlIGFuaW1hdGlvblxuICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpOyAvLyBTdG9wIG9ic2VydmluZyBvbmNlIHJldmVhbGVkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAge3RocmVzaG9sZDogMC41fSxcbik7IC8vIEFkanVzdCB0aGUgdGhyZXNob2xkIGFzIG5lZWRlZFxuXG4vLyBTdGFydCBvYnNlcnZpbmcgZWFjaCByZXZlYWwgZWxlbWVudFxucmV2ZWFsRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcbn0pO1xuXG5jb25zdCBsYW5kaW5nX21vYmlsZV9tZW51X2J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI2xhbmRpbmdfbW9iaWxlX21lbnVfYnV0dG9uJyxcbik7XG5jb25zdCBsYW5kaW5nX21vYmlsZV9tZW51OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjbGFuZGluZ19tb2JpbGVfbWVudScsXG4pO1xuY29uc3QgZm9vdGVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlcicpO1xuY29uc3Qgc2VjdGlvbnM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2VjdGlvbicpO1xuaWYgKGxhbmRpbmdfbW9iaWxlX21lbnVfYnV0dG9uKSB7XG4gIGxhbmRpbmdfbW9iaWxlX21lbnVfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxhbmRpbmdfbW9iaWxlX21lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgZm9vdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICBzZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3QgbW9iaWxlX3ByaWNpbmc6IEhUTUxEaXZFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZV9wcmljaW5nJyk7XG5jb25zdCBtb2JpbGVfY29udGFjdHM6IEhUTUxEaXZFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZV9jb250YWN0Jyk7XG5cbmlmIChtb2JpbGVfcHJpY2luZykge1xuICBtb2JpbGVfcHJpY2luZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBsYW5kaW5nX21vYmlsZV9tZW51LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIGZvb3Rlci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICBzZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xuICAgICAgc2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpY2luZycpLnNjcm9sbEludG9WaWV3KHtcbiAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChtb2JpbGVfY29udGFjdHMpIHtcbiAgbW9iaWxlX2NvbnRhY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxhbmRpbmdfbW9iaWxlX21lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgZm9vdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICBzZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWN0cycpLnNjcm9sbEludG9WaWV3KHtcbiAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IG1vYmlsZVRoZW1lQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdGhlbWUtdG9nZ2xlLXdyYXBwZXInLFxuKTtcbmNvbnN0IG1vYmlsZU1lbnVCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyNtb2JpbGUtbWVudS1idXR0b24nLFxuKTtcbmlmIChtb2JpbGVUaGVtZUJ1dHRvbikge1xuICBtb2JpbGVUaGVtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtb2JpbGVNZW51QnV0dG9uLmNsaWNrKCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9