import React from 'react';
import Image from 'next/image';
import LoadingSpinner from '../../../public/loading-spinner.png';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        className="animate-spin h-12 w-12"
        src={LoadingSpinner}
        alt="Loading Spinner"
      />
    </div>
  );
};

export default LoadingPage;
