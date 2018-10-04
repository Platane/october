export const safeJSONparse = (x: any): * => {
  try {
    return JSON.parse(x)
  } catch (err) {
    return null
  }
}
