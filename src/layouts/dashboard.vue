<template>
  <div class="flex min-h-screen flex-col">
    <AppNavbar />
    <div class="dark flex min-h-0 flex-1 bg-[#050505]" dir="rtl">
      <DashboardSidebar />
      <main class="flex min-h-0 flex-1 flex-col">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>
