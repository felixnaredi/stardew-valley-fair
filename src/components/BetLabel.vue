<template>
  <div
    :class="{
      'text-secondary': disabled,
      'fst-italic': disabled,
    }"
  >
    <span class="display-4">Bet </span>
    <span id="bet-amount-label" class="display-4">{{ displayedBet }}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BetLabel",
  computed: mapState({
    displayedBet: (state) => state.displayedBet,
    disabled: (state) => state.displayedBet === 0,
  }),
};
</script>
