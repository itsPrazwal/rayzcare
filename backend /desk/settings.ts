import S from '@sanity/desk-tool/structure-builder'
import {
  ControlsIcon,
  SearchIcon,
  CogIcon,
  BookIcon,
  CommentIcon
} from '@sanity/icons'

// prettier-ignore
export const settings = S.listItem()
  .title('Settings')
  .icon(ControlsIcon)
  .child(
    S.list()
      .title('Settings')
      .items([
        S.listItem()
          .title('Default SEO')
          .icon(SearchIcon)
          .child(
            S.editor()
              .schemaType('settingsSeo')
              .documentId('settingsSeo')
              .title('Default SEO')
          ),
        S.listItem()
          .title('Settings')
          .icon(CogIcon)
          .child(
            S.editor()
              .schemaType('settings')
              .documentId('settings')
              .title('Settings')
          ),
        S.listItem()
        .title('Contact Form')
        .icon(BookIcon)
        .child(
          S.editor()
          .schemaType('contactForm')
          .documentId('contactForm')
          .title('Contact Form')
        ),
        S.listItem()
        .title('Inquire Form')
        .icon(CommentIcon)
        .child(
          S.editor()
          .schemaType('inquireForm')
          .documentId('inquireForm')
          .title('Inquire Form')
        ),
        S.listItem()
          .title("Footer Content")
          .icon(CogIcon)
          .child(
            S.editor()
            .schemaType("footerContent")
            .documentId("footerContent")
            .title("Footer Content")
          )
      ])
  )
