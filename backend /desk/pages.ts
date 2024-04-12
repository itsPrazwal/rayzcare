import S from '@sanity/desk-tool/structure-builder'
import { DocumentsIcon } from '@sanity/icons'

// prettier-ignore
export const pages = S.listItem()
  .title('Pages')
  .schemaType('page')
  .icon(DocumentsIcon)
  .child(
    S.documentTypeList('page')
      .defaultOrdering([{ field: 'title', direction: 'asc'}])
  )
