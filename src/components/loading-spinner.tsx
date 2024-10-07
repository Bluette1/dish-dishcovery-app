import React from 'react';
import Image from 'next/image';
import styles from '../styles/loading-spinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={styles.spinner}>
        <Image
          src="/icons/logo-favicon-color.svg"
          alt="Loading..."
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
