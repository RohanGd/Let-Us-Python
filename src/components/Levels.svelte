<script>
  export let gameState;

  export let onLevel1;
  export let onLevel2;
  export let onLevel3;
</script>

{#if gameState === "choosing"}
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
        on:click={onLevel1}
      >
        Level 1
      </button>
      <button
        class="text-white rounded-lg px-4 py-2 mb-4 shadow-lg hover:text-purple-900 font-pressstart"
        on:click={onLevel2}
      >
        Level 2
      </button>
      <button
        class="text-white rounded-lg px-4 py-2 mb-4 shadow-lg hover:text-purple-900 font-pressstart"
        on:click={onLevel3}
      >
        Level 3
      </button>
    </div>
  </div>
{/if}
