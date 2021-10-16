module.exports = {
  reactStrictMode: true,
  assetPrefix: process.env.APP_URL + process.env.NEXT_PUBLIC_BASE_PATH,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  trailingSlash: true,
  images: {
    loader: 'imgix',
    path: process.env.APP_URL + process.env.NEXT_PUBLIC_BASE_PATH,
  },
}
