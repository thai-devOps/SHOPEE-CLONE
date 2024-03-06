<template>
  <div class="max-w-screen-lg mx-auto my-5 border rounded-sm shadow-md py-6 px-5">
    <div class="flex justify-between items-center">
      <h1 class="font-medium text-3xl">Chỉnh sửa thông tin hồ sơ</h1>
      <button @click="router.push({ name: 'profile' })">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 text-gray-600 hover:text-gray-500 cursor-pointer"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <p class="text-gray-500 mt-3">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
    <hr />
    <!-- create form to update user profile -->
    <form @submit.prevent="onSubmit" class="space-y-6" novalidate>
      <InputField
        :label="'Ảnh đại diện'"
        :error-message="errors.avatar"
        class="mt-4"
        :name="'avatar'"
        :placeholder="'https://example.com'"
        :type="'text'"
        :value="avatar"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <InputField
          :label="'Họ và tên'"
          :error-message="errors.name"
          :name="'name'"
          :placeholder="'Nguyễn Văn A'"
          :type="'text'"
          :value="name"
        />
        <InputField
          :label="'Địa chỉ email'"
          :error-message="errors.email"
          :name="'email'"
          :placeholder="''"
          :is-disabled="true"
          :type="'email'"
          :value="email"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <InputField
          :label="'Ngày sinh'"
          :error-message="errors.date_of_birth"
          :name="'date_of_birth'"
          :type="'date'"
          :value="date_of_birth"
        />

        <div>
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Giới tính</label
          >
          <select
            id="countries"
            name="gender"
            v-bind="gender"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <InputField
          :label="'Số điện thoại'"
          :placeholder="'Nhập số điện thoại của bạn. Ví dụ: 0123456789'"
          :error-message="errors.phone"
          :name="'phone'"
          :type="'tel'"
          :value="phone"
        />
        <InputField
          :label="'Địa chỉ'"
          :error-message="errors.address"
          :name="'address'"
          :placeholder="'Nhập địa chỉ của bạn'"
          :type="'text'"
          :value="address"
        />
      </div>
      <div class="flex items-center justify-end">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Cập nhật hồ sơ
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { defineComponent } from 'vue'
import * as yup from 'yup'
import InputField from '../components/InputField.vue'
import router from '@/router'
import { useMutation } from '@tanstack/vue-query'
import http from '@/utils/http'
import { toast } from 'vue3-toastify'
export default defineComponent({
  name: 'EditProfileView',
  components: {
    InputField
  },
  setup() {
    const { user, setUser } = useAuthStore()
    const editProfileSchema = toTypedSchema(
      yup.object({
        avatar: yup.string().optional(),
        name: yup.string().optional(),
        email: yup.string().required('Email không được đê trống'),
        address: yup.string().optional(),
        gender: yup.string().optional(),
        date_of_birth: yup.string().optional(),
        phone: yup.string().optional()
      })
    )
    const { errors, handleSubmit, defineInputBinds } = useForm({
      validationSchema: editProfileSchema,
      initialValues: {
        avatar: user.avatar ? user.avatar : '',
        name: user.name ? user.name : '',
        email: user.email,
        gender: user.gender ? user.gender : '',
        date_of_birth: user.date_of_birth ? user.date_of_birth : '',
        phone: user.phone ? user.phone : '',
        address: user.address ? user.address : ''
      }
    })
    const updateProfileMutation = useMutation({
      mutationFn: (payload: any) => http.put('/profile', payload)
    })
    const onSubmit = handleSubmit((values) => {
      updateProfileMutation.mutate(values, {
        onSuccess: () => {
          setUser({
            ...user,
            ...values
          })
          setTimeout(() => {
            toast.success('Cập nhật hồ sơ thành công')
          }, 1000)
          router.push({ name: 'profile' })
        },
        onError: () => {
          toast.error('Cập nhật thông tin hồ sơ thất bại')
        }
      })
    })
    const avatar = defineInputBinds('avatar')
    const email = defineInputBinds('email')
    const name = defineInputBinds('name')
    const gender = defineInputBinds('gender')
    const date_of_birth = defineInputBinds('date_of_birth')
    const phone = defineInputBinds('phone')
    const address = defineInputBinds('address')
    return {
      user,
      errors,
      onSubmit,
      email,
      name,
      gender,
      phone,
      date_of_birth,
      address,
      avatar,
      router
    }
  }
})
</script>

<style scoped></style>
