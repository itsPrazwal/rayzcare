import S from "@sanity/desk-tool/structure-builder";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { HomeIcon, DocumentIcon, StarIcon } from "@sanity/icons";

// prettier-ignore
export const locations = S.listItem()
  .title('Locations')
  .icon(HomeIcon)
  .child(
    S.list()
      .title('Locations')
      .items([
        S.listItem()
          .title('Main Page')
          .icon(DocumentIcon)
          .child(
            S.editor()
              .schemaType('locationPage')
              .documentId('locationPage')
              .title('Page')
          ),
        orderableDocumentListDeskItem({
          title: 'Locations',
          icon: HomeIcon,
          type: 'location'
        }),
        S.listItem()
        .icon(StarIcon)
        .title('Featured Locations')
        .schemaType('location')
        .child(
          S.documentTypeList('location')
          .filter('_type == "location" && featured == true')
          .title('Featured Locations')
        )
      ])
  )
