<script setup lang="ts">
import type { DataTableColumn, DataTableRow } from "./data-table.types";

defineProps<{
  columns: DataTableColumn[];
  rows: DataTableRow[];
  fixedLayout?: boolean;
}>();

const emit = defineEmits<{
  rowClick: [row: DataTableRow];
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table
      dir="rtl"
      class="w-full border-collapse text-right"
      :class="fixedLayout ? 'table-fixed' : 'min-w-[720px]'"
    >
      <thead>
        <tr
          class="border-b border-gray-100 text-[10px] font-black uppercase text-gray-400 dark:border-white/5"
        >
          <th
            v-for="column in columns"
            :key="column.key"
            :class="['px-4 py-4 xl:px-6 xl:py-6', column.headerClass]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50 dark:divide-white/5">
        <tr
          v-for="(row, rowIndex) in rows"
          :key="String(row.id ?? rowIndex)"
          class="group cursor-pointer transition-colors hover:bg-primary-500/[0.02]"
          @click="emit('rowClick', row)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="['px-4 py-4 xl:px-6 xl:py-6', column.cellClass]"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="row[column.key]"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
