// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: "Постууд",
      name: "post",
      type: "document",
      fields: [
        {
          title: "Постын гарчиг",
          name: "title",
          type: "string",
          description:
            "Блогийн постын үндсэн гарчиг, 50 тэмдэгтээс бүү хэтрүүлээрэй",
          validation: (Rule) => [
            Rule.required()
              .min(5)

              .error("Гарчиг хамгийн багадаа 5 үсгээс тогтоно"),
            Rule.required()

              .max(80)
              .warning(
                "Гарчиг богинохон байх хэрэгтэй(80 тэмдэгтээс хэтрэхгүй)"
              ),
          ],
        },
        {
          title: "Дэд гарчиг",
          name: "subtitle",
          type: "string",
          description: "Постын төрлийг текстээр бичих",
        },
        {
          title: "Нийтлэлч",
          name: "publisher",
          type: "reference",
          to: [{ type: "publisher" }],
        },
        {
          title: "Постын зураг",
          name: "cover_image",
          type: "image",
        },
        {
          title: "Огноо",
          name: "date",
          type: "datetime",
        },
        {
          title: "Хаяг",
          name: "slug",
          type: "slug",
          options: {
            source: "title",

            slugify: (input) =>
              input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
          },
        },
      ],
    },
    {
      title: "Нийтлэгч",
      name: "publisher",
      type: "document",
      fields: [
        {
          title: "Нийтлэгчийн нэр",
          name: "title",
          type: "string",
        },
        {
          title: "Нийтлэгчийн зураг",
          name: "picture",
          type: "image",
        },
      ],
    },
  ]),
});
