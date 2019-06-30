import React, {useState, useEffect} from 'react';

function OfflineWarning() {
  const [online, updateStatus] = useState(true);

  useEffect(() => {
    window.addEventListener('online', () => updateStatus(true));
    window.addEventListener('offline', () => updateStatus(false));

    return () => {
      window.removeEventListener('online');
      window.removeEventListener('offline');
    };
  }, []);

  return (
    <div style={{display: online ? 'none' : 'inherit'}}>Working offline...</div>
  );
}

OfflineWarning.displayName = 'OfflineWarning';

export default OfflineWarning;
