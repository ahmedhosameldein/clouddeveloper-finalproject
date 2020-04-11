import { MovieModel } from './MovieModel'

export interface MovieUploadResponse {
  newItem: MovieModel
  uploadUrl: string
}
