(function () {
  function Simon(spec) {
    let simonSeq = [];
    let userSeq = [];
    let level = 1;
    let strict = false;
    const {
      colors,
      display,
      startButton,
      strictButton,
    } = spec;

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
      // lightOn every 1000ms and lightOff 800ms after that and for each lightOn
      let i = 0;
      const play = setInterval(() => {
        lightOn(simonSeq[i]);

        setTimeout((index) => {
          lightOff(simonSeq[index]);
        }, 800, i);

        // Stop interval if end of the game or end of sequence length per level is reached
        i += 1;
        if (i >= level || i >= 20) {
          i = 0;
          clearInterval(play);
        }
      }, 1000);
    }

    function updateDisplay(status) {
      if (status !== 'lose') {
        display.textContent = status;
      }
      if (status === 'lose') {
        display.textContent = '!!';
        setTimeout(updateDisplay, 1000, level);
      }
    }

    function setSimonSeq() {
      const seq = [];

      for (let i = 0; i < 20; i += 1) {
        seq.push(Math.floor(Math.random() * 4));
      }
      return seq;
    }

    function startGame() {
      simonSeq = setSimonSeq();
      userSeq = [];
      level = 1;
      updateDisplay(level);
      playSequence();
    }

    function strictMode() {
      strict = strict === false;
      if (strict === true) {
        console.log('strict mode on'); // Replace with an UI element
      } else {
        console.log('strict mode off'); // Replace with an UI element
      }
    }

    function addHandlers() {
      function colorHandlers(colorElem) {
        colorElem.addEventListener('mousedown', () => {
          lightOn(colors.indexOf(colorElem));
        });

        colorElem.addEventListener('mouseup', () => {
          userSeq.push(colors.indexOf(colorElem));
          lightOff(colors.indexOf(colorElem));

          // Test userSeq after every mouseup and at the end of the sequence
          if (userSeq.length === level && testMatch()) {
            level += 1;
            updateDisplay(level);
            userSeq = [];
            playSequence();
          } else if (testMatch() === false) {
            updateDisplay('lose');

            if (strict === true) {
              setTimeout(startGame, 1000);
            } else {
              userSeq = [];
              playSequence();
            }
          }
        });

        colorElem.addEventListener('mouseout', () => {
          lightOff(colors.indexOf(colorElem));
        });
      }

      colors.forEach(colorHandlers);

      startButton.addEventListener('click', startGame);

      strictButton.addEventListener('click', strictMode);
    }

    function init() {
      addHandlers();
    }

    return Object.freeze({
      init,
    });
  }

  const colors = [
    document.querySelector('.green'),
    document.querySelector('.red'),
    document.querySelector('.blue'),
    document.querySelector('.yellow'),
  ];
  const display = document.querySelector('.display');
  const startButton = document.querySelector('.start');
  const strictButton = document.querySelector('.strict');

  const simon = Simon({
    colors,
    display,
    startButton,
    strictButton,
  });
  simon.init();
}());
