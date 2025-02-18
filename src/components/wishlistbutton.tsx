import React, { useContext } from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { ShopContext } from '../context/shop';

const sizeClasses: { [key: string]: string } = {
  7: 'w-7 h-7',
  14: 'w-14 h-14',
};

interface WishlistButtonProps {
  meal?: { _id: string };
  size?: 7 | 14;
}

export default function WishlistButton({
  meal = { _id: '' },
  size = 7,
}: WishlistButtonProps) {
  const shop = useContext(ShopContext);
  const { isInWishList, addToWishList, removeFromWishList } = shop;
  const sizeClass = sizeClasses[size.toString()] || sizeClasses['7'];

  return (
    <>
      {!isInWishList(meal._id) && (
        <div
          className="relative group"
          onClick={async () => {
            await addToWishList(meal);
          }}
        >
          <HeartIcon
            className={`${sizeClass} mx-7 cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-0`}
          />
          <HeartIconSolid
            className={`${sizeClass} mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100`}
          />
        </div>
      )}

      {isInWishList(meal._id) && (
        <div
          className="relative group"
          onClick={async () => {
            await removeFromWishList(meal._id);
          }}
        >
          <HeartIconSolid
            className={`${sizeClass} mx-7 cursor-pointer transition-opacity duration-200 ease-in-out group-hover:opacity-0`}
          />
          <HeartIcon
            className={`${sizeClass} mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100`}
          />
        </div>
      )}
    </>
  );
}
