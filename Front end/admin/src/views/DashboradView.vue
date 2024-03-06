<template>
  <div class="header">
    <div class="left">
      <h1>Bảng tin</h1>
    </div>
  </div>

  <!-- Insights -->
  <ul class="insights">
    <li>
      <i class="bx bx-calendar-check"></i>
      <span class="info">
        <h3>{{ formatCurrency(ordersLocal.length) }}</h3>
        <p>Đơn hàng</p>
      </span>
    </li>
    <li>
      <i class="bx bx-clipboard"></i>
      <span class="info">
        <h3>{{ formatCurrency(productsLocal.length) }}</h3>
        <p>Sản phẩm</p>
      </span>
    </li>
    <li>
      <i class="bx bx-user"></i>
      <span class="info">
        <h3>{{ formatCurrency(usersLocal.length) }}</h3>
        <p>Tài khoản</p>
      </span>
    </li>
    <li>
      <i class="bx bx-dollar-circle"></i>
      <span class="info">
        <h3>{{ formatCurrency(totalSales) }}</h3>
        <p>Doanh thu</p>
      </span>
    </li>
  </ul>
  <!-- End of Insights -->

  <div class="bottom-data">
    <div class="orders">
      <div class="header">
        <i class="bx bx-receipt"></i>
        <h3>Đặt hàng gần đây</h3>
        <i class="bx bx-filter"></i>
        <i class="bx bx-search"></i>
      </div>
      <table>
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Ngày đặt hàng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <RecentOrderItem
            v-for="order in ordersRecent"
            :key="order._id"
            :order="order"
          ></RecentOrderItem>
        </tbody>
      </table>
    </div>

    <!-- Reminders -->
    <div class="reminders">
      <div class="header">
        <i class="bx bx-note"></i>
        <h3>Ghi chú</h3>
        <i class="bx bx-filter"></i>
        <i class="bx bx-plus"></i>
      </div>
      <ul class="task-list">
        <li class="completed">
          <div class="task-title">
            <i class="bx bx-check-circle"></i>
            <p>Start Our Meeting</p>
          </div>
          <i class="bx bx-dots-vertical-rounded"></i>
        </li>
        <li class="completed">
          <div class="task-title">
            <i class="bx bx-check-circle"></i>
            <p>Analyse Our Site</p>
          </div>
          <i class="bx bx-dots-vertical-rounded"></i>
        </li>
        <li class="not-completed">
          <div class="task-title">
            <i class="bx bx-x-circle"></i>
          </div>
          <i class="bx bx-dots-vertical-rounded"></i>
        </li>
      </ul>
    </div>

    <!-- End of Reminders-->
  </div>
</template>

<script lang="ts">
import type { ResponseSuccess } from '@/types/auth'
import { OrderStatus, type Order } from '@/types/order'
import type { Product, ProductListResponse } from '@/types/product'
import type { User } from '@/types/user'
import http from '@/utils/http'
import { useQuery } from '@tanstack/vue-query'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { formatCurrency } from '@/utils/utils'
import RecentOrderItem from '@/components/RecentOrderItem.vue'
export default defineComponent({
  name: 'DashboardView',
  components: {
    RecentOrderItem
  },
  setup() {
    const ordersLocal = ref<Order[]>([])
    const productsLocal = ref<Product[]>([])
    const usersLocal = ref<User[]>([])
    const ordersRecent = ref<Order[]>([])
    // Get all orders
    const { data: orders } = useQuery({
      queryKey: ['orders'],
      queryFn: () =>
        http.get('/orders').then((res) => {
          return res.data as ResponseSuccess<Order[]>
        }),
      refetchOnWindowFocus: true
    })
    watch(orders, () => {
      ordersLocal.value = orders.value?.data || []
      // Lấy 3 đơn hàng gần đây nhất để hiển thị ở dashboard
      ordersRecent.value = ordersLocal.value.slice(0, 3)
      console.log(ordersRecent.value)
    })
    // Get all products
    const { data: products } = useQuery({
      queryKey: ['products'],
      queryFn: () =>
        http.get('/products').then((res) => res.data as ResponseSuccess<ProductListResponse>),
      refetchOnWindowFocus: true
    })
    watch(products, () => {
      productsLocal.value = products.value?.data.products || []
    })
    // Get all users
    const { data: users } = useQuery({
      queryKey: ['users'],
      queryFn: () => http.get('/users').then((res) => res.data as ResponseSuccess<User[]>),
      refetchOnWindowFocus: true
    })
    watch(users, () => {
      usersLocal.value = users.value?.data || []
      console.log(usersLocal.value)
    })
    onMounted(() => {
      ordersLocal.value = orders.value?.data || []
      productsLocal.value = products.value?.data.products || []
      usersLocal.value = users.value?.data || []
      ordersRecent.value = ordersLocal.value.slice(0, 3)
    })
    // handle totalsales order completed
    const totalSales = ref(0)
    watch(ordersLocal, () => {
      totalSales.value = ordersLocal.value
        .filter((order) => order.status === OrderStatus.COMPLETED)
        .reduce((acc, cur) => acc + cur.total_price, 0)
    })
    return {
      ordersLocal,
      productsLocal,
      usersLocal,
      formatCurrency,
      totalSales,
      ordersRecent
    }
  }
})
</script>
<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  background: var(--light);
  width: 230px;
  height: 100%;
  z-index: 2000;
  overflow-x: hidden;
  scrollbar-width: none;
  transition: all 0.3s ease;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar.close {
  width: 60px;
}

