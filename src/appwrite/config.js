import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

import {toast} from 'react-toastify'

const defaultImageUrl = 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=600'

export class Service{
    client = new Client();
    databases; 
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            const res = await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
            toast.success("Post created successfully");
            return res;
        } catch (error) {
            console.log("Appwrite service::createPost::error", error);
            toast.error("Same name exists")
            toast.warning("refresh please");
            return null;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            const res =  await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            toast.success("Post updated successfully");
            return res;
        } catch (error) {
            console.log("::updatePost:: error:: ", error);
            toast.error("Update failed");
            toast.warn("refresh please");
            return null;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            toast.success("Deleted successfully");
            return true;
        } catch (error) {
            console.log("deletePost:: error:: ", error);
            toast.error("Failed to delete");
            return false;
        }
    }

    downloadFile(fileID, fileName){
        const downloadUrl = `${conf.appwriteUrl}/storage/files/${fileID}/view?project=${conf.appwriteProjectID}`;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.target = '_blank';
        link.click();
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("::getPost::error:: ", error);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases
            .listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("::getAllPosts::error:: ", error);
            return false;
        }
    }

    async getYourPosts(userid, queries = [Query.equal("status", userid)]){
        try {
            return await this.databases
            .listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("::getAllPosts::error:: ", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("::uploadFile::error:: ", error);
            return false;
        }
    }
    
    async defaultImage(){
        try {
            const response = await fetch(defaultImageUrl);
            const imageBlob = await response.blob();
            const file = new File([imageBlob], 'default-image.jpg', {type:'image/jpeg'});

            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileID
            );
            return true;
        } catch (error) {
            console.log("::deleteFile::error:: ", error);
            return false;
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }

}

const service = new Service();

export default service;