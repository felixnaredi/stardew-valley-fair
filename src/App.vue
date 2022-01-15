<template>
  <wheel-result-picker />
  <div class="text-center">
    <bet-label />
  </div>
  <div class="row m-3">
    <tokens-label />
    <goal-label />
    <method-label />
  </div>
</template>

<script>
import BetLabel from "./components/BetLabel.vue";
import GoalLabel from "./components/GoalLabel.vue";
import MethodLabel from "./components/MethodLabel.vue";
import TokensLabel from "./components/TokensLabel.vue";
import WheelResultPicker from "./components/WheelResultPicker.vue";

export default {
  name: "App",
  components: {
    BetLabel,
    GoalLabel,
    MethodLabel,
    TokensLabel,
    WheelResultPicker,
  },
};
</script>

<style>
</style>
