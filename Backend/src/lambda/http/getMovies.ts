import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getMoviesPerGenre } from '../../businessLogic/movies'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log('Get movies Processing event: ', event)
    const genreId = event.pathParameters.genreId
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const movies = await getMoviesPerGenre(jwtToken, genreId)

    return {
        statusCode: 200,
        body: JSON.stringify({
            items: movies
        })
    }

})

handler.use(cors({
    credentials: true
}))

