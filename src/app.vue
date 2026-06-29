<script setup lang="ts">
const { tickets, pagination, loading, error, fetchTickets } = useTickets();
</script>

<template>
  <main class="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
    <section class="mx-auto flex max-w-5xl flex-col gap-6">
      <header
        class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p class="text-sm font-medium uppercase tracking-wide text-cyan-300">
            Tickets
          </p>
          <h1 class="mt-2 text-3xl font-bold">User tickets</h1>
        </div>

        <button
          class="rounded-md bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          :disabled="loading"
          @click="fetchTickets"
        >
          {{ loading ? "Loading..." : "Fetch tickets" }}
        </button>
      </header>

      <p
        v-if="error"
        class="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
      >
        {{ error }}
      </p>

      <div v-if="pagination" class="text-sm text-slate-400">
        Page {{ pagination.page }} of {{ pagination.totalPages }} ·
        {{ pagination.total }} tickets
      </div>

      <div class="grid gap-4">
        <article
          v-for="ticket in tickets"
          :key="ticket.id"
          class="rounded-lg border border-slate-800 bg-slate-900 p-5"
        >
          <div
            class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <h2 class="text-lg font-semibold">{{ ticket.title }}</h2>
              <p class="mt-2 text-sm text-slate-300">
                {{ ticket.description }}
              </p>
            </div>

            <span
              class="w-fit rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300"
            >
              {{ ticket.statusTitle }}
            </span>
          </div>

          <dl class="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
            <div>
              <dt class="text-slate-500">Department</dt>
              <dd class="mt-1 text-slate-200">{{ ticket.departmentTitle }}</dd>
            </div>
            <div>
              <dt class="text-slate-500">Created</dt>
              <dd class="mt-1 text-slate-200">{{ ticket.createdAtFa }}</dd>
            </div>
            <div>
              <dt class="text-slate-500">Active</dt>
              <dd class="mt-1 text-slate-200">
                {{ ticket.isActive ? "Yes" : "No" }}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  </main>
</template>
