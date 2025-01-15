'use server';

import { PrismaClient } from '@prisma/client';

interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

export default async function createPost({ title, body, userId }: CreatePostData) {
  const prisma = new PrismaClient();

  try {
    const post = await prisma.post.create({
      data: {
        title,
        body,
        userId,
      },
      include: {
        user: true,
      },
    });

    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}