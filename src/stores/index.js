
import { defineStore } from 'pinia'
export const useCounter = defineStore("useCounter", {
    state: () => ({
        count: 1,
    }),

    getters: {

    },

    actions: {
        add() {
            this.count++
        }
    }
})
export const useUser = defineStore("useUser", {
    state: () => ({
        name: '小明',
    }),

    getters: {},

    actions: {
        add() {
            this.name = '小李'
        }
    }
})