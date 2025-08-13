import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

// GROQ query for fetching all projects
export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  link,
  featured,
  techStack[]->{
    _id,
    name,
    category
  }
}`

// GROQ query for fetching only featured projects
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(_createdAt desc) {
  _id,
  title,
  description,
  link,
  techStack[]->{
    _id,
    name,
    category
  }
}`