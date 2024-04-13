import React, { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/YOUR_UNIQUE_PROPERTY_ID/default";
    
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);

    return () => {
      // This function will be called when the component unmounts
      document.head.removeChild(script);
    }
  }, []);

  return null;
};

export default TawkTo;
