<template>
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

        Bỏ chọn danh mục
      </button>
    </div>
    <div class="flex justify-end">
      <button
        :disabled="selectedRow._id !== ''"
        @click="handleClickAdd"
        type="button"
        :class="
          selectedRow._id !== ''
            ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 cursor-not-allowed'
            : 'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <button
        type="button"
        @click="handleClickEdit"
        class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
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
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      <button
        type="button"
        @click="handleClickDelete"
        class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
    style="height: 309px"
    :columnDefs="columnDefs.value"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
    rowSelection="single"
    :pagination="true"
    :paginationPageSize="5"
    animateRows="true"
    @cell-clicked="cellWasClicked"
    @grid-ready="onGridReady"
  >
  </ag-grid-vue>
</template>

<script lang="ts">
import { AgGridVue } from 'ag-grid-vue3' // the AG Grid Vue Component
import { reactive, onMounted, ref } from 'vue'

import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { defineComponent } from 'vue'
import http from '@/utils/http'
import type { ResponseSuccess } from '@/types/auth'
import type { Category } from '@/types/product'
import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify'

export default defineComponent({
  name: 'CategoryData',
  components: { AgGridVue },
  setup() {
    const gridApi = ref(null) // Optional - for accessing Grid's API
    const selectedRow = ref<Category>({
      _id: '',
      name: ''
    })
    const isShowForm = ref(false)
    const setShowForm = () => {
      isShowForm.value = !isShowForm.value
    }
    // Obtain API from grid's onGridReady event
    const onGridReady = (params: any) => {
      gridApi.value = params.api
    }

    const rowData = reactive({
      value: []
    }) // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [{ field: '_id' }, { field: 'name' }]
    })

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1
    }
    const cellWasClicked = (event: any) => {
      selectedRow.value = event.data
    }
    const deselectRows = () => {
      ;(gridApi.value as any).deselectAll()
      selectedRow.value = {
        _id: '',
        name: ''
      }
    }
    const { mutate: addCategory } = useMutation({
      mutationFn: (name: string) => http.post('/categories', { name })
    })
    const handleClickAdd = () => {
      const name = prompt('Nhập tên danh mục')
      if (name) {
        addCategory(name, {
          onSuccess: () => {
            toast.success('Thêm danh mục thành công')
            // Update data in table
            http.get('/categories').then((res) => {
              const data = res.data as ResponseSuccess<Category[]>
              rowData.value = data.data as any
            })
            deselectRows()
          },
          onError: () => {
            toast.error('Thêm danh mục thất bại')
          }
        })
      }
    }
    const deleteCategoryMutation = useMutation({
      mutationFn: (id: string) => http.delete(`/categories/${id}`)
    })
    const handleClickDelete = () => {
      if (selectedRow.value._id !== '') {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
          deleteCategoryMutation.mutate(selectedRow.value._id, {
            onSuccess: () => {
              toast.success('Xóa sản phẩm thành công')
              // Update data in table
              http.get('/categories').then((res) => {
                const data = res.data as ResponseSuccess<Category[]>
                rowData.value = data.data as any
              })
              deselectRows()
            },
            onError: () => {
              toast.error('Xóa sản phẩm thất bại')
            }
          })
        }
      } else alert('Vui lòng chọn sản phẩm cần xóa')
    }
    const handleClickEdit = () => {
      if (selectedRow.value._id !== '') {
        const name = prompt('Nhập tên danh mục', selectedRow.value.name)
        if (name) {
          http
            .put(`/categories/${selectedRow.value._id}`, { name })
            .then(() => {
              toast.success('Sửa danh mục thành công')
              // Update data in table
              http.get('/categories').then((res) => {
                const data = res.data as ResponseSuccess<Category[]>
                rowData.value = data.data as any
              })
              deselectRows()
            })
            .catch((err) => {
              toast.error('Sửa danh mục thất bại')
            })
        }
      }
    }
    // Example load data from server
    onMounted(() => {
      http.get('/categories').then((res) => {
        const data = res.data as ResponseSuccess<Category[]>
        rowData.value = data.data as any
      })
    })

    return {
      onGridReady,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked,
      deselectRows,
      selectedRow,
      handleClickAdd,
      handleClickDelete,
      handleClickEdit,
      isShowForm,
      setShowForm
    }
  }
})
</script>
