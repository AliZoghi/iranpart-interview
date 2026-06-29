<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const {
  tableRows,
  pagination,
  loading,
  error,
  search,
  selectedStatusId,
  fetchTickets,
  setSearch,
  setSelectedStatusId,
  setPage,
} = useTickets();

await fetchTickets();
</script>

<template>
  <main class="flex-1 space-y-8 p-6">
    <div class="space-y-6" dir="rtl">
      <TicketsPageHeader />

      <TicketsListToolbar
        :search="search"
        :selected-status-id="selectedStatusId"
        @update:search="setSearch"
        @update:selected-status-id="setSelectedStatusId"
      />

      <p v-if="error" class="px-2 text-[11px] font-bold text-red-400">
        {{ error }}
      </p>

      <TicketsListSection
        :rows="tableRows"
        :page="pagination?.page ?? 1"
        :total-pages="pagination?.totalPages ?? 0"
        :loading="loading"
        @update:page="setPage"
      />
    </div>
  </main>
</template>
