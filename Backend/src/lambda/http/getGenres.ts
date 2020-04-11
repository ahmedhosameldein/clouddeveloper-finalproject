import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { getAllGenres } from '../../businessLogic/genres'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Get genres processing event: ', event)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const items = await getAllGenres(jwtToken)
    return {
        statusCode: 200,
        body: JSON.stringify({
            items: items
        })
    }
})

handler.use(cors({
    credentials: true
}))
