export enum StorageKeys {
  DATA_SOURCE = "DATA_SOURCE"
}

export interface DataSourceItem {
  hostname: string
  redirectKey: string
  disable: boolean
}
