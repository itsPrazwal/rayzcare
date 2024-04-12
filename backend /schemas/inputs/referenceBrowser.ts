import React, { useEffect, useState } from 'react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { nanoid } from 'nanoid';
import {
  Card,
  Grid,
  Spinner,
  Stack,
  studioTheme,
  ThemeProvider,
  Text,
  Inline,
  Label,
  TextInput,
  Button
} from '@sanity/ui';
import FormField from 'part:@sanity/components/formfields/default';
import { PatchEvent, set } from 'part:@sanity/form-builder/patch-event';
import client from 'part:@sanity/base/client';

const List = ({ list, onClick }) => (
  <Grid
    autoRows='max'
    marginTop={2}
    padding={1}
    style={{ height: '300px', overflow: 'auto' }}
    columns={[2, 3, 4]}
    gap={[1, 1, 2, 3]}
  >
    {list.map(item => (
      <Card key={item._id} shadow={1} radius={2} padding={4}>
        <Stack space={[3]}>
          <Text marginBottom={[2]} weight='bold'>
            {item.title}
          </Text>
          <Inline space={[3, 3]}>
            <Button
              icon={RiExternalLinkLine}
              as='a'
              padding={[2]}
              href={`/desk/articles;${item._id}`} // edit 'articles' if your change document type
              text='Edit'
            />
            <Button
              padding={[2]}
              onClick={() => onClick(item)}
              text='Select'
              tone='primary'
            />
          </Inline>
        </Stack>
      </Card>
    ))}
  </Grid>
);

const ReferenceBrowser = React.forwardRef(({ onChange }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [references, setReferences] = useState(null);

  // edit 'articles' in the query below if your change document type
  const search = (value = '') => {
    if (!references) setIsFetching(true);
    client
      .fetch(
        `*[
          _type == 'article'
          && title match '${value}*'
        ]
        {_id, _rev, title}`
      )
      .then(results => {
        setReferences(results);
        setIsFetching(false);
      });
  };

  useEffect(() => search(), []);

  const selectItem = ({ _id: _ref }) => {
    onChange(
      PatchEvent.from(set({ _key: nanoid(), _ref, _type: 'reference' }))
    );
  };

  if (isFetching) return <Spinner />;

  return (
    <FormField>
      <ThemeProvider theme={studioTheme}>
        <Inline space={[4]}>
          <Label>Search</Label>
          <TextInput
            fontSize={3}
            onChange={event => search(event.currentTarget.value)}
            padding={3}
            placeholder='search...'
          />
        </Inline>
        <List list={references} onClick={selectItem} />
      </ThemeProvider>
    </FormField>
  );
});

export default ReferenceBrowser;