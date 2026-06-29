<script setup lang="ts">
defineEmits<{
  create: [];
}>();
</script>

<template>
  <div
    class="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-3xl dark:border-white/10 dark:bg-gray-950/60"
  >
    <div
      class="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl"
    />

    <div
      class="relative flex flex-col items-center justify-between gap-6 md:flex-row"
    >
      <div class="flex items-center gap-5">
        <div
          class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/10 text-primary-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-base font-black text-gray-900 dark:text-white">
            تیکت‌های پشتیبانی
          </h3>
          <p
            class="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400"
          >
            Support Tickets & Inquiry History
          </p>
        </div>
      </div>

      <button
        type="button"
        class="flex items-center gap-2 rounded-2xl bg-primary-500 px-8 py-4 text-[11px] font-black text-white shadow-xl shadow-primary-500/30 transition-all hover:scale-[1.02] active:scale-95"
        @click="$emit('create')"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M12 4v16m8-8H4"
          />
        </svg>
        ثبت تیکت جدید
      </button>
    </div>
  </div>
</template>
