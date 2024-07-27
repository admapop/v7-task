<script setup lang="ts">
import PropertyCreateCommand from "./PropertyCreateCommand.vue";
import ProjectCreateCommand from "./ProjectCreateCommand.vue";
import { onUnmounted, onMounted, ref, computed, markRaw, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { Component, ComponentPublicInstance } from "vue";

type Command = {
  name: string;
  id: string;
  command: () => void;
  component: Component;
};

// Props
const props = defineProps<{
  workspaceId: string;
  projectId: string;
}>();

// State
const query = ref("");
const isVisible = ref(false);
const target = ref(null);
const inputRef = ref(null);
const commandRefs = ref<(Element | ComponentPublicInstance | null)[]>([]);
const selectedAction = ref("");
const commands = ref<Command[]>([
  {
    name: "Create new project",
    id: "create-project",
    command: createNewProject,
    component: markRaw(ProjectCreateCommand),
  },
  {
    name: "Add new property",
    id: "add-property",
    command: addNewProperty,
    component: markRaw(PropertyCreateCommand),
  },
  {
    name: "Starting a chat within a project",
    command: () => console.log("Starting a chat within a project"),
  },
  {
    name: "Navigating to a specific row or property",
    command: () => console.log("Navigating to a specific row or property"),
  },
  {
    name: "Exporting a project",
    command: () => console.log("Exporting a project"),
  },
]);

const commandsComponentMap = computed(() => {
  return commands.value.reduce((acc, command) => {
    acc[command.id] = command.component;
    return acc;
  }, {} as Record<Command["id"], Component>);
});

// Command handlers
function createNewProject() {
  console.log("Creating new project");
  selectedAction.value = "create-project";
}
function addNewProperty() {
  console.log("Adding new property");
  selectedAction.value = "add-property";
}

function openCommandPalette(event: KeyboardEvent) {
  if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
    console.log("Opening command center");
    isVisible.value = true;
    nextTick(() =>
      (inputRef?.value as HTMLInputElement | null)?.focus()
    );
    event.preventDefault();
  }
}

function closeCommandPalette(event: KeyboardEvent) {
  if (event.key === "Escape") {
    console.log("Closing command center");
    selectedAction.value = "";
    isVisible.value = false;
  }
}

// Emitter handlers
function onCreated() {
  selectedAction.value = "";
  isVisible.value = false;
}

// Click outside
onClickOutside(target, () => {
  console.log("Closing command center");
  selectedAction.value = "";
  isVisible.value = false;
});

function handleKeyDown(event: KeyboardEvent) {
  if (isVisible.value) {
    const currentIndex = commandRefs.value.findIndex(ref => ref === document.activeElement);
    if (event.key === 'Tab') {
      event.preventDefault();
      if (currentIndex === -1) {
        (commandRefs.value[0] as HTMLElement)?.focus();
      } else {
        (commandRefs.value[(currentIndex + 1) % commandRefs.value.length] as HTMLElement)?.focus();
      }
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        (commandRefs.value[(currentIndex + 1) % commandRefs.value.length] as HTMLElement)?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        (commandRefs.value[(currentIndex - 1 + commandRefs.value.length) % commandRefs.value.length] as HTMLElement)?.focus();
        break;
      case 'Enter':
        event.preventDefault();
        (commandRefs.value[currentIndex] as HTMLElement)?.click();
        break;
    }
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener("keydown", openCommandPalette);
  window.addEventListener("keydown", closeCommandPalette);
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", openCommandPalette);
  window.removeEventListener("keydown", closeCommandPalette);
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div v-show="isVisible" ref="target"
    class="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600/80 backdrop-blur-sm p-6 shadow-lg rounded-lg max-w-96 w-full">
    <template v-if="!selectedAction">
      <input ref="inputRef" v-model="query" class="bg-transparent text-gray-300 focus:outline-none w-full"
        placeholder="Type a command or search..." />
      <div v-if="!selectedAction" class="mt-2">
        <p>Suggestions:</p>
        <ul>
          <li v-for="(command, index) in commands" :key="command.name" :ref="el => commandRefs[index] = el"
            @click="command.command" class="cursor-pointer text-gray-300 hover:bg-slate-700 p-2 rounded-md"
            :tabindex="index">
            {{ command.name }}
          </li>
        </ul>
      </div>
    </template>
    <div v-if="selectedAction">
      <component :is="commandsComponentMap[selectedAction]" @created="onCreated" />
    </div>
  </div>
</template>
