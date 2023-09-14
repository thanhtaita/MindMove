let combo1, combo2, combo3;
let img11,
  img12,
  img13,
  img14,
  img21,
  img22,
  img23,
  img24,
  img31,
  img32,
  img33,
  img34; // load dance move for each combo
let stage = 1; // stage to move forward in the game
let level = 0; // three level of difficulty, start from 0 - easy
let fade = 0; // fade in and fade out effect
let fadeAmount = 1;
let script = [
  "Welcome to MindMove Academy",
  `we are here to help you dance better`,
  `free your mind and make your move`,
  "always remember that pratice makes perfect",
  `let's practice together`,
  `press ESCAPE to see instruction`,
];
let instruction = `W is UP, S is DOWN, A is RIGHT, D is LEFT (press ESCAPE)`;
let scriptLength = 3;
let scriptCount = 0;
let z;
let combo;
let shadowCount = 0;
let downArr, leftArr, rightArr, upArr;
let arrows;
let stHeight; // standard height of shadows
let lives = 3;
let hit = 0;
let userKey = -1;
let routine; // store array of routines
let routineLength = 4; // generate the length of the array
let pass = true;
let num;
let firstStartGame = true;
let score = 0;
let terminateWaitingTime = 0;
let win = false;
let timePerRoutine = 4000;
let next = false;
let song;
let songPlayed = true;

function preload() {
  img1 = loadImage("image/combo12.png");
  img2 = loadImage("image/combo13.png");
  img3 = loadImage("image/combo11.png");
  img4 = loadImage("image/combo14.png");
  downArr = loadImage("image/downArr.png");
  upArr = loadImage("image/upArr.png");
  rightArr = loadImage("image/rightArr.png");
  leftArr = loadImage("image/leftArr.png");
}

function setup() {
  // set up setting
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER);
  textFont("Antic Didone");
  textSize(20);

  // resize image
  img1.resize(0, windowWidth / 5);
  img2.resize(0, windowWidth / 5);
  img3.resize(0, windowWidth / 5);
  img4.resize(0, windowWidth / 5);
  leftArr.resize(0, windowWidth / 25);
  rightArr.resize(0, windowWidth / 25);
  upArr.resize(0, windowWidth / 25);
  downArr.resize(0, windowWidth / 25);
  arrows = [leftArr, upArr, rightArr, downArr];
  z = int(random(0, 3));

  combo1 = {
    name: "ADGIO",
    shadows: [img1, img2, img3, img4],
  };

  combo2 = {
    name: "BARRE",
    shadows: [img1, img2, img3, img4],
  };

  combo3 = {
    name: "ALLERGO",
    shadows: [img1, img2, img3, img4],
  };

  combo = [combo1, combo2, combo3];
  stHeight = img1.height;

  setInterval(checkRoutine, timePerRoutine);
  song = createAudio("piano.mp3");
  song.volume(0.2);
}

function checkRoutine() {
  // only start to check the routine when reaching stage 4
  if (stage == 4) {
    if (firstStartGame) {
      generateRoutine(stage);
      firstStartGame = false;
    } else {
      if (routineLength != hit) {
        lives -= 1;
      } else score++;

      // game status
      if (lives <= 0) {
        stage++;
      } else if (score >= 9) {
        stage++;
        win = true;
      }
      // increase level of difficulty
      else if (score != 0 && score % 3 == 0) routineLength += 2;

      // reset for each time generate new routine
      if (stage != 5) {
        hit = 0;
        userKey = -1;
        generateRoutine();
      }
    }
  }
}

