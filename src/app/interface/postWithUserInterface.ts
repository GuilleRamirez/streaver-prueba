import  Post  from '../../../prisma/interface/post';

export default interface PostWithUser extends Post {
    user: {
        name: string;
    };
}