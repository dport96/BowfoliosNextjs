'use client';

import { useEffect, useState } from 'react';

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Or a loading spinner
  }

  return children;
};

export default ClientOnly;
