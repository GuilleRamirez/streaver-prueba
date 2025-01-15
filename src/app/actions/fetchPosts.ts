'use server'
import { PrismaClient } from '@prisma/client';

export default async function fetchPosts(){
const prisma = new PrismaClient();
  return await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  
}