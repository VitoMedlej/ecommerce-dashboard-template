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
    
    domains: ['res.cloudinary.com','authjs.dev'],

  },
  env: {
    CLOUDINARY_CLOUD_NAME: "your-cloud-name", // Replace with your Cloudinary cloud name
  },
};
