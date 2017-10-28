(function () {
  function Simon(spec) {
    let simonSeq = [];
    let userSeq = [];
    let level = 1;
    const {
      colors,
      display,
      startButton,
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

    function addHandlers() {
      function colorHandlers(colorElem) {
        colorElem.addEventListener('mousedown', () => {
          lightOn(colors.indexOf(colorElem));
        });

        colorElem.addEventListener('mouseup', (event) => {
          userSeq.push(colors.indexOf(event.target));
          lightOff(colors.indexOf(colorElem));

          // Test userSeq after every mouseup and at the end of the sequence
          if (userSeq.length === level && testMatch()) {
            level += 1;
            updateDisplay(level);
            userSeq = [];
            playSequence();
          } else if (testMatch() === false) {
            updateDisplay('lose');
            userSeq = [];
            playSequence();
          }
        });

        colorElem.addEventListener('mouseout', () => {
          lightOff(colors.indexOf(colorElem));
        });
      }

      colors.forEach(colorHandlers);

      startButton.addEventListener('click', () => {
        simonSeq = setSimonSeq();
        level = 1;
        updateDisplay(level);
        playSequence();
      });
    }

    function init() {
      simonSeq = setSimonSeq();
      addHandlers();
      display.textContent = level;
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

  const simon = Simon({
    colors,
    display,
    startButton,
  });
  simon.init();
}());
