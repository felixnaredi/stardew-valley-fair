<template>
  <wheel-result-picker />
  <div class="text-center">
    <bet-label />
  </div>
  <div class="row m-3">
    <tokens-label class="border-bottom" />
    <goal-label class="border-bottom" />
    <method-label class="border-bottom" />
  </div>
  <instructions />
</template>

<script>
import BetLabel from "./components/BetLabel.vue";
import GoalLabel from "./components/GoalLabel.vue";
import MethodLabel from "./components/MethodLabel.vue";
import TokensLabel from "./components/TokensLabel.vue";
import WheelResultPicker from "./components/WheelResultPicker.vue";
import Instructions from "./components/Instructions.vue";

export default {
  name: "App",
  components: {
    BetLabel,
    GoalLabel,
    MethodLabel,
    TokensLabel,
    WheelResultPicker,
    Instructions,
  },
};
</script>

<style>
.bg-green {
  background-color: rgb(103, 186, 55);
}

.bg-green.highlight-active:active {
  background-color: rgb(121, 196, 78);
}

.bg-orange {
  background-color: rgb(217, 121, 45);
}

.bg-orange.highlight-active:active {
  background-color: rgb(233, 140, 64);
}
</style>
