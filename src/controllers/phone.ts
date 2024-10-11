const phoneInput: HTMLInputElement =
  document.querySelector('#phone-input');
if (phoneInput) {
  phoneInput.addEventListener('input', (e: any) => {
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