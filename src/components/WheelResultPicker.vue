<template>
  <main class="row m-1 justify-content-center">
    <div id="green-result-button" class="col-2 m-1" @mousedown="$store.dispatch('winBet')" tabindex="0"/>
    <div id="orange-result-button" class="col-2 m-1" @mousedown="$store.dispatch('loseBet')" tabindex="0"/>
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

div:hover {
  cursor: pointer;
}

#green-result-button {
  background-color: rgb(103, 186, 55);
}

#green-result-button:active {
  background-color: rgb(121, 196, 78);
}

#orange-result-button {
  background-color: rgb(217, 121, 45);
}

#orange-result-button:active {
  background-color: rgb(233, 140, 64);
}
</style>
