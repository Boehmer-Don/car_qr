document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector("#drop_zone"),n=document.querySelector("#image_upload");function t(n){var t=new FormData;t.append("file",n);var r=new FileReader;r.onload=function(n){e.innerHTML='<img src="'.concat(n.target.result,'" alt="Preview" style="max-height: 240px;">'),fetch(window.location.href,{method:"POST",body:t}).then((function(e){return console.log(e)})).catch((function(e){console.error("Error:",e)}))},r.readAsDataURL(n)}e.addEventListener("dragover",(function(n){n.preventDefault(),e.style.backgroundColor="#f7f7f7"})),e.addEventListener("dragleave",(function(n){n.preventDefault(),e.style.backgroundColor="#fff"})),e.addEventListener("drop",(function(n){n.preventDefault(),e.style.backgroundColor="#fff";var r=n.dataTransfer.files;r.length>0&&t(r[0])})),e.addEventListener("click",(function(){n.click()})),n.addEventListener("change",(function(e){var n=e.target.files;n&&n.length>0&&t(n[0])}))}));