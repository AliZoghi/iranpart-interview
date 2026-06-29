<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    rounded?: string;
  }>(),
  {
    width: "w-full",
    height: "h-3",
    rounded: "rounded-lg",
  },
);
</script>

<template>
  <div
    class="animate-pulse bg-white/20 dark:bg-white/10"
    :class="[width, height, rounded]"
  />
</template>
