<script setup lang="ts">
import { exportProject } from '@/backend/exportProject';
import { useAuthTokenStore } from '@/stores/authToken';
import { useProjectStore } from '@/stores/project';
import { ref } from 'vue'

const projectName = ref('')
const emit = defineEmits(['done'])

const authTokenStore = useAuthTokenStore()
const projectStore = useProjectStore()

async function handleExportProject() {
  await exportProject({
    authToken: authTokenStore.token,
    projectId: projectStore.project!.id,
    workspaceId: projectStore.project!.workspace_id,
    data:
    {
      name: projectName.value,
    }
  })

  emit('done')
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class=" text-lg font-bold">Export current project</p>
    <input v-model="projectName" class="bg-transparent text-gray-300 focus:outline-none w-full"
      placeholder="What is the name of the export?" />

    <button @click="handleExportProject" class="
      bg-slate-700
      text-gray-300
      hover:bg-slate-800
      p-2
      rounded-md
    ">Export project</button>
  </div>
</template>