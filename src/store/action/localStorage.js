export const readLocalStorage = (payload: { keys: * }) => ({
  ...payload,
  type: 'localStorage:read',
})
