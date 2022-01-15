<template>
  <main class="row">
    <span class="col">Method</span>
    <span class="col">{{ $store.state.method }}</span>
  </main>
</template>

<script>
export default {
  name: "MethodLabel",
};
</script>
