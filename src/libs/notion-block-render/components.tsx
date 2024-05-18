import { FunctionComponent } from 'react';
import {
  BlockObject,
  ListSchema,
  RichText,
  TextBlockKey,
  TextBlockObject,
} from './types/block';
import { Box, Heading, Section, Text } from '@radix-ui/themes';

type BlockComponent<T extends TextBlockKey = TextBlockKey> = FunctionComponent<
  TextBlockObject<T>
>;

export const NotionRenderer: FunctionComponent<{
  json: ListSchema | BlockObject;
}> = ({ json }) => {
  if (json.object === 'list') {
    return (
      <Box>
        {json.results.map((block, i) => (
          <BlockRenderer key={block.id ?? i} {...block} />
        ))}
      </Box>
    );
  }
};

export const BlockRenderer: BlockComponent = (props) => {
  switch (props.type) {
    case 'heading_1':
      return <Heading1 {...props} />;
    case 'heading_2':
      return <Heading2 {...props} />;
    case 'bulleted_list_item':
      return <BulletedListItem {...props} />;
    default:
      return <UnknownBlock />;
  }
};

export const RichTextRenderer: FunctionComponent<RichText> = ({ rich_text }) => {
  return <>{rich_text.map((el) => el.text.content)}</>;
};

export const ChildrenRenderer: FunctionComponent<{ children?: BlockObject[] }> = ({
  children,
}) => {
  if (!children) return null;
  return (
    <>
      {children.map((props, i) => (
        <BlockRenderer key={props.id ?? i} {...props} />
      ))}
    </>
  );
};

export const Heading1: BlockComponent<'heading_1'> = ({ heading_1, children }) => {
  return (
    <Section size="1" mt="2">
      <Heading size="8">
        <RichTextRenderer {...heading_1} />
      </Heading>
      <ChildrenRenderer>{children}</ChildrenRenderer>
    </Section>
  );
};

export const Heading2: BlockComponent<'heading_2'> = ({ heading_2, children }) => {
  return (
    <Section size="1" mt="2">
      <Heading as="h2" size="6">
        <RichTextRenderer {...heading_2} />
      </Heading>
      <ChildrenRenderer>{children}</ChildrenRenderer>
    </Section>
  );
};

export const BulletedListItem: BlockComponent<'bulleted_list_item'> = ({
  bulleted_list_item,
  children,
}) => {
  return (
    <Box>
      <Text weight="bold">
        ・
        <RichTextRenderer {...bulleted_list_item} />
        <ChildrenRenderer>{children}</ChildrenRenderer>
      </Text>
    </Box>
  );
};

export const UnknownBlock = () => {
  return <Box>Unknown Block.</Box>;
};
