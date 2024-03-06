<template>
  <div class="mb-5">
    <div class="font-medium text-3xl mb-3">Tài khoản</div>
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

          Bỏ chọn tài khoản
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
      v-if="showToastCreate"
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
          <img src="../../public/img/create.png" alt="" />
          <span class="sr-only">Fire icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">Tạo tài khoản thành công!</div>
        <button
          type="button"
          @click="onClickCloseToastCreate"
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
        <div class="ms-3 text-sm font-normal">Cập nhật thành công!</div>
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
        <div class="ms-3 text-sm font-normal">Xóa tài khoản thành công!</div>
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
    <FormAccountVue
      :is-open="isShowForm"
      :account="selectedRows"
      @onClickClose="handleCloseForm"
      @onSubmitAccount="submitForm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AgGridVue } from 'ag-grid-vue3' // the AG Grid Vue Component
import { reactive, onMounted, ref } from 'vue'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import http from '@/utils/http'
import { useMutation } from '@tanstack/vue-query'
import type { ResponseSuccess } from '@/types/auth'
import { toast } from 'vue3-toastify'
import type { User } from '@/types/user'
import FormAccountVue from '@/components/FormAccount.vue'
import type { UpdateAccountForm } from '@/types/user'
export default defineComponent({
  name: 'UsersView',
  components: {
    AgGridVue,
    FormAccountVue
  },
  setup() {
    const gridApi = ref(null)
    const isShowForm = ref(false)
    const showToastCreate = ref(false)
    const onClickCloseToastCreate = () => {
      showToastCreate.value = false
    }
    const showToastUpdated = ref(false)
    const onClickCloseToastUpdated = () => {
      showToastUpdated.value = false
    }
    const showToastDelete = ref(false)
    const onClickCloseToastDelete = () => {
      showToastDelete.value = false
    }
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
    const { mutate: createAccount } = useMutation((data: User) =>
      http.post('/create-account', data)
    )
    const selectedRows = ref<User>({
      _id: '',
      name: '',
      email: '',
      address: '',
      avatar: '',
      phone: '',
      role: 'user',
      gender: 'Nam',
      date_of_birth: '',
      password: '',
      createdAt: '',
      updatedAt: ''
    })
    const rowData = reactive({
      value: []
    }) // Set rowData to Array of Objects, one Object per Row
    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { field: 'name' },
        { field: 'email' },
        { field: 'avatar' },
        { field: 'gender' },
        { field: 'date_of_birth' },
        { field: 'role' },
        { field: 'phone' },
        { field: 'address' }
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
      http.get('/users').then((res) => {
        const data = res.data as ResponseSuccess<User[]>
        rowData.value = data.data as any
      })
    })

    const handleEditProduct = () => {
      if (selectedRows.value._id !== '') {
        setShowForm()
      } else alert('Vui lòng chọn tài khoản cần cập nhật')
    }
    const deselectRows = () => {
      ;(gridApi.value as any).deselectAll()
      selectedRows.value = {
        _id: '',
        name: '',
        email: '',
        address: '',
        avatar: '',
        phone: '',
        role: 'user',
        gender: 'Nam',
        date_of_birth: '',
        password: '',
        createdAt: '',
        updatedAt: ''
      }
    }
    const cellWasClicked = (event: any) => {
      // Example of consuming Grid Event
      selectedRows.value = event.data
    }
    const { mutate: deleteAccount } = useMutation({
      mutationFn: (id: string) => http.delete(`/delete-account/${id}`)
    })
    const handleDeleteProduct = () => {
      if (selectedRows.value._id !== '') {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
          deleteAccount(selectedRows.value._id, {
            onSuccess: () => {
              // Update data in table
              http.get('/users').then((res) => {
                const data = res.data as ResponseSuccess<User[]>
                rowData.value = data.data as any
              })
              deselectRows()
              showToastDelete.value = true
              setTimeout(() => {
                showToastDelete.value = false
              }, 3000)
            },
            onError: () => {
              toast.error('Xóa tài khoản thất bại')
            }
          })
        }
      } else alert('Vui lòng chọn tài khoản cần xóa')
    }
    const updateAccountMutation = useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateAccountForm }) =>
        http.put(`/update-account/${id}`, data)
    })
    const submitForm = (value: User) => {
      if (value._id !== '') {
        const user: UpdateAccountForm = {
          name: value.name,
          email: value.email,
          address: value.address,
          avatar: value.avatar,
          phone: value.phone,
          createdAt: value.createdAt,
          date_of_birth: value.date_of_birth,
          gender: value.gender,
          role: value.role
        }
        updateAccountMutation.mutate(
          {
            id: value._id,
            data: user
          },
          {
            onSuccess: () => {
              setShowForm()
              // Update data in table
              showToastUpdated.value = true
              setTimeout(() => {
                showToastUpdated.value = false
              }, 3000)
              http.get('/users').then((res) => {
                const data = res.data as ResponseSuccess<User[]>
                rowData.value = data.data as any
              })
              deselectRows()
            },
            onError: () => {
              toast.error('Cập nhật tài khoản thất bại')
            }
          }
        )
      } else {
        const user: User = {
          _id: value._id,
          name: value.name,
          email: value.email,
          address: value.address,
          avatar: value.avatar,
          phone: value.phone,
          date_of_birth: value.date_of_birth,
          gender: value.gender,
          password: value.password,
          role: value.role
        }
        createAccount(user, {
          onSuccess: () => {
            setShowForm()
            showToastCreate.value = true
            setTimeout(() => {
              showToastCreate.value = false
            }, 3000)
            // Update data in table
            http.get('/users').then((res) => {
              const data = res.data as ResponseSuccess<User[]>
              rowData.value = data.data as any
            })
            deselectRows()
          },
          onError: () => {
            toast.error('Thêm tài khoản thất bại')
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
      showToastCreate,
      showToastUpdated,
      showToastDelete,
      onClickCloseToastCreate,
      onClickCloseToastUpdated,
      onClickCloseToastDelete
    }
  }
})
</script>
