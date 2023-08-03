import React, { useState } from 'react';
import generateWalletData from '../../utils/AccountUtils';

const AccountCreate: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [accountData, setAccountData] = useState<any | null>(null);

  const handleCreateAccount = () => {
    const wdata = generateWalletData();
    wdata.then((data) => {
      console.log(data);
      setAccountData(data);
      setShowInput(false);
      setSeedPhrase('');
    })
  };

  const handleRecoverAccount = () => {
    setShowInput(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeedPhrase(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateAccountWithSeedPhrase();
    }
  };

  const handleCreateAccountWithSeedPhrase = () => {
    const wdata = generateWalletData(seedPhrase);
    wdata.then((data) => {
      console.log(data);
      setAccountData(data);
      setShowInput(false);
      debugger;
    });
  };

  const handleReset = () => {
    setShowInput(false);
    setSeedPhrase('');
    setAccountData(null);
  };

  return (
    <div>
      {/* Add any other content or form fields here if needed */}
      {showInput ? (
        <div>
          <input
            type="text"
            value={seedPhrase}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            placeholder="Enter your seed phrase"
          />
          <button onClick={handleCreateAccountWithSeedPhrase}>Recover Account</button>
        </div>
      ) : (
        <>
          <button onClick={handleCreateAccount}>Create Account</button>
          <button onClick={handleRecoverAccount}>Recover Account</button>
        </>
      )}
        {!showInput && accountData ? (
        <div>
          <p>Seed Phrase: {accountData.seedPhrase}</p>
          <p>Private Key: {accountData.privateKey}</p>
          <p>Address: {accountData.address}</p>
          <button onClick={handleReset}>Reset</button>
        </div>
        ):null}
    </div>
  );
};

export default AccountCreate;
