import * as React from 'react'

export const Large = ({ children }) => (
  <p
    style={{
      margin: '0 0 1rem',
      fontSize: '1.25rem',
      lineHeight: '1.25',
      fontWeight: 500,
    }}
  >
    {children}
  </p>
)

export const Heading = ({ children }) => (
  <h3
    style={{
      margin: '1rem 0',
      fontWeight: 500,
    }}
  >
    {children}
  </h3>
)
