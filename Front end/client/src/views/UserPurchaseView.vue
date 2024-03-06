<template>
  <div class="bg-gray-100">
    <div class="text-4xl font-medium p-5 bg-white text-shopeeOrange">
      <div class="max-w-screen-xl mx-auto flex items-center justify-start gap-5">
        <div class="w-0.5 h-10 bg-shopeeOrange"></div>
        <span class="self-end">Đơn mua của bạn</span>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto p-6">
      <div class="bg-white py-5 items-center px-2 flex justify-between">
        <router-link
          :to="{
            name: 'purchases',
            query: {
              type: '0'
            }
          }"
          :class="{
            'text-shopeeOrange font-medium text-xl cursor-pointer': activeType === '0',
            'hover:text-shopeeOrange text-xl cursor-pointer': activeType !== '0'
          }"
          >Chờ xác nhận</router-link
        >
        <router-link
          :to="{
            name: 'purchases',
            query: {
              type: '1'
            }
          }"
          :class="{
            'text-shopeeOrange font-medium text-xl cursor-pointer': activeType === '1',
            'hover:text-shopeeOrange text-xl cursor-pointer': activeType !== '1'
          }"
          >Đang đóng gói</router-link
        >
        <router-link
          :to="{
            name: 'purchases',
            query: {
              type: '2'
            }
          }"
          :class="{
            'text-shopeeOrange font-medium text-xl cursor-pointer': activeType === '2',
            'hover:text-shopeeOrange text-xl cursor-pointer': activeType !== '2'
          }"
          >Đang vận chuyển</router-link
        >
        <router-link
          :to="{
            name: 'purchases',
            query: {
              type: '3'
            }
          }"
          :class="{
            'text-shopeeOrange font-medium text-xl cursor-pointer': activeType === '3',
            'hover:text-shopeeOrange text-xl cursor-pointer': activeType !== '3'
          }"
          >Hoàn thành</router-link
        >
        <router-link
          :to="{
            name: 'purchases',
            query: {
              type: '-1'
            }
          }"
          :class="{
            'text-shopeeOrange font-medium text-xl cursor-pointer': activeType === '-1',
            'hover:text-shopeeOrange text-xl cursor-pointer': activeType !== '-1'
          }"
          >Đã hủy</router-link
        >
      </div>
      <div v-if="!isLoad && orders.length > 0" class="mt-3 py-5">
        <OrderItem v-for="order in orders" :key="order._id" :order="order"></OrderItem>
      </div>
      <div v-else class="mt-5 py-10 shadow grid place-items-center h-[50vh] bg-white px-2">
        <div class="text-base text-gray-500">Danh sách trống</div>
        <img src="../../public/img/empty_order.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { ResponseSuccess } from '@/types/auth'
import http from '@/utils/http'
import { useQuery } from '@tanstack/vue-query'
import { defineComponent, onMounted, ref, watch } from 'vue'
import OrderItem from '../components/OrderItem.vue'
import type { Order } from '@/types/order'
import { useQueryParams } from '@/hook/useQueryParams'
export default defineComponent({
  name: 'UserPurchaseView',
  components: {
    OrderItem
  },
  setup() {
    const tempParams = useQueryParams()
    const queryParams = ref(tempParams.value)
    watch(tempParams, () => {
      queryParams.value = tempParams.value
      console.log(queryParams.value)
    })
    const activeType = ref((queryParams.value.type as string) || '0')
    watch(queryParams, () => {
      activeType.value = queryParams.value.type as string
    })
    const { data, isLoading } = useQuery({
      queryKey: ['orders-user', queryParams],
      queryFn: () =>
        http
          .get(`/orders-user?status=${activeType.value}`)
          .then((res) => res.data as ResponseSuccess<Order[]>),
      enabled: activeType.value !== undefined,
      refetchOnWindowFocus: true
    })
    const orders = ref<Order[]>([])
    watch(data, () => {
      orders.value = data.value?.data || []
      console.log(orders.value)
    })
    onMounted(() => {
      orders.value = data.value?.data || []
    })
    return {
      activeType,
      orders,
      isLoad: isLoading
    }
  }
})
</script>
