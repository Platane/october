export type Blob = string

export opaque type Cursor = string

export type SafeBlob = {
  users: Blob[],
  transactions: Blob[],
  meta: Blob,
}
