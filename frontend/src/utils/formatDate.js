import dayjs from "dayjs";

// COMMENTED TEMPORARY FOR FUTURE REFERENCE
// export const formatDate = (
//   isoDateStart,
//   isoDateEnd,
//   options = {
//     month: 'long',
//     year: 'numeric',
//     day: 'numeric'
//   },
//   locale = 'en-US'
// ) => {
//   const dateStart = new Date(isoDateStart)
//   if (isoDateEnd) {
//     const dateEnd = new Date(isoDateEnd)
//     const optionsStart = { ...options }
//     const optionsEnd = { ...options }
//     if (dateStart.getFullYear() === dateEnd.getFullYear()) {
//       delete optionsStart.year
//     }
//     return (
//       new Intl.DateTimeFormat(locale, optionsStart).format(dateStart) +
//       ' – ' +
//       new Intl.DateTimeFormat(locale, optionsEnd).format(dateEnd)
//     )
//   } else {
//     return new Intl.DateTimeFormat(locale, options).format(dateStart)
//   }
// }

export const formatDate = (dateStart, dateEnd) => {

  const yearDiff = dateEnd ? dayjs(dateEnd).year() - dayjs(dateStart).year() : null
  const startDate = dayjs(dateStart).format(`MMMM D${(!dateEnd || yearDiff > 0) ? ', YYYY' : ''}`)
  const endDate = dateEnd && dayjs(dateEnd).format('MMMM D, YYYY')

  return endDate
    ? `${startDate} - ${endDate}`
    : startDate
}

export const formatYearDate = (
  isoDateStart,
  isoDateEnd
) => {
  const dateStart = new Date(isoDateStart)
  if (isoDateEnd) {
    const dateEnd = new Date(isoDateEnd)
    if (dateStart.getFullYear() === dateEnd.getFullYear()) {
      return dateStart.getFullYear()
    }
    return (
      dateStart.getFullYear() +
      '–' +
      dateEnd.getFullYear().toString().slice(2)
    )
  } else {
    return dateStart.getFullYear()
  }
}

export const formatBirthdate = (isoDateStart, isoDateEnd) => {
  const dateStart = new Date(isoDateStart)
  const yearStart = dateStart.getFullYear()
  if (isoDateEnd) {
    const dateEnd = new Date(isoDateEnd)
    const yearEnd = dateEnd.getFullYear()

    if (Math.ceil(yearStart / 100) === Math.ceil(yearEnd / 100)) {
      return yearStart + '–' + yearEnd.toString().slice(2)
    }

    return yearStart + '–' + yearEnd
  } else {
    const currentYear = new Date().getFullYear()
    return (
      <>
        <span className="normal-case">Born–</span>
        <span>{currentYear}</span>
      </>
    )
  }
}
