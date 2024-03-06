<template>
  <HeaderAuthenticationLayoutVue />
  <div class="bg-[rgba(238,77,45)] h-[600px]">
      <div
        class="max-w-screen-lg relative mx-auto bg-[url('img/auth-bg.png')] col-span-3 h-[600px] bg-no-repeat bg-center bg-contain"
      >
        <RouterView />
      </div>
    </div>
  <AppFooterVue />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import HeaderAuthenticationLayoutVue from '@/components/HeaderAuthenticationLayout.vue'
import AppFooterVue from '@/components/AppFooter.vue'

export default defineComponent({
  name: 'AuthenticationLayout',
  components: { HeaderAuthenticationLayoutVue, AppFooterVue, RouterView },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
