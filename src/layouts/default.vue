<template>
  <div class="flex min-h-screen flex-col">
    <LayoutAppNavbar />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
