function el(e,t={}){return elOptions(elm="<"!==e[0]?document.querySelector(e):createEl(e,t),t),elm}function els(e,t){document.querySelectorAll(e).forEach((e,l)=>{t(e,l)})}function createEl(e){let t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild}function elStyle(e,t){for(let l in t)if(t.hasOwnProperty(l)){let r=t[l];null===r?e.style.removeProperty(l):e.style[l]=r}}function elOptions(e,t={}){function l(e){if("string"==typeof e){let t=document.querySelector(e);return t||(console.warn(`El not found: ${e}`),null)}return e}if(t.to){let r=l(t.to);r&&r.appendChild(e)}if(t.before){let s=l(t.before);s&&s.parentNode&&s.parentNode.insertBefore(e,s)}if(t.after){let n=l(t.after);n&&n.parentNode&&n.parentNode.insertBefore(e,n.nextSibling)}if(t.replace){let a=l(t.replace);a&&(a.innerHTML="",a.appendChild(e))}if(t.replaceChild){var i=l(t.replaceChild);i&&i.parentNode&&i.parentNode.replaceChild(e,i)}for(let o of(t.remove&&e&&e.parentNode&&e.parentNode.removeChild(e),["click","mouseover","mouseout","change","input","keydown","keyup","focus","blur"]))t[o]&&e.addEventListener(o,t[o]);t.style&&elStyle(e,t.style),t.class&&(Array.isArray(t.class)?e.classList.add(...t.class):t.class.includes(" ")?e.classList.add(...t.class.split(" ")):e.classList.add(t.class)),t.removeClass&&e.classList.remove(t.removeClass),t.replaceClass&&e.classList.replace(t.replaceClass[0],t.replaceClass[1]),t.id&&(e.id=t.id),t.text&&(e.textContent=t.text),t.html&&(e.innerHTML=t.html)}