# CSS Reflow Tracer (a.k.a. jaia)

This is a little script that will show a curated list of mutation events on your web page.
You can use this event log to trace down CSS reflows.
It will tell you when class changes, style changes and DOM insertion / removal happens.

Use it in combination with the reflow logger in Firefox (Console > CSS > Info).

## Usage

Copy and paste the script in your browsers Console.
Then to start logging, run:

```javascript
jaia.start()
// do an action that will cause reflows
jaia.stop()
```

## Demo

* Open about:blank, and then open the developer tools
* Paste the jaia script in the Console
* Enable reflows under CSS > Info (Firefox only)
* Now prepare the page by adding two divs and a function

```javascript
document.body.appendChild(document.createElement('div'))
document.body.appendChild(document.createElement('div'))
document.body.querySelectorAll('div')[0].textContent = 'First div'
document.body.querySelectorAll('div')[1].textContent = 'Second div'

function magic() {
  var d = document.querySelectorAll('div')[0]
  d.style.display = d.style.display === 'none' ? 'block' : 'none'
}
```

Now call the `magic()` function and see that a reflow happens.

```javascript
magic()
// undefined
// reflow: 0.1ms
```

To track down the reflow we enable jaia, and execute the same function again.

```javascript
jaia.start()
magic()
```

Now jaia will log information about probable causes of the reflow in the browsers console, right *after* the reflow.

```
reflow: 0.19ms
"Style change 'display', newValue 'block', was 'none'" <div style="display: block;">
```

The last argument of the log is always the element involved.
You can click it to jump to the node.

## Advanced stuff

It's not always as easy as one single line.
It can happen that multiple actions are logged, you'll have to investigate on your own for now.
A lot of times a reflow will also be caused by a class change,
you'll need to walk through all the rules in the class to track down the reflow.

If you don't get any log information, the reflow probably comes from: `:hover` or `:active` pseudo selectors in CSS.
