import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

// Import the generated Lists API from Keystone
import { lists } from '.keystone/api';

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <main style={{margin: "3rem"}}>
      <h1>Hello blog</h1>
      <ul>
        {/* Render each post with a link to the content page */}
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      </main>
    </div>
  )
}


export async function getStaticProps() {
  const posts = await lists.Post.findMany({ query: 'id title slug' });
  return { props: { posts } };
}