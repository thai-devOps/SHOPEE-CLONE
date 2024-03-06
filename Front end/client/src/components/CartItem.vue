<template>
  <div v-if="!isLoading && productLocal" class="bg-white my-3 p-5 grid grid-cols-12 items-center">
    <div class="text-base text-gray-900 col-span-4">
      <img class="w-20 h-20 object-cover rounded-sm" :src="productLocal?.image" alt="" />
    </div>
    <div class="capitalize text-gray-500 col-span-2 mx-auto">
      <span class="line-through">₫ {{ formatCurrency(product.price_before_discount) }}</span>
      <span class="ms-2">₫{{ formatCurrency(product.price / product.buy_count) }}</span>
    </div>
    <div class="capitalize flex items-center text-gray-500 col-span-2 mx-auto">
      <button
        @click="handleChangeBuyCount(buy_count - 1)"
        class="flex w-8 h-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>
      <input
        type="number"
        :min="1"
        :max="productLocal.quantity"
        v-model.number="buy_count"
        class="w-12 h-8 text-center border border-l-0 border-gray-300 text-gray-600"
      />
      <button
        class="flex w-8 h-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600 border-l-0"
        @click="handleChangeBuyCount(buy_count + 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
    <div class="capitalize text-red-600 col-span-2 mx-auto">
      ₫{{ formatCurrency(product.price) }}
    </div>
    <div class="capitalize text-gray-500 col-span-2 mx-auto">
      <button
        type="button"
        @click="hanadlePurchaseItem"
        class="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Mua
      </button>
      <button
        @click="handleDeleteItem"
        type="button"
        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-3"
      >
        Xóa
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import type { ResponseSuccess } from '@/types/auth'
import type { Product } from '@/types/product'
import type { PurchaseType } from '@/types/purchase'
import http from '@/utils/http'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { formatCurrency } from '@/utils/utils'
import router from '@/router'
export default defineComponent({
  name: 'CartItem',
  props: {
    product: {
      type: Object as () => PurchaseType,
      required: true
    }
  },
  setup(props) {
    const productLocal = ref<Product>()
    const buy_count = ref(props.product.buy_count)
    watch(props, () => {
      buy_count.value = props.product.buy_count
    })
    const { data, isLoading } = useQuery({
      queryKey: ['cart-product', props.product.product_id],
      queryFn: () =>
        http
          .get('/products/' + props.product.product_id)
          .then((res) => res.data as ResponseSuccess<Product>),
      enabled: !!props.product.product_id
    })
    const addToCartMutation = useMutation({
      mutationFn: ({ product_id, buy_count }: { product_id: string; buy_count: number }) =>
        http.put('/purchase/update-buy-count', { product_id, buy_count })
    })
    const removeItemFromCartMutation = useMutation({
      mutationFn: ({ product_id }: { product_id: string }) =>
        http.delete('/purchase/remove-from-cart', { data: { product_id } })
    })
    const handleDeleteItem = () => {
      if (productLocal.value) {
        removeItemFromCartMutation.mutate(
          {
            product_id: productLocal.value._id
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(['cart'])
            },
            onError: () => {
              alert('Có lỗi xảy ra')
            }
          }
        )
      }
    }
    const hanadlePurchaseItem = () => {
      router.push({
        name: 'checkout',
        query: {
          purchase_id: props.product._id
        }
      })
    }
    const queryClient = useQueryClient()
    const handleChangeBuyCount = (value: number) => {
      if (productLocal.value) {
        if (value < 1 || value > productLocal.value?.quantity) {
          alert('Số lượng không hợp lệ')
          return
        } else {
          buy_count.value = value
          addToCartMutation.mutate(
            {
              product_id: productLocal.value._id,
              buy_count: value
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['cart'])
              },
              onError: () => {
                alert('Có lỗi xảy ra')
              }
            }
          )
        }
      }
    }
    watch(data, () => {
      console.log(data)
      productLocal.value = data.value?.data || undefined
    })
    onMounted(() => {
      productLocal.value = data.value?.data || undefined
    })
    return {
      productLocal,
      isLoading,
      formatCurrency,
      buy_count,
      handleChangeBuyCount,
      handleDeleteItem,
      hanadlePurchaseItem
    }
  }
})
</script>
<style>
/* Hide the number input spinner arrows */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
