(()=>{console.log("new_label.ts");var e=document.querySelectorAll(".suggestion-container");document.addEventListener("keydown",(function(n){"Escape"===n.key&&e.forEach((function(e){e.classList.add("hidden")}))}));var n=document.querySelector(".make-container"),t=document.querySelector(".model-container"),o=document.querySelector(".trim-container"),r=document.querySelector(".type-container"),c=document.querySelector("#make-1"),i=document.querySelector("#vehicle_model-1"),d=document.querySelector("#label-1-trim"),s=document.querySelector("#label-1-type"),a=document.querySelector(".make-warning"),l=document.querySelector(".model-warning"),u=document.querySelector(".make-suggestion"),m=document.querySelector(".model-suggestion"),h=document.querySelector(".trim-suggestion");function f(){document.querySelectorAll(".make-suggestion").forEach((function(e){e.addEventListener("click",(function(e){c.value=e.target.innerHTML.trim(),n.classList.add("hidden");var o=[];fetch("/labels/get_models",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({makeSelected:c.value})}).then((function(e){return e.json()})).then((function(e){o.push.apply(o,e.models),t.innerHTML="",o.forEach((function(e){var n=m.cloneNode(!0);n.innerHTML=e,t.appendChild(n)}))})).catch((function(e){console.error("Error fetching models by make:",e)})),l.classList.add("hidden"),i.value="",i.addEventListener("click",(function(e){t.classList.remove("hidden"),g()}))}))}))}function g(){document.querySelectorAll(".model-suggestion").forEach((function(e){e.addEventListener("click",(function(e){i.value=e.target.innerHTML.trim(),t.classList.add("hidden");var n=[];fetch("/labels/get_trims",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({modelSelected:i.value})}).then((function(e){return e.json()})).then((function(e){n.push.apply(n,e.trims),o.innerHTML="",n.forEach((function(e){var n=h.cloneNode(!0);n.innerHTML=e,o.appendChild(n)})),c.value=e.make,a.classList.add("hidden"),s.value=e.type,L()})).catch((function(e){console.error("Error fetching trims by model:",e)})),i.addEventListener("click",(function(e){t.classList.remove("hidden")}))}))}))}function L(){document.querySelectorAll(".trim-suggestion").forEach((function(e){e.addEventListener("click",(function(e){d.value=e.target.innerHTML.trim(),o.classList.add("hidden")}))}))}document.querySelector(".type-suggestion"),c&&c.addEventListener("input",(function(e){var t=[];fetch("/labels/get_makes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({makeTyped:e.target.value})}).then((function(e){return e.json()})).then((function(e){0===e.makes.length?(c.classList.add("text-indigo-500"),a.classList.remove("hidden")):(t.push.apply(t,e.makes),n.classList.remove("hidden"),n.innerHTML="",t.forEach((function(e){var t=u.cloneNode(!0);t.innerHTML=e,n.appendChild(t)})),f())})).catch((function(e){console.error("Error sending makes data to Flask:",e)}))})),c.addEventListener("click",(function(e){n.classList.toggle("hidden")})),i.addEventListener("click",(function(e){t.classList.toggle("hidden")})),d.addEventListener("click",(function(e){o.classList.toggle("hidden")})),s.addEventListener("click",(function(e){r.classList.toggle("hidden")})),console.log("makeWarning:",a),console.log("modelWarning:",l),i&&i.addEventListener("input",(function(e){var n=[];fetch("/labels/get_models",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({modelTyped:i.value})}).then((function(e){return e.json()})).then((function(e){0===e.models.length?(i.classList.add("text-indigo-500"),l.classList.remove("hidden")):(i.classList.remove("text-indigo-500"),l.classList.add("hidden"),n.push.apply(n,e.models),t.innerHTML="",n.forEach((function(e){var n=m.cloneNode(!0);n.innerHTML=e,t.appendChild(n)})),g())})).catch((function(e){console.error("Error fetching all models:",e)}))})),f(),g(),L();var y=document.querySelector("#label-form"),v=document.querySelector("#label-1-sticker-number"),p=document.querySelector(".sticker-code-error"),S=!1;v&&v.addEventListener("input",(function(e){fetch("/labels/check_label_code",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({codeTyped:v.value})}).then((function(e){return e.json()})).then((function(e){!0===e.exists?(p.classList.remove("hidden"),v.classList.add("text-red-700"),v.classList.add("border-2"),v.classList.add("bg-red-100"),v.classList.add("focus:border-red-700"),S=!0):(p.classList.add("hidden"),v.classList.remove("text-red-700"),v.classList.remove("border-2"),v.classList.remove("bg-red-100"),v.classList.remove("focus:border-red-700"),S=!1)})).catch((function(e){console.error("Error fetching sticker number:",e)}))})),y.addEventListener("submit",(function(e){S&&e.preventDefault()}))})();