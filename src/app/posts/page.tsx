import { createPost } from "../actions/actions";
import { prisma } from "../client";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: {
      published: false,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      title: true,
      slug: true,
    },
    // take: 1,
    // skip: 1,
  });

  const postsCount = await prisma.post.count();
  return (
    <main>
      <h1>All Posts ({postsCount})</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="bg-amber-100"
        />
        <textarea
          name="content"
          id=""
          rows={5}
          placeholder="Content"
          className="bg-amber-100"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Create Post
        </button>
      </form>
    </main>
  );
}
