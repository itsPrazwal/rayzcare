// @ts-nocheck
import * as React from 'react'
import get from 'lodash.get'
import { withDocument } from 'part:@sanity/form-builder'
import { FormField } from '@sanity/base/components'
import { LockIcon } from '@sanity/icons'
import { TextInput } from '@sanity/ui'
import { uuid } from '@sanity/uuid'

type Props = any

const ProxyString = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    compareValue, // Value to check for "edited" functionality
    document,
    markers,
    onFocus,
    onBlur,
    placeholder,
    presence,
    type,
  } = props

  const path = type?.options?.field
  const proxyValue = get(document, path)

  const inputId = uuid()

  return (
    <FormField
      compareValue={compareValue}
      description={type?.description}
      inputId={inputId}
      markers={markers}
      presence={presence}
      title={type?.title}
    >
      <TextInput
        iconRight={LockIcon}
        id={inputId}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        readOnly={true}
        ref={ref}
        value={proxyValue}
      />
    </FormField>
  )
})

export default withDocument(ProxyString)
