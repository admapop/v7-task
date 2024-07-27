<script setup lang="ts">
import { deleteProperty } from '@/backend/deleteProperty';
import { useAuthTokenStore } from '@/stores/authToken';
import { useProjectStore } from '@/stores/project';
import { ref } from 'vue'

const property = ref('')
const emit = defineEmits(['done'])

const authTokenStore = useAuthTokenStore()
const projectStore = useProjectStore()


async function handleDeleteProperty() {
  await deleteProperty({
    authToken: authTokenStore.token,
    projectId: projectStore.project!.id,
    workspaceId: projectStore.project!.workspace_id,
    propertyIdOrSlug: property.value
  })

  emit('done')
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class=" text-lg font-bold">Delete a property to your project</p>
    <input v-model="property" class="bg-transparent text-gray-300 focus:outline-none w-full"
      placeholder="Type the property id if you know it or its name or slug" />
    <button @click="handleDeleteProperty" class="
      bg-slate-700
      text-gray-300
      hover:bg-slate-800
      p-2
      rounded-md
    ">Add property</button>
  </div>
</template>