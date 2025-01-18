// users/:id
export function buildRoutePath(path) {
  const routerParametersRegex =  /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routerParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathREgex = new RegExp(`^${pathWithParams}`)

  return pathREgex
}