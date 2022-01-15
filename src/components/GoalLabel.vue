<template>
  <main class="row">
    <span class="col">Goal</span>
    <span class="col">{{ $store.state.goal }}</span>
  </main>
</template>

<script>
export default {
  name: "GoalLabel",
};
</script>
