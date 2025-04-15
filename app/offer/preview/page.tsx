import { Suspense } from 'react';
import OfferDisplay from '@/app/components/OfferDisplay';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const offerData = {
    candidateName: searchParams.candidateName as string || '',
    roleTitle: searchParams.roleTitle as string || '',
    baseSalary: searchParams.baseSalary as string || '',
    equityValue: searchParams.equityValue as string || '',
    benefitsValue: searchParams.benefitsValue as string || '',
    startDate: searchParams.startDate as string || '',
    customMessage: searchParams.customMessage as string || '',
    companyLogo: searchParams.companyLogo as string || '',
    teamMessages: searchParams.teamMessages as string || '[]',
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