<script setup lang="ts">
import { buildPaginatorItems } from "./paginator.utils";

const props = defineProps<{
  page: number;
  totalPages: number;
  siblingCount?: number;
}>();

const emit = defineEmits<{
  "update:page": [page: number];
}>();

function goToPage(nextPage: number) {
  if (nextPage < 1 || nextPage > props.totalPages || nextPage === props.page) {
    return;
  }

  emit("update:page", nextPage);
}

const paginationItems = computed(() =>
  buildPaginatorItems(props.page, props.totalPages, props.siblingCount ?? 1),
);
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-center gap-2 border-t border-gray-100 p-4 sm:p-6 dark:border-white/5"
  >
    <button
      type="button"
      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-all hover:bg-primary-500 hover:text-white disabled:pointer-events-none disabled:opacity-40 dark:border-white/10"
      :disabled="page <= 1"
      aria-label="صفحه قبل"
      @click="goToPage(page - 1)"
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
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <template v-for="item in paginationItems" :key="item.type === 'page' ? `page-${item.page}` : item.key">
      <span
        v-if="item.type === 'ellipsis'"
        class="flex h-8 w-8 shrink-0 items-center justify-center text-[10px] font-black text-gray-400"
        aria-hidden="true"
      >
        ...
      </span>

      <button
        v-else
        type="button"
        class="h-8 min-w-8 shrink-0 rounded-xl px-2 text-[10px] font-black transition-all"
        :class="
          item.page === page
            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
            : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
        "
        :aria-current="item.page === page ? 'page' : undefined"
        @click="goToPage(item.page)"
      >
        {{ item.page }}
      </button>
    </template>

    <button
      type="button"
      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-all hover:bg-primary-500 hover:text-white disabled:pointer-events-none disabled:opacity-40 dark:border-white/10"
      :disabled="page >= totalPages"
      aria-label="صفحه بعد"
      @click="goToPage(page + 1)"
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
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  </div>
</template>
