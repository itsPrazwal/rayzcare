import * as React from 'react'
import { SanityDocument } from '@sanity/client'
import { WarningOutlineIcon } from '@sanity/icons'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { withDocument } from 'part:@sanity/form-builder'
import { getShopifyStoreId } from '../../utils/getShopifyStoreId'
import { productUrl } from '../../utils/shopifyUrls'

type Props = {
  document: SanityDocument
}

const ProductHiddenInput = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { document } = props
  const [shopifyProductUrl, setShopifyProductUrl] = React.useState<string>()

  const isActive = document?.store?.status === 'active'
  const isDeleted = document?.store?.isDeleted

  React.useEffect(() => {
    getShopifyStoreId().then(storeId => {
      if (storeId) {
        setShopifyProductUrl(productUrl(storeId, document?.store?.id))
      }
    })
  }, [])

  let message
  if (!isActive) {
    message = (
      <>
        It does not have an <code>active</code> status in Shopify.
      </>
    )
  }
  if (isDeleted) {
    message = 'It has been deleted from Shopify.'
  }

  return (
    <Card padding={4} radius={2} ref={ref} shadow={1} tone="critical">
      <Flex align="flex-start">
        <Text size={2}>
          <WarningOutlineIcon />
        </Text>
        <Box flex={1} marginLeft={3}>
          <Box>
            <Text size={2} weight="semibold">
              This product is hidden
            </Text>
          </Box>
          <Stack marginTop={4} space={2}>
            <Text size={1}>{message}</Text>
          </Stack>
          {!isDeleted && shopifyProductUrl && (
            <Box marginTop={4}>
              <Text size={1}>
                <a href={shopifyProductUrl} target="_blank">
                  View this product on Shopify
                </a>
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Card>
  )
})

export default withDocument(ProductHiddenInput)
