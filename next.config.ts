export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      }
    ],
    
    domains: ['res.cloudinary.com','authjs.dev','wavescode8cdn.sirv.com'],

  },
  env: {
    CLOUDINARY_CLOUD_NAME: "your-cloud-name", // Replace with your Cloudinary cloud name
  },
};
