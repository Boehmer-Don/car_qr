document.addEventListener('DOMContentLoaded', function () {
  const dropZone: HTMLElement = document.querySelector('#drop_zone');
  console.log(dropZone);
  console.log(window.location.href);

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

    const xhr = new XMLHttpRequest();
    xhr.open('POST', window.location.href, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const reader = new FileReader();
        reader.onload = function (e) {
          dropZone.innerHTML =
            '<img src="' +
            e.target.result +
            '" alt="Preview style="width: 100%; height: auto;">';
        };
        reader.readAsDataURL(file);
      } else {
        alert(`Error ${xhr.status}! Failed to upload the file.`);
      }
    };
    xhr.send(formData);
  });
});
