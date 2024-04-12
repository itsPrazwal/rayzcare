import {
    orderRankField,
    orderRankOrdering,
} from "@sanity/orderable-document-list";

export default {
    name: "team",
    type: "document",
    groups: [
        {
            name: "info",
            title: "Info",
        },
        {
            name: "content",
            title: "Content",
        }
    ],
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({type: "team"}),
        {
            name: "title",
            group: "info",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "firstname",
            group: "info",
            type: "string",
        },
        {
            name: "lastname",
            group: "info",
            type: "string",
        },
        {
            title: "Featured image",
            name: "image",
            group: "info",
            type: "figure",
        },
        {
            name: "portrait",
            group: "info",
            type: "figure",
        },
        {
            name: "description",
            group: "info",
            type: "localeBody",
        },
        {
            name: "quote",
            group: "info",
            type: "localeBody",
        },
        {
            name: 'modules',
            group: 'content',
            type: 'array',
            of: [
                {title: "Text", type: "moduleText"},
                {title: "Quote", type: "moduleQuote"},
                {title: "Info", type: "moduleInfo"},
                {title: "Image", type: "moduleImage"},
                {title: 'Video', type: 'moduleVideo'},
                {title: "Slider", type: "moduleSlider"}
            ],
        },
        {
            title: "SEO",
            name: "seo",
            type: "seo",
        },
    ],
    preview: {
        select: {
            title: "title",
            image: "image",
            portrait: "portrait",
        },
        prepare: ({title, image, portrait}) => {
            return {
                title,
                media: portrait || image,
            };
        },
    },
};
