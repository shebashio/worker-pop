// Import the required libraries
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { parse } from 'json2csv'

// Define the KV namespace
const BUCKET = KV_NAMESPACE

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // Fetch the JSON data
    const response = await fetch('https://he.net/3d-map/he-pops.js')
    const data = await response.json()

    // Flatten the data and convert it to CSV
    const flattenedData = Object.entries(data).map(([id, details]) => ({
      id,
      lat: details.latlon.lat,
      lon: details.latlon.lon,
      city: details.city,
      name: details.name,
      country: details.country,
      pop: details.pop,
      street: details.street,
      exchanges: details.exchanges.join(', '),
    }))
    const csv = parse(flattenedData)

    // Store the CSV in the KV namespace
    await BUCKET.put('he_pops.csv', csv)

    // Return a success response
    return new Response('CSV stored successfully', { status: 200 })
  } catch (error) {
    // Log the error and return a response with the error message and a 500 status code
    console.error(error)
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
}
