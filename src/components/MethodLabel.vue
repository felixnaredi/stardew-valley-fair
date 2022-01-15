<template>
  <main class="row">
    <span class="col-3">Method</span>
    <span class="col-3">{{ $store.state.method }}</span>
  </main>
</template>

<script>
export default {
  name: "MethodLabel",
};
</script>
