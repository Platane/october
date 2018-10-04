export const routes = [
  { path: '/', key: 'home' },
  { path: '/safe/create', key: 'createSafe' },
  { path: '/safe/:safeId', key: 'safe' },
  { path: '/safe/:safeId/share', key: 'shareSafe' },
  { path: '/safe/:safeId/transaction', key: 'safe' },
  { path: '/safe/:safeId/transaction/create', key: 'createTransaction' },
  { path: '/safe/:safeId/transaction/:transactionId', key: 'transaction' },
]
