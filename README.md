# `el()` 

La funzione `el()` è una utility JavaScript che semplifica la manipolazione del DOM, permettendo di creare, modificare e gestire elementi HTML in modo più conciso rispetto all'uso diretto delle API del DOM. 

[Guarda l'esempio](https://giuliopanda.github.io/el-test.html)

## Indice
1. [Introduzione a `el()`](#introduzione-a-el)
2. [Sintassi di `el()`](#sintassi-di-el)
3. [Esempi di utilizzo di `el()`](#esempi-di-utilizzo-di-el)
   - [Creare un nuovo elemento e aggiungerlo al DOM](#creare-un-nuovo-elemento-e-aggiungerlo-al-dom)
   - [Modificare un elemento esistente](#modificare-un-elemento-esistente)
   - [Aggiungere un evento a un elemento](#aggiungere-un-evento-a-un-elemento)
   - [Sostituire un elemento esistente](#sostituire-un-elemento-esistente)
   - [Aggiungere stili e classi](#aggiungere-stili-e-classi)
   - [Aggiungere un elemento con attributi personalizzati](#aggiungere-un-elemento-con-attributi-personalizzati)
   - [Rimuovere un elemento](#rimuovere-un-elemento)
   - [Aggiungere un elemento con animazione](#aggiungere-un-elemento-con-animazione)
4. [Introduzione a `els()`](#introduzione-a-els)
5. [Esempio di utilizzo di `els()`](#esempio-di-utilizzo-di-els)

---

## Introduzione a `el()`

La funzione `el()` è progettata per semplificare la manipolazione del DOM. Può essere utilizzata per creare nuovi elementi, modificare elementi esistenti, aggiungere eventi, gestire stili e classi, e molto altro. La funzione è particolarmente utile per ridurre la quantità di codice necessaria per eseguire operazioni comuni sul DOM.

### Sintassi di `el()`

```javascript
el(string, options)
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
| `style`         | `object`                 | Applica stili CSS all'elemento.                                             |
| `class`         | `string` o `array`       | Aggiunge una o più classi all'elemento.                                     |
| `removeClass`   | `string`                 | Rimuove una classe specifica dall'elemento.                                 |
| `replaceClass`  | `array`                  | Sostituisce una classe con un'altra.                                        |
| `id`            | `string`                 | Imposta l'ID dell'elemento.                                                 |
| `text`          | `string`                 | Imposta il testo dell'elemento.                                             |
| `html`          | `string`                 | Imposta l'HTML interno dell'elemento.                                       |

---


## Esempi di utilizzo di `el()`

### 1. Creare un nuovo elemento e aggiungerlo al DOM

**Vanilla JS:**
```javascript
const newElement = document.createElement('div');
newElement.textContent = 'Ciao, sono un nuovo elemento!';
document.getElementById('example1').appendChild(newElement);
```

**Con `el()`:**
```javascript
el('<div>Ciao, sono un nuovo elemento!</div>', {
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

**Con `el()`:**
```javascript
el('#targetElement', {
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

**Con `el()`:**
```javascript
el('#exampleButton', {
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

**Con `el()`:**
```javascript
el('<div>Nuovo elemento!</div>', {
    replaceChild: '#oldElement'
});
```

### 5. Aggiungere stili e classi

**Vanilla JS:**
```javascript
const styledElement = document.getElementById('styledElement');
styledElement.classList.add('text-success', 'fw-bold');
styledElement.style.fontSize = '20px';
```

**Con `el()`:**
```javascript
el('#styledElement', {
    class: 'text-success fw-bold',
    style: { fontSize: '20px' }
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

**Con `el()`:**
```javascript
el('<div data-custom="value">Elemento con attributi personalizzati</div>', {
    to: '#example6'
});
```

### 7. Rimuovere un elemento

**Vanilla JS:**
```javascript
const elementToRemove = document.getElementById('elementToRemove');
elementToRemove.parentNode.removeChild(elementToRemove);
```

**Con `el()`:**
```javascript
el('#elementToRemove', {
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

**Con `el()`:**
```javascript
let counter = 1;
el('#addButton', {
    click: () => {
        el('<div class="box fade-in">Elemento ' + counter + '</div>', {
            to: '#container'
        });
        counter++;
    }
});
```

---

## Introduzione a `els()`

La funzione `els()` è una variante di `el()` che permette di applicare operazioni a più elementi selezionati. È utile quando si desidera eseguire la stessa operazione su più elementi che corrispondono a un determinato selettore CSS.

### Sintassi di `els()`

```javascript
els(selector, fn)
```

- **selector**: Un selettore CSS che seleziona più elementi.
- **fn**: Una funzione che viene eseguita per ogni elemento selezionato. La funzione riceve due argomenti: l'elemento corrente e l'indice dell'elemento.

---

## Esempio di utilizzo di `els()`

### Applicare una classe a tutti gli elementi con una determinata classe

**Vanilla JS:**
```javascript
document.querySelectorAll('.myClass').forEach((el, i) => {
    el.classList.add('newClass');
});
```

**Con `els()`:**
```javascript
els('.myClass', (el, i) => {
    el.classList.add('newClass');
});
```

---

## Conclusione

Le funzioni `el()` e `els()` sono strumenti potenti per semplificare la manipolazione del DOM in JavaScript. Riducendo la quantità di codice necessario per eseguire operazioni comuni, queste funzioni possono migliorare la leggibilità e la manutenibilità del codice.
