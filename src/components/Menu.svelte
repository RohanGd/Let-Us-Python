<script>
  export let gameState;

  export let onStart;
  export let onChooseLevel;
</script>

{#if gameState === "menu"}
  <div
    class="flex flex-col items-start h-screen px-10"
    style="background-image: url('src/assets/menubg.png'); background-size: cover; background-position: center;"
  >
    <p class="text-6xl text-white font-bold mt-10 font-pressstart">
      Game Title
    </p>
    <div class="flex flex-col items-start mt-12">
      <button
        class="text-white rounded-lg px-4 py-2 mb-4 shadow-lg hover:text-purple-900 font-pressstart"
        on:click={onStart}
      >
        Start
      </button>
      <button
        class="text-white rounded-lg px-4 py-2 mb-4 shadow-lg hover:text-purple-900 font-pressstart"
        on:click={onChooseLevel}
      >
        Choose Level
      </button>
    </div>
  </div>
{/if}
