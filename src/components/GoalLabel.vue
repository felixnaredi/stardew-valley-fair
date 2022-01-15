<template>
  <main class="row">
    <span class="col-3">Goal</span>
    <input
      v-if="customAmount"
      id="custom-token-goal-amount-input"
      type="text"
      class="col-7 border-0"
      :class="{ 'text-success': done }"
      :value="$store.state.tokenGoal + (this.done ? ' ✅' : '')"
      @change="setCustomTokenGoal"
      aria-label="enter custom token goal"
    />
    <select
      v-else
      id="select-token-goal-amount-input"
      class="col-7"
      :class="{ 'text-success': done }"
      v-model="$store.state.tokenGoal"
      aria-label="select token goal"
    >
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :class="$store.state.tokens >= value ? 'text-success' : 'text-dark'"
      >
        {{ label }} ({{ value }}){{ $store.state.tokens >= value ? " ✅" : "" }}
      </option>
    </select>
    <input
      type="checkbox"
      v-model="customAmount"
      class="col m-1"
      aria-label="change token goal input type"
    />
  </main>
</template>

<script>
export default {
  name: "GoalLabel",
  data() {
    return {
      customAmount: false,
      options: [
        {
          value: 2000,
          label: "Stardrop",
        },
        {
          value: 2900,
          label: "Items",
        },
        {
          value: 4900,
          label: "Shop",
        },
      ],
    };
  },
  methods: {
    setCustomTokenGoal(event) {
      this.$store.state.tokenGoal = Number(event.target.value);
    },
  },
  computed: {
    done() {
      return this.$store.state.tokens >= this.$store.state.tokenGoal;
    },
  },
};
</script>
