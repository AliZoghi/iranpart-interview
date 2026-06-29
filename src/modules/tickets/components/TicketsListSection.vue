<script setup lang="ts">
import type { DataTableRow } from "~/components/ui/data-table.types";
import { TICKET_TABLE_COLUMNS } from "../config/ticket-table.config";
import TicketStatusBadge from "./TicketStatusBadge.vue";

defineProps<{
  rows: DataTableRow[];
  page: number;
  totalPages: number;
  loading?: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  "update:page": [page: number];
  view: [ticketId: number];
  retry: [];
}>();
</script>

<template>
  <div
    class="rounded-[2.5rem] border border-white/60 bg-white/40 shadow-sm backdrop-blur-3xl dark:border-white/10 dark:bg-gray-950/60"
  >
    <TicketsListErrorState
      v-if="error"
      :message="error"
      @retry="emit('retry')"
    />

    <TicketsListSkeleton v-else-if="loading" />

    <TicketsListEmptyState v-else-if="rows.length === 0" />

    <template v-else>
      <!-- Cards below 1200px -->
      <div
        class="divide-y divide-gray-50 dark:divide-white/5 min-[1200px]:hidden"
      >
        <article
          v-for="row in rows"
          :key="String(row.id)"
          class="group cursor-pointer space-y-3 p-4 transition-colors hover:bg-primary-500/[0.02]"
          @click="emit('view', Number(row.id))"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <span class="text-[10px] font-bold tabular-nums text-primary-500">
                {{ row.displayId }}
              </span>
              <p
                class="mt-1 text-xs font-black text-gray-800 transition-colors group-hover:text-primary-500 dark:text-white"
              >
                {{ row.title }}
              </p>
            </div>
            <TicketStatusBadge :status-id="Number(row.statusId)" />
          </div>

          <div
            class="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold text-gray-400"
          >
            <span>{{ row.departmentTitle }}</span>
            <span class="tabular-nums">{{ row.dateFa }}</span>
          </div>
        </article>
      </div>

      <!-- Table from 1200px -->
      <div class="hidden min-[1200px]:block">
        <UiDataTable
          :columns="TICKET_TABLE_COLUMNS"
          :rows="rows"
          fixed-layout
          @row-click="emit('view', Number($event.id))"
        >
          <template #cell-subject="{ row }">
            <div class="flex min-w-0 flex-col gap-1">
              <span class="text-[10px] font-bold tabular-nums text-primary-500">
                {{ row.displayId }}
              </span>
              <span
                class="line-clamp-2 text-xs font-black text-gray-800 transition-colors group-hover:text-primary-500 dark:text-white"
              >
                {{ row.title }}
              </span>
            </div>
          </template>

          <template #cell-department="{ row }">
            <span
              class="line-clamp-2 text-[11px] font-bold text-gray-500 dark:text-gray-400"
            >
              {{ row.departmentTitle }}
            </span>
          </template>

          <template #cell-status="{ row }">
            <div class="flex justify-start">
              <TicketStatusBadge :status-id="Number(row.statusId)" />
            </div>
          </template>

          <template #cell-updatedAt="{ row }">
            <div class="flex flex-col items-start gap-1 text-right">
              <span class="text-[10px] font-bold tabular-nums text-gray-400">
                {{ row.dateFa }}
              </span>
              <button
                type="button"
                class="rounded-lg bg-primary-500/10 px-3 py-1 text-[9px] font-black text-primary-500 opacity-0 transition-all group-hover:opacity-100"
                @click.stop="emit('view', Number(row.id))"
              >
                مشاهده گفتگو
              </button>
            </div>
          </template>
        </UiDataTable>
      </div>

      <UiPaginator
        v-if="totalPages > 0"
        :page="page"
        :total-pages="totalPages"
        @update:page="emit('update:page', $event)"
      />
    </template>
  </div>
</template>
