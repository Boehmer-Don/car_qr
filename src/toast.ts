//----auto hide toast----

import {Dismiss, DismissInterface, DismissOptions} from 'flowbite';

document.addEventListener('DOMContentLoaded', () => {
  // target element that will be dismissed
  const $targetEl: HTMLElement = document.querySelector('[id^=custom-toast]');

  // optional trigger element
  const $triggerEl: HTMLElement = document.getElementById('close-toast-btn');

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
  const dismiss: DismissInterface = new Dismiss($targetEl, $triggerEl, options);

  // programmatically hide it
  if ($targetEl && $triggerEl) {
    $triggerEl.addEventListener('click', () => {
      dismiss.hide();
    });
    // setTimeout(() => {
    //   dismiss.hide();
    // }, 7000);
  }
});
