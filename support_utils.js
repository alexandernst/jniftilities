/***
IE doesn't have console, so let's just make it belive it does.
***/
if(typeof(console) == "undefined"){
  console = {
    log: function() {}
  };
}