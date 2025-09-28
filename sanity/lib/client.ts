import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImage} from '@/types/sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x3zrg8o5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// GROQ query for fetching all projects
export const projectsQuery = `*[_type == "project"] | order(createdDate desc) {
  _id,
  title,
  description,
  link,
  featured,
  createdDate,
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
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(createdDate desc) {
  _id,
  title,
  description,
  link,
  createdDate,
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

// GROQ query for fetching all competitions
export const competitionsQuery = `*[_type == "competition"]{
    _id,
    competitionName,
    position,
    teamName,
    projectName,
    description,
    competitionDate,
    myRole,
    link
} | order(competitionDate desc)`;

// GROQ query for fetching all certifications
export const certificationsQuery = `*[_type == "certification"] | order(dateAcquired desc) {
  _id,
  certificationName,
  description,
  dateAcquired,
  link
}`

// GROQ query for fetching all experiences
export const experiencesQuery = `*[_type == "experience"] | order(startDate desc) {
  _id,
  jobTitle,
  company,
  location,
  employmentType,
  startDate,
  endDate,
  current,
  description,
  keyAchievements,
  techStack[]->{
    _id,
    name,
    category,
    color
  },
  companyWebsite
}`

// GROQ query for fetching recent competitions (optional - for homepage)
export const recentCompetitionsQuery = `*[_type == "competition"] | order(competitionDate desc)[0...3] {
  _id,
  competitionName,
  position,
  projectName,
  competitionDate,
  myRole
}`

// GROQ query for fetching recent certifications (optional - for homepage)
export const recentCertificationsQuery = `*[_type == "certification"] | order(dateAcquired desc)[0...3] {
  _id,
  certificationName,
  dateAcquired,
  link
}`

// GROQ query for fetching recent experiences (optional - for homepage)
export const recentExperiencesQuery = `*[_type == "experience"] | order(startDate desc)[0...6] {
  _id,
  jobTitle,
  company,
  location,
  employmentType,
  startDate,
  endDate,
  current,
  description,
  keyAchievements,
  techStack[]->{
    _id,
    name,
    category,
    color
  }
}`