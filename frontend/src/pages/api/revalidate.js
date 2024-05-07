/**
 * This code is responsible for revalidating the cache when a post or author is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Trigger on: "Create", "Update", and "Delete"
 * 5. Filter:  add your document type ie _type == "article"
 * 6. Projection: Leave empty
 * 7. HTTP method: POST
 * 8. API version: v2021-03-25
 * 9. Include drafts: No
 * 10. HTTP Headers: Leave empty
 * 11. Secret: Set to the same value as SANITY_WEBHOOK_SECRET (create a random one if you haven't)
 * 12. Save the cofiguration
 * 13. Add the secret to Vercel: `npx vercel env add SANITY_WEBHOOK_SECRET`
 * 14. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

//import { createClient } from 'next-sanity'
import { parseBody } from 'next-sanity/webhook'
//import { projectId, dataset, apiVersion } from '~/lib/sanity'

export { config } from 'next-sanity/webhook'

export default async function revalidate(req, res) {
  try {
    const { body, isValidSignature } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET)

    console.log('Init webhook')

    if (isValidSignature === false) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (typeof body._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    console.log('Start revalidating...')
    const routes = await getRoutes(body)

    console.log('Revalidating routes...', routes)
    await Promise.all(routes.map(route => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${routes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

async function getRoutes(body) {
  //const client = createClient({ projectId, dataset, apiVersion, useCdn: false })
  const routes = []
  const { _type, slug } = body

  switch (_type) {
    case 'home':
      routes.push(`/`)
      break
    case 'exhibitionPage':
      routes.push(`/exhibitions`)
    case 'exhibition':
      routes.push(`/exhibitions`)
      routes.push(`/exhibitions/${slug.current}`)
      break
    case 'artFairPage':
      routes.push(`/art-fairs`)
    case 'artFair':
      routes.push(`/art-fairs`)
      routes.push(`/art-fairs/${slug.current}`)
      break
    case 'artistPage':
      routes.push(`/artists`)
      break
    case 'artist':
      routes.push(`/artists`)
      routes.push(`/artists/${slug.current}`)
      routes.push(`/artists/${slug.current}/chronology`)
      break
    case 'information':
      routes.push(`/information`)
      break
    case 'founderPage':
      routes.push(`/founders`)
      break
    case 'founder':
      routes.push(`/founders`)
      routes.push(`/founders/${slug.current}`)
      break
    case 'expertise':
      routes.push(`/expertise`)
      break
    case 'publication':
      routes.push(`/library`)
      routes.push(`/library/${slug.current}`)
      break
    default:
      throw new TypeError(`Unknown type: ${_type}`)
  }

  return routes
}

// TODO: improve with possible scenarios (will require the sanity client)

// CASES 1 : when we change an article, also revalidate the home page (route: /)
// -> Check if the article is featured or not

// CASES 2 : when we change an artist, also revalidate the artist page (route: /artistes)
// -> Check if the artist is in the modules of the artist page (danseurs-euses, artiste associe-e, invité-es...)

// CASES 3 : when we change a repertory, also revalidate the repertory page (route: /activites)
// -> Check if the repertory is in the modules of the repertory page (répertoire, co-production...)

// OLD CODE
// async function getRouteSlug(client, type, id) {
//   const slug = await client.fetch(/* groq */ `
//     *[_type == '${type}' && _id == '${id}' && defined(slug.current)].slug.current
//  `)

//   return [`/${type}/${slug}`]
// }

// async function getRouteSlugs(client, type) {
//   const slugs = await client.fetch(/* groq */ `
//     *[_type == '${type}' && defined(slug.current)].slug.current
//   `)

//   return ['/', ...slugs.map(slug => `/${type}/${slug}`)]
// }

// async function getRouteIds(client, type) {
//   return await client.fetch(/* groq */ `
//      *[_type == '${type}' && defined(_id)]._id
//   `)
// }
