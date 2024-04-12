export default {
  supportedLanguages: [
    {id: 'fr', title: 'French'},
    {id: 'en', title: 'English'}
  ],
  // Select French by default
  defaultLanguages: ['fr', 'en'],
  // Only show language filter for document type `page` (schemaType.name)
  documentTypes: ['page', 'article'],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}
