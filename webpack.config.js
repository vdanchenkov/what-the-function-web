const enhance = (config) => config

export const ClientConfig = enhance(require('react-project/webpack').ClientConfig)
export const ServerConfig = enhance(require('react-project/webpack').ServerConfig)

export { ClientConfig, ServerConfig }
