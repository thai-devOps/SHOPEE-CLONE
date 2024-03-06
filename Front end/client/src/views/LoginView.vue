<template>
  <div v-if="isLoading">
    <Loading />
  </div>
  <div
    v-else
    class="absolute top-[50%] left-[50%] lg:left-[80%] transform -translate-x-[50%] -translate-y-[50%]"
  >
    <div
      class="w-[350px] md:w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form @submit="onSubmit" class="space-y-6" novalidate>
        <h5 class="text-xl text-center font-medium text-gray-900 dark:text-white">Đăng Nhập</h5>
        <InputField
          :label="'Địa chỉ email'"
          :error-message="errors.email"
          :name="'email'"
          :placeholder="'thai@gmail.com'"
          :type="'text'"
          :value="email"
        />
        <InputField
          :label="'Mật khẩu'"
          :error-message="errors.password"
          :name="'password'"
          :placeholder="'••••••••'"
          :type="'password'"
          :value="password"
        />

        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Ghi nhớ tôi</label
            >
          </div>
          <a href="#" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >Quên mật khẩu?</a
          >
        </div>
        <button
          v-if="isLoading"
          disabled
          type="button"
          class="w-full cursor-wait text-white bg-[#ee4d2d] hover:bg-[rgba(238,77,45,0.8)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
        <button
          v-else
          type="submit"
          class="w-full text-white bg-[#ee4d2d] hover:bg-[rgba(238,77,45,0.8)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng nhập
        </button>

        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Chưa có tài khoản?
          <RouterLink to="/register" class="text-blue-700 hover:underline dark:text-blue-500"
            >Tạo tài khoản</RouterLink
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import InputField from '@/components/InputField.vue'
import { useMutation } from '@tanstack/vue-query'
import type { LoginBody } from '@/types/request'
import http from '@/utils/http'
import { toast } from 'vue3-toastify'
import router from '@/router'
import Loading from '@/components/Loading.vue'
import { isAxiosError } from 'axios'
import type { Auth, ResponseError } from '@/types/auth'
import { useAuthStore } from '@/stores/auth'
export default defineComponent({
  name: 'LoginView',
  components: {
    Loading,
    // eslint-disable-next-line vue/no-unused-components
    InputField
  },
  setup() {
    const authStore = useAuthStore()
    const loginSchema = toTypedSchema(
      yup.object({
        email: yup.string().required('Email không được để trống').email('Email không hợp lệ'),
        password: yup
          .string()
          .required('Mật khẩu không được để trống')
          .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
          .max(20, 'Mật khẩu không được quá 20 ký tự')
      })
    )
    const { isLoading, mutate } = useMutation({
      mutationFn: (payload: LoginBody) => http.post('/sign-in', payload)
    })
    const { errors, handleSubmit, defineInputBinds } = useForm({
      validationSchema: loginSchema
    })
    const onSubmit = handleSubmit((values, { resetForm }) => {
      mutate(values, {
        onSuccess: (res) => {
          const data = res.data as Auth
          resetForm()
          router.push('/')
          authStore.$patch((state) => {
            state.user = data.data.user
            state.isAuthenticated = true
          })
          console.log(authStore.$state)
          setTimeout(() => {
            toast.success('Đăng nhập thành công')
          }, 1000)
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            const data = error.response?.data as ResponseError<{
              message: string
            }>
            if (data) {
              toast.error(data.message)
            }
          }
        }
      })
    })
    const email = defineInputBinds('email')
    const password = defineInputBinds('password')
    return {
      isLoading,
      email,
      password,
      onSubmit,
      errors
    }
  }
})
</script>

<style scoped></style>
