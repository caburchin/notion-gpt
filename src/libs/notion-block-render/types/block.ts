// c.f. https://developers.notion.com/reference/block

export type ListSchema = {
  object: 'list';
  results: BlockObject[];
};

type CommonSchema = {
  id?: string;
  object: 'block';
  children?: BlockObject[];
  parent?: {
    type: string; // TODO
    page_id: string;
  };
  create_time?: string;
  last_edited_time?: string;
  created_by?: {
    object: string;
    id: string;
  };
  last_edited_by?: {
    object: string;
    id: string;
  };
};

export type BlockKey = TextBlockKey; // | OtherBlockKey;

export type TextBlockKey =
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'heading_4'
  | 'heading_5'
  | 'paragraph'
  | 'bulleted_list_item';

export type BlockObject = TextBlockObject<TextBlockKey>;

export type TextBlockObject<T extends TextBlockKey> = T extends TextBlockKey
  ? CommonSchema & {
      type: T;
    } & Record<T, RichText>
  : unknown;

export type ParagraphObject = CommonSchema & {};

export type RichText = {
  rich_text: TextObject[];
};

export type TextObject = {
  type: 'text';
  text: {
    content: string;
    link?: string;
  };
};
