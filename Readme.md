== Welcome ==

JniftilitieS is made for people who have to deal with JavaScript and a wide range of browsers, some of them really old and thus
not supporting some nifty JavaScript methods.

==Array==

The following methods are present in the Arrays script:

```javascript
indexOf(obj); //Returns the index of obj or -1 if there is none.

nsort(); //Sorts numeric arrays.

compareArrays(array); //Compare array.

map(f); //Map a function to each element of the array.
//For example, [1, 2, 3, 4].map(function(n){ return n + 1; }); will return the array with all numbers incremented by one.

filter(f); //Filters an array based on the passed function.
//For example, [1, 2, -2, 3, -4, 4, 5].filter(function(n){ return n>0; }); will return the array with all positive numbers.

forEach(f); //Run f passing as arguments the value, the index and the array itself
```


==Dates==

The following methods are present in the Dates script:

{{{
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
```


==Numbers==

The following methods are present in the Numbers script:

```javascript
truncate(n); //Truncate float to n decimal points.

format(delim, decim, prefix, suffix); //Format a number.
//delim - character/s used to split the numer. Not mandatory.
//decim - characte/s used to split decimals. Not mandatory.
//prefix - character/s prepended to the result. Not mandatory.
//suffix - character/s appended to the result. Not mandatory.

max(n, m); //Return the highest number.

min(n, m); //Return the lowest number.
```


==Strings==

The following methods are present in the Strings script:

```javascript
trim(); //Remove all white spaces, \t, \n and \r from both the beggining and the end of the string.

removeFirst(); //Remove the very first character from the string using.

removeLast(); //Remove the very last character from the string.

ellipse(n, cutOnWord); //Check the string lenght and if lenght is bigger than n cut it to n characters and add '...' to the end. Also, if cutOnWord is set to true, it will cut respecting words, means it won't cut a word in a half but instead it will search the nearest place suitable to cut at.

capitalize(force); //Capitalize the first word. If true argument is passed to the funcion, then the function will make sure that only the first letter is uppercase.

capitalizeall(force); //Capitalize every word. If true argument is passed to the funcion, then the function will make sure that only the first letter is uppercase.

contains(s); //Check if s is contained in the string.

startsWith(s); //Check if s is the start of the string.

endsWith(s); //Check if s is the end of the string.

toInt(); //Convert string to int.

remove(rx); //Remove whatever matches with the regex argument.

stripNonAlpha(); //Remove all non-alpha characters.

stripNonAlphaNumeric(); //Remove all non-alpha or non-numeric characters.

stripNonNumeric(); //Remove all non-numerics characters.

stripNumeric(); //Remove all numeric characters.

isAlpha(); //Check if string contains only alpha characters.

isAlphaNumeric(); //Check if string contains only alphanumeric characters.

isNumeric(); //Check if string contains only numeric characters.

isValidEmail(); //Check if string is valid email.
```


==Functions queue==

The following methods are present in the FQueue script:

```javascript
FQueue.add( f ); //Adds a function to queue.
//f can be a declared function passed to FQueue.anonF() or an anonymous function.
//Examples:
FQueue.add( FQueue.anonF(myFunction, 1, "a") ); //1 and "a" are arguments
FQueue.add( FQueue.anonF(function(arg1, arg2){ myFunction(arg1, arg2) }, 1, "a") ); //1 and "a" are arguments 1 and 2

FQueue.size(); //Gets the queue size.

FQueue.getNext(); //Gets the first queued function and deletes it from the queue.

FQueue.runNext(); //Runs the first function in the queue and deletes it from the queue. Return value from queued function will be returned.

FQueue.run( f ); //Runs any function. Return value from function will be returned.
//f can be a declared function passed to FQueue.anonF(), a queued function obtained with FQueue.getNext() or an anonymous function.
//Examples:
FQueue.run( FQueue.anonF(myFunction, 3, "c") ); //3 and "c" are arguments
FQueue.run( FQueue.anonF(function(arg1, arg2){ myFunction(arg1, arg2) }, 4, "d") ); //4 and "d" are arguments 1 and 2
FQueue.run( FQueue.getNext() );

FQueue.runAfter( f, t, cb ); //Runs a function after t time and calls callback cb with returned values from f.
//f can be a declared function passed to FQueue.anonF(), a queued function obtained with FQueue.getNext() or an anonymous function.
//t must be a time value in milliseconds
//cb is not mandatory and can be a declared function passed to FQueue.anonF(), a queued function obtained with FQueue.getNext() or an anonymous function.
```

Why FQueue is usefull?
Well, let's see two examples, and compare the expected and the actual outputs of each one of them.
Method a() is expected to store 5 functions in a list, then running each stored function from that list.
Each function is expected to print a number, from 1 to 5, but it actually prints 5 times the number 6.
That's because of the scope of the variable i. 

To prevent that you can use closures or FQueue.

Method b() does exactly the same as method a(), with the only difference that method b() encapsulates the
function inside a FQueue.anonF(), and passes the i argument to that funcion.
The expected output after running b() is the desired one.

```javascript
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
```


