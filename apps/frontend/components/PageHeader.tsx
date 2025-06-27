'use client';

import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  backButton?: boolean;
  extraButtons?: React.ReactNode;
};

export function PageHeader({ title, backButton = true, extraButtons }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6 border-b pb-4">
      <div className="flex items-center gap-4">
        {backButton && (
          <button className="btn btn-secondary" onClick={() => router.back()}>Back</button>
      )}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {extraButtons}
    </div>
  );
};