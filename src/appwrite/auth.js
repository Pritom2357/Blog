import {toast} from 'react-toastify'
import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite"

export class AuthService{
   client = new Client();
   account;
   
   constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client);
   }

   async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                toast.success("Account created successfully");
                return this.login({email, password});
            }else{
                toast.error("Couldn't create account");
                return userAccount;
            }
        } catch (error) {
            toast.error("Error occured");
            throw error;
        }
   }

   async login({email, password}){
    try {
        const res =  await this.account.createEmailPasswordSession(email, password);
        toast.success("Login Successful");
        return res;
    } catch (error) {
        toast.error("Error Occured");
        throw error;
    }
   }

   async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }
        return null;
   }
    
   async logout(){
        try {
            await this.account.deleteSessions();
            toast.success("Logout successful");
        } catch (error) {
            console.log("::logout:: error:: ", error);
            toast.error("Logout failed");
        }
   }
}

const authService = new AuthService();

export default authService;