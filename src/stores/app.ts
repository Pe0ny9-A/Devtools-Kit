import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const theme = ref<'dark' | 'light'>('dark')
  const language = ref<'zh' | 'en'>('zh')

  const setTheme = (newTheme: 'dark' | 'light') => {
    theme.value = newTheme
  }

  const setLanguage = (newLanguage: 'zh' | 'en') => {
    language.value = newLanguage
  }

  return {
    theme,
    language,
    setTheme,
    setLanguage,
  }
})

