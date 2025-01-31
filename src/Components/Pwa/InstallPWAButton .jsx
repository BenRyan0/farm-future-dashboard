import React, { useEffect, useState } from 'react'
import { MdInstallMobile } from "react-icons/md";


const InstallPWAButton = () => {
  const [promptEvent, setPromptEvent] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
      setPromptEvent(event);
    });
  }, []);

  const handleInstall = () => {
    if (promptEvent) {
      promptEvent.prompt(); 
      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setPromptEvent(null); // Reset for future prompts
      });
    }
  };

  return (
    <button className='flex justify-center items-center gap-1 md:hidden text-sm pb-2'
      onClick={handleInstall}
      disabled={!promptEvent}
    >
      {promptEvent ? 'Install' : 'Install PWA'} 
      <MdInstallMobile className='mb-1'/>
    </button>
  );
};

export default InstallPWAButton;