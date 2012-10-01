/***
.trim() - Remove all white spaces, \t, \n and \r from both the beggining and the end of the string.

.removeFirst() - Remove the very first character from the string using.

.removeLast() - Remove the very last character from the string.

.ellipse(n [, cutOnWord = false]) - Check the string lenght and if lenght is bigger than n cut it to n characters and add '...' to the end. If cutOnWord is set to true it will cut respecting words, means it won't cut a word in a half but instead it will search the nearest place suitable to cut at.

.capitalize([force = false]) - Capitalize the first word. If force is set to true then the function will make sure that only the first letter is uppercase.

.capitalizeall([force = false]) - Capitalize every word. If force is set to true then the function will make sure that only the first letter of each word is uppercase.

.contains(s) - Check if s is contained in the string.

.startsWith(s) - Check if s is the start of the string.

.endsWith(s) - Check if s is the end of the string.

.toInt([breakOnFirstNonNumeric = true]) - Convert string to int. If breakOnFirstNonNumeric is set to false it will return all the numerical characters that appear in the string.

.toFloat([breakOnFirstNonNumeric = true, decimalSeparator = '']) - Convert string to float. If breakOnFirstNonNumeric is set to false it will keep searching and ignoring all the non-numerical characters. A decimalSeparator can be passed to parse correctly the float.

.remove(rx) - Remove whatever matches with the regex argument.

.stripNonAlpha() - Remove all non-alpha characters.

.stripNonAlphaNumeric() - Remove all non-alpha or non-numeric characters.

.stripNonNumeric() - Remove all non-numerics characters.

.stripNumeric() - Remove all numeric characters.

.isAlpha() - Check if string contains only alpha characters.

.isAlphaNumeric() - Check if string contains only alphanumeric characters.

.isNumeric() - Check if string contains only numeric characters.

.isValidEmail() - Check if string is valid email.

.random(n [, type = 'alphanumeric']) - Generate a random string. Type can be 'numeric', 'alphaUpper', 'alphaLower', 'alpha' or 'alphanumeric'. 
***/

if(!String.prototype.trim){
  String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, '');
  }
}

if(!String.prototype.removeFirst){
  String.prototype.removeFirst = function(){
    return this.substr(1, this.length);
  }
}

if(!String.prototype.removeLast){
  String.prototype.removeLast = function(){
    return this.substr(0, this.length - 1);
  }
}

if(!String.prototype.ellipse){
  String.prototype.ellipse = function(maxLength, cutOnWord){
    if(typeof(maxLength) == 'undefined') return this;
    cutOnWord = typeof(cutOnWord) == 'undefined' ? false : cutOnWord;
    if(this.length <= maxLength){
      return this;
    }
    if(cutOnWord){
      var tmpstr = this.substr(maxLength - 3, maxLength);
      if(tmpstr[0] == ' '){
        return this.substr(0, maxLength - 3) + '...';
      }else{
        var tmpstr = this.substr(0, maxLength - 3);
        while(tmpstr[tmpstr.length - 1] != ' ' && tmpstr.length > 0){
          tmpstr = tmpstr.removeLast();
        }
        return tmpstr.substr(0, tmpstr.length - 1) + '...';
      }
    }else{
      return this.substr(0, maxLength - 3) + '...';
    }
  }
}

if(!String.prototype.capitalize){
  String.prototype.capitalize = function(force){
    force = typeof(force) == 'undefined' ? false : force;
    var words = this.split(/\b/g);
    var rs = [];
    for(var w in words){
      w = words[w];
      if(w.trim() != ''){
        if(rs.length < 1){
          rs[rs.length] = w.charAt(0).toUpperCase() + (force ? w.substring(1).toLowerCase() : w.substring(1));
        } else {
          rs[rs.length] = force ? w.toLowerCase() : w;
        }
      }
    };
    return rs.join(' ');
  }
}

if(!String.prototype.capitalizeall){
  String.prototype.capitalizeall = function(force){
    var force = typeof(force) == 'undefined' ? false : force;
    var words = this.split(/\b/g);
    var rs = [];
    for(var w in words){
      w = words[w];
      if(w.trim() != ''){
        rs[rs.length] = w.charAt(0).toUpperCase() + (force ? w.substring(1).toLowerCase(): w.substring(1));
      }
    };
    return rs.join(' ');
  }
}

