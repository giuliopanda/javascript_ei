# `eI()`

La funzione `eI()` è una utility JavaScript che semplifica la manipolazione del DOM, permettendo di creare, modificare e gestire elementi HTML in modo più conciso rispetto all'uso diretto delle API del DOM. 

eI In pratica sostituisce document.getElementById, document.CreateElement, document.querySelector, appendChild. eIs invece sostituisce document.querySelectorAll. Poi ha qualche altra funzionalità.

[Guarda l'esempio](https://giuliopanda.github.io/ei-docs.html)

## Indice
1. [Introduzione a `eI()`](#introduzione-a-el)
2. [Sintassi di `eI()`](#sintassi-di-el)
3. [Esempi di utilizzo di `eI()`](#esempi-di-utilizzo-di-el)
   - [Creare un nuovo elemento e aggiungerlo al DOM](#creare-un-nuovo-elemento-e-aggiungerlo-al-dom)
   - [Modificare un elemento esistente](#modificare-un-elemento-esistente)
   - [Aggiungere un evento a un elemento](#aggiungere-un-evento-a-un-elemento)
   - [Sostituire un elemento esistente](#sostituire-un-elemento-esistente)
   - [Aggiungere stili e classi](#aggiungere-stili-e-classi)
   - [Aggiungere un elemento con attributi personalizzati](#aggiungere-un-elemento-con-attributi-personalizzati)
   - [Rimuovere un elemento](#rimuovere-un-elemento)
   - [Aggiungere un elemento con animazione](#aggiungere-un-elemento-con-animazione)
4. [Introduzione a `eIs()`](#introduzione-a-els)
5. [Esempio di utilizzo di `eIs()`](#esempio-di-utilizzo-di-els)

---

## Introduzione a `eI()`

La funzione `eI()` è progettata per semplificare la manipolazione del DOM. Può essere utilizzata per creare nuovi elementi, modificare elementi esistenti, aggiungere eventi, gestire stili e classi, e molto altro. La funzione è particolarmente utile per ridurre la quantità di codice necessaria per eseguire operazioni comuni sul DOM.

### Sintassi di `eI()`

```javascript
eI(string, options)
```

- **string**: Può essere un selettore CSS (ad esempio `#myElement`) o una stringa HTML (ad esempio `<div>Ciao</div>`).
- **options**: Un oggetto che specifica le operazioni da eseguire sull'elemento, come l'aggiunta di stili, classi, eventi, ecc.


### Riassunto delle opzioni

| Opzione         | Tipo                     | Descrizione                                                                 |
|-----------------|--------------------------|-----------------------------------------------------------------------------|
| `to`            | `string` o `HTMLElement` | Aggiunge l'elemento come figlio di un altro elemento.                       |
| `before`        | `string` o `HTMLElement` | Inserisce l'elemento prima di un altro elemento.                            |
| `after`         | `string` o `HTMLElement` | Inserisce l'elemento dopo un altro elemento.                                |
| `replace`       | `string` o `HTMLElement` | Sostituisce il contenuto di un elemento con l'elemento corrente.            |
| `replaceChild`  | `string` o `HTMLElement` | Sostituisce completamente un elemento con l'elemento corrente.              |
| `remove`        | `boolean`                | Rimuove l'elemento dal DOM.                                                 |
| Eventi          | `function`               | Aggiunge gestori di eventi come `click`, `mouseover`, ecc.                  |
| `style`         | `object` o `string`      | Applica stili CSS all'elemento, accetta sia oggetto che stringa CSS.        |
| `class`         | `string` o `array`       | Aggiunge una o più classi all'elemento.                                     |
| `removeClass`   | `string`                 | Rimuove una classe specifica dall'elemento.                                 |
| `replaceClass`  | `array`                  | Sostituisce una classe con un'altra.                                        |
| `id`            | `string`                 | Imposta l'ID dell'elemento.                                                 |
| `text`          | `string`                 | Imposta il testo dell'elemento.                                             |
| `html`          | `string`                 | Imposta l'HTML interno dell'elemento.                                       |

---


## Esempi di utilizzo di `eI()`

### 1. Creare un nuovo elemento e aggiungerlo al DOM

**Vanilla JS:**
```javascript
const newElement = document.createElement('div');
newElement.textContent = 'Ciao, sono un nuovo elemento!';
document.getElementById('example1').appendChild(newElement);
```

**Con `eI()`:**
```javascript
eI('<div>Ciao, sono un nuovo elemento!</div>', {
    to: '#example1'
});
```

### 2. Modificare un elemento esistente

**Vanilla JS:**
```javascript
const targetElement = document.getElementById('targetElement');
targetElement.textContent = 'Testo modificato!';
targetElement.style.color = 'red';
```

**Con `eI()`:**
```javascript
eI('#targetElement', {
    text: 'Testo modificato!',
    style: { color: 'red' }
});
```

### 3. Aggiungere un evento a un elemento

**Vanilla JS:**
```javascript
const button = document.getElementById('exampleButton');
button.addEventListener('click', () => {
    alert('Hai cliccato il pulsante!');
});
```

**Con `eI()`:**
```javascript
eI('#exampleButton', {
    click: () => alert('Hai cliccato il pulsante!')
});
```

### 4. Sostituire un elemento esistente

**Vanilla JS:**
```javascript
const oldElement = document.getElementById('oldElement');
const newElement = document.createElement('div');
newElement.textContent = 'Nuovo elemento!';
oldElement.parentNode.replaceChild(newElement, oldElement);
```

**Con `eI()`:**
```javascript
eI('<div>Nuovo elemento!</div>', {
    replaceChild: '#oldElement'
});
```

### 5. Aggiungere stili e classi

**Vanilla JS:**
```javascript
const styledElement = document.getElementById('styledElement');
styledElement.classList.add('text-success', 'fw-bold');
styledElement.style.fontSize = '20px';
styledElement.style.color = 'blue';
styledElement.style.backgroundColor = '#f0f0f0';
```

**Con `eI()` usando oggetto style:**
```javascript
eI('#styledElement', {
    class: 'text-success fw-bold',
    style: { 
        fontSize: '20px',
        color: 'blue',
        backgroundColor: '#f0f0f0'
    }
});
```

**Con `eI()` usando stringa CSS (novità v1.1.0):**
```javascript
eI('#styledElement', {
    class: 'text-success fw-bold',
    style: 'font-size: 20px; color: blue; background-color: #f0f0f0;'
});
```

### 6. Aggiungere un elemento con attributi personalizzati

**Vanilla JS:**
```javascript
const customElement = document.createElement('div');
customElement.textContent = 'Elemento con attributi personalizzati';
customElement.setAttribute('data-custom', 'value');
document.getElementById('example6').appendChild(customElement);
```

**Con `eI()`:**
```javascript
eI('<div>Elemento con attributi personalizzati</div>', {
    'data-custom': 'value',
    to: '#example6'
});
```

### 7. Rimuovere un elemento

**Vanilla JS:**
```javascript
const elementToRemove = document.getElementById('elementToRemove');
elementToRemove.parentNode.removeChild(elementToRemove);
```

**Con `eI()`:**
```javascript
eI('#elementToRemove', {
    remove: true
});
```

### 8. Aggiungere un elemento con animazione

**Vanilla JS:**
```javascript
document.getElementById('addButton').addEventListener('click', () => {
    const newElement = document.createElement('div');
    newElement.textContent = 'Elemento ' + counter;
    newElement.classList.add('box', 'fade-in');
    document.getElementById('container').appendChild(newElement);
    counter++;
});
```

**Con `eI()`:**
```javascript
let counter = 1;
eI('#addButton', {
    click: () => {
        eI('<div>Elemento ' + counter + '</div>', {
            class: 'box fade-in',
            to: '#container'
        });
        counter++;
    }
});
```

### 9. Applicare stili con sintassi CSS testuale (novità v1.1.0)

**Vanilla JS:**
```javascript
const element = document.getElementById('styleExample');
element.style.border = '1px solid #ccc';
element.style.padding = '10px';
element.style.borderRadius = '5px';
element.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
```

**Con `eI()` usando stringa CSS:**
```javascript
eI('#styleExample', {
    style: 'border: 1px solid #ccc; padding: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'
});
```

### 10. Gestione dei valori falsy (novità v1.1.0)

**Vanilla JS:**
```javascript
const checkbox = document.getElementById('myCheckbox');
checkbox.disabled = false;
checkbox.checked = false;
```

**Con `eI()` v1.0.0 (non funzionerebbe correttamente con valori falsy):**
```javascript
// In v1.0.0, i valori falsy vengono ignorati
eI('#myCheckbox', {
    disabled: false, // questo valore veniva ignorato
    checked: false   // questo valore veniva ignorato
});
```

**Con `eI()` v1.1.0:**
```javascript
// In v1.1.0, i valori falsy vengono applicati correttamente
eI('#myCheckbox', {
    disabled: false, // questo valore viene applicato
    checked: false   // questo valore viene applicato
});
```

---

## Introduzione a `eIs()`

La funzione `eIs()` è una variante di `eI()` che permette di applicare operazioni a più elementi selezionati. È utile quando si desidera eseguire la stessa operazione su più elementi che corrispondono a un determinato selettore CSS.

### Sintassi di `eIs()`

```javascript
eIs(selector, fn)
```

- **selector**: Un selettore CSS che seleziona più elementi.
- **fn**: Una funzione che viene eseguita per ogni elemento selezionato. La funzione riceve due argomenti: l'elemento corrente e l'indice dell'elemento.

---

## Esempio di utilizzo di `eIs()`

### Applicare una classe a tutti gli elementi con una determinata classe

**Vanilla JS:**
```javascript
document.querySelectorAll('.myClass').forEach((el, i) => {
    el.classList.add('newClass');
});
```

**Con `eIs()`:**
```javascript
eIs('.myClass', (el, i) => {
    el.classList.add('newClass');
});
```

### Applicare stili a più elementi usando la nuova sintassi stringa CSS (v1.1.0)

**Vanilla JS:**
```javascript
document.querySelectorAll('.card').forEach((el, i) => {
    el.style.margin = '10px';
    el.style.boxShadow = i % 2 === 0 ? '0 2px 5px blue' : '0 2px 5px red';
});
```

**Con `eIs()`:**
```javascript
eIs('.card', (el, i) => {
    eI(el, {
        style: `margin: 10px; box-shadow: 0 2px 5px ${i % 2 === 0 ? 'blue' : 'red'};`
    });
});
```


## Conclusione

Le funzioni `eI()` e `eIs()` sono strumenti potenti per semplificare la manipolazione del DOM in JavaScript. Riducendo la quantità di codice necessario per eseguire operazioni comuni, queste funzioni possono migliorare la leggibilità e la manutenibilità del codice.  


# Change Log

V1.1.0

- **Function _eIStyle()**:
Aggiunta la funzionalità di accettare stili CSS come stringa (oltre che come oggetto)
Implementata la conversione da formato kebab-case a camelCase per le proprietà CSS  

- **Funzion _eIOptions()**:
Cambiata la verifica delle proprietà da if (options[attr]) a if (attr in options) per gestire correttamente i valori falsy
Questa modifica consente di impostare valori come false, 0 o stringhe vuote senza che vengano ignorati  

- **Bug fix**:
Rimosso codice duplicato nella funzione _eIStyle (il controllo sul valore null era presente due volte)  

- Descrizioni dei parametri:
Migliorata la descrizione dei parametri nelle funzioni, rendendo più chiaro il loro utilizzo  
