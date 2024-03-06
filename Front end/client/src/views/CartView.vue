<template>
  <div class="bg-gray-100">
    <div class="text-4xl font-medium p-5 bg-white text-shopeeOrange">
      <div class="max-w-screen-xl mx-auto flex items-center justify-start gap-5">
        <div class="w-0.5 h-10 bg-shopeeOrange"></div>
        <span class="self-end">Giỏ Hàng</span>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto p-6">
      <div class="bg-white py-5 px-5 grid shadow grid-cols-12">
        <div class="text-base text-gray-900 col-span-4">Sản phẩm</div>
        <div class="capitalize text-gray-500 col-span-2 text-center">Đơn giá</div>
        <div class="capitalize text-gray-500 col-span-2 text-center">Số lượng</div>
        <div class="capitalize text-gray-500 col-span-2 text-center">Số tiền</div>
        <div class="capitalize text-gray-500 col-span-2 text-center">Thao tác</div>
      </div>
      <div v-if="productInCart.length > 0">
        <CartItem v-for="product in productInCart" :key="product._id" :product="product"></CartItem>
      </div>
      <div v-else class="bg-white mt-5 py-5 px-5 grid place-items-center h-[50vh]">
        <img src="../../public/img/empty_order.png" alt="" />
        <div class="text-center text-gray-500">Không có sản phẩm nào trong giỏ hàng</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import CartItem from '@/components/CartItem.vue'
import { STATUS_PURCHASE, type PurchaseType } from '@/types/purchase'
import { useQuery } from '@tanstack/vue-query'
import http from '@/utils/http'
import type { ResponseSuccess } from '@/types/auth'
export default defineComponent({
  name: 'CartView',
  components: {
    CartItem
  },
  setup() {
    const productInCart = ref<PurchaseType[]>([])
    const { data } = useQuery({
      queryKey: ['cart'],
      queryFn: () => {
        return http.get(`/purchases?status=${STATUS_PURCHASE.IN_CART}`).then((res) => {
          return res.data as ResponseSuccess<PurchaseType[]>
        })
      }
    })
    watch(data, () => {
      productInCart.value = data.value?.data || []
    })
    onMounted(() => {
      productInCart.value = data.value?.data || []
    })
    return {
      productInCart
    }
  }
})
</script>
