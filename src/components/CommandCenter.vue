<script setup lang="ts">
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

// State
const query = ref('')
const isVisible = ref(false)
const target = ref(null)
const commands = ref<{ name: string; command: () => void }[]>([
  {
    name: 'Create new project',
    command: createNewProject
  },
  {
    name: 'Add new property',
    command: () => console.log('Adding new property')
  },
  {
    name: 'Starting a chat within a project',
    command: () => console.log('Starting a chat within a project')
  },
  {
    name: 'Navigating to a specific row or property',
    command: () => console.log('Navigating to a specific row or property')
  },
  {
    name: 'Exporting a project',
    command: () => console.log('Exporting a project')
  }
])

// Command handlers
function createNewProject() {
  console.log('Creating new project')
}

function openCommandPalette(event: KeyboardEvent) {
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
    console.log('Opening command center')
    isVisible.value = true
  }
}

function closeCommandPalette(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    console.log('Closing command center')
    isVisible.value = false
  }
}

// Click outside
onClickOutside(target, () => {
  console.log('Closing command center')
  isVisible.value = false
})

// Lifecycle
onMounted(() => {
  window.addEventListener('keydown', openCommandPalette)
  window.addEventListener('keydown', closeCommandPalette)
})

onUnmounted(() => {
  window.removeEventListener('keydown', openCommandPalette)
  window.removeEventListener('keydown', closeCommandPalette)
})
</script>

<template>
  <div v-show="isVisible" ref="target">
    <input v-model="query" class=" border" />
  </div>
</template>