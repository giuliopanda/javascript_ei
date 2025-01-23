/**
 * Utility per la creazione di elementi DOM eI() e eIs()
 * @author Giulio Pandolfelli
 * @version 1.0.0
 */

/**
* 
* @param {} string un selettore css o un tag html o un elemento del DOM
* @param {*} options 
* @returns 
*/
function eI(string, options = {}) {
    // se string è un gruppod i elementi del DOM tipo NodeList
    if (string instanceof NodeList) {
        // ritorno il primo elemento
        elm =string[0];
    } else if (string instanceof HTMLElement) {
        // se string è già un elemento DOM
        elm = string;
    } else {
        $tags = ['div','span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'button', 'input', 'textarea', 'select', 'option', 'form', 'label', 'img', 'ul', 'li', 'ol', 'nav', 'header', 'footer', 'section', 'article', 'aside', 'main', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'video', 'audio', 'canvas', 'iframe', 'svg', 'path', 'circle', 'rect', 'polygon', 'polyline', 'ellipse', 'line', 'g', 'defs', 'symbol', 'use', 'text', 'tspan', 'textPath', 'clipPath', 'mask', 'pattern', 'filter', 'foreignObject', 'linearGradient', 'radialGradient', 'stop', 'animate', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'title', 'tspan', 'use', 'view'];
        if ($tags.includes(string.toLowerCase())) {
            elm = document.createElement(string);
        } else if (string[0] !== '<') {
            elm = document.querySelector(string);
        } else {
            elm = _eIcreateEl(string, options);
        }
    }
    // se options è una stringa
    if (typeof options === 'string') {
        options = { class: options };
    }
    _eIOptions(elm, options);
    
    elm = _eIAddCustomFn(elm);
    return elm;
  }

  /**
   * 
   */
  function _eIAddCustomFn(elm) {

    elm.eI = function (selector, options = {}) {
        // se è un selettore css quindi inizia con un punto o un cancelletto
        if (selector[0] === '.' || selector[0] === '#') {
            return elm.querySelector(selector);
        } else {
            delete options.to;
            delete options.after;
            delete options.before;
            delete options.replace;
            el =  eI(selector, options);
            elm.appendChild(el);
            return el;
        }
        
    }

    elm.eIs = function (selector, fn) {
        if (typeof fn === 'function') {
            elm.querySelectorAll(selector).forEach((el, i) => {
                fn(el, i);
            });
        } else {
            return elm.querySelectorAll(selector);
        }  
    }
    return elm;
   
  }
  
  /**
  *  document.querySelectorAll(selector).forEach((el, i) => {});
  *  els('selector', (el, i) => {});
  */ 
  function eIs(selector, fn) {
    if (selector instanceof NodeList) {
        if (typeof fn === 'function') {
            selector.forEach((el, i) => {
                fn(el, i);
            });
        } 
        return selector;
    }
    // se string è già un elemento DOM
    if (selector instanceof HTMLElement) {
        return selector;
    }
    const selectors = document.querySelectorAll(selector);
    if (typeof fn === 'function') {
        selectors.forEach((el, i) => {
            fn(el, i);
        });
    } 
    return selectors;
    

  }
  
  
  /**
  * Crea un dom element da una stringa html
  * @param string htmlString 
  * @returns DOMElement
  * @example
  * const newElement = _eIcreateEl('<button>Click me</button>');
  */
  
  function _eIcreateEl(htmlString) {
    // Crea l'elemento
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
  
  function _eIStyle(element, styles) {
    for (let property in styles) {
        if (styles.hasOwnProperty(property)) {
            const value = styles[property];
            if (value === null) {
                // Rimuove la proprietà se il valore è null
                element.style.removeProperty(property);
            } else {
                // Applica la proprietà con il valore fornito
                element.style[property] = value;
            }
        }
    }
  }
  
  /**
  * opzioni
  * Aggiunta di opzioni all'elemento
  *   
  *    to: container, // Opzionale: elemento a cui fare l'append
  *    before: element, // Opzionale: elemento prima del quale inserire
  *    after: element, // Opzionale: elemento dopo il quale inserire
  *    click: () => alert('Button clicked!'),
  *    mouseover: () => console.log('Mouse over button')
  *    ...
  *    style: { 
  *      color: 'red',
  *      backgroundColor: 'black'
  *    },
  *    class: "btn btn-primary"
  **/
  function _eIOptions(element, options = {}) {
      /**
       * Converte una stringa (selettore CSS) in un elemento DOM.
       * Se l'opzione è già un elemento DOM, la restituisce direttamente.
       * @param {string|HTMLElement} target - Una stringa (selettore CSS) o un elemento DOM.
       * @returns {HTMLElement|null} - L'elemento DOM corrispondente o null se non trovato.
       */
      function getElement(target) {
          if (typeof target === 'string') {
              const elm = document.querySelector(target);
              if (!elm) {
                  console.warn(`El not found: ${target}`);
                  return null;
              }
              return elm;
          }
          return target;
      }
  
      // Se è specificato un elemento a cui fare l'append
      if (options.to) {
          const parent = getElement(options.to);
          if (parent) {
              parent.appendChild(element);
          }
      }
  
      // Se è specificato un elemento prima del quale inserire
      if (options.before) {
          const reference = getElement(options.before);
          if (reference && reference.parentNode) {
              reference.parentNode.insertBefore(element, reference);
          }
      }
  
      // Se è specificato un elemento dopo il quale inserire
      if (options.after) {
          const reference = getElement(options.after);
          if (reference && reference.parentNode) {
              reference.parentNode.insertBefore(element, reference.nextSibling);
          }
      }
  
      // Se è specificato un elemento da sostituire
      if (options.replace) {
          const target = getElement(options.replace);
          if (target) {
              target.innerHTML = '';
              target.appendChild(element);
          }
      }
  
      // Se è specificato un elemento da sostituire completamente
      if (options.replaceChild) {
          var target = getElement(options.replaceChild);
          if (target && target.parentNode) {
              target.parentNode.replaceChild(element, target);
          }
      }
  
      // Se è specificato un elemento da rimuovere
      if (options.remove) {
          if (element && element.parentNode) {
              element.parentNode.removeChild(element);
          }
      }
  
  
      // Gestione degli eventi diretti
      const eventTypes = ['click', 'mouseover', 'mouseout', 'change', 'input', 'keydown', 'keyup', 'focus', 'blur'];
      for (const eventType of eventTypes) {
          if (options[eventType]) {
              element.addEventListener(eventType, options[eventType]);
          }
      }
  
      // Applica stili CSS
      if (options.style) {
          _eIStyle(element, options.style);
      }
  
      // Aggiungi una classe
      if (options.class) {
          if (Array.isArray(options.class)) {
              element.classList.add(...options.class);
              // se è una stringa composta da più classi con spazio tra una classe e l'altra
          } else if(options.class.includes(' ')){
              element.classList.add(...options.class.split(' '));
          } else {
              element.classList.add(options.class);
          }
      }
  
      // Rimuovi una classe
      if (options.removeClass) {
          element.classList.remove(options.removeClass);
      }
  
      // Sostituisci una classe con un'altra
      if (options.replaceClass) {
          element.classList.replace(options.replaceClass[0], options.replaceClass[1]);
      }
  
      // Imposta l'ID dell'elemento
      if (options.id) {
          element.id = options.id;
      }
  
      // Imposta il testo dell'elemento
      if (options.text) {
          element.textContent = options.text;
      }
  
      // Imposta l'HTML interno dell'elemento
      if (options.html) {
          element.innerHTML = options.html;
      }
  
      const attributes = ['name', 'value', 'type', 'placeholder', 'href', 'src', 'alt', 'title', 'target', 'download', 'for', 'id', 'disabled', 'selected', 'checked', 'autocomplete', 'autofocus', 'min', 'max', 'step', 'rows', 'cols', 'maxlength', 'minlength', 'pattern', 'required', 'multiple', 'accept', 'accept-charset', 'action', 'enctype', 'method', 'novalidate', 'target', 'rel'];
      for (const attr of attributes) {
          if (options[attr]) {
              element.setAttribute(attr, options[attr]);
          }
      }
      // data-* o aria-* attributes
      for (const key in options) {
          if (key.startsWith('data-') || key.startsWith('aria-') || key.startsWith('v-')) {
              element.setAttribute(key, options[key]);
          }
      }
  }