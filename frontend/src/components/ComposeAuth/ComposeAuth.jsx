import React, { useState } from 'react';
import Web3 from 'web3';

const ComposeAuth = () => {
  const [web3, setWeb3] = useState(null);

  const initWeb3 = async () => {
    if (window.ethereum) {
      const _web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        setWeb3(_web3);
      } catch (error) {
        console.error('User denied account access');
      }
    } else if (window.web3) {
      // Legacy DApp browsers
      setWeb3(new Web3(window.web3.currentProvider));
    } else {
      console.error('Non-Ethereum browser detected');
    }
  };

  useEffect(() => {
    initWeb3();
  }, []);

};

return ()

export default ComposeAuth;

