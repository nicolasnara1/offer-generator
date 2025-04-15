'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OfferDisplay from '@/app/components/OfferDisplay';

export default function Page() {
  const searchParams = useSearchParams();
  
  const offerData = {
    candidateName: searchParams.get('candidateName') || '',
    roleTitle: searchParams.get('roleTitle') || '',
    baseSalary: searchParams.get('baseSalary') || '',
    equityValue: searchParams.get('equityValue') || '',
    benefitsValue: searchParams.get('benefitsValue') || '',
    startDate: searchParams.get('startDate') || '',
    customMessage: searchParams.get('customMessage') || '',
    companyLogo: searchParams.get('companyLogo') || '',
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }>
        <OfferDisplay {...offerData} />
      </Suspense>
    </main>
  );
}