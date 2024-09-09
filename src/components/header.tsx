// import { useState } from 'react';
// import styles from '../styles/header.module.css'; // Import your CSS module

// const Header = () => {
//   const [email, setEmail] = useState<string>('');
//   const [success, setSuccess] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setError(null);
//     setSuccess(false);

//     try {
//       // Replace with your actual API endpoint or subscription logic
//       const response = await fetch('/api/subscribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess(true);
//         setEmail('');
//       } else {
//         setError(data.message || 'Subscription failed');
//       }
//     } catch (err) {
//       setError('An error occurred');
//     }
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.content}>
//         <h1>Coming Soon in Summer</h1>
//         <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//             className={styles.input}
//           />
//           <button type="submit" className={styles.button}>
//             Join our waiting list
//           </button>
//         </form>
//         {success && <p className={styles.success}>Thank you for subscribing!</p>}
//         {error && <p className={styles.error}>{error}</p>}
//       </div>
//     </header>
//   );
// };

// export default Header;

// import { useState } from 'react';
// import SubscriptionForm from './subscription-form';

// const Header = () => {
//   const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

//   const handleOpenForm = () => setIsFormOpen(true);
//   const handleCloseForm = () => setIsFormOpen(false);

//   return (
//     <>
//       <header className="bg-gray-800 text-white p-2 text-center text-sm fixed top-0 left-0 right-0 z-50">
//         <div className="container mx-auto">
//           <span>Coming Soon in Summer 2025</span>
//           <button
//             onClick={handleOpenForm}
//             className="ml-4 text-green-400 hover:underline"
//           >
//             Join our waiting list
//           </button>
//         </div>
//       </header>
//       <SubscriptionForm isOpen={isFormOpen} onClose={handleCloseForm} />
//     </>
//   );
// };

// export default Header;

// import { useState } from 'react';
// import SubscriptionForm from './subscription-form';

// const Header = () => {
//   const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

//   const handleOpenForm = () => setIsFormOpen(true);
//   const handleCloseForm = () => setIsFormOpen(false);

//   return (
//     <>
//       <header className="bg-gray-800 text-white p-2 text-center text-sm fixed top-0 left-0 right-0 z-50">
//         <div className="container mx-auto flex justify-between items-center">
//           <span>Coming Soon in Summer 2025</span>
//           <button
//             onClick={handleOpenForm}
//             className="text-green-400 hover:underline"
//           >
//             Join our waiting list
//           </button>
//         </div>
//       </header>
//       <SubscriptionForm isOpen={isFormOpen} onClose={handleCloseForm} />
//     </>
//   );
// };

// export default Header;
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



