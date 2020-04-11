import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { createGenre } from '../../businessLogic/genres'
import { CreateGenreRequest } from '../../requests/createGenreRequest'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Create genre processing event: ', event);
    const createGenreRequest: CreateGenreRequest = JSON.parse(event.body)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const newItem = await createGenre(jwtToken, createGenreRequest)
    return {
        statusCode: 200,
        body: JSON.stringify({
            newItem
        })
    }
})

handler.use(cors({
    credentials: true
}))