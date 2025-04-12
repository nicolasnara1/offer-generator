'use client';

import { useSearchParams } from 'next/navigation';
import OfferDisplay from '../../components/OfferDisplay';

export default function OfferPreview() {
  const searchParams = useSearchParams();
  
  const offerData = {
    candidateName: searchParams.get('candidateName') || '',
    roleTitle: searchParams.get('roleTitle') || '',
    baseSalary: searchParams.get('baseSalary') || '0',
    equityValue: searchParams.get('equityValue') || '0',
    benefitsValue: searchParams.get('benefitsValue') || '0',
    startDate: searchParams.get('startDate') || '',
    customMessage: searchParams.get('customMessage') || '',
    companyLogo: searchParams.get('companyLogo') || undefined,
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <OfferDisplay {...offerData} />
    </main>
  );
} 