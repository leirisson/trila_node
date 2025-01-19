// /users/:id
export function buildRoutePath(path) {
  const routerParametersRegex =  /:([a-zA-Z]+)/g

  const pathWithParams = path.replaceAll(routerParametersRegex, '(?<$1>[a-zA-Z0-9\\-]+)')

  const pathREgex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathREgex
}