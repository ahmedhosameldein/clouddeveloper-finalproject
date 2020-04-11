const AWS = require('aws-sdk')
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
import { Movie } from "../models/Movie"

export class MoviesAccess {

    constructor(
        private readonly docClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly moviesTable = process.env.MOVIES_TABLE) { }

    async getMoviesPerGenre(genreId: string, userId: string): Promise<Movie[]> {
        const result = await this.docClient.query({
            TableName: this.moviesTable,
            KeyConditionExpression: 'userId = :userId',
            FilterExpression: 'genreId = :genreId',
            ExpressionAttributeValues: {
                ":genreId": genreId,
                ":userId": userId
            },
            ScanIndexForward: false
        }).promise()
        return result.Items
    }

    async createMovie(movie: Movie): Promise<Movie> {
        await this.docClient.put({
            TableName: this.moviesTable,
            Item: movie
        }).promise()
        return movie
    }

    async getMovie(movieId: string): Promise<Movie> {
        const result = await this.docClient.query({
            TableName: this.moviesTable,
            KeyConditionExpression: "movieId = :movieId",
            ExpressionAttributeValues: {
                ":movieId": movieId
            }
        }).promise()
        return (result.Count !== 0) ? result[0] : null
    }

    async deleteMovie(userId: string, movieId: string) {
        await this.docClient.delete({
            TableName: this.moviesTable,
            Key: {
                'userId': userId,
                'movieId': movieId
            }
        }).promise()
    }
}