<template>
  <main class="row">
    <span class="col-3">Tokens</span>
    <input
      class="col-3 border-0"
      type="text"
      :value="$store.state.tokens"
      @change="customSetTokenAmount"
    />
  </main>
</template>

<script>
export default {
  name: "TokensLabel",
  methods: {
    customSetTokenAmount(event) {
      this.$store.state.tokens = Number(event.target.value);
    },
  },
};
</script>
