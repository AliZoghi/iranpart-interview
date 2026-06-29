<script setup lang="ts">
import startCase from 'lodash/startCase'
import { useCounterStore } from '~/stores/counter'

const counter = useCounterStore()
const title = startCase('iranpart interview')

const { $api } = useNuxtApp()
const apiStatus = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const sampleTitle = ref('')

async function loadSamplePost() {
  apiStatus.value = 'loading'

  try {
    const { data } = await $api.get<{ title: string }>('/posts/1')
    sampleTitle.value = startCase(data.title)
    apiStatus.value = 'ready'
  } catch {
    apiStatus.value = 'error'
  }
}
</script>

<template>
  <main class="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
    <section class="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <p class="text-sm font-medium uppercase tracking-wide text-cyan-300">Nuxt + TypeScript</p>
        <h1 class="mt-3 text-4xl font-bold">{{ title }}</h1>
        <p class="mt-4 max-w-2xl text-slate-300">
          Starter project with Tailwind CSS, Axios, Pinia, TypeScript, and lodash configured.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p class="text-sm text-slate-400">Pinia counter</p>
          <div class="mt-4 flex items-center gap-3">
            <button
              class="rounded-md bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
              type="button"
              @click="counter.increment()"
            >
              Count {{ counter.count }}
            </button>
            <button
              class="rounded-md border border-slate-700 px-4 py-2 text-slate-200 transition hover:bg-slate-800"
              type="button"
              @click="counter.reset()"
            >
              Reset
            </button>
          </div>
        </div>

        <div class="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p class="text-sm text-slate-400">Axios request</p>
          <button
            class="mt-4 rounded-md bg-white px-4 py-2 font-semibold text-slate-950 transition hover:bg-slate-200"
            type="button"
            @click="loadSamplePost"
          >
            Load sample
          </button>
          <p class="mt-4 min-h-6 text-sm text-slate-300">
            <span v-if="apiStatus === 'loading'">Loading...</span>
            <span v-else-if="apiStatus === 'ready'">{{ sampleTitle }}</span>
            <span v-else-if="apiStatus === 'error'">Request failed</span>
            <span v-else>Idle</span>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
