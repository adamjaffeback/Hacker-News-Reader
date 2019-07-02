import React, {useState, useEffect} from 'react';

/**
 * Show when the application is working offline from the service worker due to
 * the network being disconnected.
 */
function OfflineWarning() {
  const [online, updateStatus] = useState(true);
  const styles = {
    color: '#aeb4c1',
    display: online ? 'none' : 'inherit',
  };

  const doStatusUpdate = online => updateStatus(online);

  useEffect(() => {
    window.addEventListener('online', doStatusUpdate.bind(null, true));
    window.addEventListener('offline', doStatusUpdate.bind(null, false));

    return () => {
      window.removeEventListener('online', doStatusUpdate.bind(null, true));
      window.removeEventListener('offline', doStatusUpdate.bind(null, false));
    };
  }, []);

  return (
    <div style={styles}>Working offline...</div>
  );
}

OfflineWarning.displayName = 'OfflineWarning';

export default OfflineWarning;
