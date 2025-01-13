import Post from "../interface/post";
const userData = {
    posts: async (): Promise<Post[]> => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if(!response.ok){
                throw new Error('Failed to fetch Posts');
            }
            return await response.json();
        }
        catch(error){
            console.error(error);
            return [];
        }
    }
}
export default userData;