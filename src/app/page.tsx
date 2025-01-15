import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <small>By: {post.user.name}</small>
        </article>
      ))}
    </div>
  );
}
