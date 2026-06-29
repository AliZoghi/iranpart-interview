<template>
  <div class="flex min-h-screen flex-col">
    <AppNavbar />
    <main class="flex min-h-0 flex-1 flex-col">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
