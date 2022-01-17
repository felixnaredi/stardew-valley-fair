<template>
  <div
    :class="{
      'text-secondary': disabled,
      'fst-italic': disabled,
    }"
  >
    <span class="display-4">Bet </span>
    <span id="bet-amount-label" class="display-4">{{ localBetState }}</span>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  name: "BetLabel",
  data() {
    return {
      localBetState: this.$store.getters.bet,
      disabled: this.$store.getters.bet === 0,
    };
  },
  computed: {
    bet() {
      return this.$store.getters.bet;
    },
  },
  watch: {
    bet(newValue, oldValue) {
      const _this = this;

      anime({
        targets: "#bet-amount-label",
        innerHTML: [oldValue, newValue],
        round: 1,
        easing: "easeInOutExpo",
        update(anim) {
          _this.disabled = !anim.animations[0].currentValue > 0;
        },
        complete() {
          _this.localBetState = newValue;
        },
      });
    },
  },
};
</script>
