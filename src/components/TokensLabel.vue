<template>
  <main class="row">
    <span class="col">Tokens</span>
    <input
      class="col border-0"
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
      console.log(event);
      this.$store.state.tokens = Number(event.target.value);
    },
  },
};
</script>
