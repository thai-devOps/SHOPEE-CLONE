<template>
  <div class="mb-5">
    <div class="font-medium text-3xl mb-3">Sản phẩm</div>
  </div>
  <div class="flex items-center mr-4 mb-6">
    <input
      id="purple-checkbox"
      type="checkbox"
      v-model="checkCategory"
      class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label for="purple-checkbox" class="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300"
      >Quản lý danh mục sản phẩm</label
    >
  </div>

  <div v-if="!checkCategory">
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
  
          Bỏ chọn sản phẩm
        </button>
      </div>
      <div class="flex justify-end">
        <button
          :disabled="selectedRows._id !== ''"
          @click="setShowForm"
          type="button"
          :class="
            selectedRows._id !== ''
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
          @click="handleEditProduct"
          type="button"
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
          @click="handleDeleteProduct"
          type="button"
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
      style="height: 310px"
      :columnDefs="columnDefs.value"
      :rowData="rowData.value"
      :defaultColDef="defaultColDef"
      rowSelection="single"
      animateRows="true"
      :pagination="true"
      :paginationPageSize="5"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
    <fwb-toast
      v-if="showToastDelete"
      class="fixed animate__animated animate__tada font-mono top-8 border shadow-md right-5 z-[5000]"
      divide
      closable
      type="success"
    >
      Xóa sản phẩm thành công
    </fwb-toast>
    <form-modal
      :is-open="isShowForm"
      @onSubmitFormProduct="submitForm"
      @onClickClose="handleCloseForm"
      :product="selectedRows"
    />
  </div>
  <div v-else>
    <category-data />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AgGridVue } from 'ag-grid-vue3' // the AG Grid Vue Component
import { reactive, onMounted, ref } from 'vue'
import { FwbToast } from 'flowbite-vue'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import http from '@/utils/http'
import { useMutation } from '@tanstack/vue-query'
import type { ResponseSuccess } from '@/types/auth'
import { type Product, type ProductForm, type ProductListResponse } from '@/types/product'
import FormModal from '@/components/FormModal.vue'
import { toast } from 'vue3-toastify'
import CategoryData from '@/components/CategoryData.vue'
export default defineComponent({
  name: 'ProductsView',
  components: {
    AgGridVue,
    FormModal,
    FwbToast,
    CategoryData
  },
  setup() {
    const gridApi = ref(null)
    const isShowForm = ref(false)
    const showToastDelete = ref(false)
    const checkCategory = ref(false)
    const setShowForm = () => {
      isShowForm.value = !isShowForm.value
    }
    const handleCloseForm = (value: any) => {
      isShowForm.value = value
      deselectRows()
    }
    // Obtain API from grid's onGridReady event
    const onGridReady = (params: any) => {
      gridApi.value = params.api
    }
    const { mutate: addProduct } = useMutation((data: ProductForm) => http.post('/products', data))
    const selectedRows = ref<Product>({
      _id: '',
      name: '',
      image: '',
      images: [],
      price: 0,
      quantity: 0,
      category: {
        _id: '',
        name: ''
      },
      price_before_discount: 0,
      updatedAt: '',
      rating: 0,
      sold: 0,
      view: 0,
      createdAt: ''
    })
    const rowData = reactive({
      value: []
    }) // Set rowData to Array of Objects, one Object per Row
    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { field: '_id' },
        { field: 'name' },
        { field: 'image' },
        { field: 'images' },
        { field: 'price' },
        { field: 'quantity' },
        { field: 'category.name' },
        { field: 'rating' },
        { field: 'sold' },
        { field: 'view' }
      ]
    })
    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1
    }

    // Example load data from server
    onMounted(() => {
      http.get('/products').then((res) => {
        const data = res.data as ResponseSuccess<ProductListResponse>
        rowData.value = data.data.products as any
      })
    })

    const handleEditProduct = () => {
      if (selectedRows.value._id !== '') {
        setShowForm()
      } else alert('Vui lòng chọn sản phẩm cần cập nhật')
    }
    const deselectRows = () => {
      ;(gridApi.value as any).deselectAll()
      selectedRows.value = {
        _id: '',
        name: '',
        image: '',
        images: [],
        price: 0,
        quantity: 0,
        category: {
          _id: '',
          name: ''
        },
        price_before_discount: 0,
        updatedAt: '',
        rating: 0,
        sold: 0,
        view: 0,
        createdAt: ''
      }
    }
    const cellWasClicked = (event: any) => {
      // Example of consuming Grid Event
      selectedRows.value = event.data
    }
    const { mutate: deleteProduct } = useMutation((id: string) => http.delete(`/products/${id}`))
    const handleDeleteProduct = () => {
      if (selectedRows.value._id !== '') {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
          deleteProduct(selectedRows.value._id, {
            onSuccess: () => {
              // Update data in table
              http.get('/products').then((res) => {
                const data = res.data as ResponseSuccess<ProductListResponse>
                rowData.value = data.data.products as any
              })
              deselectRows()
              showToastDelete.value = true
              setTimeout(() => {
                showToastDelete.value = false
              }, 3000)
            },
            onError: () => {
              toast.error('Xóa sản phẩm thất bại')
            }
          })
        }
      } else alert('Vui lòng chọn sản phẩm cần xóa')
    }
    const submitForm = (value: Product) => {
      if (value._id !== '') {
        const product: Product = {
          _id: value._id,
          name: value.name,
          image: value.image,
          images: value.images,
          price: value.price,
          quantity: value.quantity,
          category: {
            _id: value.category._id,
            name: value.category.name
          },
          price_before_discount: value.price_before_discount,
          updatedAt: value.updatedAt,
          rating: value.rating,
          sold: value.sold,
          view: value.view,
          createdAt: value.createdAt
        }
        http.put(`/products/${value._id}`, product).then(() => {
          setShowForm()
          // Update data in table
          http.get('/products').then((res) => {
            const data = res.data as ResponseSuccess<ProductListResponse>
            rowData.value = data.data.products as any
          })
          deselectRows()
          toast.success('Cập nhật sản phẩm thành công')
        })
      } else {
        const product: ProductForm = {
          name: value.name,
          image: value.image,
          rating: value.rating,
          sold: value.sold,
          view: value.view,
          images: value.images,
          price: value.price,
          quantity: value.quantity,
          category: value.category._id,
          price_before_discount: value.price_before_discount
        }
        addProduct(product, {
          onSuccess: () => {
            setShowForm()
            // Update data in table
            http.get('/products').then((res) => {
              const data = res.data as ResponseSuccess<ProductListResponse>
              rowData.value = data.data.products as any
            })
            deselectRows()
            toast.success('Thêm sản phẩm thành công')
          },
          onError: () => {
            toast.error('Thêm sản phẩm thất bại')
          }
        })
      }
    }
    return {
      onGridReady,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked,
      isShowForm,
      setShowForm,
      handleCloseForm,
      selectedRows,
      deselectRows,
      handleEditProduct,
      handleDeleteProduct,
      submitForm,
      showToastDelete,
      checkCategory
    }
  }
})
</script>
