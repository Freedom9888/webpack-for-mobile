export interface RemoteConfig {
  name: string
  entry: string
}

export const remotes: Record<string, RemoteConfig> = {
  // Example remote module configuration:
  // dashboard: {
  //   name: 'dashboard',
  //   entry: 'dashboard@http://localhost:3001/remoteEntry.js',
  // },
}
