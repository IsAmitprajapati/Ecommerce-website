import {loadStripe} from "@stripe/stripe-js"

let stripePromise ;

const getStripe = ()=>{
    if(!stripePromise){
        // NEXT_PUBIC_STRIPE_PUBLISHABLE_KEY
        stripePromise = loadStripe(process.env.NEXT_PUBIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise;
}

export default getStripe;