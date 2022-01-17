<template>
  <main class="row">
    <span class="col-3">Strategy</span>
    <span class="col-3">{{ $store.state.strategy.strategyName }}</span>
  </main>
</template>

<script>
export default {
  name: "StrategyLabel",
};
</script>
