<template>
  <main class="container d-flex flex-column min-vh-100">
    <div class="d-flex justify-content-between">
      <undo-button class="align-self-center" />
      <wheel-result-picker />
      <undo-button class="align-self-center invisible" />
    </div>
    <div class="d-flex justify-content-center">
      <bet-label />
    </div>
    <div class="row m-3">
      <tokens-label class="border-bottom" />
      <goal-label class="border-bottom" />
      <strategy-label class="border-bottom" />
    </div>
    <instructions />
  </main>
  <footer class="p-2 bg-dark text-light d-flex justify-content-between mt-4">
    <p>2022 Felix Naredi</p>
    <div>
      <a href="https://github.com/felixnaredi/stardew-valley-fair">GitHub</a>
    </div>
  </footer>
</template>

<script>
import BetLabel from "./components/BetLabel.vue";
import GoalLabel from "./components/GoalLabel.vue";
import StrategyLabel from "./components/StrategyLabel.vue";
import TokensLabel from "./components/TokensLabel.vue";
import WheelResultPicker from "./components/WheelResultPicker.vue";
import Instructions from "./components/Instructions.vue";
import UndoButton from "./components/UndoButton.vue";

export default {
  name: "App",
  components: {
    BetLabel,
    GoalLabel,
    Instructions,
    StrategyLabel,
    TokensLabel,
    UndoButton,
    WheelResultPicker,
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
