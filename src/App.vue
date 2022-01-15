<template>
  <wheel-result-picker />
  <div class="text-center">
    <bet-label />
  </div>
  <div class="row m-3">
    <tokens-label />
  </div>
</template>

<script>
import BetLabel from "./components/BetLabel.vue";
import TokensLabel from "./components/TokensLabel.vue";
import WheelResultPicker from "./components/WheelResultPicker.vue";

export default {
  name: "App",
  components: { WheelResultPicker, BetLabel, TokensLabel },
};
</script>

<style>
#app {
}
</style>
