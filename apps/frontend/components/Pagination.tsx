'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
}

export function Pagination({ total, limit, page }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/recipes?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Link
        href={createPageURL(page - 1)}
        className={`btn btn-secondary ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={page <= 1}
      >
        Previous
      </Link>

      <span>
        Page {page} of {totalPages}
      </span>

      <Link
        href={createPageURL(page + 1)}
        className={`btn btn-secondary ${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={page >= totalPages}
      >
        Next
      </Link>
    </div>
  );
}