<template>
  <main class="row m-1 justify-content-center">
    <div
      class="col-2 m-1 bg-green highlight-active"
      @mousedown="$store.dispatch('winBet')"
      tabindex="0"
      role="button"
    />
    <div
      class="col-2 m-1 bg-orange highlight-active"
      @mousedown="$store.dispatch('loseBet')"
      tabindex="0"
      role="button"
    />
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
