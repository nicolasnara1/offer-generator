'use client';

import { Suspense } from 'react';
import OfferDisplay from '@/app/components/OfferDisplay';

const offerData = {
  candidateName: 'John Doe',
  roleTitle: 'Product Designer',
  baseSalary: '120000',
  equityValue: '20000',
  benefitsValue: '10000',
  startDate: '2025-05-01',
  customMessage: 'We’re so excited to have you on board!',
  companyLogo: '/logo.png',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Suspense fallback={<div>Loading offer...</div>}>
        <OfferDisplay {...offerData} />
      </Suspense>
    </main>
  );
}