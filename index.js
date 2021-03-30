
const validFunctions = [
    'goto',
    'useragent',
    'authentication',
    'end',
    'halt',
    'back',
    'forward',
    'refresh',
    'click',
    'mousedown',
    'mouseup',
    'mouseover',
    'mouseout',
    'type',
    'insert',
    'check',
    'uncheck',
    'select',
    'scrollTo',
    'viewPort',
    'inject',
    'evaluate',
    'wait',
    'waitfn',
    'header',
    'exists',
    'visible',
    'on',
    'once',
    'removeListener',
    'screenshot',
    'html',
    'pdf',
    'title',
    'url',
    'path',
    'cookies.get',
    'cookies.set',
    'cookies.clear',
];

module.exports = (options)=>{

    let nightmare = null;

    const init = (options) => {
        nightmare = require('nightmare')(options);
    }

    const processFunct = (fn) => {
        let functionName = Object.keys(fn)[0];
        let functionValue = fn[functionName];
    
        if(validFunctions.indexOf(functionName) < 0) throw new Error('Invalid Nightmare Function');
    
        if (functionName === 'evaluate' && typeof functionValue[0] === 'string') {
            functionValue[0] = eval(functionValue[0]);
        }
    
        if (functionName === 'halt' && typeof functionValue[1] === 'string') {
            functionValue[1] = eval(functionValue[1]);
        }
    
        if (functionName === 'waitfn' && typeof functionValue[0] === 'string') {
            functionValue[0] = eval(functionValue[0]);
            functionName = 'wait';
        }
    
        return {
            name: functionName,
            val: functionValue
        }
    }

    const run = async (script) => {
        if(typeof script === 'string') script = JSON.parse(script);
        let _n = null;
        for (let fn of script) {
            let funct = processFunct(fn)
            if (funct.name.indexOf('.') > 0) {
                let subs = funct.name.split('.');
                for (let sub = 0; sub < subs.length; sub++) {
                    if (sub === subs.length - 1) {
                        if (_n === null) _n = nightmare[subs[sub]](...funct.val);
                        else _n = _n[subs[sub]](...funct.val);
                    } else {
                        if (_n === null) _n = nightmare[subs[sub]];
                        else _n = _n[subs[sub]];
                    }
                }
            } else {
                if (_n == null) _n = nightmare[funct.name](...funct.val);
                else _n = _n[funct.name](...funct.val);
            }
        }
        if(typeof _n.end === 'function') _n.end();
        return _n;
    }

    if(typeof options === 'object'){
      init(options);  
    };

    return {
        run,
        init
    }
}