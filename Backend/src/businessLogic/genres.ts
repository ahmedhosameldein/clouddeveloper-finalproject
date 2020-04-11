import * as uuid from 'uuid'
import { Genre } from '../models/Genre'
import { GenreAccess } from '../dataLayer/genresAccess'
import { CreateGenreRequest } from '../requests/createGenreRequest'
import { getUserId } from '../auth/utils'
const genreAccess = new GenreAccess()

export async function getAllGenres(jwtToken: string): Promise<Genre[]> {
    const userId = getUserId(jwtToken)
    return genreAccess.getAllGenres(userId)
}

export async function createGenre(
    jwtToken: string,
    createGenreRequest: CreateGenreRequest
): Promise<Genre> {
    const userId = getUserId(jwtToken)
    const itemId = uuid.v4()
    return await genreAccess.createGenre({
        userId: userId,
        id: itemId,
        name: createGenreRequest.name
    })
}
