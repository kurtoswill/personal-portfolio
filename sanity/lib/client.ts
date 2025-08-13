import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImage} from '@/types/sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// GROQ query for fetching all projects
export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  link,
  featured,
  image{
    asset->{
      _id,
      url
    },
    alt,
    hotspot,
    crop
  },
  techStack[]->{
    _id,
    name,
    category,
    color
  }
}`

// GROQ query for fetching only featured projects
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(_createdAt desc) {
  _id,
  title,
  description,
  link,
  image{
    asset->{
      _id,
      url
    },
    alt,
    hotspot,
    crop
  },
  techStack[]->{
    _id,
    name,
    category,
    color
  }
}`