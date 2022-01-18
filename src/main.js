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

const INITIAL_TOKENS = 1000;
const INITIAL_TOKEN_GOAL = 2000;
const INITIAL_STRATEGY = new KellyBetStrategy();

const store = new Vuex.Store({
  state: {
    tokens: INITIAL_TOKENS,
    tokenGoal: INITIAL_TOKEN_GOAL,
    strategy: INITIAL_STRATEGY,
    history: [],
    displayedTokens: INITIAL_TOKENS,
    displayedBet: INITIAL_STRATEGY.getBetSize(
      INITIAL_TOKENS,
      INITIAL_TOKEN_GOAL
    ),
  },
  getters: {
    bet: (state) => state.strategy.getBetSize(state.tokens, state.tokenGoal),
  },
  mutations: {
    setDisplayedTokens: (state, amount) => (state.displayedTokens = amount),
    setDisplayedBet: (state, amount) => (state.displayedBet = amount),
    setTokens: (state, amount) => (state.tokens = amount),
    setTokenGoal: (state, newAmount) => (state.tokenGoal = newAmount),
    pushHistory: (state, action) => state.history.push(action),
    popHistory: (state, callback) => {
      const lastAction = state.history.pop();
      if (lastAction) {
        callback(lastAction);
      }
    },
  },
  actions: {
    /**
     * Set tokens to `amount`.
     *
     * The `payload` can contain the following fields:
     *   - amount: The amount to set `tokens` to (required).
     *   - pushHistory: If true the change will be pushed to `history` (defaults to `true`).
     *   - animateTokens: If true, `displayedTokens` will be animated (defaults to `true`).
     *   - animateBet: If true, `displayedBet` will be animated (defaults to `true`).
     *
     * @param {ActionContext} context
     * @param {Object} payload - Descriptor for the modification. Must include field `amount`.
     */
    setTokens: (
      { state, getters, commit },
      { amount, pushHistory = true, animateTokens = true, animateBet = true }
    ) => {
      const oldAmount = state.tokens;
      const newAmount = Number(amount);

      if (oldAmount === newAmount) {
        return;
      }

      const oldBet = getters.bet;

      commit("setTokens", newAmount);

      const newBet = getters.bet;

      if (pushHistory) {
        commit("pushHistory", {
          kind: "tokens-changed",
          from: oldAmount,
          to: newAmount,
        });
      }

      if (animateTokens) {
        animateValue(oldAmount, newAmount, (value) =>
          commit("setDisplayedTokens", value)
        );
      } else {
        commit("setDisplayedTokens", newAmount);
      }

      if (animateBet) {
        animateValue(oldBet, newBet, (value) =>
          commit("setDisplayedBet", value)
        );
      } else {
        commit("setDisplayedBet", newBet);
      }
    },

    /**
     * Sets the token goal to `amount`.
     *
     * @param {ActionContext} context
     * @param {Number} amount - New value of token goal.
     */
    setTokenGoal: (
      { commit, getters },
      { amount, animateBet = true }
    ) => {
      const oldBet = getters.bet;

      commit("setTokenGoal", amount);

      const newBet = getters.bet;

      if (animateBet) {
        animateValue(oldBet, newBet, (value) =>
          commit("setDisplayedBet", value)
        );
      } else {
        commit("setDisplayedBet", newBet);
      }
    },

    /**
     * Increments the current amount of tokens with `amount`.
     *
     * @param {ActionContext} context
     * @param {Number} amount - Amount to increment tokens with.
     */
    incrementTokens: ({ dispatch, state }, amount) => {
      dispatch("setTokens", { amount: state.tokens + amount });
    },

    /**
     * Updates the state as if the bet was won.
     *
     * @param {ActionContext} context
     */
    winBet: ({ getters, dispatch }) => dispatch("incrementTokens", getters.bet),

    /**
     * Updates the state as if the bet was lost.
     *
     * @param {ActionContext} context
     */
    loseBet: ({ getters, dispatch }) =>
      dispatch("incrementTokens", -getters.bet),

    /**
     * Undos last action.
     *
     * @param {ActionContext} context
     */
    undo: ({ commit, dispatch }) => {
      commit("popHistory", (action) => {
        if (action.kind === "tokens-changed") {
          dispatch("setTokens", {
            amount: action.from,
            pushHistory: false,
          });
        }
      });
    },
  },
  strict: process.env.NODE_ENV !== "production",
});

createApp(App).use(store).mount("#app");
