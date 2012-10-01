/***
FQueue.add( f ); //Adds a function to queue.
f can be a declared function passed to FQueue.anonF() or an anonymous function.
Examples:
FQueue.add( FQueue.anonF(myFunction, 1, "a") ); //1 and "a" are arguments
FQueue.add( FQueue.anonF(function(arg1, arg2){ myFunction(arg1, arg2) }, 1, "a") ); //1 and "a" are arguments 1 and 2

FQueue.size(); //Gets the queue size.

FQueue.getNext(); //Gets the first queued function and deletes it from the queue.

FQueue.runNext(); //Runs the first function in the queue and deletes it from the queue. Return value from queued function will be returned.

FQueue.run( f ); //Runs any function. Return value from function will be returned.
f can be a declared function passed to FQueue.anonF(), a queued function obtained with FQueue.getNext() or an anonymous function.
Examples:
FQueue.run( FQueue.anonF(myFunction, 3, "c") ); //3 and "c" are arguments
FQueue.run( FQueue.anonF(function(arg1, arg2){ myFunction(arg1, arg2) }, 4, "d") ); //4 and "d" are arguments 1 and 2
FQueue.run( FQueue.getNext() );

FQueue.runAfter( f, t, cb ); //Runs a function after t time and calls callback cb with returned values from f.
f can be a declared function passed to FQueue.anonF(), a queued function obtained with FQueue.getNext() or an anonymous function.
t must be a time value in milliseconds
cb is not mandatory and can be a declared function passed to FQueue.anonF(), a queued function obtained with FQueue.getNext() or an anonymous function.
***/

var FQueue = (function(){

  var queue = [];

  var add = function(f){
    queue.push(f);
  };

  var run = function(f){
    var r = f();
    return r;
  };

  var runAfter = function(f, m, callback){
    setTimeout(function(){
      var r = f();
      try{
        callback(r);
      }catch(e){}
    }, m);
  }

  var runNext = function(){
    if(queue.length > 0){
      var f = queue.shift();
      return f();
    }
  };

  var getNext = function(){
    if(queue.length > 0){
      var f = queue.shift();
      return f;
    }
  }

  var anonF = function(){
    var args = Array.prototype.slice.call(arguments);
    var f = args.shift();
    return (function(args){
      return function(){
        return f.apply(this, args);
      };
    })(args);
  }

  var size = function size(){
    return queue.length;
  }

  return {
    add: add,
    run: run,
    runAfter: runAfter,
    runNext: runNext,
    getNext: getNext,
    anonF: anonF,
    size: size
  };
}());

function test(){

  function log(s){
    console.log(s);
    return s;
  }
  
  function myF(arg1, arg2){
    return arg1 + arg2;
  }

  function myFcallback(e){
    var s = FQueue.size();
    if(e == 3 && s == 0){
      log("OK.");
    }else if(r != 3){
      log("Returned value is " + r + " but 3 was expected. Aborting test...");
      return;
    }else if(s != 0){
      log("Expected queue size was 0, but current queue size is " + s + ". Aborting test...");
      return;
    }
  }
  
  log("Adding an FQueue.anonF function to queue...");
  FQueue.add( FQueue.anonF(myF, 1, 2) );
  var s = FQueue.size();
  if(s == 1){
    log("OK");
  }else{
    log("Expected queue size was 1, but current queue size is " + s + ". Aborting test...");
    return;
  }
  
  log("Adding an anonymous function to queue...");
  FQueue.add( FQueue.anonF( function(i, j){ var r = myF(i, j); return r; }, 1, 2 ) );
  var s = FQueue.size();
  if(s == 2){
    log("OK");
  }else{
    log("Expected queue size was 2, but current queue size is " + s + ". Aborting test...");
    return;
  }
  
  log("Adding an FQueue.anonF function to queue...");
  FQueue.add( FQueue.anonF(myF, 1, 2) );
  var s = FQueue.size();
  if(s == 3){
    log("OK");
  }else{
    log("Expected queue size was 3, but current queue size is " + s + ". Aborting test...");
    return;
  }

  log("Running first queued function with FQueue.runNext() method...");
  var r = FQueue.runNext();
  var s = FQueue.size();
  if(r == 3 && s == 2){
    log("OK.");
  }else if(r != 3){
    log("Returned value is " + r + " but 3 was expected. Aborting test...");
    return;
  }else if(s != 2){
    log("Expected queue size was 2, but current queue size is " + s + ". Aborting test...");
    return;
  }
  
  log("Running second queued function with FQueue.run( FQueue.getNext() ) method...");
  var r = FQueue.run( FQueue.getNext() );
  var s = FQueue.size();
  if(r == 3 && s == 1){
    log("OK.");
  }else if(r != 3){
    log("Returned value is " + r + " but 3 was expected. Aborting test...");
    return;
  }else if(s != 1){
    log("Expected queue size was 1, but current queue size is " + s + ". Aborting test...");
    return;
  }
  
  log("Running third queued function with FQueue.runAfter( FQueue.getNext(), 1000, myFcallback ) method...");
  FQueue.runAfter( FQueue.getNext(), 1000, myFcallback );

}

/***
Why I should use FQueue?
Well, let's see two examples, and compare the expected and the actual outputs of each one of them.
Method a() is expected to store 5 functions in a list, then running each stored function from that list.
Each function is expected to print a number, from 1 to 5, but it actually prints 5 times the number 6.
That's because of the scope of the variable i. 

To prevent that you can use closures or FQueue.

Method b() does exactly the same as method a(), with the only difference that method b() encapsulates the
function inside a FQueue.anonF(), and passes the i argument to that funcion.
The expected output after running b() is the desired one.
***/

function a(){
  var flist = [];
  for(var i = 1; i < 6; i++){
    flist[i] = function(){
      console.log(i);
    };
  }
  for(var j = 1; j < 6; j++){
    flist[j]();
  }
}

function b(){
  var flist = [];
  for(var i = 1; i < 6; i++){
    flist[i] = FQueue.anonF(
      function(i){
        console.log(i);
      }, i
    );
  }
  for(var j = 1; j < 6; j++){
    flist[j]();
  }
}