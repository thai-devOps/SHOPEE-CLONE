<template>
  <div
    id="toast-top-right"
    v-if="showToast"
    class="fixed flex animate__animated animate__bounceIn items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
    role="alert"
  >
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
    >
      <img src="../../public/img/cancel.png" alt="" />
      <span class="sr-only">Check icon</span>
    </div>
    <div class="ms-3 text-base font-normal">Đã hủy đơn đặt hàng.</div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-success"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </div>
  <div v-if="productLocal && orderLocal" class="my-3 bg-white shadow px-5">
    <div class="p-3 text-gray-700 text-lg flex justify-between items-center">
      <div>
        Mã đơn hàng: <span class="font-bold">{{ orderLocal._id }}</span>
      </div>
      <div
        v-if="orderLocal.payment_method === 'Paypal' || orderLocal.status === 3"
        class="text-base italic font-bold text-blue-600"
      >
        Đã thanh toán
      </div>
      <div v-else-if="orderLocal.status !== -1" class="text-base font-bold italic text-blue-600">
        Chưa thanh toán
      </div>
    </div>
    <hr />
    <div class="py-5 grid grid-cols-12 items-start">
      <div class="col-span-2 ms-5">
        <img :src="productLocal.image" class="w-28 h-28 object-cover" alt="" />
      </div>
      <div class="col-span-3 truncate self-center">
        {{ productLocal.name }}
      </div>
      <div class="col-span-2 text-center self-center">
        Số lượng: <span>{{ orderLocal.buy_count }}</span>
      </div>
      <div class="col-span-2 text-center self-center">
        Đơn giá: <span>₫{{ formatCurrency(productLocal.price) }}</span>
      </div>
      <div class="col-span-2 text-center self-center">
        Tổng: <span>₫{{ formatCurrency(orderLocal.total_price) }}</span>
      </div>
    </div>
    <hr />
    <div class="p-3 text-gray-700 flex justify-end text-lg items-center">
      <div v-if="orderLocal.status === 0" class="flex justify-center gap-5 items-center">
        <button
          type="button"
          @click="handleCancelOrder(orderLocal._id)"
          class="px-5 py-2.5 text-sm font-medium text-white bg-shopeeOrange hover:bg-shopeeOrange focus:ring-4 focus:outline-none focus:ring-shobg-shopeeOrange rounded-lg text-center dark:bg-shopeeOrange dark:hover:bg-shopeeOrange dark:focus:ring-blue-800"
        >
          Hủy đơn hàng
        </button>
      </div>
      <div v-else-if="orderLocal.status === 3" class="flex justify-center gap-5 items-center">
        <button
          type="button"
          class="px-5 py-2.5 text-sm font-medium text-white bg-shopeeOrange hover:bg-shopeeOrange focus:ring-4 focus:outline-none focus:ring-shobg-shopeeOrange rounded-lg text-center dark:bg-shopeeOrange dark:hover:bg-shopeeOrange dark:focus:ring-blue-800"
        >
          Hoàn thành
        </button>
      </div>
      <div v-else-if="orderLocal.status === -1" class="flex justify-center gap-5 items-center">
        <button
          type="button"
          @click="handleDeleteOrder(orderLocal._id)"
          class="px-5 py-2.5 text-sm font-medium text-white bg-shopeeOrange hover:bg-shopeeOrange focus:ring-4 focus:outline-none focus:ring-shobg-shopeeOrange rounded-lg text-center dark:bg-shopeeOrange dark:hover:bg-shopeeOrange dark:focus:ring-blue-800"
        >
          Xóa đơn đặt hàng
        </button>
      </div>
      <div v-else>
        <button
          type="button"
          class="px-5 py-2.5 text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-shobg-gray-600 rounded-lg text-center dark:bg-gray-600 dark:hover:bg-gray-600 dark:focus:ring-blue-800 cursor-not-allowed"
        >
          Hủy đơn hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import type { Order } from '@/types/order'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import http from '@/utils/http'
import type { ResponseSuccess } from '@/types/auth'
import type { Product } from '@/types/product'
import { formatCurrency } from '@/utils/utils'
import { toast } from 'vue3-toastify'
export default defineComponent({
  name: 'OrderItem',
  props: {
    order: {
      type: Object as () => Order,
      required: true
    }
  },
  components: {},
  setup(props) {
    const orderLocal = ref<Order>(props.order)
    const productLocal = ref<Product>()
    const showToast = ref(false)
    watch(props.order, () => {
      orderLocal.value = props.order
    })
    const { mutate: cancelOrder } = useMutation({
      mutationFn: (orderId: string) => {
        return http.put(`/orders/${orderId}`, { status: -1 })
      }
    })
    const { mutate: deleteOrder } = useMutation({
      mutationFn: (orderId: string) => {
        return http.delete(`/orders/${orderId}`)
      }
    })
    const handleDeleteOrder = (orderId: string) => {
      deleteOrder(orderId, {
        onSuccess: async () => {
          showToast.value = true
          await queryClient.invalidateQueries(['orders-user'])
        },
        onError: () => {
          toast.error('Xóa đơn hàng thất bại')
        }
      })
    }
    const queryClient = useQueryClient()
    const handleCancelOrder = (orderId: string) => {
      cancelOrder(orderId, {
        onSuccess: () => {
          showToast.value = true
          setTimeout(() => {
            showToast.value = false
            queryClient.invalidateQueries(['orders-user'])
          }, 1000)
        },
        onError: () => {
          toast.error('Hủy đơn hàng thất bại')
        }
      })
    }
    const { data: productData, isLoading: productLoading } = useQuery({
      queryKey: ['product-purchase', props.order.product_id],
      queryFn: () =>
        http
          .get('/products/' + props.order.product_id)
          .then((res) => res.data as ResponseSuccess<Product>)
    })
    watch(productData, () => {
      productLocal.value = productData.value?.data
    })
    onMounted(() => {
      productLocal.value = productData.value?.data
    })
    return {
      orderLocal,
      productLocal,
      productLoading,
      showToast,
      formatCurrency,
      handleCancelOrder,
      handleDeleteOrder
    }
  }
})
</script>
