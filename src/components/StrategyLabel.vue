<template>
  <main class="row">
    <span class="col-3">Strategy</span>
    <select class="col-3" @change="strategyChanged">
      <option
        v-for="strategy in strategies"
        :key="strategy.key"
        :value="strategy.key"
        :selected="selected(strategy.value)"
      >
        {{ strategy.value.strategyName }}
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
    this.setStrategy(this.strategies[0].value);
  },
  computed: mapState({
    tokenAmount: (state) => state.tokenAmount,
    tokenGoal: (state) => state.tokenGoal,
    strategies: (state) => {
      return {
        0: {
          key: 0,
          value: new KellyBetStrategy({
            tokenAmount: state.tokenAmount,
            tokenGoal: state.tokenGoal,
          }),
        },
        1: {
          key: 1,
          value: new MartingaleStrategy({
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
      this.$store.dispatch("changeStrategy", this.strategies[key].value);
    },
  },
};
</script>
