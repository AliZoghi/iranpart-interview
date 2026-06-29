<script setup lang="ts">
import { TICKET_TABLE_COLUMNS } from "../config/ticket-table.config";

withDefaults(
  defineProps<{
    rows?: number;
  }>(),
  {
    rows: 5,
  },
);
</script>

<template>
  <!-- Mobile skeleton -->
  <div
    class="divide-y divide-gray-50 dark:divide-white/5 min-[1200px]:hidden"
    aria-hidden="true"
  >
    <article v-for="index in rows" :key="index" class="space-y-3 p-4">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0 flex-1 space-y-2">
          <UiSkeleton width="w-16" height="h-2.5" rounded="rounded-md" />
          <UiSkeleton width="w-3/4" height="h-3.5" rounded="rounded-md" />
        </div>
        <UiSkeleton width="w-20" height="h-4" rounded="rounded-full" />
      </div>
      <div class="flex items-center justify-between gap-2">
        <UiSkeleton width="w-24" height="h-2.5" rounded="rounded-md" />
        <UiSkeleton width="w-28" height="h-2.5" rounded="rounded-md" />
      </div>
    </article>
  </div>

  <!-- Desktop skeleton -->
  <div class="hidden min-[1200px]:block" aria-hidden="true">
    <div class="overflow-x-auto">
      <table class="w-full table-fixed border-collapse text-right">
        <thead>
          <tr class="border-b border-gray-100 dark:border-white/5">
            <th
              v-for="column in TICKET_TABLE_COLUMNS"
              :key="column.key"
              :class="['px-6 py-6', column.headerClass]"
            >
              <UiSkeleton height="h-2.5" rounded="rounded-md" />
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50 dark:divide-white/5">
          <tr v-for="index in rows" :key="index">
            <td
              v-for="column in TICKET_TABLE_COLUMNS"
              :key="column.key"
              :class="['px-6 py-6 align-top', column.cellClass]"
            >
              <div v-if="column.key === 'subject'" class="space-y-2">
                <UiSkeleton width="w-16" height="h-2.5" rounded="rounded-md" />
                <UiSkeleton width="w-4/5" height="h-3.5" rounded="rounded-md" />
              </div>
              <UiSkeleton
                v-else-if="column.key === 'status'"
                width="w-24"
                height="h-4"
                rounded="rounded-full"
              />
              <UiSkeleton
                v-else
                width="w-2/3"
                height="h-2.5"
                rounded="rounded-md"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
