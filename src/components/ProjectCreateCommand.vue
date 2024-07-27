<script setup lang="ts">
import { createProject } from '@/backend/createProject';
import { useAuthTokenStore } from '@/stores/authToken';
import { useProjectStore } from '@/stores/project';
import { ref } from 'vue'

const projectName = ref('')
const emit = defineEmits(['created'])

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

  emit('created')
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class=" text-lg font-bold">Create a new project</p>
    <input v-model="projectName" class="bg-transparent text-gray-300 focus:outline-none w-full"
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