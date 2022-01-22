<template>
  <main class="row m-1">
    <div
      class="d-flex col-2 m-1 bg-green highlight-active justify-content-center align-items-center"
      @mousedown="$store.dispatch('winBet')"
      tabindex="0"
      role="button"
    >
      <span class="h3 text-white fw-bold m-0">WIN</span>
    </div>
    <div
      class="d-flex col-2 m-1 bg-orange highlight-active justify-content-center align-items-center"
      @mousedown="$store.dispatch('loseBet')"
      tabindex="0"
      role="button"
    >
      <span class="h3 text-white fw-bold m-0">LOSE</span>
    </div>
  </main>
</template>

<script>
export default {
  name: "WheelResultButton",
};
</script>

<style scoped>
div {
  border-radius: 2.5%;
  height: 6.5em;
  width: 6.5em;
}
</style>
