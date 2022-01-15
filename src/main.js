import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

const store = new Vuex.Store({
    state: {
        tokens: 1000,
        goal: 4900,
        method: "kelly"
    },
    getters: {
        bet: (state) => {
            const maxBet = state.goal - state.tokens;

            if (state.method == "kelly") {
                if (state.tokens == 1) {
                    return 1;
                } else {
                    return Math.max(0, Math.min(maxBet, Math.floor(state.tokens / 2)));
                }
            }
        }
    },
    actions: {
        winBet: ({ getters, state }) => {
            state.tokens += getters.bet;
        },
        loseBet: ({ getters, state }) => {
            state.tokens -= getters.bet;
        }
    }
})

createApp(App).use(store).mount('#app')
