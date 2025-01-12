import { PrismaClient } from '@prisma/client'
import userData from './service/userData'
import postData from './service/postData'

const prisma = new PrismaClient()
async function main() {
  const users = await userData.users();
  for (const user of users) {
    await prisma.user.create({
        data: {
            name: user.name,
            username: user.username,
            email: user.email,
            address: JSON.stringify(user.address),
            phone: user.phone,
            website: user.website,
            company: JSON.stringify(user.company)
        }
    })
  }
  const posts = await postData.posts();
  for(const post of posts){
      await prisma.post.create({
          data: {
              userId: post.userId,
              title: post.title,
              body: post.body
          }
      })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })