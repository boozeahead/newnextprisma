"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../client";

export async function createPost(formData: FormData) {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
      user: {
        connect: {
          email: "John@gmail.com",
        },
      },
    },
  });

  revalidatePath("/posts");
}

export async function editPost(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });
}

export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.post.delete({
    where: {
      id,
    },
  });
}
