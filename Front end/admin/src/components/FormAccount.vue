<template>
  <!-- Main modal -->
  <div
    v-if="isOpen"
    id="authentication-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-[2000] flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50"
  >
    <div class="relative w-full overflow-y-auto max-w-3xl max-h-[600px]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          @click="handleCloseForm"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal"
        >
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
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3
            v-if="!accountLocal._id"
            class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
          >
            Thêm tài khoản
          </h3>
          <h3 v-else class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Cập nhật tài khoản
          </h3>
          <Form @submit="onSubmit" :validation-schema="schemaAccount">
            <div class="mb-3">
              <label
                for="avatar"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ảnh đại diện</label
              >
              <Field
                id="avatar"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="avatar"
                placeholder="https://example.com"
                v-model="accountLocal.avatar"
              />
              <ErrorMessage
                name="avatar"
                class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
              />
            </div>
            <div class="grid grid-cols-12 gap-3 mb-3">
              <div class="col-span-6 sm:col-span-6 lg:col-span-6">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Họ tên</label
                >
                <Field
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  name="name"
                  v-model="accountLocal.name"
                />
                <ErrorMessage
                  name="name"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-6">
                <label
                  for="date_of_birth"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Ngày sinh</label
                >
                <Field
                  id="date_of_birth"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  name="date_of_birth"
                  placeholder="0123456789"
                  v-model="accountLocal.date_of_birth"
                />
                <ErrorMessage
                  name="date_of_birth"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-12 gap-3 mb-3">
              <div class="col-span-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Địa chỉ email</label
                >
                <Field
                  name="email"
                  id="email"
                  :disabled="accountLocal._id"
                  :class="
                    accountLocal._id
                      ? 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                      : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 animate__animated animate__bounceIn'
                  "
                  type="email"
                  placeholder="nva@example.com"
                  v-model="accountLocal.email"
                />
                <ErrorMessage
                  name="email"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
              <div class="col-span-4">
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Số điện thoại</label
                >
                <Field
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="phone"
                  placeholder="0123456789"
                  v-model="accountLocal.phone"
                />
                <ErrorMessage
                  name="phone"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="gender"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Giới tính</label
                >
                <Field
                  id="gender"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="gender"
                  as="select"
                  v-model="accountLocal.gender"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-12 gap-3 mb-3">
              <div class="col-span-6 sm:col-span-6 lg:col-span-6">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mật khẩu</label
                >
                <Field
                  id="password"
                  :disabled="accountLocal._id"
                  :class="
                    accountLocal._id
                      ? 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                      : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 animate__animated animate__bounceIn'
                  "
                  type="password"
                  placeholder="********"
                  name="password"
                  v-model="accountLocal.password"
                />
                <ErrorMessage
                  name="password"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-6">
                <label
                  for="role"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Cấp quyển tài khoản</label
                >
                <Field
                  id="role"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  as="select"
                  name="role"
                  v-model="accountLocal.role"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Field>
                <ErrorMessage
                  name="role"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-12 gap-3 mb-3">
              <div class="col-span-6 sm:col-span-6 lg:col-span-12">
                <label
                  for="address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Địa chỉ</label
                >
                <Field
                  id="address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="address"
                  placeholder="Số nhà, đường, phường, quận, thành phố"
                  v-model="accountLocal.address"
                />
                <ErrorMessage
                  name="address"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-12 gap-3 mb-3">
              <div class="col-span-6 sm:col-span-6 lg:col-span-4"></div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-4"></div>
            </div>
            <div class="flex justify-end mt-">
              <button
                type="submit"
                v-if="!accountLocal._id"
                class="inline-flex justify-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
              >
                Thêm
              </button>
              <button
                v-else
                type="submit"
                class="inline-flex justify-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
              >
                Cập nhật
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { ErrorMessage, Field, Form, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import type { User } from '@/types/user'
export default defineComponent({
  name: 'FormAccount',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field, ErrorMessage },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    account: {
      type: Object as () => User,
      required: true
    }
  },
  setup(props, { emit }) {
    const accountLocal = ref(props.account)
    watch(
      () => props.account,
      (newVal) => {
        accountLocal.value = newVal
      }
    )
    const schemaAccount = yup.object({
      name: yup.string().optional(),
      email: yup
        .string()
        .email('Vui lòng nhập đúng định dạng email')
        .required('Vui lòng nhập email'),
      password: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Vui lòng nhập mật khẩu'),
      role: yup.string().required('Vui lòng chọn cấp quyền tài khoản'),
      address: yup.string().optional(),
      gender: yup.string().optional(),
      date_of_birth: yup.string().optional(),
      phone: yup.string().optional(),
      avatar: yup.string().optional()
    })
    const { errors, resetForm } = useForm({
      validationSchema: toTypedSchema(schemaAccount)
    })
    const handleCloseForm = () => {
      resetForm()
      emit('onClickClose', false)
    }
    function onSubmit() {
      emit('onSubmitAccount', accountLocal.value)
    }
    return {
      errors,
      handleCloseForm,
      onSubmit,
      accountLocal,
      schemaAccount
    }
  }
})
</script>
