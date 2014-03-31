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
```
