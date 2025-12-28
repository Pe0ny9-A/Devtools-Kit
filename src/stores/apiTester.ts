import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApiHistory } from '@/types/api'

export const useApiTesterStore = defineStore('apiTester', () => {
  const history = ref<ApiHistory[]>([])

  const addHistory = (item: ApiHistory) => {
    history.value.unshift(item)
    // 只保留最近50条
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
    // 保存到localStorage
    localStorage.setItem('apiHistory', JSON.stringify(history.value))
  }

  const loadHistory = () => {
    const stored = localStorage.getItem('apiHistory')
    if (stored) {
      try {
        history.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to load API history', e)
      }
    }
  }

  const clearHistory = () => {
    history.value = []
    localStorage.removeItem('apiHistory')
  }

  return {
    history,
    addHistory,
    loadHistory,
    clearHistory,
  }
})

