<template>
  <main class="row">
    <span class="col-3 me-1">Goal</span>
    <input
      v-if="customAmount"
      id="custom-token-goal-amount-input"
      type="text"
      class="col-7 border-0"
      :class="{ 'text-success': doneWithTokenGoal }"
      :value="tokenGoal + (doneWithTokenGoal ? ' ✅' : '')"
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
        :selected="tokenGoal === value"
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
      this.$store.dispatch("setTokenGoal", Number(event.target.value));
    },
    doneWith(partialGoal) {
      return this.$store.state.displayedTokenAmount >= partialGoal;
    },
  },
  computed: {
    tokenGoal() {
      return this.$store.state.tokenGoal;
    },
    doneWithTokenGoal() {
      return this.doneWith(this.tokenGoal);
    },
  },
};
</script>
