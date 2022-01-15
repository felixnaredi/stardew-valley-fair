<template>
  <main class="row">
    <span class="col">Tokens</span>
    <span class="col">{{ tokens }}</span>
  </main>
</template>

<script>
export default {
  name: "TokensLabel",
  data() {
    return {
      tokens: 1000,
    };
  },
};
</script>
