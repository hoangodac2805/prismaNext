'use client'
import useOutsideClick from '@/hooks/useOutsideClick';
import React, { useRef, useState } from 'react';


const Home: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    alert('Clicked outside the element!');
  });

  return (
   <div>
     <div ref={ref} style={{ padding: '20px', background: '#f0f0f0' }}>
      Click outside this box to trigger the callback.
    </div>
   </div>
  );
};

export default Home;