function draw() {
  background("white");
  // song.play();

  if (stage == 1) intro();
  else if (stage == 2) instructionShow();
  else if (stage == 3) showShadow();
  else if (stage == 4) {
    if (firstStartGame == false) {
      shadowRoutine();
      scoreGenerate();
      rectMode(CORNER);
      fill("black");
      rect(
        0,
        windowHeight / 15,
        (windowWidth / routineLength) * hit,
        windowHeight / 30
      );
      if (userKey == routine[hit]) {
        hit++;
        textSize(20);
        // text(hit, windowWidth/2, windowHeight/2);
        userKey = -1; // default userKey
      } else if (userKey != -1 && userKey != routine[hit]) {
        hit = 0;
        console.log("miss");
      }
    }
  } else if (stage == 5) {
    textAlign(CENTER);
    textSize(20);
    if (win)
      text(
        "you mastered this routine, refresh the page to start again",
        windowWidth / 2,
        windowHeight / 2
      );
    else
      text(
        "practice more this routine, refresh the page to start again",
        windowWidth / 2,
        windowHeight / 2
      );
  }
}

function scoreGenerate() {
  textSize(20);
  text(
    `HEARTS: ${lives}`,
    windowWidth / 2 - (windowHeight / 50) * 3,
    windowHeight / 1.1
  );
  text(
    `SCORE: ${score}`,
    windowWidth / 2 + (windowHeight / 50) * 3,
    windowHeight / 1.1
  );
}

function shadowRoutine() {
  for (let i = 0; i < routineLength; i++) {
    image(
      combo[z].shadows[routine[i]],
      windowWidth / 6 + (((2 / 3) * windowWidth) / (routineLength - 1)) * i,
      windowHeight / 2
    );
    image(
      arrows[routine[i]],
      windowWidth / 6 + (((2 / 3) * windowWidth) / (routineLength - 1)) * i,
      windowHeight / 2 + stHeight / 1.5
    );
  }
}

function generateRoutine() {
  routine = [];
  for (let i = 0; i < routineLength; i++) {
    num = int(random(0, 4));
    routine.push(num);
  }
  pass = false;
  console.log(routine);
}

function keyPressed() {
  if (keyCode == 65) userKey = 0;
  if (keyCode == 87) userKey = 1;
  else if (keyCode == 68) userKey = 2;
  else if (keyCode == 83) userKey = 3;
  else if (keyCode == ESCAPE) stage++;
}

function showShadow() {
  // combo name

  fill("black");
  text(combo[z].name, windowWidth / 2, windowHeight / 7);

  // combo movements
  if (shadowCount >= 1) {
    image(combo[z].shadows[0], windowWidth / 5, windowHeight / 2);
    image(combo[z].shadows[1], windowWidth * (2 / 5), windowHeight / 2);
    image(combo[z].shadows[2], windowWidth * (3 / 5), windowHeight / 2);
    image(combo[z].shadows[3], windowWidth * (4 / 5), windowHeight / 2);
  }
  if (shadowCount >= 2) {
    image(arrows[0], windowWidth / 5, windowHeight / 2 + stHeight / 1.5);
    image(arrows[1], windowWidth * (2 / 5), windowHeight / 2 + stHeight / 1.5);
    image(arrows[2], windowWidth * (3 / 5), windowHeight / 2 + stHeight / 1.5);
    image(arrows[3], windowWidth * (4 / 5), windowHeight / 2 + stHeight / 1.5);
  }
  if (shadowCount >= 3) {
    text("Press ESCAPE to start", windowWidth / 2, windowHeight / 1.25);
  }
  if (fade % 30 == 0) {
    shadowCount += 1;
  }
  fade += 1;
}

function instructionShow() {
  fill(0, 0, 0, fade);
  text(instruction, windowWidth / 2, windowHeight / 2);
  if (fade <= 255) {
    fade += 3;
  }
}

function intro() {
  fill(0, 0, 0, fade);
  text(script[scriptCount], windowWidth / 2, windowHeight / 2);
  fadeIO();

  if (scriptCount < scriptLength && fade <= 0) {
    scriptCount++;
    fade = 0;
  }

  if (scriptCount == 3) {
    stage++;
    fade = 0;
  }
}

function fadeIO() {
  if (fade <= 0) fadeAmount = 3;

  if (fade > 255) fadeAmount = -10;

  fade += fadeAmount;
}
