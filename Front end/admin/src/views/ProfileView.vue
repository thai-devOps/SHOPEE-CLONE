<template>
  <div class="max-w-screen-lg mx-auto my-5 border bg-white rounded-sm shadow-md py-6 px-5">
    <div class="flex justify-between items-center">
      <h1 class="font-medium text-3xl">Hồ sơ của tôi</h1>
      <button @click="router.push('/edit-profile')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 text-yellow-600 hover:text-yellow-500 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    </div>
    <p class="text-gray-500 mt-3">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
    <hr />
    <div class="mt-5 grid grid-cols-12 gap-6">
      <div class="col-span-5 self-center">
        <img
          :src="user.avatar ? user.avatar : '../../public/img/user.png'"
          alt="user-image"
          class="w-60 h-60 rounded-full mx-auto"
        />
      </div>
      <div class="col-span-7 px-10 self-start py-10 space-y-10">
        <!-- name -->
        <div class="font-medium text-xl">
          <span> Họ tên:</span>
          <span class="font-normal text-gray-600">{{
            user.name ? user.name : 'Chưa cập nhật'
          }}</span>
        </div>
        <!-- email -->
        <div class="font-medium text-xl">
          Email: <span class="font-normal text-gray-600">{{ user.email }}</span>
        </div>
        <!-- gender -->
        <div class="font-medium text-xl">
          Giới tính:
          <span class="font-normal text-gray-600">{{
            user.gender ? user.gender : 'Chưa cập nhật'
          }}</span>
        </div>
        <!-- date of birth -->
        <div class="font-medium text-xl">
          Ngày sinh:
          <span class="font-normal text-gray-600">{{
            user.date_of_birth ? formatDate(user.date_of_birth) : 'Chưa cập nhật'
          }}</span>
        </div>
        <!-- phone number -->
        <div class="font-medium text-xl">
          Số điện thoại:
          <span class="font-normal text-gray-600">{{
            user.phone ? user.phone : 'Chưa cập nhật'
          }}</span>
        </div>
        <!-- address -->
        <div class="font-medium text-xl">
          Địa chỉ:
          <span class="font-normal text-gray-600">{{
            user.address ? user.address : 'Chưa cập nhật'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { defineComponent } from 'vue'
import { formatDate } from '@/utils/utils'

export default defineComponent({
  name: 'ProfileView',
  components: {},
  setup() {
    const { user } = useAuthStore()
    return {
      user,
      formatDate,
      router
    }
  }
})
</script>

<style scoped></style>
