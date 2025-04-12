import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite"


export class AuthService {
    
    
    client = new Client();
    account;

    constructor() {
        // console.log(conf.appwriteProjectId);
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        .setLocale("en")
        // .setKey(conf.appwriteApiKey)
        
        this.account = new Account(this.client)
        // console.log(this.account);
        // console.log("DatabaseId is",conf.appwriteDataBaseId);
        
        
    
    }

    async createAccount({email, password, name}) {
        try {
            console.log("user try to created Account",name);
            
           const userAccount = await this.account.create(ID.unique(), email, password, name)
           console.log("created sucessfully");

         
           if(userAccount) {
            return await this.login({email, password});
          
           }
           else{
            return null
           }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            return null;
        }
    }

    async login ({email, password}) {
     

       //now create a new session
       try {
        
        return await this.account.createEmailPasswordSession(email, password);
       } catch (error) {
        throw error;
       }

    }

    async getCurrentUser() {
    //     const result = this.account?.get();
    //    console.log(result);
       
        
        try {
            
            const user = await this.account.get();
            console.log("User is logged in:",user);
            return user;
       
        } catch (error) {
            console.log("user not logged in or account not created", error.message);
            return null;
        }
    }

    async logout() {
        try {
        
            const currentSession = await this.account.get();
    
            if(currentSession){
                await this.account.deleteSession('current');
                console.log("Previous session deleted");
                
            }
           } catch (error) {
            console.log("No acive session to delete:");
            
           }
        }
}

const authService = new AuthService();
//create object
//we used constructror ,it call to the function during creation of object

export default authService