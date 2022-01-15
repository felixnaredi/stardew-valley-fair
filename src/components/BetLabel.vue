<template>
  <span class="display-4">Bet {{ bet }}</span>
</template>

<script>
export default {
  name: "BetLabel",
  data() {
    return {
      bet: 100,
    };
  },
};
</script>
