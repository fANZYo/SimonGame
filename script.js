// color, lightUp(), element, 
(function (){

  function Simon(){
    let simonSeq = [];
    let userSeq = [];
    let level = 1;
    const colors = [
      document.querySelector('.green'),
      document.querySelector('.red'),
      document.querySelector('.blue'),
      document.querySelector('.yellow'),
    ];
    

    function init(){
      for(let i = 0; i < 20; i += 1){
        simonSeq.push(Math.floor(Math.random() * 4));
      }
      console.log(simonSeq);
    }

    function playSequence(){
      function lightOn(color){
        colors[color].style.filter = 'brightness(100%)';
      }
      function lightOff(color){
        colors[color].style.filter = 'brightness(50%)';
      }

// lightOn every 1000ms and lightOff 800ms after and for each lightOn
      var i = 0;
      var play = setInterval(function(){
        lightOn(simonSeq[i]);

        setTimeout(function(i){
          lightOff(simonSeq[i]);
        }, 800, i);

// Test for end of the game or end of sequence length per level
        i += 1;
        if(i >= level || i >= 20){
          i = 0;
          clearInterval(play);
        }
      }, 1000);
    }

    function testMatch(){
      return userSeq === simonSeq;
    }

    return Object.freeze({
      init,
      playSequence,
      testMatch,
    });
  }

  const s = Simon();
  s.init();
  s.playSequence();

}());
