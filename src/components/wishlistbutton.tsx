import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

export default function wishlistbutton({
  isInWishList = false,
  onToggle = () => {},
  size = 7,
}) {
  return (
    <>
      {!isInWishList && (
        <div className="relative" onClick={onToggle}>
          <HeartIcon
            className={`w-${size} h-${size} mx-7 cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-0`}
          />
          <HeartIconSolid
            className={`w-${size} h-${size} mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100`}
          />
        </div>
      )}
      {isInWishList && (
        <div className="relative group" onClick={onToggle}>
          <HeartIconSolid
            className={`w-${size} h-${size} mx-7 cursor-pointer transition-opacity duration-200 ease-in-out group-hover:opacity-0`}
          />
          <HeartIcon
            className={`w-${size} h-${size} mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100`}
          />
        </div>
      )}
    </>
  );
}
