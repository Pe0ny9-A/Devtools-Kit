import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FormField } from '@/types/common'

export const useFormBuilderStore = defineStore('formBuilder', () => {
  const fields = ref<FormField[]>([])
  const formData = ref<Record<string, any>>({})

  const addField = (field: FormField) => {
    fields.value.push(field)
  }

  const removeField = (id: string) => {
    fields.value = fields.value.filter((f) => f.id !== id)
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    const index = fields.value.findIndex((f) => f.id === id)
    if (index !== -1) {
      fields.value[index] = { ...fields.value[index], ...updates }
    }
  }

  const clearForm = () => {
    fields.value = []
    formData.value = {}
  }

  return {
    fields,
    formData,
    addField,
    removeField,
    updateField,
    clearForm,
  }
})

