/***
.indexOf(obj) - Returns the index of obj or -1 if there is none.

.nsort() - Sorts numeric arrays.

.compareArrays(array) - Compare array.

.map(f) - Map a function to each element of the array.
For example, [1, 2, 3, 4].map(function(n){ return n + 1; }); will return the array with all numbers incremented by one.

.filter(f) - Filters an array based on the passed function.
For example, [1, 2, -2, 3, -4, 4, 5].filter(function(n){ return n>0; }); will return the array with all positive numbers.

.forEach(f) - Run f passing as arguments the value, the index and the array itself
***/

if(!Array.prototype.indexOf){
  Array.prototype.indexOf = function(obj){
    for(var i = 0; i < this.length; i++){
      if(this[i] == obj){ return i; }
    }
    return -1;
  }
}

Array.prototype.nsort = function() {
  return this.sort(function(a,b){
    return a-b;
  });
}

Array.prototype.compareArrays = function(arr){
  if(this.length != arr.length){
    return false;
  }
  for(var i = 0; i < arr.length; i++){
    if(this[i].compareArrays){
      if(!this[i].compareArrays(arr[i])){
        return false;
      }else{
        continue;
      }
    }
    if(this[i] != arr[i])
      return false;
  }
  return true;
}

if(!Array.prototype.map){
  Array.prototype.map = function(f){
    var a = new Array(this.length);
    for(var i = 0; i < this.length; i++){
      a[i] = f(this[i]);
    }
    return a;
  }
}

if(!Array.prototype.filter){
  Array.prototype.filter = function(f){
    var a = new Array();
    for(var i = 0; i < this.length; i++){
      if(f(this[i])){
        a.push(this[i]);
      }
    }
    return a;
  }
}

if(!Array.prototype.forEach){
  Array.prototype.forEach = function(f){
    var t = Object(this);
    var len = t.length >>> 0;
    var thisp = arguments[1];
    for (var i = 0; i < len; i++){
      if (i in t){
        f.call(thisp, t[i], i, t);
      }
    }
  }
}