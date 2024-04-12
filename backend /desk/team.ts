import S from '@sanity/desk-tool/structure-builder'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { UserIcon, DocumentIcon, TagIcon, StarIcon } from '@sanity/icons'

// prettier-ignore
export const team = S.listItem()
  .title('Teams')
  .icon(UserIcon)
  .child(
    S.list()
      .title('Teams')
      .items([
        S.listItem()
          .title('Main Page')
          .icon(DocumentIcon)
          .child(
            S.editor()
              .schemaType('teamPage')
              .documentId('teamPage')
              .title('Page')
          ),
          orderableDocumentListDeskItem({
            title: 'Teams',
            icon: UserIcon,
            type: 'team'
          })
      ])
  )
