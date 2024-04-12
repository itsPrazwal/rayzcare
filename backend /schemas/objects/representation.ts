import { ClockIcon } from '@sanity/icons'

export default {
  name: 'representation',
  type: 'object',
  icon: ClockIcon,
  fields: [
    {
      name: 'location',
      type: 'string',
      placeholder: 'Théâtre de la Ville - Théâtre des Abbesses',
      validation: Rule => Rule.required(),
    },
    {
      name: 'city',
      type: 'string',
      placeholder: 'Paris'
    },
    {
      name: 'country',
      type: 'string',
      placeholder: 'France'
    },
    {
      title: 'Date start',
      name: 'dateStart',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today'
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Date end',
      name: 'dateEnd',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today'
      }
    },
    {
      title: 'Ticket URL',
      name: 'ticketUrl',
      type: 'url',
    },
  ],
  preview: {
    select: {
      location: 'location',
      dateStart: 'dateStart',
      dateEnd: 'dateEnd',
      ticketUrl: 'ticketUrl',
    },
    prepare({ location, dateStart, dateEnd, ticketUrl }) {
      
      const dateStartFormatted = dateStart ? new Date(dateStart).toLocaleDateString('fr') : null
      const dateEndFormatted = dateEnd ? new Date(dateEnd).toLocaleDateString('fr') : null

      return {
        title: `${location ? location : ''} (${dateStartFormatted}${dateEndFormatted ? ' → ' + dateEndFormatted : ''})`,
        subtitle: ticketUrl,
      }
    }
  },
}