/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/logo_upload.ts ***!
  \****************************/
document.addEventListener('DOMContentLoaded', function () {
    var dropZone = document.querySelector('#drop_zone');
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
        var file = e.dataTransfer.files[0];
        var formData = new FormData();
        formData.append('file', file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', window.location.href, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    dropZone.innerHTML =
                        '<img src="' +
                            e.target.result +
                            '" alt="Preview" style="max-height: 240px;">';
                };
                reader.readAsDataURL(file);
            }
            else {
                alert("Error ".concat(xhr.status, "! Failed to upload the file."));
            }
        };
        xhr.send(formData);
        console.log('File uploaded!');
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbG9nb191cGxvYWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7SUFDNUMsSUFBTSxRQUFRLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFbkUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7UUFDL0MsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixRQUFRLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBWTtRQUN0RCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBRXhDLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsTUFBTSxHQUFHO1lBQ1gsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDdEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7b0JBQ3pCLFFBQVEsQ0FBQyxTQUFTO3dCQUNoQixZQUFZOzRCQUNaLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTTs0QkFDZiw2Q0FBNkMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLGdCQUFTLEdBQUcsQ0FBQyxNQUFNLGlDQUE4QixDQUFDLENBQUM7YUFDMUQ7UUFDSCxDQUFDLENBQUM7UUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2xvZ29fdXBsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRyb3Bab25lOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkcm9wX3pvbmUnKTtcblxuICBkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRyb3Bab25lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjdmN2Y3JztcbiAgfSk7XG5cbiAgZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZHJvcFpvbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuICB9KTtcblxuICBkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZnVuY3Rpb24gKGU6IERyYWdFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkcm9wWm9uZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cbiAgICBjb25zdCBmaWxlID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdQT1NUJywgd2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGRyb3Bab25lLmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGltZyBzcmM9XCInICtcbiAgICAgICAgICAgIGUudGFyZ2V0LnJlc3VsdCArXG4gICAgICAgICAgICAnXCIgYWx0PVwiUHJldmlld1wiIHN0eWxlPVwibWF4LWhlaWdodDogMjQwcHg7XCI+JztcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChgRXJyb3IgJHt4aHIuc3RhdHVzfSEgRmFpbGVkIHRvIHVwbG9hZCB0aGUgZmlsZS5gKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcbiAgICBjb25zb2xlLmxvZygnRmlsZSB1cGxvYWRlZCEnKTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==