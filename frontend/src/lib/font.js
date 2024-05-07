import { Roboto, Roboto_Condensed, Roboto_Serif, Lato } from 'next/font/google'

export const condensed = Roboto_Condensed({
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

export const displayLocal = Roboto({
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

export const display = Roboto({
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

export const displaySC = Lato({
  weight: ['300', '400'],
  style: ['normal'],
  subsets: ['latin']
})

export const displayInfant = Roboto({
  weight: ['300', '400'],
  style: ['normal'],
  subsets: ['latin']
})

export const chinese = Roboto_Serif({
  weight: ['300'],
  style: ['normal'],
  subsets: ['latin']
})
