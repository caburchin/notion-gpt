import { Article } from '@/features/article';
import { Heading, Text } from '@radix-ui/themes';

export default function Home() {
  return (
    <main>
      <Heading size="8" as="h1">
        Notion of GPT
      </Heading>
      <Text>GPTが生成した記事をnotion形式で表示するサイト</Text>
      <Article />
    </main>
  );
}
