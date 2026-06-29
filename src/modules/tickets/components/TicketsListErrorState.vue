<script setup lang="ts">
defineProps<{
  message: string;
}>();

defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-16 text-center">
    <div
      class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10"
    >
      <svg
        class="h-7 w-7 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
    </div>
    <h3 class="text-sm font-black text-gray-800 dark:text-white">
      خطا در دریافت تیکت‌ها
    </h3>
    <p class="mt-2 max-w-sm text-[11px] font-bold leading-6 text-red-400">
      {{ message }}
    </p>
    <button
      type="button"
      class="mt-6 rounded-2xl bg-primary-500 px-6 py-3 text-[11px] font-black text-white shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-95"
      @click="$emit('retry')"
    >
      تلاش مجدد
    </button>
  </div>
</template>
