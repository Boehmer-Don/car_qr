//----auto hide toast----

import {Dismiss, DismissInterface, DismissOptions} from 'flowbite';

document.addEventListener('DOMContentLoaded', () => {
  // target element that will be dismissed
  const targetElements: NodeListOf<HTMLElement> =
    document.querySelectorAll('[id^=custom-toast]');
  // options object
  const options: DismissOptions = {
    transition: 'transition-opacity',
    duration: 5000,
    timing: 'ease-out',

    // callback functions
    onHide: (context, targetEl) => {
      console.log('element has been dismissed');
    },
  };

  /*
   * targetEl: required
   * triggerEl: optional
   * options: optional
   */
  targetElements.forEach(targetEl => {
    if (!targetEl) return;
    const el: HTMLElement = targetEl.querySelector('.close-toast-btn');
    if (!el) {
      console.error('Dismiss trigger element is missing');
      return;
    }
    const dismiss: DismissInterface = new Dismiss(targetEl, el, options);
    el.addEventListener('click', () => {
      dismiss.hide();
    });
    setTimeout(() => {
      dismiss.hide();
    }, 7000);
  });
});
