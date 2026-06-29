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
  initFromRoute,
  fetchTickets,
  retryFetch,
  setSearch,
  setSelectedStatusId,
  setPage,
  handleCreateTicket,
  handleViewTicket,
} = useTickets();

initFromRoute();
await fetchTickets();
</script>

<template>
  <main class="flex-1 space-y-8 p-6">
    <div class="space-y-6" dir="rtl">
      <TicketsPageHeader @create="handleCreateTicket" />

      <TicketsListToolbar
        :search="search"
        :selected-status-id="selectedStatusId"
        @update:search="setSearch"
        @update:selected-status-id="setSelectedStatusId"
      />

      <TicketsListSection
        :rows="tableRows"
        :page="pagination?.page ?? 1"
        :total-pages="pagination?.totalPages ?? 0"
        :loading="loading"
        :error="error"
        @update:page="setPage"
        @retry="retryFetch"
        @view="handleViewTicket"
      />
    </div>
  </main>
</template>
