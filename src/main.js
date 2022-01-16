import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

const store = new Vuex.Store({
    state: {
        tokens: 1000,
        tokenGoal: 2000,
        method: "kelly",
        history: [],
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
        setTokens: (state, newAmount) => {
            const oldAmount = state.tokens;
            const amount = Number(newAmount);

            if (oldAmount === amount) {
                return;
            }

            state.tokens = amount;

            state.history.push({
                action: "tokens-changed",
                from: oldAmount,
                to: amount
            });
        },
        undo: (state) => {
            const lastAction = state.history.pop();

            if (lastAction) {
                switch (lastAction.action) {
                    case "tokens-changed": {
                        state.tokens = lastAction.from;
                    }
                }
            }
        }
    },
    actions: {
        incrementTokens: ({ commit, state }, amount) => {
            commit("setTokens", state.tokens + amount)
        },
        winBet: ({ getters, dispatch }) => {
            dispatch("incrementTokens", getters.bet);
        },
        loseBet: ({ getters, dispatch }) => {
            dispatch("incrementTokens", -getters.bet);
        },
    }
})

createApp(App).use(store).mount('#app')
