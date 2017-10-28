(function () {
  function Simon(spec) {
    const simonSeq = [];
    let userSeq = [];
    let level = 1;
    const { colors } = spec;

    function lightOn(color) {
      colors[color].style.filter = 'brightness(100%)';
    }
    function lightOff(color) {
      colors[color].style.filter = 'brightness(50%)';
    }

    function testMatch() {
      return userSeq.every((val, index) => val === simonSeq[index]);
    }

    function playSequence() {
      // lightOn every 1000ms and lightOff 800ms after and for each lightOn
      let i = 0;
      const play = setInterval(() => {
        lightOn(simonSeq[i]);

        setTimeout((index) => {
          lightOff(simonSeq[index]);
        }, 800, i);

        // Test for end of the game or end of sequence length per level
        i += 1;
        if (i >= level || i >= 20) {
          i = 0;
          clearInterval(play);
        }
      }, 1000);
    }


    function addHandlers(colorElem) {
      colorElem.addEventListener('mousedown', () => {
        lightOn(colors.indexOf(colorElem));
      });
      colorElem.addEventListener('mouseup', (event) => {
        userSeq.push(colors.indexOf(event.target));
        lightOff(colors.indexOf(colorElem));
        if (userSeq.length === level && testMatch()) {
          level += 1;
          console.log(level);
          userSeq = [];
          playSequence();
        } else if (testMatch() === false) {
          console.log('Wrong');
          userSeq = [];
          playSequence();
        }
      });
      colorElem.addEventListener('mouseout', () => {
        lightOff(colors.indexOf(colorElem));
      });
    }

    function init() {
      for (let i = 0; i < 20; i += 1) {
        simonSeq.push(Math.floor(Math.random() * 4));
      }
      console.log(simonSeq);

      colors.forEach(addHandlers);
    }

    return Object.freeze({
      init,
      playSequence,
      testMatch,
    });
  }

  const colors = [
    document.querySelector('.green'),
    document.querySelector('.red'),
    document.querySelector('.blue'),
    document.querySelector('.yellow'),
  ];

  const s = Simon({
    colors,
  });
  s.init();
  s.playSequence();
}());
