<template>
  <div>Product detail</div>
</template>

<script lang="ts">
import router from '@/router'
import type { ResponseSuccess } from '@/types/auth'
import type { Product } from '@/types/product'
import http from '@/utils/http'
import { useQuery } from '@tanstack/vue-query'
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'ProductDetailView',
  components: {},
  setup() {
    const id = router.currentRoute.value.params.id
    const { data } = useQuery({
      queryKey: ['produc-detail', id],
      queryFn: () => http.get('/products/' + id),
      enabled: !!id
    })
    return {}
  }
})
</script>
