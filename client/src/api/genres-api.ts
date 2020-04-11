import { GenreModel } from '../types/GenreModel'
import { apiEndpoint } from '../config'
import { GenreUploadInfo } from '../types/GenreUploadInfo'

export async function getGenres(idToken: string): Promise<GenreModel[]> {
  console.log('Fetching groups')
  const response = await fetch(`${apiEndpoint}/genres`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  const result = await response.json()
  return result.items
}

export async function createGenre(
  idToken: string,
  newGroup: GenreUploadInfo
): Promise<GenreModel> {
  const reply = await fetch(`${apiEndpoint}/genres`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify({
      name: newGroup.name
    })
  })
  const result = await reply.json()
  return result.newItem
}
