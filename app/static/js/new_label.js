(()=>{console.log("new_label.ts");var e=document.querySelectorAll(".suggestion-container");document.addEventListener("keydown",(function(n){"Escape"===n.key&&e.forEach((function(e){e.classList.add("hidden")}))}));var n=document.querySelector(".make-container"),t=document.querySelector(".model-container"),o=document.querySelector(".trim-container"),r=document.querySelector(".type-container"),c=document.querySelector("#make-1"),i=document.querySelector("#vehicle_model-1"),d=document.querySelector("#label-1-trim"),s=document.querySelector("#label-1-type"),a=document.querySelector(".make-suggestion"),l=document.querySelector(".model-suggestion"),u=document.querySelector(".trim-suggestion");function m(){document.querySelectorAll(".make-suggestion").forEach((function(e){e.addEventListener("click",(function(e){c.value=e.target.innerHTML.trim(),n.classList.add("hidden");var o=[];fetch("/labels/get_models",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({makeSelected:c.value})}).then((function(e){return e.json()})).then((function(e){o.push.apply(o,e.models),t.innerHTML="",o.forEach((function(e){var n=l.cloneNode(!0);n.innerHTML=e,t.appendChild(n)}))})).catch((function(e){console.error("Error fetching models by make:",e)})),i.addEventListener("click",(function(e){t.classList.remove("hidden"),f()}))}))}))}function f(){document.querySelectorAll(".model-suggestion").forEach((function(e){e.addEventListener("click",(function(e){i.value=e.target.innerHTML.trim(),t.classList.add("hidden");var n=[];fetch("/labels/get_trims",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({modelSelected:i.value})}).then((function(e){return e.json()})).then((function(e){n.push.apply(n,e.trims),o.innerHTML="",n.forEach((function(e){var n=u.cloneNode(!0);n.innerHTML=e,o.appendChild(n)})),c.value=e.make,s.value=e.type,h()})).catch((function(e){console.error("Error fetching trims by model:",e)})),i.addEventListener("click",(function(e){t.classList.remove("hidden")}))}))}))}function h(){document.querySelectorAll(".trim-suggestion").forEach((function(e){e.addEventListener("click",(function(e){d.value=e.target.innerHTML.trim(),o.classList.add("hidden")}))}))}document.querySelector(".type-suggestion"),c&&c.addEventListener("input",(function(e){var t=[];fetch("/labels/get_makes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({makeTyped:e.target.value})}).then((function(e){return e.json()})).then((function(e){t.push.apply(t,e.makes),n.classList.remove("hidden"),n.innerHTML="",t.forEach((function(e){var t=a.cloneNode(!0);t.innerHTML=e,n.appendChild(t)})),m()})).catch((function(e){console.error("Error sending makes data to Flask:",e)}))})),c.addEventListener("click",(function(e){n.classList.toggle("hidden")})),i.addEventListener("click",(function(e){t.classList.toggle("hidden")})),d.addEventListener("click",(function(e){o.classList.toggle("hidden")})),s.addEventListener("click",(function(e){r.classList.toggle("hidden")})),i&&i.addEventListener("input",(function(e){var n=[];fetch("/labels/get_models",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({modelTyped:i.value})}).then((function(e){return e.json()})).then((function(e){n.push.apply(n,e.models),t.innerHTML="",n.forEach((function(e){var n=l.cloneNode(!0);n.innerHTML=e,t.appendChild(n)})),f()})).catch((function(e){console.error("Error fetching all models:",e)}))})),m(),f(),h();var y=document.querySelector("#label-form"),p=document.querySelector("#label-1-sticker-number"),L=document.querySelector(".sticker-code-error"),g=!1;p&&p.addEventListener("input",(function(e){fetch("/labels/check_label_code",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({codeTyped:p.value})}).then((function(e){return e.json()})).then((function(e){!0===e.exists?(L.classList.remove("hidden"),p.classList.add("text-red-700"),p.classList.add("border-2"),p.classList.add("bg-red-100"),p.classList.add("focus:border-red-700"),g=!0):(L.classList.add("hidden"),p.classList.remove("text-red-700"),p.classList.remove("border-2"),p.classList.remove("bg-red-100"),p.classList.remove("focus:border-red-700"),g=!1)})).catch((function(e){console.error("Error fetching sticker number:",e)}))})),y.addEventListener("submit",(function(e){g&&e.preventDefault()}))})();