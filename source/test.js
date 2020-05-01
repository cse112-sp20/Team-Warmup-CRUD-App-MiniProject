    // return random number between 1 and 6
    function dieToss() {
        return Math.floor(Math.random() * 6) + 1;  
      }
      // function returns a promise that succeeds if a 6 is tossed
      function tossASix() {
        return new RSVP.Promise(function(fulfill, reject) {
          var number = Math.floor(Math.random() * 6) + 1;
          if (number === 6) {
            fulfill(number);
          } else {
            reject(number);
          }
        });
      }
      // display toss result and launch another toss
      function logAndTossAgain(toss) {
        console.log("Tossed a " + toss + ", need to try again.");
        return tossASix();
      }
      
      function logSuccess(toss) {
        console.log("Yay, managed to toss a " + toss + ".");
      }
      
      function logFailure(toss) {
        console.log("Tossed a " + toss + ". Too bad, couldn't roll a six");
      }
      // use promise paradigm to try three times to toss a 6
      tossASix()
        .then(null, logAndTossAgain)   //Roll first time
        .then(null, logAndTossAgain)   //Roll second time
        .then(logSuccess, logFailure); //Roll third and last time