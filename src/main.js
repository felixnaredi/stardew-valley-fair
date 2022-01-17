import { createApp } from 'vue'
import anime from "animejs/lib/anime.es.js"
import App from './App.vue'
import Vuex from 'vuex'

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
        setDisplayedBet: (state, amount) => {
            state.displayedBet = amount;
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
        setTokens: ({ state, getters, commit }, { amount, pushHistory = true, animateTokens = true, animateBet = true }) => {
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
                    to: newAmount
                });
            }

            if (animateTokens) {
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

            if (animateBet) {
                const animatedValue = { value: oldBet };

                anime({
                    targets: animatedValue,
                    value: [oldBet, newBet],
                    round: 1,
                    easing: "easeInOutExpo",
                    update() {
                        commit("setDisplayedBet", animatedValue.value);
                    }
                });
            } else {
                commit("setDisplayedBet", newBet);
            }
        },
        setTokenGoal: ({ getters, commit }, { amount, animateBet = true}) => {
            const oldBet = getters.bet;

            commit("setTokenGoal", amount);

            const newBet = getters.bet;

            if (animateBet) {
                const animatedValue = { value: oldBet };

                anime({
                    targets: animatedValue,
                    value: [oldBet, newBet],
                    round: 1,
                    easing: "easeInOutExpo",
                    update() {
                        commit("setDisplayedBet", animatedValue.value);
                    }
                });
            } else {
                commit("setDisplayedBet", newBet);
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
