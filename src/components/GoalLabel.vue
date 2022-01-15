<template>
  <main class="row">
    <span class="col">Goal</span>
    <span class="col" :class="{ 'text-success': done }"
      >{{ $store.state.goal }}{{ done ? " ✅" : "" }}</span
    >
  </main>
</template>

<script>
export default {
  name: "GoalLabel",
  computed: {
    done() {
      return this.$store.state.tokens >= this.$store.state.goal;
    },
  },
};
</script>
