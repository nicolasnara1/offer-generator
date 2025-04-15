import { Suspense } from 'react';
import OfferDisplay from '@/app/components/OfferDisplay';

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export default function Page({ searchParams }: PageProps) {
  const offerData = {
    candidateName: searchParams.candidateName || '',
    roleTitle: searchParams.roleTitle || '',
    baseSalary: searchParams.baseSalary || '',
    equityValue: searchParams.equityValue || '',
    benefitsValue: searchParams.benefitsValue || '',
    startDate: searchParams.startDate || '',
    customMessage: searchParams.customMessage || '',
    companyLogo: searchParams.companyLogo || '',
    teamMessages: searchParams.teamMessages || '[]',
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