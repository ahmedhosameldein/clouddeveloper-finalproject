import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getMovie } from '../../businessLogic/movies'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log('Get movie Processing event: ', event)
    const movieId = event.pathParameters.movieId
    const movie = await getMovie(movieId)
    if (movie) {
        return {
            statusCode: 200,
            body: JSON.stringify(
                movie
            )
        }
    }
    return {
        statusCode: 404,
        body: JSON.stringify({
            error: "Image not found"
        })
    }
})

handler.use(cors({
    credentials: true
}))
