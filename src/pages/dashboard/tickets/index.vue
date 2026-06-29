<script setup lang="ts">
const { tickets, error, fetchTickets } = useTickets();

await fetchTickets();
</script>

<template>
  <section class="flex-1 bg-slate-900 p-6">
    <p v-if="error">{{ error }}</p>

    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        {{ ticket.title }}
      </li>
    </ul>
  </section>
</template>