.sidebar .logo {
  font-size: 24px;
  font-weight: 700;
  height: 56px;
  display: flex;
  align-items: center;
  color: var(--primary);
  z-index: 500;
  padding-bottom: 20px;
  box-sizing: content-box;
}

.sidebar .logo .logo-name span {
  color: var(--dark);
}

.sidebar .logo .bx {
  min-width: 60px;
  display: flex;
  justify-content: center;
  font-size: 2.2rem;
}

.sidebar .side-menu {
  width: 100%;
  margin-top: 48px;
}

.sidebar .side-menu li {
  height: 48px;
  background: transparent;
  margin-left: 6px;
  border-radius: 48px 0 0 48px;
  padding: 4px;
}

.sidebar .side-menu li.active {
  background: var(--grey);
  position: relative;
}

.sidebar .side-menu li.active::before {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: -40px;
  right: 0;
  box-shadow: 20px 20px 0 var(--grey);
  z-index: -1;
}

.sidebar .side-menu li.active::after {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  bottom: -40px;
  right: 0;
  box-shadow: 20px -20px 0 var(--grey);
  z-index: -1;
}

.sidebar .side-menu li a {
  width: 100%;
  height: 100%;
  background: var(--light);
  display: flex;
  align-items: center;
  border-radius: 48px;
  font-size: 16px;
  color: var(--dark);
  white-space: nowrap;
  overflow-x: hidden;
  transition: all 0.3s ease;
}

.sidebar .side-menu li.active a {
  color: var(--success);
}

.sidebar.close .side-menu li a {
  width: calc(48px - (4px * 2));
  transition: all 0.3s ease;
}

.sidebar .side-menu li a .bx {
  min-width: calc(60px - ((4px + 6px) * 2));
  display: flex;
  font-size: 1.6rem;
  justify-content: center;
}

.sidebar .side-menu li a.logout {
  color: var(--danger);
}

.content {
  position: relative;
  width: calc(100% - 230px);
  left: 230px;
  transition: all 0.3s ease;
}

.sidebar.close ~ .content {
  width: calc(100% - 60px);
  left: 60px;
}

.content nav {
  height: 56px;
  background: var(--light);
  padding: 0 24px 0 0;
  display: flex;
  align-items: center;
  grid-gap: 24px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
}

.content nav::before {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: -40px;
  left: 0;
  border-radius: 50%;
  box-shadow: -20px -20px 0 var(--light);
}

.content nav a {
  color: var(--dark);
}

.content nav .bx.bx-menu {
  cursor: pointer;
  color: var(--dark);
}

.content nav form {
  max-width: 400px;
  width: 100%;
  margin-right: auto;
}

.content nav form .form-input {
  display: flex;
  align-items: center;
  height: 36px;
}

.content nav form .form-input input {
  flex-grow: 1;
  padding: 0 16px;
  height: 100%;
  border: none;
  background: var(--grey);
  border-radius: 36px 0 0 36px;
  outline: none;
  width: 100%;
  color: var(--dark);
}

.content nav form .form-input button {
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary);
  color: var(--light);
  font-size: 18px;
  border: none;
  outline: none;
  border-radius: 0 36px 36px 0;
  cursor: pointer;
}

.content nav .notif {
  font-size: 20px;
  position: relative;
}

.content nav .notif .count {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: var(--danger);
  border-radius: 50%;
  color: var(--light);
  border: 2px solid var(--light);
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content nav .profile img {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
}

.content nav .theme-toggle {
  display: block;
  min-width: 50px;
  height: 25px;
  background: var(--grey);
  cursor: pointer;
  position: relative;
  border-radius: 25px;
}

.content nav .theme-toggle::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: calc(25px - 4px);
  background: var(--primary);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.content nav #theme-toggle:checked + .theme-toggle::before {
  left: calc(100% - (25px - 4px) - 2px);
}

.content main {
  width: 100%;
  padding: 36px 24px;
  max-height: calc(100vh - 56px);
}

.content main .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
  flex-wrap: wrap;
}

.content main .header .left h1 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark);
}

.content main .header .left .breadcrumb {
  display: flex;
  align-items: center;
  grid-gap: 16px;
}

.content main .header .left .breadcrumb li {
  color: var(--dark);
}

.content main .header .left .breadcrumb li a {
  color: var(--dark-grey);
  pointer-events: none;
}

