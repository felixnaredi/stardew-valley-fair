import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import anime from "animejs/lib/anime.es.js"

const store = new Vuex.Store({
    state: {
        tokens: 1000,
        tokenGoal: 2000,
        method: "kelly",
        history: [],

        // TODO:
        //   Values should be set automatically during initialization.
        displayedTokens: 1000,
        displayedBet: 500,
    },
    getters: {
        bet: (state) => {
            const maxBet = state.tokenGoal - state.tokens;

            if (state.method == "kelly") {
                if (state.tokens == 1) {
                    return 1;
                } else {
                    return Math.max(0, Math.min(maxBet, Math.floor(state.tokens / 2)));
                }
            }
        }
    },
    mutations: {
        setDisplayedTokens: (state, amount) => {
            state.displayedTokens = amount;
        },
        setTokens: (state, amount) => {
            state.tokens = amount;
        },
        setTokenGoal: (state, newAmount) => {
            state.tokenGoal = newAmount;
        },
        pushHistory: (state, action) => {
            state.history.push(action);
        },
        popHistory: (state, lambda) => {
            const lastAction = state.history.pop();

            if (lastAction) {
                lambda(lastAction);
            }
        }
    },
    actions: {
        setTokens: ({ state, commit }, { amount, pushHistory = true, animate = true }) => {
            const oldAmount = state.tokens;
            const newAmount = Number(amount);

            if (oldAmount === newAmount) {
                return;
            }

            commit("setTokens", newAmount);

            if (pushHistory) {
                commit("pushHistory", {
                    kind: "tokens-changed",
                    from: oldAmount,
                    to: newAmount
                });
            }

            if (animate) {
                const animatedValue = { value: oldAmount };

                anime({
                    targets: animatedValue,
                    value: [oldAmount, newAmount],
                    round: 1,
                    easing: "easeInOutExpo",
                    update() {
                        commit("setDisplayedTokens", animatedValue.value);
                    }
                });
            } else {
                commit("setDisplayedTokens", newAmount);
            }

        },
        incrementTokens: ({ dispatch, state }, amount) => {
            dispatch("setTokens", { amount: state.tokens + amount })
        },
        winBet: ({ getters, dispatch }) => {
            dispatch("incrementTokens", getters.bet);
        },
        loseBet: ({ getters, dispatch }) => {
            dispatch("incrementTokens", -getters.bet);
        },
        undo: ({ commit, dispatch }) => {
            commit("popHistory", (action) => {
                if (action.kind === "tokens-changed") {
                    dispatch("setTokens", {
                        amount: action.from,
                        pushHistory: false
                    });
                }
            });
        }
    },
    strict: process.env.NODE_ENV !== 'production',
})

createApp(App).use(store).mount('#app')
