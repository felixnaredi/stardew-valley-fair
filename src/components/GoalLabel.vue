<template>
  <main class="row">
    <span class="col-3">Goal</span>
    <input
      v-if="customAmount"
      id="custom-token-goal-amount-input"
      type="text"
      class="col-7 border-0"
      :class="{ 'text-success': doneWithTokenGoal }"
      :value="$store.state.tokenGoal + (doneWithTokenGoal ? ' ✅' : '')"
      @change="setTokenGoal"
      aria-label="enter custom token goal"
    />
    <select
      v-else
      id="select-token-goal-amount-input"
      class="col-7"
      :class="{ 'text-success': doneWithTokenGoal }"
      @change="setTokenGoal"
      aria-label="select token goal"
    >
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :class="doneWith(value) ? 'text-success' : 'text-dark'"
      >
        {{ label }} ({{ value }}){{ doneWith(value) ? " ✅" : "" }}
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
    setTokenGoal(event) {
      this.$store.dispatch("setTokenGoal", {
        amount: Number(event.target.value),
      });
    },
    doneWith(partialGoal) {
      return this.$store.state.displayedTokens >= partialGoal;
    },
  },
  computed: {
    doneWithTokenGoal() {
      return this.doneWith(this.$store.state.tokenGoal);
    },
  },
};
</script>
