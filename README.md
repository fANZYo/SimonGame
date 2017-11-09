# Simon Game

I started this project to get out of my Javascript books and gain some more practice. Coding it has allowed me to practice timed events as well as improved my knowledge of cross-platform compatibility issues.

Planning this project, I realised that handling the data is core to any program and then interacting with the user is just a matter of creating functions that do things with this data.

After handling the data I started writing the `playSequence` function. I hit a thin wall there because I was trying to use `setTimeout` with dodgy maths to create an interval. After rethinking the problem, `setInterval` was obviously a better tool for the job, I know that now and down goes the wall.

Handling events wasn't very problematic, although I think I've done a bit of a mess there, until I started testing the app on mobile devices. `mousedown` and `mouseup` events were firing correctly but the `lightOn` and `lightOff` functions were not having any effects while working perfectly fine on desktop. Debugging didn't help me understand the issue so I opted to use the `touchstart` and `touchend` events to solve it.

If I was to redo this project, I would improve how the code is laid out and use a functional programming paradigm to do it. Starting by stripping the Simon object of all the behavioural functions to leave it only to deal with data handling.

[Live Demo](https://fanzyo.github.io/SimonGame/)

