<script setup lang="ts">
import { createProject } from '@/backend/createProject';
import { useAuthTokenStore } from '@/stores/authToken';
import { useProjectStore } from '@/stores/project';
import { onMounted } from 'vue';
import { ref } from 'vue'

const projectName = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['done'])

const authTokenStore = useAuthTokenStore()
const projectStore = useProjectStore()

async function handleCreateProject() {
  await createProject({
    authToken: authTokenStore.token,
    workspaceId: projectStore.project!.workspace_id,
    data:
    {
      name: projectName.value,
    }
  })

  emit('done')
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class=" text-lg font-bold">Create a new project</p>
    <input ref="inputRef" v-model="projectName" class="bg-transparent text-gray-300 focus:outline-none w-full"
      placeholder="What is the project name" />

    <button @click="handleCreateProject" class="
      bg-slate-700
      text-gray-300
      hover:bg-slate-800
      p-2
      rounded-md
    ">Create project</button>
  </div>
</template>