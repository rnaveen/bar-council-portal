'use client';

export default function CandidateFloater() {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <img
        src="/candidate-floater.png"
        alt="Candidate Konda Reddy. B - Vote ONE at S.No. 58"
        className="w-32 h-auto sm:w-40 md:w-48 lg:w-56 shadow-2xl rounded-lg hover:scale-105 transition-transform duration-300"
        style={{ maxHeight: '80vh', maxWidth: '90vw' }}
      />
    </div>
  );
}
