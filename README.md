Simple events library that built to take advantage of JavaScript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)


#### Quick Start

```javascript
// automatically add "init" handler
events.oninit = () => {
    console.log("init1");
};

// same as
events.on("init", () => {
    console.log("init2");
});


// using once
events.onceinit = () => {
    console.log("this will called once");
};

//same as
events.once("init", () => {
    console.log("this will called once");
});


// trigger event on all handlers
events.emit("init");


// remove all handlers
events.off("init");

// remove specific handler
events.off("init", callback);
````


#### API
```javascript
// Similar to NodeJS. Just extra proxy handlers
Proximitter.on(eventName, callback, n=Infinity)
Proximitter.once(eventName, callback)
Proximitter.off(eventName, callback)
Proximitter.emit(eventName, ...args)

Proximitter.on"EventName" = callback
Proximitter.once"EventName" = callback
```