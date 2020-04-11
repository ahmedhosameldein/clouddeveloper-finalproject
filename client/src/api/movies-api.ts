import { apiEndpoint } from '../config'
import { MovieModel } from '../types/MovieModel'
import { MovieUploadInfo } from '../types/MovieUploadInfo'
import { MovieUploadResponse } from '../types/MovieUploadResponse'

export async function getMovies(idToken: string, genreId: string): Promise<MovieModel[]> {
  console.log('Fetching images')
  const response = await fetch(`${apiEndpoint}/genres/${genreId}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  const result = await response.json()

  return result.items
}

export async function createMovie(
  idToken: string,
  newImage: MovieUploadInfo
): Promise<MovieUploadResponse> {

  const reply = await fetch(
    `${apiEndpoint}/genres/${newImage.genreId}/movies`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        title: newImage.title
      })
    }
  )

  return await reply.json()
}

export async function deleteMovie(
  idToken: string,
  movieId: string
): Promise<void> {
  await fetch(`${apiEndpoint}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file
  })
}


