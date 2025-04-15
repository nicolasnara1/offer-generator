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
      <Suspense fallback={<div>Loading offer...</div>}>
        <OfferDisplay {...offerData} />
      </Suspense>
    </main>
  );
}