<script>
  import PythonTerminal from "../components/PythonTerminal.svelte";
  import Tutorial from "../components/Tutorial.svelte";
  import Menu from "../components/Menu.svelte";
  import Levels from "../components/Levels.svelte";
  import { onMount, onDestroy } from "svelte";
  import { outputText } from "../components/stores";
  import { convertEncoding, compareStringEncoding } from "../components/utils";
  const width = screen.width;
  const height = screen.height * 0.65;
  let gameState = "menu";
  let level = 3;

  let leftDome = 500;
  let rightDome = 740;
  let floor = 375;

  let hp = 100;

  let currentPage = 1;
  const totalPages = 3;

  function handleStart() {
    gameState = "tutorial1";
    level = 1;
  }

  function handleChooseLevel() {
    gameState = "choosing";
  }

  function onLevel1() {
    gameState = "tutorial1";
    level = 1;
  }

  function onLevel2() {
    gameState = "tutorial2";
    level = 2;
  }

  function onLevel3() {
    gameState = "tutorial3";
    level = 3;
  }

  function onNextPage() {
    if (currentPage !== totalPages) {
      currentPage++;
    } else {
      gameState = "playing";
      currentPage = 1;
    }
  }

  function goToMenu() {
    gameState = "menu";
  }
  class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
    }) {
      this.position = position;
      this.width = 50;
      this.height = 150;
      this.image = new Image();
      this.image.src = imageSrc;
      this.scale = scale;
      this.framesMax = framesMax;
      this.framesCurrent = 0;
      this.framesElapsed = 0;
      this.framesHold = 10;
      this.offset = offset;
    }

    draw() {
      c.drawImage(
        this.image,
        //crop arg
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,

        //position arg
        this.position.x + this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        (this.image.height * this.scale) / 1.4
      );
    }

    animateFrame() {
      this.framesElapsed++;

      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++;
        } else {
          this.framesCurrent = 0;
        }
      }
    }

    update() {
      this.draw();
      // this.animateFrame();
    }
  }

  class Dome extends Sprite {
    constructor({ position, imageSrc, scale }) {
      super({
        position,
        imageSrc,
        scale,
      });
    }
    checkHealth() {
      switch (true) {
        case hp <= 0:
          this.image.src = "src/assets/dome/domedead.png";
          break;
        case hp < 30:
          this.image.src = "src/assets/dome/dome2.png";
          break;
        case hp < 60:
          this.image.src = "src/assets/dome/dome1.png";
          break;
        case hp <= 100:
          this.image.src = "src/assets/dome/dome0.png";
          break;
      }
    }

    update() {
      this.checkHealth();
      this.draw();
    }
  }

  class Monster extends Sprite {
    constructor({
      position,
      velocity,
      imageSrc,
      key = "undefined",
      answer = "undefined",
      scale,
    }) {
      super({
        position,
        imageSrc,
        scale,
      });

      this.velocity = velocity;
      this.isVisible = true;
      this.isDead = false;
      this.key = key;
      if (answer == "undefined") {
        this.hiddenAnswer = key;
      } else {
        this.hiddenAnswer = answer;
      }
    }
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    }

    hide() {
      this.isVisible = false;
    }

    blinkAndDisappear() {
      if (this.isDead) return;
      const blinkDuration = 100; // Duration of each blink (in milliseconds)
      const totalBlinks = 10; // Number of blinks
      let blinkCount = 0;

      const blinkInterval = setInterval(() => {
        if (blinkCount < totalBlinks) {
          this.toggleVisibility(); // Toggle sprite visibility (implement the `toggleVisibility()` method accordingly)
          blinkCount++;
        } else {
          clearInterval(blinkInterval);
          this.hide(); // Hide the sprite (implement the `hide()` method accordingly)
        }
      }, blinkDuration);
    }

    kill(text) {
      if (text === this.hiddenAnswer) {
        this.blinkAndDisappear();
        this.isDead = true;
      }
    }

    attack() {
      if (this.isDead) return;
      if (this.velocity.x > 0) {
        if (this.position.x + this.width >= leftDome) {
          this.velocity.x = 0;
          hp -= 0.5;
        }
      } else {
        if (this.position.x <= rightDome) {
          this.velocity.x = 0;
          hp -= 0.5;
        }
      }
    }

    speak() {
      if (this.isDead) return;
      const bubblePadding = 10;
      const bubbleMargin = 5;

      // Set styles for the speech bubble
      c.fillStyle = "white";
      c.strokeStyle = "black";
      c.font = "20px Roboto";

      // Split the text into lines if there's a \n character
      const lines = this.key.split("\n");
      const lineCount = lines.length;

      // Measure the width and height of the text
      const textWidth = Math.max(
        ...lines.map((line) => c.measureText(line).width)
      );
      const textHeight = parseInt(c.font, 10) * lineCount; // Assumes font size is set

      // Calculate the speech bubble dimensions
      const bubbleWidth = textWidth + bubblePadding * 2;
      const bubbleHeight = textHeight + bubblePadding * 2;

      // Calculate the speech bubble position
      const bubbleX = this.position.x + 20;
      const bubbleY = this.position.y - bubbleHeight + 50;

      // Draw the speech bubble
      c.beginPath();
      c.moveTo(bubbleX + bubbleMargin, bubbleY);
      c.lineTo(bubbleX + bubbleWidth - bubbleMargin, bubbleY);
      c.quadraticCurveTo(
        bubbleX + bubbleWidth,
        bubbleY,
        bubbleX + bubbleWidth,
        bubbleY + bubbleMargin
      );
      c.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - bubbleMargin);
      c.quadraticCurveTo(
        bubbleX + bubbleWidth,
        bubbleY + bubbleHeight,
        bubbleX + bubbleWidth - bubbleMargin,
        bubbleY + bubbleHeight
      );
      c.lineTo(bubbleX + bubbleMargin, bubbleY + bubbleHeight);
      c.quadraticCurveTo(
        bubbleX,
        bubbleY + bubbleHeight,
        bubbleX,
        bubbleY + bubbleHeight - bubbleMargin
      );
      c.lineTo(bubbleX, bubbleY + bubbleMargin);
      c.quadraticCurveTo(bubbleX, bubbleY, bubbleX + bubbleMargin, bubbleY);
      c.closePath();

      c.fill();
      c.stroke();

      // Draw the text inside the speech bubble
      c.fillStyle = "black";
      lines.forEach((line, index) => {
        c.fillText(
          line,
          bubbleX + bubblePadding,
          bubbleY + bubblePadding * 2 + index * parseInt(c.font, 10)
        );
      });
    }

    update() {
      // if (this.isDead) return;
      if (this.isVisible) {
        this.draw();
        this.attack();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      }
    }
  }

  const background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "src/assets/bg.png",
    scale: 1.1,
  });

  const foreground = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "src/assets/fg.png",
    scale: 1.1,
  });

  const dome = new Dome({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "src/assets/dome/dome0.png",
    scale: 1.1,
  });

  // LEVEL 1 MONSTERS
  const level1monster1 = new Monster({
    position: {
      x: 1000,
      y: floor,
    },
    imageSrc: "src/assets/enemies/1.png",
    velocity: {
      x: -0.5,
      y: 0,
    },
    key: "Hello, World!",
  });

  const level1monster2 = new Monster({
    position: {
      x: -300,
      y: floor,
    },
    imageSrc: "src/assets/enemies/6.png",
    velocity: {
      x: 0.5,
      y: 0,
    },
    key: "723",
  });

  const level1monster3 = new Monster({
    position: {
      x: -650,
      y: floor,
    },
    imageSrc: "src/assets/enemies/5.png",
    velocity: {
      x: 0.5,
      y: 0,
    },
    key: "How will you handle us",
  });

  const level1monster4 = new Monster({
    position: {
      x: 2000,
      y: floor,
    },
    imageSrc: "src/assets/enemies/1.png",
    velocity: {
      x: -0.5,
      y: 0,
    },
    key: "At the same time!",
  });

  const level2monster1 = new Monster({
    position: {
      x: 1500,
      y: floor,
    },
    imageSrc: "src/assets/enemies/3.png",
    velocity: {
      x: -0.3,
      y: 0,
    },
    key: `3
3
3`,
    answer: "3",
  });

  const level2monster2 = new Monster({
    position: {
      x: 1600,
      y: floor,
    },
    imageSrc: "src/assets/enemies/3.png",
    velocity: {
      x: -0.3,
      y: 0,
    },
    key: `How will you write this fast 5 times???
How will you write this fast 5 times???
How will you write this fast 5 times???
How will you write this fast 5 times???
How will you write this fast 5 times???`,
    answer: "How will you write this fast 5 times???",
  });

  const level2monster3 = new Monster({
    position: {
      x: -100,
      y: floor,
    },
    imageSrc: "src/assets/enemies/7.png",
    velocity: {
      x: 0.4,
      y: 0,
    },
    key: `0
1
2
3
4`,
    answer: "4",
  });

  const level2monster4 = new Monster({
    position: {
      x: -500,
      y: floor,
    },
    imageSrc: "src/assets/enemies/8.png",
    velocity: {
      x: 2,
      y: 0,
    },
    key: `1`,
    answer: "1",
  });

  const level3monster1 = new Monster({
    position: {
      x: -50,
      y: floor,
    },
    imageSrc: "src/assets/enemies/5.png",
    velocity: {
      x: 0.5,
      y: 0,
    },
    key: `list[0] = one`,
    answer: "one",
  });

  const level3monster2 = new Monster({
    position: {
      x: 1366,
      y: floor,
    },
    imageSrc: "src/assets/enemies/2.png",
    velocity: {
      x: -0.1,
      y: 0,
    },
    key: `dict['brand'] = Apple
dict['model'] = iPhone 12,
dict['price']: 999.99`,
    answer: "999.99",
  });

  const level3monster3 = new Monster({
    position: {
      x: -400,
      y: floor,
    },
    imageSrc: "src/assets/enemies/3.png",
    velocity: {
      x: 0.4,
      y: 0,
    },
    key: `city_list[1] = London
city_list[3] = Tokyo`,
    answer: "Tokyo",
  });

  const level3monster4 = new Monster({
    position: {
      x: 1500,
      y: floor,
    },
    imageSrc: "src/assets/enemies/4.png",
    velocity: {
      x: -0.2,
      y: 0,
    },
    key: `list[2][4] = Hello`,
    answer: "Hello",
  });

  const level3monster5 = new Monster({
    position: {
      x: -500,
      y: floor,
    },
    imageSrc: "src/assets/enemies/8.png",
    velocity: {
      x: 0.1,
      y: 0,
    },
    key: `list[0]['fruits'][2] = banana`,
    answer: "banana",
  });

  let canvas, c;

  onMount(() => {
    canvas = document.getElementById("gameCanvas");
    canvas.width = width;
    canvas.height = height;
    c = canvas.getContext("2d");

    function animate() {
      window.requestAnimationFrame(animate);
      if (gameState == "over") {
        dome.update();
        foreground.update();
        // level1monster1.hide();
      }
      if (gameState == "playing") {
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);

        if (hp === 0) {
          gameState = "over";
          dome.update();
          foreground.update();
        }
        background.update();
        dome.update();
        console.log(hp);
        foreground.update();
        c.fillStyle = "rgba(255, 255, 255, 0)";
        c.fillRect(0, 0, canvas.width, canvas.height);
        if (level === 1) {
          level1monster1.update();
          level1monster2.update();
          level1monster3.update();
          level1monster4.update();

          level1monster1.speak();
          level1monster2.speak();
          level1monster3.speak();
          level1monster4.speak();

          level1monster1.kill($outputText);
          level1monster2.kill($outputText);
          level1monster3.kill($outputText);
          level1monster4.kill($outputText);

          if (
            level1monster1.isDead &&
            level1monster2.isDead &&
            level1monster3.isDead &&
            level1monster4.isDead
          ) {
            gameState = "tutorial2";
            level = 2;
            hp = 100;
          }
        } else if (level === 2) {
          level2monster1.update();
          level2monster2.update();
          level2monster3.update();
          level2monster4.update();

          level2monster1.speak();
          level2monster2.speak();
          level2monster3.speak();
          level2monster4.speak();

          level2monster1.kill($outputText);
          level2monster2.kill($outputText);
          level2monster3.kill($outputText);
          level2monster4.kill($outputText);

          if (
            level2monster1.isDead &&
            level2monster2.isDead &&
            level2monster3.isDead &&
            level2monster4.isDead
          ) {
            gameState = "tutorial3";
            level = 3;
            hp == 100;
          }
        } else if (level === 3) {
          level3monster1.update();
          level3monster2.update();
          level3monster3.update();
          level3monster4.update();
          level3monster5.update();

          level3monster1.speak();
          level3monster2.speak();
          level3monster3.speak();
          level3monster4.speak();
          level3monster5.speak();

          level3monster1.kill($outputText);
          level3monster2.kill($outputText);
          level3monster3.kill($outputText);
          level3monster4.kill($outputText);
          level3monster5.kill($outputText);

          if (
            level3monster1.isDead &&
            level2monster2.isDead &&
            level2monster3.isDead &&
            level2monster4.isDead &&
            level2monster4.isDead
          ) {
            gameState = "over";
            // level = 3;
          }
        }
      }
    }
    animate();
  });
</script>

<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
    rel="stylesheet"
  />
</head>

<body class="bg-teal-500">
  <div id="gameContainer">
    {#if gameState === "over"}
      <button
        class="position absolute text-white rounded-lg px-4 py-2 mb-4 shadow-lg font-pressstart"
        on:click={goToMenu}
      >
        Menu
      </button>
    {/if}
    <Menu onStart={handleStart} onChooseLevel={handleChooseLevel} {gameState} />
    <Levels {onLevel1} {onLevel2} {onLevel3} {gameState} />
    <Tutorial {currentPage} {totalPages} {onNextPage} {gameState} />
    <canvas id="gameCanvas" />
  </div>
  <PythonTerminal />
</body>
