import path from 'path'
import { readdirSync } from 'fs'
import { filter, map } from 'ramda'

const isResolverFile = (filename: string) => filename.endsWith('.json')

const filterResolvers = filter(isResolverFile)

const readResolversDir = (dir: string) => {
  const files = readdirSync(dir)
  const resolverFilters = filterResolvers(files)

  console.assert(resolverFilters.length, 'No resolver configs found.')
  const concatenatePathnames = map((fileName: string) => path.join(dir, fileName))

  return concatenatePathnames(resolverFilters)
}

export default readResolversDir
