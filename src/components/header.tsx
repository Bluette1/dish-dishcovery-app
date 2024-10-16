
import { useState } from 'react';
import SubscriptionForm from './subscription-form';

const Header = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <>
      <header className="bg-gray-800 text-white p-4 text-sm fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-screen-lg">
          <span className="flex-1 text-center">Coming Soon in Summer 2025</span>
          <button
            onClick={handleOpenForm}
            className="ml-4 text-green-400 hover:underline"
          >
            Join our waiting list
          </button>
        </div>
      </header>
      <SubscriptionForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </>
  );
};

export default Header;



