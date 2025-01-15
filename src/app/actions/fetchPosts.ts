'use server'
import { PrismaClient } from '@prisma/client';

export async function fetchPosts(){
const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  return await posts;
}