import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { deleteMovie } from '../../businessLogic/movies'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log('Delete Movie Processing event: ', event);
    const movieId = event.pathParameters.movieId
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    await deleteMovie(jwtToken, movieId)
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'Item deleted'
        }),
    }

})

handler.use(cors({
    credentials: true
}))