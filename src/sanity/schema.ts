import { blockContent } from './schemas/blockContent'
import { galleryImage } from './schemas/galleryImage'
import { post } from './schemas/post'
import { project } from './schemas/project'
import { siteSettings } from './schemas/siteSettings'
import { workExperience } from './schemas/workExperience'

export const schema = {
  types: [siteSettings, workExperience, project, post, galleryImage, blockContent],
}
