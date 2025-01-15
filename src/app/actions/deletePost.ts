'use server'
import { PrismaClient } from '@prisma/client';
export async function deletePost(id: number){
    const prisma = new PrismaClient();
    try {
      await prisma.post.delete({
        where: { id: id },
    });
      console.log(`Post with id: ${id} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete post with id: ${id}`, error);
    }

}