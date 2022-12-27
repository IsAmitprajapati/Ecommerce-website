import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

 export const client = sanityClient({
    projectId : 'rahtj8si',
    dataset : 'production',
    apiVersion : '2022-12-23',
    useCdn : true,
    token : process.env.NEXT_PUBIC_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

