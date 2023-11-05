import Link from 'next/link';

export function Language({ ...props }) {
  return (
    <div {...props}>
      <div className="flex space-x-2.5 mx-2 mt-5 md:mt-0 md:flex-col md:space-x-0 md:mx-0 lg:space-x-2.5 lg:flex-row lg:mx-0">
        <Link href="/" className="text-lg">
          🇺🇸
        </Link>
        <Link href="/pt-br" className="text-lg">
          🇧🇷
        </Link>
      </div>
    </div>
  );
}
