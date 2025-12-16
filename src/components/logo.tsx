import { Dog } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="flex w-fit items-center gap-4 rounded-b-lg bg-[#2E2C30] p-3"
    >
      <div className="flex size-8 items-center justify-center rounded bg-background-brand">
        <Dog />
      </div>
      <span className="font-bold text-content-brand text-label-large-size">
        MUNDO PET
      </span>
    </Link>
  );
}
