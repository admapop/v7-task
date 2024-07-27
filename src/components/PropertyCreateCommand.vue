<script setup lang="ts">
import { addProperty } from '@/backend/addProperty';
import type { components } from '@/backend/api';
import { useAuthTokenStore } from '@/stores/authToken';
import { useProjectStore } from '@/stores/project';
import { onMounted } from 'vue';
import { ref } from 'vue'

const propertyName = ref('')
const propertyDescription = ref('')
const propertyTool = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['done'])

const authTokenStore = useAuthTokenStore()
const projectStore = useProjectStore()


async function handleCreateProperty() {
  await addProperty({
    authToken: authTokenStore.token,
    projectId: projectStore.project!.id,
    workspaceId: projectStore.project!.workspace_id,
    data:
    {
      name: propertyName.value,
      description: propertyDescription.value,
      tool: propertyTool.value as components['schemas']['Projects.Common.PropertyTool'],
      type: 'text' as components["schemas"]["Projects.BasicPropertyType"],
      input_ids: []
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
    <p class=" text-lg font-bold">Add a property to your project</p>
    <p class="text-sm text-red-400">For the purposes of this demo, only text type properties are available</p>
    <input ref="inputRef" v-model="propertyName" class="bg-transparent text-gray-300 focus:outline-none w-full"
      placeholder="Add your property name" />
    <input v-model="propertyDescription" class="bg-transparent text-gray-300 focus:outline-none w-full"
      placeholder="Add your property description" />
    <label class="flex flex-row gap-4">Property tool
      <select class="
          bg-transparent
          text-gray-300
          focus:outline-none
          "
          v-model="propertyTool"
          >
        <option value="" disabled>Please select a property tool</option>
        <option value="manual">User input</option>
        <option value="gpt_4o">GPT-4o</option>
      </select>

    </label>
    <button @click="handleCreateProperty" class="
      bg-slate-700
      text-gray-300
      hover:bg-slate-800
      p-2
      rounded-md
    ">Add property</button>
  </div>
</template>