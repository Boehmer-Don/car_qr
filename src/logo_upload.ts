document.addEventListener('DOMContentLoaded', function () {
  const dropZone: HTMLElement = document.querySelector('#drop_zone');

  dropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropZone.style.backgroundColor = '#f7f7f7';
  });

  dropZone.addEventListener('dragleave', function (e) {
    e.preventDefault();
    dropZone.style.backgroundColor = '#fff';
  });

  dropZone.addEventListener('drop', function (e: DragEvent) {
    e.preventDefault();
    dropZone.style.backgroundColor = '#fff';

    const file = e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const reader = new FileReader();
    reader.onload = function (e) {
      dropZone.innerHTML =
        '<img src="' +
        e.target.result +
        '" alt="Preview" style="max-height: 240px;">';
      fetch(window.location.href, {
        method: 'POST',
        body: formData,
      })
        .then(response => console.log(response))
        .catch(error => {
          console.error('Error:', error);
        });
    };
    reader.readAsDataURL(file);
  });
});
