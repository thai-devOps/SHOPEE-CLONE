<template>
  <tr v-if="orderLocal && usersLocal">
    <td>
      <img :src="usersLocal.avatar" />
      <p>{{ usersLocal.name }}</p>
    </td>
    <td>{{ formatISODate(orderLocal.order_date) }}</td>
    <td>
      <button
        v-if="orderLocal.status === 0"
        type="button"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
      >
        Chờ xác nhận
      </button>
      <button
        v-if="orderLocal.status === 1"
        type="button"
        class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
      >
        Đang lấy hàng
      </button>
      <button
        v-if="orderLocal.status === 2"
        type="button"
        class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Vận chuyển
      </button>
      <button
        v-if="orderLocal.status === 3"
        type="button"
        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
         Hoàn thành
      </button>
      <button
        v-if="orderLocal.status === -1"
        type="button"
        class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Đã Hủy
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import type { ResponseSuccess } from '@/types/auth'
import type { User } from '@/types/user'
import http from '@/utils/http'
import { useQuery } from '@tanstack/vue-query'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { formatISODate } from '@/utils/utils'
import type { Order } from '@/types/order'
export default defineComponent({
  name: 'RecentOrderItem',
  props: {
    order: {
      type: Object as () => Order,
      required: true
    }
  },
  setup(props) {
    const orderLocal = ref<Order>(props.order)
    watch(props.order, () => {
      orderLocal.value = props.order
    })
    // get user from order by order.user_id
    const usersLocal = ref<User>()
    const { data: userData } = useQuery({
      queryKey: ['user', orderLocal.value.user_id],
      queryFn: () =>
        http
          .get(`/users/${orderLocal.value.user_id}`)
          .then((res) => res.data as ResponseSuccess<User>)
    })
    watch(userData, () => {
      usersLocal.value = userData.value?.data
    })
    onMounted(() => {
      usersLocal.value = userData.value?.data
    })
    return {
      orderLocal,
      usersLocal,
      formatISODate
    }
  }
})
</script>
