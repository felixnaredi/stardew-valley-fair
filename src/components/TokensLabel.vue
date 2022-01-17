<template>
  <main class="row">
    <span class="col-3">Tokens</span>
    <input
      id="token-amount-label"
      class="col-3 border-0"
      type="text"
      :value="localTokenState"
      @change="customSetTokenAmount"
      aria-label="enter current token amount"
    />
  </main>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  name: "TokensLabel",
  data() {
    return {
      localTokenState: this.$store.state.tokens,
      animate: true,
    };
  },
  computed: {
    tokens() {
      return this.$store.state.tokens;
    },
  },
  watch: {
    tokens(newValue, oldValue) {
      if (this.animate) {
        anime({
          targets: "#token-amount-label",
          value: [oldValue, newValue],
          round: 1,
          easing: "easeInOutExpo",
          complete() {
            this.localTokenState = newValue;
          },
        });
      } else {
        this.localTokenState = newValue;
        this.animate = true;
      }
    },
  },
  methods: {
    customSetTokenAmount(event) {
      this.animate = false;
      this.$store.commit("setTokens", event.target.value);
    },
  },
};
</script>
