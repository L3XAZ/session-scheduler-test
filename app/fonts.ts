import localFont from 'next/font/local';

export const poppins = localFont({
  src: [
    {
      path: './fonts/poppins-v24-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/poppins-v24-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/poppins-v24-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

export const kaiseiTokumin = localFont({
  src: [
    {
      path: './fonts/kaisei-tokumin-v11-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kaisei',
  display: 'swap',
});
