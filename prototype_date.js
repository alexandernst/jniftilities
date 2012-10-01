/***
Format a date object. If date object is empty, it will be filled with current time.
Example:
var date = new Date();
date.formatDate("Y/m/d");

Format options:
  a - Lowercase Ante meridiem and Post meridiem
  A - Uppercase Ante meridiem and Post meridiem
  B - Swatch internet time
  c - ISO 8601 date (e.g.: "2004-02-12T15:19:21+00:00")
  d - Day of the month, 2 digits with leading zeros
  D - A textual representation of a day, three letters
  F - A full textual representation of a month
  g - 12-hour format of an hour without leading zeros, 1 through 12
  G - 24-hour format of an hour without leading zeros
  h - 12-hour format of an hour with leading zeros
  H - 24-hour format of an hour with leading zeros
  i - Minutes with leading zeros
  I - DST mode
  j - Day of the month without leading zeros
  l - A full textual representation of the day of the week
  L - Leap year
  m - Numeric representation of a month, with leading zeros
  M - A short textual representation of a month, three letters
  n - Numeric representation of a month, without leading zeros
  N - ISO-8601 numeric representation of the day of the week
  O - Difference to Greenwich time (GMT) in hours
  P - Difference to GMT, with colon between hours and minutes
  r - RFC 822 formatted date
  s - Seconds, with leading zeros
  S - English ordinal suffix for the day of the month, 2 characters
  t - Number of days of given month
  U - Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
  w - Numeric representation of the day of the week
  W - Weeknumber, as per ISO specification
  y - A two-digit representation of a year
  Y - A full numeric representation of a year, 4 digits
  z - The day of the year, zero indexed from 0 through 366
  Z - Timezone offset in seconds
***/
Date.prototype.formatDate = function (input) {
    var daysLong      = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var daysShort     = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthsShort   = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthsLong    = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var ordinalSuffix = {1 : "st", 2 : "nd", 3 : "rd", 21 : "st", 22 : "nd", 23 : "rd", 31 : "st", "default" : "th"};

    var switches = {
      a : function(){ return date.getHours() > 11 ? "pm" : "am"; },
      A : function(){ return (this.a().toUpperCase()); },
      B : function(){
            var off = (date.getTimezoneOffset() + 60) * 60;
            var theSeconds = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds() + off;
            var beat = Math.floor(theSeconds / 86.4);
            if(beat > 1000) beat -= 1000; if(beat < 0) beat += 1000;
            if((String(beat)).length == 1) beat = "00" + beat; if((String(beat)).length == 2) beat = "0" + beat;
            return beat;
      },
      c : function(){ return (this.Y() + "-" + this.m() + "-" + this.d() + "T" + this.H() + ":" + this.i() + ":" + this.s() + this.P()); },
      d : function(){ var j = String(this.j()); return (j.length == 1 ? "0" + j : j); },
      D : function(){ return daysShort[date.getDay()]; },
      F : function(){ return monthsLong[date.getMonth()]; },
      g : function(){ if(date.getHours() == 0){ return 12; }else{ return date.getHours() > 12 ? date.getHours() - 12 : date.getHours(); } },
      G : function(){ return date.getHours(); },
      h : function(){ var g = String(this.g()); return (g.length == 1 ? "0" + g : g); },
      H : function(){ var G = String(this.G()); return (G.length == 1 ? "0" + G : G); },
      i : function(){ var min = String (date.getMinutes ()); return (min.length == 1 ? "0" + min : min); },
      I : function(){ var noDST = new Date ("January 1 " + this.Y() + " 00:00:00"); return (noDST.getTimezoneOffset () == date.getTimezoneOffset () ? 0 : 1); },
      j : function(){ return date.getDate(); },
      l : function(){ return daysLong[date.getDay()]; },
      L : function(){ var Y = this.Y(); if((Y % 4 == 0 && Y % 100 != 0) || (Y % 4 == 0 && Y % 100 == 0 && Y % 400 == 0)){ return 1; }else{ return 0; } },
      m : function(){ var n = String(this.n()); return (n.length == 1 ? "0" + n : n); },
      M : function(){ return monthsShort[date.getMonth()]; },
      n : function(){ return date.getMonth() + 1; },
      N : function(){ var w = this.w(); return (w == 0 ? 7 : w); },
      O : function(){
            var os = Math.abs(date.getTimezoneOffset());
            var h = String(Math.floor(os / 60)); var m = String(os % 60);
            h.length == 1 ? h = "0" + h : 1; m.length == 1 ? m = "0" + m : 1;
            return date.getTimezoneOffset() < 0 ? "+" + h + m : "-" + h + m;
      },
      P : function(){ var O = this.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2)); },
      r : function(){ return this.D() + ", " + this.d() + " " + this.M() + " " + this.Y() + " " + this.H() + ":" + this.i() + ":" + this.s() + " " + this.O(); },
      s : function(){ var sec = String (date.getSeconds ()); return (sec.length == 1 ? "0" + sec : sec); },
      S : function(){ if(ordinalSuffix.indexOf(date.getDate())){ return ordinalSuffix[date.getDate()]; }else{ return ordinalSuffix["default"]; } },
      t : function(){ var daysinmonths = [null,31,28,31,30,31,30,31,31,30,31,30,31]; if(this.L() == 1 && this.n() == 2) return 29; return daysinmonths[this.n()]; },
      U : function(){ return Math.round(date.getTime() / 1000); },
      w : function(){ return date.getDay(); },
      W : function(){
            var DoW = this.N(); var DoY = this.z(); var daysToNY = 364 + this.L() - DoY;
            if(daysToNY <= 2 && DoW <= (3 - daysToNY)) { return 1; }
            if(DoY <= 2 && DoW >= 5){ return new Date (this.Y() - 1, 11, 31).formatDate("W"); }
            var nyDoW = new Date(this.Y(), 0, 1).getDay(); nyDoW = nyDoW != 0 ? nyDoW - 1 : 6;
            if(nyDoW <= 3){ return (1 + Math.floor ((DoY + nyDoW) / 7)); }else{ return (1 + Math.floor ((DoY - (7 - nyDoW)) / 7)); }
      },
      y : function(){ var y = String(this.Y()); return y.substring(y.length-2, y.length); },
      Y : function(){
            if(date.getFullYear){
              var newDate = new Date("January 1 2001 00:00:00 +0000");
              var x = newDate.getFullYear();
              if(x == 2001){ return date.getFullYear(); }
            }
            var x = date.getYear(); var y = x % 100; y += (y < 38) ? 2000 : 1900; return y;
      },
      z : function(){ var t = new Date("January 1 " + this.Y() + " 00:00:00 GMT" + this.O()); var diff = date.getTime() - t.getTime(); return Math.floor(diff / 1000 / 60 / 60 / 24); },
      Z : function(){ return (date.getTimezoneOffset() * - 60); }
    }

    date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDay() - 1, date.getHours(), date.getMinutes(), date.getSeconds());
    var formatString = input.split("");
    var i = 0;
    while(i < formatString.length){
      if(formatString[i] == "%"){
        formatString.splice(i, 1);
      }else{
        if(switches[formatString[i]] != undefined){
          formatString[i] =  switches[formatString[i]]();
        }
      }
      i++;
    }
    return formatString.join("");
}