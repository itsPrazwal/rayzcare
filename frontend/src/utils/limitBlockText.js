export function limitBlockText(blocks = [], textLimit = 500) {
  let count = 0
  let newBlocks = []

  blocks.forEach(block => {
    if (block._type !== 'block' || !block.children) {
      return ''
    }
    if (count < textLimit) {
      const newBlock = { ...block, children: [] }

      block.children.forEach((child, index) => {
        if (count < textLimit) {
          if (count + child.text?.length < textLimit) {
            count += child.text?.length
            newBlock.children[index] = child
          } else {
            const modifiedText = child.text?.slice(0, textLimit - count - 3).concat('...')
            count = textLimit
            newBlock.children[index] = { ...child, text: modifiedText }
          }
        }
      })
      newBlocks = [...newBlocks, newBlock]
    }
  })

  return newBlocks
}
