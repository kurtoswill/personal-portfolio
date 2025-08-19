import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'experience',
    title: 'Professional Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'jobTitle',
            title: 'Job Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Company Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'City, State/Country (e.g., New York, NY or Remote)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'employmentType',
            title: 'Employment Type',
            type: 'string',
            options: {
                list: [
                    {title: 'Full-time', value: 'full-time'},
                    {title: 'Part-time', value: 'part-time'},
                    {title: 'Contract', value: 'contract'},
                    {title: 'Freelance', value: 'freelance'},
                    {title: 'Internship', value: 'internship'},
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave empty if currently working here',
        }),
        defineField({
            name: 'current',
            title: 'Currently Working Here',
            type: 'boolean',
            description: 'Check this if you are currently working at this position',
            initialValue: false,
        }),
        defineField({
            name: 'description',
            title: 'Job Description',
            type: 'text',
            description: 'Brief description of your role and responsibilities',
            validation: (Rule) => Rule.required().max(500),
        }),
        defineField({
            name: 'keyAchievements',
            title: 'Key Achievements',
            type: 'array',
            of: [
                {
                    type: 'string',
                    title: 'Achievement',
                }
            ],
            description: 'List of key achievements or accomplishments in this role',
        }),
        defineField({
            name: 'techStack',
            title: 'Technologies Used',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'technology'}],
                },
            ],
            description: 'Technologies and tools you used in this role',
        }),
        defineField({
            name: 'companyWebsite',
            title: 'Company Website',
            type: 'url',
            description: 'Link to the company website (optional)',
        }),
    ],
    preview: {
        select: {
            title: 'jobTitle',
            subtitle: 'company',
        },
    },
})