.content main .header .left .breadcrumb li a.active {
  color: var(--primary);
  pointer-events: none;
}

.content main .header .report {
  height: 36px;
  padding: 0 16px;
  border-radius: 36px;
  background: var(--primary);
  color: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;
  font-weight: 500;
}

.content main .insights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 24px;
  margin-top: 36px;
}

.content main .insights li {
  padding: 24px;
  background: var(--light);
  border-radius: 20px;
  display: flex;
  align-items: center;
  grid-gap: 24px;
  cursor: pointer;
}

.content main .insights li .bx {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content main .insights li:nth-child(1) .bx {
  background: var(--light-primary);
  color: var(--primary);
}

.content main .insights li:nth-child(2) .bx {
  background: var(--light-warning);
  color: var(--warning);
}

.content main .insights li:nth-child(3) .bx {
  background: var(--light-success);
  color: var(--success);
}

.content main .insights li:nth-child(4) .bx {
  background: var(--light-danger);
  color: var(--danger);
}

.content main .insights li .info h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--dark);
}

.content main .insights li .info p {
  color: var(--dark);
}

.content main .bottom-data {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 24px;
  margin-top: 24px;
  width: 100%;
  color: var(--dark);
}

.content main .bottom-data > div {
  border-radius: 20px;
  background: var(--light);
  padding: 24px;
  overflow-x: auto;
}

.content main .bottom-data .header {
  display: flex;
  align-items: center;
  grid-gap: 16px;
  margin-bottom: 24px;
}

.content main .bottom-data .header h3 {
  margin-right: auto;
  font-size: 24px;
  font-weight: 600;
}

.content main .bottom-data .header .bx {
  cursor: pointer;
}

.content main .bottom-data .orders {
  flex-grow: 1;
  flex-basis: 500px;
}

.content main .bottom-data .orders table {
  width: 100%;
  border-collapse: collapse;
}

.content main .bottom-data .orders table th {
  padding-bottom: 12px;
  font-size: 13px;
  text-align: left;
  border-bottom: 1px solid var(--grey);
}

.content main .bottom-data .orders table td {
  padding: 16px 0;
}

.content main .bottom-data .orders table tr td:first-child {
  display: flex;
  align-items: center;
  grid-gap: 12px;
  padding-left: 6px;
}

.content main .bottom-data .orders table td img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.content main .bottom-data .orders table tbody tr {
  cursor: pointer;
  transition: all 0.3s ease;
}

.content main .bottom-data .orders table tbody tr:hover {
  background: var(--grey);
}

.content main .bottom-data .orders table tr td .status {
  font-size: 10px;
  padding: 6px 16px;
  color: var(--light);
  border-radius: 20px;
  font-weight: 700;
}

.content main .bottom-data .orders table tr td .status.completed {
  background: var(--success);
}

.content main .bottom-data .orders table tr td .status.process {
  background: var(--primary);
}

.content main .bottom-data .orders table tr td .status.pending {
  background: var(--warning);
}

.content main .bottom-data .reminders {
  flex-grow: 1;
  flex-basis: 300px;
}

.content main .bottom-data .reminders .task-list {
  width: 100%;
}

.content main .bottom-data .reminders .task-list li {
  width: 100%;
  margin-bottom: 16px;
  background: var(--grey);
  padding: 14px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content main .bottom-data .reminders .task-list li .task-title {
  display: flex;
  align-items: center;
}

.content main .bottom-data .reminders .task-list li .task-title p {
  margin-left: 6px;
}

.content main .bottom-data .reminders .task-list li .bx {
  cursor: pointer;
}

.content main .bottom-data .reminders .task-list li.completed {
  border-left: 10px solid var(--success);
}

.content main .bottom-data .reminders .task-list li.not-completed {
  border-left: 10px solid var(--danger);
}

.content main .bottom-data .reminders .task-list li:last-child {
  margin-bottom: 0;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .content {
    width: calc(100% - 60px);
    left: 200px;
  }
}

@media screen and (max-width: 576px) {
  .content nav form .form-input input {
    display: none;
  }

  .content nav form .form-input button {
    width: auto;
    height: auto;
    background: transparent;
    color: var(--dark);
    border-radius: none;
  }

  .content nav form.show .form-input input {
    display: block;
    width: 100%;
  }

  .content nav form.show .form-input button {
    width: 36px;
    height: 100%;
    color: var(--light);
    background: var(--danger);
    border-radius: 0 36px 36px 0;
  }

  .content nav form.show ~ .notif,
  .content nav form.show ~ .profile {
    display: none;
  }

  .content main .insights {
    grid-template-columns: 1fr;
  }

  .content main .bottom-data .header {
    min-width: 340px;
  }

  .content main .bottom-data .orders table {
    min-width: 340px;
  }

  .content main .bottom-data .reminders .task-list {
    min-width: 340px;
  }
}
</style>
