# Nightmare Scripted

Nightmare scripted is a wrapper around Nightmare by *segmentio* which allows JSON scripting on the nightmare object.
> Note: this module should never be used on a production server or any server where inputs can not be trusted
>       this module uses eval() to convert strings to functions and could be a security risk in most cases.

## Installation

``npm install nightmare-scripted``

## Usage

> Refer to the Nightmare documentation at https://github.com/segmentio/nightmare

### Including/Initialization

Nightmare must be initialized before use. This can be done on import or as a function call.

```javascript
const nightmareScripted = require('nightmare-scripted')({electronPath: require('./node_modules/electron'),show: false});
```
or
```javascript
const nightmareScripted = require('nightmare-scripted')();
nighmareScripted.init({electronPath: require('./node_modules/electron'),show: false});
```

### Running a script

To run a script use the .run(script) function. It is await-able/then-able

```javascript
(async()=>{

let Script = JSON.stringify("[{'goto': ['https://en.wikipedia.org/wiki/Template:Nevada_County,_California']},{'cookies.clear': []},{'wait': ['body']},{'evaluate': [`()=>{const ghostTown = document.querySelector('tr > th > a[title="Ghost town"]');const row = ghostTown.parentElement.parentElement;const towns = Array.from(row.querySelectorAll('li > a')).map((el) => el.href);return towns;}`]}]);";

let res = await nighmareScripted.run(Script);
console.log(res);

})();
```

### Available Functions

Most nightmare chainable functions are available.

goto
useragent
authentication
end
halt
back
forward
refresh
click
mousedown
mouseup
mouseover
mouseout
type
insert
check
uncheck
select
scrollTo
viewPort
inject
evaluate
wait
waitfn
header
exists
visible
on
once
removeListener
screenshot
html
pdf
title
url
path
cookies.get
cookies.set
cookies.clear

#### end

Passing ``end`` is optional at the end of your script. It will be called automatically after all of your scripted functions are run.

#### wait and waitfn

For code simplicity ``wait(fn[, arg1, arg2,...]) has been replaced with waitfn(fn[, arg1, arg2,...]);

``wait`` still accepts a ms integer or a string selector.

### Script format

Scripts are formatted as an array of objects. Both JSON string representation and JavaScript arrays are accepted. Objects should have a key with the name of the function and a value with the arguments as an array. It is best practice to set an empty array when no arguments are to be passed (though you can set it to ``undefined``).

```javascript

[
    {'goto': ['http://google.com']},
    {'type': ['input.gLFyf.gsfi', 'Lets search the web']},
    {'click':['.gbqfbb']},
    {'end':[]},
]

```