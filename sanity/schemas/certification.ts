import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'certification',
    title: 'Certification',
    type: 'document',
    fields: [
        defineField({
            name: 'certificationName',
            title: 'Certification Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Certification Description',
            type: 'text',
            description: 'What this certification is about',
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'dateAcquired',
            title: 'Date Acquired',
            type: 'date',
            description: 'When you obtained this certification',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Certification Link',
            type: 'url',
            description: 'Link to view/verify the certification',
        }),
    ],
    preview: {
        select: {
            title: 'certificationName',
            subtitle: 'dateAcquired',
        },
    },
})