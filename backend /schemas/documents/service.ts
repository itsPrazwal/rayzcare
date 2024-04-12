export default {
    name: "service",
    type: "document",
    groups: [
        {
            name: "info",
            title: "Info",
        },
        {
            name: "content",
            title: "Content",
        },
    ],
    fields: [
        {
            name: "title",
            type: "localeString",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            group: "info",
            type: "slug",
            options: {
                source: "title.en",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            title: "Archived",
            name: "archived",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "featured",
            group: "info",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "hero",
            type: "hero",
        },
        {
            name: "image",
            group: "info",
            type: "figure",
        },
        {
            name: "location",
            type: "string",
        },
        {
            name: "description",
            type: "localeBody",
        },
        {
            name: "modules",
            group: "content",
            type: "array",
            of: [
                {title: "Text", type: "moduleText"},
                {title: "Quote", type: "moduleQuote"},
                {title: "Info", type: "moduleInfo"},
                {title: "Image", type: "moduleImage"},
                {title: "Video", type: "moduleVideo"},
                {title: "Slider", type: "moduleSlider"},
            ],
        },
        {
            title: "Additional Links",
            name: "links",
            group: "content",
            type: "array",
            of: [{title: "Link", type: "moduleLink"}],
        },
        {
            title: "SEO",
            name: "seo",
            type: "seo",
            group: "info",
        }
    ],
    preview: {
        select: {
            title: "title.en",
            media: "image",
            archived: "archived",
            featured: "featured",
        },
        prepare({title, media, archived, featured}) {
            return {
                title,
                subtitle: `${archived ? "🚫 " : ""}${
                    !archived && featured ? "★ " : ""
                }`,
                media,
            };
        },
    },
};
