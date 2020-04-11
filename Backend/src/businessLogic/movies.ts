import * as uuid from 'uuid'
import { Movie } from '../models/Movie'
import { MoviesAccess } from '../dataLayer/moviesAccess'
import { getUploadUrl } from '../dataLayer/fileStorage'
import { CreateMovieRequest } from '../requests/CreateMovieRequest'
import { getUserId } from '../auth/utils'
const bucketName = process.env.MOVIES_S3_BUCKET

const moviesAccess = new MoviesAccess()

export async function getMoviesPerGenre(jwtToken: string, genreId: string): Promise<Movie[]> {
    const userId = getUserId(jwtToken)
    return moviesAccess.getMoviesPerGenre(genreId, userId)
}

export async function createMovie(
    jwtToken: string,
    createMovieRequest: CreateMovieRequest,
    genreId: string
): Promise<Movie> {
    const userId = getUserId(jwtToken)
    const movieId = uuid.v4()
    return await moviesAccess.createMovie({
        userId: userId,
        genreId: genreId,
        movieId: movieId,
        title: createMovieRequest.title,
        timestamp: new Date().toISOString(),
        imageUrl: `https://${bucketName}.s3.amazonaws.com/${movieId}.jpg`
    })
}

export function getMovieUploadUrl(movieId: string) {
    return getUploadUrl(movieId + '.jpg')
}

export async function deleteMovie(jwtToken: string, movieId: string) {
    const userId = getUserId(jwtToken)
    await moviesAccess.deleteMovie(userId, movieId)
}

export async function getMovie(movieId: string): Promise<Movie> {
    return await moviesAccess.getMovie(movieId)
}