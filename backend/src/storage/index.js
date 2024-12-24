import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';

dotenv.config();

const IMAGE_CONTAINER_NAME = "campaign-images";
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)

const configContainer = async () => {
    console.log(`Creating container: ${IMAGE_CONTAINER_NAME}`)
    const containerClient = blobServiceClient.getContainerClient(IMAGE_CONTAINER_NAME)
    await containerClient.createIfNotExists()
    // set access policy
    await containerClient.setAccessPolicy("container")
    console.log(`Public access enabled for container: ${IMAGE_CONTAINER_NAME}`);
}

const uploadImage = async (file) => {
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    const containerClient = blobServiceClient.getContainerClient(IMAGE_CONTAINER_NAME);
    const timestamp = Date.now();
    const newFileName = `${timestamp}-${filename}`
    const blockBlobClient = containerClient.getBlockBlobClient(newFileName)
    await blockBlobClient.upload(fileBuffer, fileBuffer.length)
    console.log(`Image '${newFileName}' uploaded successfully.`);
    return blockBlobClient.url
}

const getUrl = (fileName) => {
    const containerClient = blobServiceClient.getContainerClient(IMAGE_CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName)
    return blockBlobClient.url
}

export {configContainer, uploadImage, getUrl}