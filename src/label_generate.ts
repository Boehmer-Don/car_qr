const decreaseStickersButton: HTMLButtonElement = document.querySelector(
  '#decreaseStickersButton',
);
const increaseStickersButton: HTMLButtonElement = document.querySelector(
  '#increaseStickersButton',
);
const stickersQuantityInput: HTMLInputElement = document.querySelector(
  '#stickersQuantityInput',
);

if (decreaseStickersButton && increaseStickersButton && stickersQuantityInput) {
  decreaseStickersButton.addEventListener('click', () => {
    let quantity = parseInt(stickersQuantityInput.value);
    if (quantity > 1) {
      quantity -= 1;
      stickersQuantityInput.value = quantity.toString();
    }
  });
  increaseStickersButton.addEventListener('click', () => {
    let quantity = parseInt(stickersQuantityInput.value);
    quantity += 1;
    stickersQuantityInput.value = quantity.toString();
  });
}