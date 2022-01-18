import { createApp } from "vue";
import anime from "animejs/lib/anime.es.js";
import App from "./App.vue";
import Vuex from "vuex";
import { KellyBetStrategy } from "./strategy";

/**
 * Creates an animation between two numeric values.
 * @param {Number} from - Value animation starts from.
 * @param {Number} to  - Value animations ends on.
 * @callback callback  - Handler for animation updates.
 */
function animateValue(from, to, callback) {
  const animatedValue = { value: from };
  anime({
    targets: animatedValue,
    value: [from, to],
    round: 1,
    easing: "easeInOutExpo",
    update: () => callback(animatedValue.value),
  });
}

const INITIAL_TOKEN_AMOUNT = 1000;
const INITIAL_TOKEN_GOAL = 2000;
const INITIAL_STRATEGY = new KellyBetStrategy();

const store = new Vuex.Store({
  state: {
    tokenAmount: INITIAL_TOKEN_AMOUNT,
    tokenGoal: INITIAL_TOKEN_GOAL,
    strategy: INITIAL_STRATEGY,
    history: [],
    displayedTokenAmount: INITIAL_TOKEN_AMOUNT,
    displayedBet: INITIAL_STRATEGY.getBetSize(
      INITIAL_TOKEN_AMOUNT,
      INITIAL_TOKEN_GOAL
    ),
  },
  getters: {
    bet: (state) =>
      state.strategy.getBetSize(state.tokenAmount, state.tokenGoal),
  },
  mutations: {
    setDisplayedTokenAmount: (state, amount) =>
      (state.displayedTokenAmount = amount),
    setDisplayedBet: (state, amount) => (state.displayedBet = amount),
    setTokenAmount: (state, amount) => (state.tokenAmount = amount),
    setTokenGoal: (state, newAmount) => (state.tokenGoal = newAmount),
    pushHistory: (state) =>
      state.history.push({
        tokenAmount: state.tokenAmount,
        tokenGoal: state.tokenGoal,
      }),
    popHistory: (state, callback) => {
      const lastAction = state.history.pop();
      if (lastAction) {
        callback(lastAction);
      }
    },
  },
  actions: {
    /**
     * Sets `state.tokenAmount` to an custom amount.
     *
     * @param {ActionContext} context
     * @param {Number} amount - New value of `state.tokenAmount`.
     */
    setCustomTokenAmount({ commit, getters }, amount) {
      commit("pushHistory");

      const oldBet = getters.bet;
      commit("setTokenAmount", amount);
      commit("setDisplayedTokenAmount", amount);
      animateValue(oldBet, getters.bet, (value) =>
        commit("setDisplayedBet", value)
      );
    },

    /**
     * Sets the token goal to `amount`.
     *
     * @param {ActionContext} context
     * @param {Number} amount - New value of token goal.
     */
    setTokenGoal: ({ commit, getters }, amount) => {
      commit("pushHistory");

      const oldBet = getters.bet;
      commit("setTokenGoal", amount);

      animateValue(oldBet, getters.bet, (value) =>
        commit("setDisplayedBet", value)
      );
    },

    /**
     * Increments the current amount of tokens with `amount`.
     *
     * @param {ActionContext} context
     * @param {Number} amount - Amount to increment tokens with.
     */
    incrementTokenAmount: ({ commit, getters, state }, amount) => {
      commit("pushHistory");

      const oldTokenAmount = state.tokenAmount;
      const oldBet = getters.bet;

      commit("setTokenAmount", state.tokenAmount + amount);

      animateValue(oldTokenAmount, state.tokenAmount, (value) =>
        commit("setDisplayedTokenAmount", value)
      );

      animateValue(oldBet, getters.bet, (value) =>
        commit("setDisplayedBet", value)
      );
    },

    /**
     * Updates the state as if the bet was won.
     *
     * @param {ActionContext} context
     */
    winBet: ({ getters, dispatch }) =>
      dispatch("incrementTokenAmount", getters.bet),

    /**
     * Updates the state as if the bet was lost.
     *
     * @param {ActionContext} context
     */
    loseBet: ({ getters, dispatch }) =>
      dispatch("incrementTokenAmount", -getters.bet),

    /**
     * Undos last action.
     *
     * @param {ActionContext} context
     */
    undo: ({ commit, getters, state }) => {
      commit("popHistory", ({ tokenAmount, tokenGoal }) => {
        const oldTokenAmount = state.tokenAmount;
        const oldBet = getters.bet;

        commit("setTokenAmount", tokenAmount);
        commit("setTokenGoal", tokenGoal);

        animateValue(oldTokenAmount, state.tokenAmount, (value) =>
          commit("setDisplayedTokenAmount", value)
        );

        animateValue(oldBet, getters.bet, (value) =>
          commit("setDisplayedBet", value)
        );
      });
    },
  },
  strict: process.env.NODE_ENV !== "production",
});

createApp(App).use(store).mount("#app");
