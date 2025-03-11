/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["plus.unsplash.com", "res.cloudinary.com", "localhost", 'www.eswiftpropertymart.ng'], // Add the domain of the external images
  },
  // output: 'export',
  // images: {
  //   unoptimized: true
  // },
  // exportPathMap: function () {
  //   return {
  //     '/': { page: '/' },
  //     '/raceListener': { page: '/raceListener' }
  //   }
  // }
};

export default nextConfig;
