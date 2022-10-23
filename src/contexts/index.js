import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export default function AppContextProvider({ children }) {
  const [modal, setModal] = useState(null);
  const value = { modal, setModal };

  const closeModal = e => {
    if (e.target === e.currentTarget) setModal(null);
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    modal ? body.classList.add('modal-open') : body.classList.remove('modal-open');
  }, [modal]);

  return (
    <AppContext.Provider value={value}>
      <div id="notification-wrapper" />
      {children}
      {modal && <div className="modal" onClick={closeModal}>{modal}</div>}
    </AppContext.Provider>
  );
}

AppContextProvider.defaultProps = {
  children: null,
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};
