import { Suspense } from 'react';
import OfferDisplay from '@/app/components/OfferDisplay';

type Props = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page(props: Props) {
  const { searchParams } = props;
  
  const offerData = {
    candidateName: searchParams.candidateName?.toString() || '',
    roleTitle: searchParams.roleTitle?.toString() || '',
    baseSalary: searchParams.baseSalary?.toString() || '',
    equityValue: searchParams.equityValue?.toString() || '',
    benefitsValue: searchParams.benefitsValue?.toString() || '',
    startDate: searchParams.startDate?.toString() || '',
    customMessage: searchParams.customMessage?.toString() || '',
    companyLogo: searchParams.companyLogo?.toString() || '',
    teamMessages: searchParams.teamMessages?.toString() || '[]',
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