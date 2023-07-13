document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.querySelector('#drop_zone');
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

    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.style.backgroundColor = '#fff';

        const file = e.dataTransfer.files[0];
        var formData = new FormData();
        formData.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', window.location.href, true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                alert('File uploaded successfully!');
            } else {
                alert(`Error ${xhr.status}! Failed to upload the file.`);
            }
        };
        xhr.send(formData);
    });
});