(()=>{document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector("#basic_plan_card"),t=document.querySelector("#advanced_plan_card"),c=document.querySelector("#basic_radio"),n=document.querySelector("#advanced_radio"),o=document.querySelector("#plan_chosen");o&&("Advanced Plan"!=o.dataset.plan?(e.classList.add("indigo"),e.classList.add("text-white"),t.classList.remove("indigo"),t.classList.remove("text-white"),c.checked=!0):(t.classList.add("indigo"),t.classList.add("text-white"),e.classList.remove("indigo"),e.classList.remove("text-white"),n.checked=!0),e.addEventListener("click",(function(){e.classList.add("indigo"),e.classList.add("text-white"),t.classList.remove("indigo"),t.classList.remove("text-white"),1==c.checked?c.checked=!1:(c.checked=!0,c.style.display="none")})),t.addEventListener("click",(function(){t.classList.add("indigo"),t.classList.add("text-white"),e.classList.remove("indigo"),e.classList.remove("text-white"),1==n.checked?n.checked=!1:(n.checked=!0,n.style.display="none")})))}));var e=document.querySelector(".clean_email_input");e&&e.addEventListener("input",(function(e){if(e.target.value){var t=e.target.value.replace(/[^\w\d_.@-]/gi,"");e.target.value=t}}));var t=document.querySelectorAll(".clean_name_input");t&&t.forEach((function(e){e.addEventListener("input",(function(e){if(e.target.value){var t=e.target.value.replace(/[^\w\d\s.-]/gi,"");e.target.value=t}}))})),document.querySelectorAll(".clean_number_input").forEach((function(e){e.addEventListener("input",(function(e){if(e.target.value){var t=e.target.value.replace(/[^\d]/gi,"");e.target.value=t}}))}));var c=document.querySelector(".clean_phone_input");c&&c.addEventListener("input",(function(e){if(e.target.value){var t=e.target.value.replace(/\D/g,"").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);e.target.value=t[1]+(t[2]?"-".concat(t[2]):"")+(t[3]?"-".concat(t[3]):"")+(t[4]?"-".concat(t[4]):"")}}));var n=document.querySelector("#pricing_button");n&&n.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#pricing").scrollIntoView({behavior:"smooth"})}));var o=document.querySelector("#contact_button");o&&o.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#contacts").scrollIntoView({behavior:"smooth"})}));var a=document.querySelector("#first_arrow");a&&a.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#second_section").scrollIntoView({behavior:"smooth"})})),document.querySelectorAll(".second_arrow").forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#fourth_section").scrollIntoView({behavior:"smooth"})}))}));var i=document.querySelectorAll(".reveal-element"),r=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting&&(e.target.classList.contains("qr-code")?(e.target.classList.add("flipInY"),e.target.classList.add("animated"),e.target.classList.add("reveal")):(e.target.classList.add("reveal"),r.unobserve(e.target)))}))}),{threshold:.5});i.forEach((function(e){r.observe(e)}));var l=document.querySelector("#landing_mobile_menu_button"),s=document.querySelector("#landing_mobile_menu"),d=document.querySelector("footer"),u=document.querySelectorAll("section");l&&l.addEventListener("click",(function(){s.classList.toggle("hidden"),d.classList.toggle("hidden"),u.forEach((function(e){e.classList.toggle("hidden")}))}));var v=document.querySelector("#mobile_pricing"),g=document.querySelector("#mobile_contact");v&&v.addEventListener("click",(function(){s.classList.toggle("hidden"),d.classList.toggle("hidden"),u.forEach((function(e){e.classList.toggle("hidden")})),document.querySelector("#pricing").scrollIntoView({behavior:"smooth"})})),g&&(console.log(g),g.addEventListener("click",(function(){s.classList.toggle("hidden"),d.classList.toggle("hidden"),u.forEach((function(e){e.classList.toggle("hidden")})),document.querySelector("#contacts").scrollIntoView({behavior:"smooth"})})))})();