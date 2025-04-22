<template>
  <div>
    <button @click="checkout">Payer</button>
  </div>
</template>

<script lang="ts" setup>
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const checkout = async () => {
  const res = await fetch('http://localhost:4242/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [{ id: 'product_id', quantity: 1 }],
    }),
  })

  const session = await res.json()
  const stripe = await stripePromise
  stripe?.redirectToCheckout({ sessionId: session.id })
}
</script>
