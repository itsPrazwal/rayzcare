import S from "@sanity/desk-tool/structure-builder";
import { DocumentIcon, DocumentsIcon, StarIcon, BookIcon } from "@sanity/icons";

// prettier-ignore
export const services = S.listItem()
  .title('Services')
  .icon(BookIcon)
  .child(
    S.list()
      .title('Services')
      .items([
        S.listItem()
          .title('Main Page')
          .icon(DocumentIcon)
          .child(
            S.editor()
              .schemaType('servicePage')
              .documentId('servicePage')
              .title('Page')
        ),
        S.listItem()
        .icon(BookIcon)
        .title('Services')
        .schemaType('service')
        .child(
          S.documentTypeList('service')
          .filter('_type == "service" && archived != true')
          .title('Services')
        ),
        S.listItem()
        .icon(StarIcon)
        .title('Featured Services')
        .schemaType('service')
        .child(
          S.documentTypeList('service')
          .filter('_type == "service" && featured == true')
          .title('Featured Services')
        ),
        S.listItem()
        .icon(BookIcon)
        .title('Archived Services')
        .schemaType('service')
        .child(
          S.documentTypeList('service')
          .filter('_type == "service" && archived == true')
          .title('Featured Services')
        )
      ])
  )
