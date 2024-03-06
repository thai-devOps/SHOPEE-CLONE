<template>
  <div class="mb-5">
    <div class="font-medium text-3xl mb-3">Đơn đặt hàng</div>
  </div>

  <div>
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center">
        <button
          type="button"
          @click="deselectRows"
          class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 mr-2 -ml-1 text-[#626890]"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          Bỏ chọn đơn hàng
        </button>
      </div>
      <div class="flex justify-end">
        <button
          v-if="selectedRows.status === 0"
          @click="handleConfirmOrder(1)"
          type="button"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
        >
          Xác nhận
        </button>
        <button
          v-if="selectedRows.status === 1"
          @click="handleConfirmOrder(2)"
          type="button"
          class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
        >
          Đang lấy hàng
        </button>
        <button
          v-if="selectedRows.status === 2"
          @click="handleConfirmOrder(3)"
          type="button"
          class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Đang vận chuyển
        </button>
        <button
          v-if="selectedRows.status === 3"
          type="button"
          class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Đơn hàng đã hoàn thành
        </button>
        <button
          v-if="selectedRows.status === 0"
          @click="handleConfirmOrder(-1)"
          type="button"
          class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Hủy
        </button>
        <button
          type="button"
          @click="handleDeleteOrder"
          class="text-white bg-gradient-to-br from-red-600 to-red-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 400px"
      :columnDefs="columnDefs.value"
      :rowData="rowData.value"
      :defaultColDef="defaultColDef"
      rowSelection="single"
      animateRows="true"
      :pagination="true"
      :paginationPageSize="7"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
    <div
      v-if="showToastUpdated"
      id="toast-top-right"
      class="fixed flex items-center w-full max-w-xs space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow z-[3000] animate__animated animate__bounceIn top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert"
    >
      <div
        id="toast-default"
        class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"
        >
          <img src="../../public/img/updated.png" alt="" />
          <span class="sr-only">Fire icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">Cập nhật trạng thái thành công!</div>
        <button
          type="button"
          @click="onClickCloseToastUpdated"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-default"
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
    </div>
    <div
      v-if="showToastDelete"
      id="toast-top-right"
      class="fixed flex items-center w-full max-w-xs space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow z-[3000] animate__animated animate__bounceIn top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert"
    >
      <div
        id="toast-default"
        class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"
        >
          <img src="../../public/img/trash.png" alt="" />
          <span class="sr-only">Fire icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">Xóa đơn đặt hàng công!</div>
        <button
          type="button"
          @click="onClickCloseToastDelete"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-default"
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { AgGridVue } from 'ag-grid-vue3' // the AG Grid Vue Component
import { reactive, onMounted, ref } from 'vue'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import http from '@/utils/http'
import type { ResponseSuccess } from '@/types/auth'
import type { Order } from '@/types/order'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify'
export default defineComponent({
  name: 'UsersView',
  components: {
    AgGridVue
  },
  setup() {
    const gridApi = ref(null)
    const showToastUpdated = ref(false)
    const onClickCloseToastUpdated = () => {
      showToastUpdated.value = false
    }
    const showToastDelete = ref(false)
    const onClickCloseToastDelete = () => {
      showToastDelete.value = false
    }
    // Obtain API from grid's onGridReady event
    const onGridReady = (params: any) => {
      gridApi.value = params.api
    }
    const selectedRows = ref<Order>({
      _id: '',
      user_id: '',
      product_id: '',
      buy_count: 0,
      status: 0,
      order_date: '',
      total_price: 0
    })
    const rowData = reactive({
      value: []
    }) // Set rowData to Array of Objects, one Object per Row
    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { field: '_id' },
        { field: 'user_id' },
        { field: 'product_id' },
        { field: 'buy_count' },
        { field: 'payment_method' },
        { field: 'status' },
        { field: 'order_date' },
        { field: 'total_price' }
      ]
    })
    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1
    }
    const queryClient = useQueryClient()
    const updatedOrderStatusMutation = useMutation({
      mutationFn: ({ id, status }: { id: string; status: number }) =>
        http.put(`/orders/${id}`, { status })
    })
    const deleteOrderMutation = useMutation({
      mutationFn: ({ id }: { id: string }) => http.delete(`/orders/${id}`)
    })
    const handleConfirmOrder = (status: number) => {
      if (selectedRows.value._id === '') {
        alert('Vui lòng chọn đơn hàng')
      } else {
        updatedOrderStatusMutation.mutate(
          {
            id: selectedRows.value._id,
            status
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries(['orders'])
              showToastUpdated.value = true
              deselectRows()
              setTimeout(() => {
                showToastUpdated.value = false
              }, 3000)
              http.get('/orders').then((res) => {
                let data = res.data as ResponseSuccess<Order[]>
                // handle data from ISOString -> Date string dd/mm/yyyy
                data.data.forEach((item) => {
                  item.order_date = new Date(item.order_date).toLocaleDateString('vi-VN')
                })
                // handle status from number -> string
                rowData.value = data.data as any
              })
            },
            onError: () => {
              toast.error('Lỗi cập nhật trạng thái đơn hàng')
            }
          }
        )
      }
    }
    const handleDeleteOrder = () => {
      if (selectedRows.value._id === '') {
        alert('Vui lòng chọn đơn hàng cần xóa')
      } else {
        if (confirm('Bạn có chắc muốn xóa đơn hàng này ')) {
          deleteOrderMutation.mutate(
            {
              id: selectedRows.value._id
            },
            {
              onSuccess: () => {
                showToastDelete.value = true
                deselectRows()
                setTimeout(() => {
                  showToastDelete.value = false
                }, 3000)
                http.get('/orders').then((res) => {
                  let data = res.data as ResponseSuccess<Order[]>
                  // handle data from ISOString -> Date string dd/mm/yyyy
                  data.data.forEach((item) => {
                    item.order_date = new Date(item.order_date).toLocaleDateString('vi-VN')
                  })
                  // handle status from number -> string
                  rowData.value = data.data as any
                })
              },
              onError: () => {
                toast.error('Lỗi xóa đơn hàng')
              }
            }
          )
        }
      }
    }
    const ordersLocal = ref<Order[]>([])
    const { data } = useQuery({
      queryKey: ['orders'],
      queryFn: () => {
        return http.get('/orders').then((res) => res.data as ResponseSuccess<Order[]>)
      },
      refetchOnWindowFocus: true
    })
    watch(data, () => {
      ordersLocal.value = data.value?.data || []
      // handle data from ISOString -> Date string dd/mm/yyyy
      ordersLocal.value.forEach((item) => {
        item.order_date = new Date(item.order_date).toLocaleDateString('vi-VN')
      })
      rowData.value = ordersLocal.value as any
    })
    onMounted(() => {
      http.get('/orders').then((res) => {
        let data = res.data as ResponseSuccess<Order[]>
        // handle data from ISOString -> Date string dd/mm/yyyy
        data.data.forEach((item) => {
          item.order_date = new Date(item.order_date).toLocaleDateString('vi-VN')
        })
        // handle status from number -> string
        rowData.value = data.data as any
      })
    })
    // Example load data from server

    const deselectRows = () => {
      ;(gridApi.value as any).deselectAll()
      selectedRows.value = {
        _id: '',
        user_id: '',
        product_id: '',
        buy_count: 0,
        status: 0,
        order_date: '',
        total_price: 0
      }
    }
    const cellWasClicked = (event: any) => {
      // Example of consuming Grid Event
      selectedRows.value = event.data
    }
    return {
      onGridReady,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked,
      selectedRows,
      deselectRows,
      showToastUpdated,
      showToastDelete,
      onClickCloseToastUpdated,
      onClickCloseToastDelete,
      handleConfirmOrder,
      handleDeleteOrder
    }
  }
})
</script>
