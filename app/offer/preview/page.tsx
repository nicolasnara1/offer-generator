import { Suspense } from 'react';
import OfferDisplay from '@/app/components/OfferDisplay';

type Props = {
  params: Promise<any>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  
  const offerData = {
    candidateName: resolvedParams.candidateName?.toString() || '',
    roleTitle: resolvedParams.roleTitle?.toString() || '',
    baseSalary: resolvedParams.baseSalary?.toString() || '',
    equityValue: resolvedParams.equityValue?.toString() || '',
    benefitsValue: resolvedParams.benefitsValue?.toString() || '',
    startDate: resolvedParams.startDate?.toString() || '',
    customMessage: resolvedParams.customMessage?.toString() || '',
    companyLogo: resolvedParams.companyLogo?.toString() || '',
    teamMessages: resolvedParams.teamMessages?.toString() || '[]',
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