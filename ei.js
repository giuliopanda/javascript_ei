/**
 * Utility for creating DOM elements eI() and eIs()
 * @author Giulio Pandolfelli
 * @version 1.1.0
 */

/**
* 
* @param {} string a CSS selector or HTML tag or DOM element
* @param {*} options object with options
* @returns DOM element
*/
function eI(string, options = {}) {
    // if string is a group of DOM elements like NodeList
    if (string instanceof NodeList) {
        // return the first element
        elm = string[0];
    } else if (string instanceof HTMLElement) {
        // if string is already a DOM element
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
    // if options is a string
    if (typeof options === 'string') {
        options = { class: options };
    }
    _eIOptions(elm, options);
    
    elm = _eIAddCustomFn(elm);
    return elm;
}

/**
 * Adds custom functions to elements
 */
function _eIAddCustomFn(elm) {
    if (!elm) return;
    elm.eI = function (selector, options = {}) {
        // if it is a CSS selector so it starts with a dot or a hash
        if (selector[0] === '.' || selector[0] === '#') {
            return elm.querySelector(selector);
        } else {
            delete options.to;
            delete options.after;
            delete options.before;
            delete options.replace;
            el = eI(selector, options);
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
* Executes a function for each selected element
* document.querySelectorAll(selector).forEach((el, i) => {});
* els('selector', (el, i) => {});
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
    // if string is already a DOM element
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
* Creates a DOM element from an HTML string
* @param string htmlString 
* @returns DOM Element
* @example
* const newElement = _eIcreateEl('<button>Click me</button>');
*/
function _eIcreateEl(htmlString) {
    // Create the element
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

/**
 * Applies CSS styles to an element
 * @param {} element 
 * @param {*} styles Accepts both a CSS style string or a style object
 */
function _eIStyle(element, styles) {
    if (!element) return;
    // If styles is a string, convert it to an object
    if (typeof styles === 'string') {
        // Split the string into individual style declarations
        const styleArray = styles.split(';').filter(style => style.trim());
        
        // Convert to object
        styles = styleArray.reduce((acc, style) => {
            const [property, value] = style.split(':').map(part => part.trim());
            if (property && value) {
                // Convert the property from kebab-case to camelCase if necessary
                const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                acc[camelProperty] = value;
            }
            return acc;
        }, {});
    }

    for (let property in styles) {
        if (styles.hasOwnProperty(property)) {
            const value = styles[property];
            if (value === null) {
                // Remove the property if the value is null
                element.style.removeProperty(property);
            } else {
                const value = styles[property];
                if (value === null) {
                    // Remove the property if the value is null
                    element.style.removeProperty(property);
                } else {
                    // Apply the property with the provided value
                    element.style[property] = value;
                }
            }
        }
    }
}
/**
 * options
 * Adding options to the element
 *   
 *    to: container, // Optional: element to append to
 *    before: element, // Optional: element to insert before
 *    after: element, // Optional: element to insert after
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
    if (!element) return;
    /**
     * Converts a string (CSS selector) to a DOM element.
     * If the option is already a DOM element, returns it directly.
     * @param {string|HTMLElement} target - A string (CSS selector) or DOM element.
     * @returns {HTMLElement|null} - The corresponding DOM element or null if not found.
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

    // If an element to append to is specified
    if (options.to) {
        const parent = getElement(options.to);
        if (parent) {
            parent.appendChild(element);
        }
    }

    // If an element to insert before is specified
    if (options.before) {
        const reference = getElement(options.before);
        if (reference && reference.parentNode) {
            reference.parentNode.insertBefore(element, reference);
        }
    }

    // If an element to insert after is specified
    if (options.after) {
        const reference = getElement(options.after);
        if (reference && reference.parentNode) {
            reference.parentNode.insertBefore(element, reference.nextSibling);
        }
    }

    // If an element to replace is specified
    if (options.replace) {
        const target = getElement(options.replace);
        if (target) {
            target.innerHTML = '';
            target.appendChild(element);
        }
    }

    // If an element to completely replace is specified
    if (options.replaceChild) {
        var target = getElement(options.replaceChild);
        if (target && target.parentNode) {
            target.parentNode.replaceChild(element, target);
        }
    }

    // If an element to remove is specified
    if (options.remove) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }


    // Handling direct events
    const eventTypes = ['click', 'mouseover', 'mouseout', 'change', 'input', 'keydown', 'keyup', 'focus', 'blur'];
    for (const eventType of eventTypes) {
        if (options[eventType]) {
            element.addEventListener(eventType, options[eventType]);
        }
    }

    // Apply CSS styles
    if (options.style) {
        _eIStyle(element, options.style);
    }

    // Add a class
    if (options.class) {
        if (Array.isArray(options.class)) {
            element.classList.add(...options.class);
            // if it is a string composed of multiple classes with space between each class
        } else if(options.class.includes(' ')){
            const classes = options.class.split(' ').filter(className => className.trim() !== '');
            element.classList.add(...classes);
        } else {
            element.classList.add(options.class);
        }
    }

    // Remove a class
    if ('removeClass' in options) {
        element.classList.remove(options.removeClass);
    }

    // Replace a class with another
    if ('replaceClass' in options) {
        element.classList.replace(options.replaceClass[0], options.replaceClass[1]);
    }

    // Set the element's ID
    if ('id' in options) {
        element.id = options.id;
    }

    // Set the element's text
    if ('text' in options) {
        element.textContent = options.text;
    }

    // Set the element's inner HTML
    if ('html' in options) {
        element.innerHTML = options.html;
    }

    const attributes = ['name', 'value', 'type', 'placeholder', 'href', 'src', 'alt', 'title', 'target', 'download', 'for', 'id', 'disabled', 'selected', 'checked', 'autocomplete', 'autofocus', 'min', 'max', 'step', 'rows', 'cols', 'maxlength', 'minlength', 'pattern', 'required', 'multiple', 'accept', 'accept-charset', 'action', 'enctype', 'method', 'novalidate', 'target', 'rel'];
    for (const attr of attributes) {
        if (attr in options) {
            element.setAttribute(attr, options[attr]);
        }
    }
    // data-* or aria-* attributes
    for (const key in options) {
        if (key.startsWith('data-') || key.startsWith('aria-') || key.startsWith('v-')) {
            element.setAttribute(key, options[key]);
        }
    }
}
