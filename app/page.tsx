'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/app/file-upload';

export default function Page() {
  const router = useRouter();

  const handleAnalysisComplete = () => {
    console.log("File analysis completed!");
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FileUpload onAnalysisComplete={handleAnalysisComplete} />
    </div>
  );
}
