<template>
  <main class="row">
    <span class="col-3">Tokens</span>
    <input
      id="token-amount-label"
      class="col-3 border-0"
      type="text"
      :value="$store.state.displayedTokens"
      @change="customSetTokenAmount"
      aria-label="enter current token amount"
    />
  </main>
</template>

<script>
export default {
  name: "TokensLabel",
  methods: {
    customSetTokenAmount(event) {
      this.$store.dispatch("setTokens", {
        amount: event.target.value,
        animateTokens: false,
      });
    },
  },
};
</script>
