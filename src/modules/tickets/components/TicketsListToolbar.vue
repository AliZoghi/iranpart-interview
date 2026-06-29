<script setup lang="ts">
import {
  TICKET_STATUS_FILTERS,
  type TicketStatusFilter,
} from "../constants/ticket-status";

const props = defineProps<{
  search: string;
  selectedStatusId: number | null;
}>();

const emit = defineEmits<{
  "update:search": [value: string];
  "update:selectedStatusId": [value: number | null];
}>();

function selectStatus(filter: TicketStatusFilter) {
  emit("update:selectedStatusId", filter.statusId);
}

function onSearchInput(event: Event) {
  emit("update:search", (event.target as HTMLInputElement).value);
}

function isActive(filter: TicketStatusFilter) {
  return props.selectedStatusId === filter.statusId;
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4 px-2">
    <div
      class="flex flex-wrap items-center gap-2 rounded-2xl border border-white/60 bg-white/30 p-1.5 dark:border-white/10 dark:bg-white/5"
    >
      <button
        v-for="filter in TICKET_STATUS_FILTERS"
        :key="filter.label"
        type="button"
        class="rounded-xl px-5 py-2 text-[10px] font-black transition-all"
        :class="
          isActive(filter)
            ? 'bg-white text-primary-500 shadow-sm dark:bg-white/10'
            : 'text-gray-500 hover:text-primary-500'
        "
        @click="selectStatus(filter)"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="relative w-full md:w-64">
      <input
        type="search"
        name="ticket-search"
        autocomplete="off"
        :value="search"
        placeholder="جستجو در تیکت‌ها..."
        class="w-full cursor-text rounded-2xl border border-white/60 bg-white/40 py-3 pl-11 pr-5 text-[11px] font-bold text-gray-900 caret-primary-500 outline-none transition-all placeholder:text-gray-400 focus:border-primary-500/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
        @input="onSearchInput"
      />
      <svg
        class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>
</template>
