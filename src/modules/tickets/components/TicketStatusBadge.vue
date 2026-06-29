<script setup lang="ts">
import { TicketStatus, getTicketStatusLabel } from "../constants/ticket-status";

const props = defineProps<{
  statusId: number;
}>();

const label = computed(() => getTicketStatusLabel(props.statusId));

const dotClass = computed(() => {
  switch (props.statusId) {
    case TicketStatus.AwaitingResponse:
      return "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.55)]";
    case TicketStatus.UnderReview:
      return "bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.55)]";
    case TicketStatus.Answered:
      return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.55)]";
    case TicketStatus.Closed:
      return "bg-zinc-400 shadow-[0_0_8px_rgba(161,161,170,0.55)]";
    default:
      return "bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.5)]";
  }
});

const textClass = computed(() => {
  switch (props.statusId) {
    case TicketStatus.AwaitingResponse:
      return "text-orange-600 dark:text-orange-400";
    case TicketStatus.UnderReview:
      return "text-sky-600 dark:text-sky-400";
    case TicketStatus.Answered:
      return "text-emerald-600 dark:text-emerald-400";
    case TicketStatus.Closed:
      return "text-zinc-500 dark:text-zinc-400";
    default:
      return "text-gray-500 dark:text-gray-400";
  }
});
</script>

<template>
  <div class="flex shrink-0 items-center gap-2 whitespace-nowrap">
    <span class="h-2 w-2 shrink-0 rounded-full" :class="dotClass" />
    <span class="text-[11px] font-black" :class="textClass">
      {{ label }}
    </span>
  </div>
</template>
