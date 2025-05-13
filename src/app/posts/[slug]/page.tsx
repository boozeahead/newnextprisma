import { prisma } from "@/app/client";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await prisma.post.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  return (
    <main>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
