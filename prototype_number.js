/***
.truncate(n) - Truncate float to n decimal points.

.format(delim, decim, prefix, suffix) - Format a number.

delim - character/s used to split the numer. Not mandatory.

decim - characte/s used to split decimals. Not mandatory.

prefix - character/s prepended to the result. Not mandatory.

suffix - character/s appended to the result. Not mandatory.

.max(n, m) - Return the highest number.

.min(n, m) - Return the lowest number.
***/

Number.prototype.truncate = function(n){
  return Math.round(this*Math.pow(10, n)) / Math.pow(10, n);
}

Number.prototype.format = function(delim, decim, prefix, suffix){
  delim = typeof(delim) == "undefined" ? '.' : delim;
  decim = typeof(decim) == "undefined" ? ',' : decim;
  prefix = typeof(prefix) == "undefined" ? '' : prefix;
  suffix = typeof(suffix) == "undefined" ? '' : suffix;
  var num = this + '';
  var numstr = num.split('.');
  var numleft = numstr[0];
  var numright = numstr.length > 1 ? decim + numstr[1] : '';
  var tmpnumleft = '';
  while(numleft.length > 3){
    tmpnumleft = delim + numleft.substr(numleft.length - 3) + tmpnumleft;
    numleft = numleft.substr(0, numleft.length - 3);
  }
  numleft = numleft + tmpnumleft;
  return prefix + numleft + numright + suffix;
};

Number.prototype.max = function(a, b){
  return a < b ? b : a;
}

Number.prototype.min = function(a, b){
  return a > b ? b : a;
}