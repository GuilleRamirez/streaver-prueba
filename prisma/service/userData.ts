import User from "../interface/user";
const userData = {
    users: async (): Promise<User[]> => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if(!response.ok){
                throw new Error('Failed to fetch User');
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