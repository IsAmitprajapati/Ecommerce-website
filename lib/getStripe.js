import {loadStripe} from "@stripe/stripe-js"

let stripePromise ;

const getStripe = ()=>{
    if(!stripePromise){
        // NEXT_PUBIC_STRIPE_PUBLISHABLE_KEY
        stripePromise = loadStripe(`pk_test_51MJSvYSHnOGYGLnPS78BLnFeP1qHTGymrEEhUtODLRom6G9yzAAUvMaawWg2eYAQRKMCaqhA2Ph9SQhq1ZzfdltK00VpdsWsCL`)
    }
    return stripePromise;
}

export default getStripe;