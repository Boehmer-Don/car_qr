/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/logo_upload.ts ***!
  \****************************/
document.addEventListener('DOMContentLoaded', function () {
    var dropZone = document.querySelector('#drop_zone');
    var imageUploadInput = document.querySelector('#image_upload');
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
        var files = e.dataTransfer.files;
        if (files.length > 0) {
            var file = files[0];
            handleImageUpload(file);
        }
    });
    // Allow users to click on dropZone to trigger the file input
    // dropZone.addEventListener('click', function () {
    //   imageUploadInput.click();
    // });
    imageUploadInput.addEventListener('change', function (e) {
        var target = e.target;
        var files = target.files;
        if (files && files.length > 0) {
            var file = files[0];
            handleImageUpload(file);
        }
    });
    function handleImageUpload(file) {
        var formData = new FormData();
        formData.append('file', file);
        var reader = new FileReader();
        reader.onload = function (e) {
            dropZone.innerHTML = "<img src=\"".concat(e.target.result, "\" alt=\"Preview\" style=\"max-height: 240px;\">");
            // You can add your fetch request here to send the image data to the server.
            fetch(window.location.href, {
                method: 'POST',
                body: formData,
            })
                .then(function (response) { return console.log(response); })
                .catch(function (error) {
                console.error('Error:', error);
            });
        };
        reader.readAsDataURL(file);
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2xvZ29fdXBsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRyb3Bab25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Ryb3Bfem9uZScpIGFzIEhUTUxFbGVtZW50O1xuICBjb25zdCBpbWFnZVVwbG9hZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI2ltYWdlX3VwbG9hZCcsXG4gICkgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICBkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRyb3Bab25lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjdmN2Y3JztcbiAgfSk7XG5cbiAgZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZHJvcFpvbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuICB9KTtcblxuICBkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZnVuY3Rpb24gKGU6IERyYWdFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkcm9wWm9uZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cbiAgICBjb25zdCBmaWxlcyA9IGUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXNbMF07XG4gICAgICBoYW5kbGVJbWFnZVVwbG9hZChmaWxlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEFsbG93IHVzZXJzIHRvIGNsaWNrIG9uIGRyb3Bab25lIHRvIHRyaWdnZXIgdGhlIGZpbGUgaW5wdXRcbiAgLy8gZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIC8vICAgaW1hZ2VVcGxvYWRJbnB1dC5jbGljaygpO1xuICAvLyB9KTtcblxuICBpbWFnZVVwbG9hZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZmlsZXMgPSB0YXJnZXQuZmlsZXM7XG4gICAgaWYgKGZpbGVzICYmIGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBmaWxlc1swXTtcbiAgICAgIGhhbmRsZUltYWdlVXBsb2FkKGZpbGUpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlSW1hZ2VVcGxvYWQoZmlsZTogRmlsZSkge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG5cbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgZHJvcFpvbmUuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtlLnRhcmdldC5yZXN1bHR9XCIgYWx0PVwiUHJldmlld1wiIHN0eWxlPVwibWF4LWhlaWdodDogMjQwcHg7XCI+YDtcbiAgICAgIC8vIFlvdSBjYW4gYWRkIHlvdXIgZmV0Y2ggcmVxdWVzdCBoZXJlIHRvIHNlbmQgdGhlIGltYWdlIGRhdGEgdG8gdGhlIHNlcnZlci5cbiAgICAgIGZldGNoKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IGNvbnNvbGUubG9nKHJlc3BvbnNlKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9