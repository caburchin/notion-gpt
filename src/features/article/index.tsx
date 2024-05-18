'use client';

import blockMap from '@/fixtures/article-next-setup.json';
import { NotionRenderer } from '@/libs/notion-block-render/components';
import { ListSchema } from '@/libs/notion-block-render/types/block';

export const Article = () => {
  return <NotionRenderer json={blockMap as ListSchema} />;
};
