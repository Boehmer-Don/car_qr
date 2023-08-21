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
                    var img = new Image();
                    img.src = e.target.result;
                    img.onload = function () {
                        console.log(img.width, img.height);
                    };
                };
                reader.readAsDataURL(file);
            }
            else {
                alert("Error ".concat(xhr.status, "! Failed to upload the file."));
            }
        };
        xhr.send(formData);
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbG9nb191cGxvYWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7SUFDNUMsSUFBTSxRQUFRLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFbkUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7UUFDL0MsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixRQUFRLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBWTtRQUN0RCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBRXhDLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsTUFBTSxHQUFHO1lBQ1gsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDdEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7b0JBQ3pCLFFBQVEsQ0FBQyxTQUFTO3dCQUNoQixZQUFZOzRCQUNaLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTTs0QkFDZiw2Q0FBNkMsQ0FBQztvQkFDaEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztvQkFDeEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQWdCLENBQUM7b0JBQ3BDLEdBQUcsQ0FBQyxNQUFNLEdBQUc7d0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDckMsQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQztnQkFDRixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxnQkFBUyxHQUFHLENBQUMsTUFBTSxpQ0FBOEIsQ0FBQyxDQUFDO2FBQzFEO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2xvZ29fdXBsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRyb3Bab25lOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkcm9wX3pvbmUnKTtcblxuICBkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRyb3Bab25lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjdmN2Y3JztcbiAgfSk7XG5cbiAgZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZHJvcFpvbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuICB9KTtcblxuICBkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZnVuY3Rpb24gKGU6IERyYWdFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkcm9wWm9uZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cbiAgICBjb25zdCBmaWxlID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdQT1NUJywgd2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGRyb3Bab25lLmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGltZyBzcmM9XCInICtcbiAgICAgICAgICAgIGUudGFyZ2V0LnJlc3VsdCArXG4gICAgICAgICAgICAnXCIgYWx0PVwiUHJldmlld1wiIHN0eWxlPVwibWF4LWhlaWdodDogMjQwcHg7XCI+JztcbiAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICBpbWcuc3JjID0gZS50YXJnZXQucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KGBFcnJvciAke3hoci5zdGF0dXN9ISBGYWlsZWQgdG8gdXBsb2FkIHRoZSBmaWxlLmApO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9