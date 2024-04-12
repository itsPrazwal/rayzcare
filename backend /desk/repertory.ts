import S from '@sanity/desk-tool/structure-builder'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { EyeOpenIcon, DocumentIcon, TagIcon, StarIcon } from '@sanity/icons'

// prettier-ignore
export const repertory = S.listItem()
  .title('Repertory')
  .icon(EyeOpenIcon)
  .child(
    S.list()
      .title('Repertory')
      .items([
        S.listItem()
          .title('Main Page')
          .icon(DocumentIcon)
          .child(
            S.editor()
              .schemaType('repertoryPage')
              .documentId('repertoryPage')
              .title('Page')
          ),
          S.listItem()
          .icon(EyeOpenIcon)
          .title('Repertory')
          .schemaType('repertory')
          .child(
            S.documentTypeList('repertory')
            .title('Repertory')
          ),
          S.listItem()
          .icon(StarIcon)
          .title('Featured Repertory')
          .schemaType('repertory')
          .child(
            S.documentTypeList('repertory')
            .filter('_type == "repertory" && featured == true')
            .title('Featured Repertory')
          ),
          orderableDocumentListDeskItem({
            title: 'Types',
            icon: TagIcon,
            type: 'repertoryType'
          })
      ])
  )
