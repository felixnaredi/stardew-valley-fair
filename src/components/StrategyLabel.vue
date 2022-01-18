<template>
  <main class="row">
    <span class="col-3 me-1">Strategy</span>
    <select class="col-7" @change="strategyChanged">
      <option
        v-for="{ key, strategy } in strategies"
        class="w-100"
        :key="key"
        :value="key"
        :selected="selected(strategy)"
      >
        {{ strategy.strategyName }}
      </option>
    </select>
  </main>
</template>

<script>
import { KellyBetStrategy, MartingaleStrategy } from "../strategy";
import { mapState } from "vuex";

// TODO:
//   The method used to select strategies could be optimized. It currently initializes more than one
//   instance per change.

export default {
  name: "StrategyLabel",
  created() {
    this.setStrategy(this.strategies[0].strategy);
  },
  computed: mapState({
    tokenAmount: (state) => state.tokenAmount,
    tokenGoal: (state) => state.tokenGoal,
    strategies: (state) => {
      return {
        0: {
          key: 0,
          strategy: new KellyBetStrategy({
            tokenAmount: state.tokenAmount,
            tokenGoal: state.tokenGoal,
          }),
        },
        1: {
          key: 1,
          strategy: new MartingaleStrategy({
            tokenAmount: state.tokenAmount,
            tokenGoal: state.tokenGoal,
          }),
        },
      };
    },
  }),
  methods: {
    selected(strategy) {
      const other = this.$store.state.strategy;
      if (other) {
        return other.strategyName === strategy.strategyName;
      }
    },
    setStrategy(strategy) {
      this.$store.dispatch("setStrategy", strategy);
    },
    strategyChanged(event) {
      const key = event.target.value;
      this.$store.dispatch("changeStrategy", this.strategies[key].strategy);
    },
  },
};
</script>
