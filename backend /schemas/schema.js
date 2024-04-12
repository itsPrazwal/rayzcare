import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import annotations from './annotations'
import documents from './documents'
import modules from './modules'
import blocks from './blocks'
import objects from './objects'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...annotations, ...documents, ...modules, ...blocks, ...objects]),
})
