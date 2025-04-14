'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// Add animation keyframes to the top of the file
const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-scale-in {
  opacity: 0;
  animation: scaleIn 0.5s ease-out forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }
.delay-5 { animation-delay: 1s; }
.delay-6 { animation-delay: 1.2s; }
`;

interface TeamMessage {
  name: string;
  title: string;
  message: string;
}

type OfferDisplayProps = {
  candidateName: string;
  roleTitle: string;
  baseSalary: string;
  equityValue: string;
  benefitsValue: string;
  startDate: string;
  customMessage: string;
  companyLogo?: string;
};

export default function OfferDisplay({
  candidateName,
  roleTitle,
  baseSalary,
  equityValue,
  benefitsValue,
  startDate,
  customMessage,
  companyLogo,
}: OfferDisplayProps) {
  const searchParams = useSearchParams();
  const [resolvedTeamMessages, setResolvedTeamMessages] = useState<TeamMessage[]>([]);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const teamMessagesParam = searchParams.get('teamMessages');
    if (teamMessagesParam) {
      try {
        const parsedMessages = JSON.parse(teamMessagesParam);
        setResolvedTeamMessages(parsedMessages);
      } catch (error) {
        console.error('Failed to parse team messages', error);
        setResolvedTeamMessages([]);
      }
    }

    const end = Date.now() + 2000;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    (function frame() {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [searchParams]);

  const totalCompensation = Number(baseSalary) + Number(equityValue) + Number(benefitsValue);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const celebrateAcceptance = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
    };

    function shoot() {
      confetti({ ...defaults, particleCount: 50, scalar: 1.2, shapes: ['star'] });
      confetti({ ...defaults, particleCount: 20, scalar: 2, shapes: ['circle'] });
    }

    [0, 100, 200, 300, 400].forEach(t => setTimeout(shoot, t));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <style jsx global>{styles}</style>
      <header className="bg-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          {companyLogo && (
            <Image src={companyLogo} alt="Company Logo" width={160} height={40} className="object-contain" />
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* ...component content remains unchanged... */}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            <div className="mt-2">
              This offer is confidential and subject to the terms outlined in your offer letter.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
