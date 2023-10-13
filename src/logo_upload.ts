document.addEventListener('DOMContentLoaded', function () {
  const dropZone = document.querySelector('#drop_zone') as HTMLElement;
  const imageUploadInput = document.querySelector('#image_upload') as HTMLInputElement;

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

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleImageUpload(file);
    }
  });

  imageUploadInput.addEventListener('change', function (e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleImageUpload(file);
    }
  });

  function handleImageUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const reader = new FileReader();
    reader.onload = function (e) {
      dropZone.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-height: 240px;">`;
      // You can add your fetch request here to send the image data to the server.
    };
    reader.readAsDataURL(file);
  }
});
