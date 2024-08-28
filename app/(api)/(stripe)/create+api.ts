import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.json()

  const { name, email, amount } = body
  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({ error: 'Please enter a valid email address' }),
      { status: 400 },
    )
  }

  console.log(body)

  let customer

  const existingCustomer = await stripe.customers.list({
    email,
  })
  if (existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0]
  } else {
    const newCustomer = await stripe.customers.create({
      name,
      email,
      address: {
        line1: 'Kohiti Road',
        line2: '',
        postal_code: '44600',
        city: 'Kathmandu',
        state: 'Bagmati',
        country: 'NP',
      },
    })
    customer = newCustomer
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' },
  )
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: 'usd',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
    description: 'Ride Booking',
  })

  return new Response(
    JSON.stringify({
      paymentIntent,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    }),
  )
}
