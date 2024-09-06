// components/Logo.tsx
import Image from 'next/image';

const Logo: React.FC = () => (
  <Image src="/logo.svg" alt="Logo" width={170} height={170} />
);

export default Logo;
