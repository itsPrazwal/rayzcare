import S from '@sanity/desk-tool/structure-builder'
import { EyeOpenIcon } from '@sanity/icons'

// prettier-ignore
export const home = S.listItem()
  .title('Homepage')
  .icon(EyeOpenIcon)
  .child(
    S.document()
      .schemaType('home')
      .documentId('home')
      .title('Homepage')
  )
