<template>
  <main class="row">
    <span class="col">Tokens</span>
    <span class="col">{{ $store.state.tokens }}</span>
  </main>
</template>

<script>
export default {
  name: "TokensLabel",
};
</script>
