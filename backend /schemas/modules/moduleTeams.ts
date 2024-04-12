import { UserIcon } from '@sanity/icons'

export default {
  name: 'moduleTeams',
  type: 'object',
  icon: UserIcon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'localeString',
    },
    {
      name: 'description',
      type: 'localeBody',
    },
    {
      name: 'teams',
      type: 'array',
      of: [{ type: 'reference', to: [{ title: 'Team', type: 'team' }] }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      teams: 'teams'
    },
    prepare: ({ title, teams }) => ({
      title: title?.en || 'Teams',
      subtitle: teams ? `${teams.length} ${teams.length > 1 ? 'Teams' : 'Team'}` : null,
    }),
  },
}
