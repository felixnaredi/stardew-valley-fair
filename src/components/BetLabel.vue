<template>
  <div
    :class="{
      'text-secondary': disabled,
      'fst-italic': disabled,
    }"
  >
    <span class="display-4">Bet </span>
    <span id="bet-amount-label" class="display-4">{{ initialBet }}</span>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  name: "BetLabel",
  data() {
    return {
      initialBet: null,
      disabled: false,
    };
  },
  created() {
    this.initialBet = this.bet;
    this.disabled = this.bet === 0;
  },
  computed: {
    bet() {
      return this.$store.getters.bet;
    },
  },
  watch: {
    bet(newValue, oldValue) {
      const self = this;

      anime({
        targets: "#bet-amount-label",
        innerHTML: [oldValue, newValue],
        round: 1,
        easing: "easeInOutExpo",
        update(anim) {
          if (anim.animations[0].currentValue > 0) {
            self.disabled = false;
          }
          if (anim.animations[0].currentValue === 0) {
            self.disabled = true;
          }
        },
      });
    },
  },
};
</script>
