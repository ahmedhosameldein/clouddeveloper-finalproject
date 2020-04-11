const AWS = require('aws-sdk')
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
import { Genre } from "../models/Genre"

export class GenreAccess {

    constructor(
        private readonly docClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly genresTable = process.env.GENRES_TABLE) { }

    async getAllGenres(userId: string): Promise<Genre[]> {
        const result = await this.docClient.query({
            TableName: this.genresTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false
        }).promise()
        const items = result.Items
        return items
    }

    async createGenre(genre: Genre): Promise<Genre> {
        await this.docClient.put({
            TableName: this.genresTable,
            Item: genre
        }).promise()
        return genre
    }

}