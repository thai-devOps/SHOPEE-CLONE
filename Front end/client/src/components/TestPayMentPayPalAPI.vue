<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import { defineComponent } from 'vue'
import { loadScript } from '@paypal/paypal-js'
import type { PurchaseType } from '@/types/purchase'

export default defineComponent({
  name: 'TestPayMentPayPalAPI',
  props: {
    amount: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    // Change to your CLIENT ID gotten from the developer dashboard
    const CLIENT_ID =
      'AdCHi7mZoynuuEHDbKJ5C7ftYCJ9qkUp7lhHjsmmY_hb4FYgLLu3Uhjh4J9wgKdMOytjXpoqxRWwrRtZ'

    const paid = ref(false)

    onBeforeMount(function () {
      loadScript({ clientId: CLIENT_ID }).then((paypal) => {
        paypal
          .Buttons({
            createOrder: createOrder,
            onApprove: onApprove
          })
          .render('#paypal-button-container')
      })
    })

    function createOrder(data: any, actions: any) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: props.amount
            }
          }
        ]
      })
    }

    function onApprove(data: any, actions: any) {
      console.log('Order approved...')
      return actions.order.capture().then(() => {
        paid.value = true
        emit('onSuccessPaymentPaypal', paid.value)
      })
    }
    return {
      paid
    }
  }
})
</script>

<template>
  <div v-if="!paid" id="paypal-button-container"></div>
  <div v-else id="confirmation">Order complete!</div>
</template>

<style>
#paypal-button-container {
  width: 100%;
  margin: 30px 0;
}

#confirmation {
  color: green;
  margin-top: 1em;
  font-size: 2em;
}
</style>
