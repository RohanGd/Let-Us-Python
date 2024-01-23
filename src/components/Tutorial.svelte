<script>
  import { onMount } from "svelte";

  export let currentPage = 1;
  export let totalPages = 3;
  export let onNextPage;
  export let gameState;

  const tutorialContent1 = [
    {
      imageSrc: "src/assets/tutorial/1/image1.PNG",
      text1: `Welcome to the world of programming!`,
      text2: `In programming, a variable is a named container that stores information. It's like a labeled box where you can put different things. To create a variable, you give it a name and assign a value to it.`,
      text3: `Variables store data and can be used to manipulate and update values during program execution. For example, "score" is a variable name assigned the value of 100, which can be changed as needed.`,
    },
    {
      imageSrc: "src/assets/tutorial/1/image2.PNG",
      text1: `The print() function in programming displays output on the screen.`,
      text2: `It is used to show messages, values, or variables during program execution.`,
      text3: `For example: print("Hello, World!") will display "Hello, World!" on the screen.`,
    },
    {
      imageSrc: "src/assets/tutorial/1/image3.PNG",
      text1: `Monsters are going to appear on screen, and you need to defeat them before they invade your dome`,
      text2: `They all have a crucial weakness, which is displayed in the bubble above them.`,
      text3: `Using what we have just shown you, display their weakness to destroy them by using the print() function.`,
    },
  ];

  const tutorialContent2 = [
    {
      imageSrc: "src/assets/tutorial/2/image1.PNG",
      text1: `Congratulations on clearing Level 1! Let's move on to the next concept - Loops!`,
      text2: `Loops in Python are a way to repeat a block of code multiple times. There are two common types of loops: for loop and while loop.`,
      text3: `A for loop is used when you know how many times you want to repeat the code. It iterates over a sequence (like a list or a string) or any iterable object. For each iteration, the loop executes the code block.`,
    },
    {
      imageSrc: "src/assets/tutorial/2/image2.PNG",
      text1: `You start by using the for keyword followed by a variable name that will take on each item from a sequence.`,
      text2: `After the variable name, you use the in keyword followed by the sequence you want to iterate over.`,
      text3: `We will use the range function. It will create a sequence of numbers upto the number we specify. For example, if we want to make a loop that repeats five times, we would have to write range(5)`,
    },
    {
      imageSrc: "src/assets/tutorial/2/image2.PNG",
      text1: `Then, you write a colon (:) to indicate the start of the code block that will be executed for each iteration.`,
      text2: `Then press enter, and then press tab. Python works on spacing, the tab is so that the code knows that the following block of code is within the for loop`,
      text3: `Using what we have just shown you, display their weakness to destroy them by using the print() function as well as the for loop using range().`,
    },
  ];

  const tutorialContent3 = [
    {
      imageSrc: "src/assets/tutorial/3/image1.PNG",
      text1: `Congratulations on clearing Level 2! Let's move on to the next concept - Lists and Dictionaries!`,
      text2: `Data structures are formats for organizing and storing data efficiently, enabling easier manipulation and retrieval of information.`,
      text3: `They are essential because they provide optimized ways to handle and organize data, improving algorithm efficiency and making tasks like searching, inserting, and deleting data faster and more manageable.`,
    },
    {
      imageSrc: "src/assets/tutorial/3/image2.PNG",
      text1: `Lists are ordered collections of items, enclosed in square brackets ([]), and separated by commas.`,
      text2: `They can contain elements of different data types, such as numbers, strings, or even other lists.`,
      text3: `You can access individual elements of a list using their index, starting from 0.`,
    },
    {
      imageSrc: "src/assets/tutorial/3/image3.PNG",
      text1: `Dictionaries are unordered collections of key-value pairs, enclosed in curly braces ({}).`,
      text2: `Each element in a dictionary consists of a key and its associated value, separated by a colon (:). Keys are unique within a dictionary and values can be anything.`,
      text3: `You can access values in a dictionary by referencing their corresponding keys within [].`,
    },
    {
      imageSrc: "src/assets/tutorial/3/image4.PNG",
      text1: `These monsters are a little different. Their weakness is displayed, but in the form of accesing a data structure`,
      text2: `Your task is to create the data structure to fit the monster's weakness and then print the output`,
      text3: `Remember: The first item of a list is [0].`,
    },
  ];
</script>

{#if gameState == "tutorial1" && currentPage <= totalPages}
  <div class="tutorial-container">
    <div class="tutorial-image">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img
        src={tutorialContent1[currentPage - 1].imageSrc}
        alt="Tutorial Image"
      />
    </div>
    <div class="tutorial-content">
      <div class="tutorial-text">
        <p>{tutorialContent1[currentPage - 1].text1}</p>
        <br />
        <p>{tutorialContent1[currentPage - 1].text2}</p>
        <br />
        <p>{tutorialContent1[currentPage - 1].text3}</p>
      </div>
      {#if currentPage !== totalPages}
        <button class="tutorial-button" on:click={onNextPage}>Next</button>
      {:else}
        <button class="tutorial-button" on:click={onNextPage}>Finish</button>
      {/if}
    </div>
  </div>
{/if}

{#if gameState == "tutorial2" && currentPage <= totalPages}
  <div class="tutorial-container">
    <div class="tutorial-image">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img
        src={tutorialContent2[currentPage - 1].imageSrc}
        alt="Tutorial Image"
      />
    </div>
    <div class="tutorial-content">
      <div class="tutorial-text">
        <p>{tutorialContent2[currentPage - 1].text1}</p>
        <br />
        <p>{tutorialContent2[currentPage - 1].text2}</p>
        <br />
        <p>{tutorialContent2[currentPage - 1].text3}</p>
      </div>
      {#if currentPage !== totalPages}
        <button class="tutorial-button" on:click={onNextPage}>Next</button>
      {:else}
        <button class="tutorial-button" on:click={onNextPage}>Finish</button>
      {/if}
    </div>
  </div>
{/if}

{#if gameState == "tutorial3" && currentPage <= totalPages}
  <div class="tutorial-container">
    <div class="tutorial-image">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img
        src={tutorialContent3[currentPage - 1].imageSrc}
        alt="Tutorial Image"
      />
    </div>
    <div class="tutorial-content">
      <div class="tutorial-text">
        <p>{tutorialContent3[currentPage - 1].text1}</p>
        <br />
        <p>{tutorialContent3[currentPage - 1].text2}</p>
        <br />
        <p>{tutorialContent3[currentPage - 1].text3}</p>
      </div>
      {#if currentPage !== totalPages}
        <button class="tutorial-button" on:click={onNextPage}>Next</button>
      {:else}
        <button class="tutorial-button" on:click={onNextPage}>Finish</button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .tutorial-container {
    position: absolute;
    top: 0;
    left: 0;
    /* transform: translate(-50%, -50%); */
    background-color: #111127;
    padding: 20px;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* max-width: 500px; */
    height: 76vh;
  }

  .tutorial-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tutorial-image img {
    max-height: 300px;
    max-width: 100%;
  }

  .tutorial-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .tutorial-text {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 20px;
    margin-right: 400px;
    /* font-family: "Press Start 2P", cursive; */
  }

  .tutorial-button {
    background-color: white;
    color: #111127;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    bottom: 200px;
    right: 300px;
  }
</style>
