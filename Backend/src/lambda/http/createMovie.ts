import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateMovieRequest } from '../../requests/CreateMovieRequest'
import { createMovie, getMovieUploadUrl } from '../../businessLogic/movies'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log('Processing event: ', event);
    const createMovieRequest: CreateMovieRequest = JSON.parse(event.body)
    const genreId = event.pathParameters.genreId
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const newItem = await createMovie(jwtToken, createMovieRequest, genreId)
    const uploadUrl = getMovieUploadUrl(newItem.movieId)
    return {
        statusCode: 201,
        body: JSON.stringify({
            newItem: newItem,
            uploadUrl: uploadUrl
        })
    }

})


handler.use(cors({
    credentials: true
}))