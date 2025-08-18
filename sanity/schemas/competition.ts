import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'competition',
    title: 'Competition',
    type: 'document',
    fields: [
        defineField({
            name: 'competitionName',
            title: 'Competition Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'position',
            title: 'Position/Rank',
            type: 'string',
            description: 'e.g., 1st Place, Winner, Runner-up, Top 10, etc.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'teamName',
            title: 'Team Name',
            type: 'string',
            description: 'Name of your team (optional for solo competitions)',
        }),
        defineField({
            name: 'projectName',
            title: 'Project Name',
            type: 'string',
            description: 'Name of the project you submitted',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Competition Description',
            type: 'text',
            description: 'What the competition was about',
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'competitionDate',
            title: 'Competition Date',
            type: 'date',
            description: 'When the competition took place',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'myRole',
            title: 'My Role',
            type: 'string',
            description: 'Your role in the project/team',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Competition/Project Link',
            type: 'url',
            description: 'Link to view the project, competition results, or submission',
        }),
    ],
    preview: {
        select: {
            title: 'competitionName',
            subtitle: 'position',
        },
    },
})