if(!String.prototype.contains){
  String.prototype.contains = function(s){ 
    if(typeof(s) == 'undefined') return false;
    return -1 < this.indexOf(s);
  }
}

if(!String.prototype.startsWith){
  String.prototype.startsWith = function(s){
    if(typeof(s) == 'undefined') return false;
    return this.substr(0, s.length) == s;
  }
}

if(!String.prototype.endsWith){
  String.prototype.endsWith = function(s){
    if(typeof(s) == 'undefined') return false;
    return this.substr(this.length - s.length) == s;
  }
}

if(!String.prototype.toFloat){
  String.prototype.toFloat = function(breakOnFirstNonNumeric, decimalSeparator){
    var breakOnFirstNonNumeric = typeof(breakOnFirstNonNumeric) == 'undefined' ? true : breakOnFirstNonNumeric;
    var decimalSeparator = typeof(decimalSeparator) == 'undefined' ? ',' : decimalSeparator;
    var n = '';
    for(var i = 0; i < this.length; i++){
    
      var currentChar = this.charAt(i);
      var currentCode = this.charCodeAt(i);
      
      if(currentCode >= 48 && currentCode <= 57){
        n += currentChar;
      }else if(currentChar == decimalSeparator && !breakOnFirstNonNumeric){
        n += '.';
      }

    }
    return parseFloat(n);
  }
}

if(!String.prototype.toInt){
  String.prototype.toInt = function(breakOnFirstNonNumeric){
    var breakOnFirstNonNumeric = typeof(breakOnFirstNonNumeric) == 'undefined' ? true : breakOnFirstNonNumeric;
    return parseInt(this.toFloat(breakOnFirstNonNumeric, ''), 10);
  }
}

if(!String.prototype.remove){
  String.prototype.remove = function(rx){
    return this.replace(rx, '');
  }
}

if(!String.prototype.stripNonAlpha){
  String.prototype.stripNonAlpha = function(){
    return this.remove(/[^A-Za-z ]+/g);
  }
}

if(!String.prototype.stripNonAlphaNumeric){
  String.prototype.stripNonAlphaNumeric = function(){
    return this.remove(/[^A-Za-z0-9 ]+/g);
  }
}

if(!String.prototype.stripNonNumeric){
  String.prototype.stripNonNumeric = function(){
    return this.remove(/[^0-9-.]/g);
  }
}

if(!String.prototype.stripNumeric){
  String.prototype.stripNumeric = function(){
    return this.remove(/[0-9]/g);
  }
}

if(!String.prototype.isAlpha){
  String.prototype.isAlpha = function(){
    return (/[^A-Za-z ]+/g).test(this);
  }
}

if(!String.prototype.isAlphaNumeric){
  String.prototype.isAlphaNumeric = function(){
    return (/[^A-Za-z0-9 ]+/g).test(this);
  }
}

if(!String.prototype.isNumeric){
  String.prototype.isNumeric = function(){
    return (/[0-9]/g).test(this);
  }
}

if(!String.prototype.isValidEmail){
  String.prototype.isValidEmail = function(){
    return (/(^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)?([\.]{1}[a-zA-Z]{2,4}){1,4}$/).test(this);
  }
}

if(!String.prototype.random){
  String.prototype.random = function(n, type){
    if(typeof(n) == 'undefined') return '';
    var type = typeof(force) == 'undefined' ? 'alphanumeric' : type;
    console.log(type);
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    switch(type){
      case 'numeric':
        chars = chars.substr(0, 10);
        break;
      case 'alphaUpper':
        chars =  chars.substr(10, 26);
        break;
      case 'alphaLower':
        chars = chars.substr(36, 26);
        break;
      case 'alpha':
        chars = chars.substr(10, 52);
        break;
      case 'alphanumeric':
      default:
        chars = chars;
    }
    var s = '';
    for (var i = 0; i < n; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      s += chars.substr(rnum, 1);
    }
    return s;
  }
}