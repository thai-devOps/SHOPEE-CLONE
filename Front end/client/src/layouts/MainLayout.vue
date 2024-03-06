<template>
  <HeaderMainLayout />
  <RouterView />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import HeaderMainLayout from '@/components/HeaderMainLayout.vue'
import AppFooter from '@/components/AppFooter.vue'
export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderMainLayout,
    RouterView,
    AppFooter
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
