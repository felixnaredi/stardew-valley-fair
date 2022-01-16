<template>
  <main class="row">
    <span class="col-3">Tokens</span>
    <input
      class="col-3 border-0"
      type="text"
      :value="$store.state.tokens"
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
      this.$store.commit("setTokens", event.target.value);
    },
  },
};
</script>
