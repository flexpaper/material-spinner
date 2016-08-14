# material-spinner
Material design style spinner loader with graceful degradation

#### Installing it
-------------------
Include flexpaper-spinner.css and flexpaper.spinner.js on your web page.<br/>

```html
<link rel='stylesheet' href='css/flexpaper-spinner.css'/>

<script src='js/flexpaper.spinner.js'></script>
```

#### Basic usage
Create a element that you want to use as place holder for your spinner.
```html
<div id="spinner-target" style="left:60%;top:40%;"></div>
```
Execute the addSpinner function whenever you want to show the spinner on your web page
```js
FLEXPAPER.utils.addSpinner({
    element     : 'spinner-target',
    width       : 100,
    height      : 100,
    logo        : 'images/flexpaper-logo.png'
});
```

Demo
-------------------
[See the online demo](http://flexpaper.github.io/material-spinner/)

License
-------------------
Mozilla Public License License Version 2.0

<h3>Maintained and sponsored by █▒▓▒░ <a href="http://flowpaper.com/">The FlowPaper Project</a></h3>
