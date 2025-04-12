import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite"


export class Service {
    client = new Client()
    databases;
    bucket;
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            // .setKey(conf.appwriteApiKey)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);

    }

//databases

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    slug,
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )

        } catch (error) {
            console.log("Appwrite service :: cratePost :: error", error);

        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {

            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);

        }
    }

    async deletePost(slug) {
        try {

            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            // console.log(slug);
            
            const post = await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            );
            // console.log("Post documetnt is: ",post);
            return post;
            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }
    

    async getAllPost(queries = [Query.equal("status","active")]) {
        //Query.equal("status", active)//
                    // key    // value

        //here we will get only which of the post that status has active 
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                // [
                //     Query.equal('status',active)

                // ]
                // //if not pass or take by default 
                queries,//it is a array
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPost :: error", error);
            return false
        }
    }


//storage

    async uploadFile(file) {
        
        try {
            
            return await this.bucket.createFile(
              conf.appwriteBucketId,
               ID.unique(),
               file,
               [
                Permission.read(Role.any()),
               ]
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        //whenever file sucessfully uploaded it return fileId and receavie in featuredImage = fileId
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    async getFileView(fileId) {
        try {
    
            console.log("FileId is: ", fileId);
            
           const file_url =  await this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
            console.log("file_url", file_url);
            
            return file_url;
        } catch (error) {
            console.log("File Not getting ", error);
            
        }
    }

    fileDownLoad(fileId) {
        try {
            return this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: fileDonwnLoad :: error", error);
            return false
        }
    }

}

const service = new Service()

export default service