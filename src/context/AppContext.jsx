import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children, initialData = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState([
    {
      title: 'Project',
      linkTo: 'project',
      isBack: true,
    },
    {
      title: 'Projects',
      linkTo: 'projects',
    },
    {
      title: 'Users',
      linkTo: 'users',
    },
    {
      title: 'Email Template',
      linkTo: 'edit-email-template',
      isBack: true,
    },
    {
      title: 'Email Template',
      linkTo: 'email-template',
    },
    {
      title: 'Email Template',
      isBack: true,
      linkTo: 'new-email-template',
    },
    {
      title: 'New Project',
      isBack: true,
      linkTo: 'new-project',
    },
    {
      title: 'Edit Project',
      isBack: true,
      linkTo: 'edit-project',
    },
    {
      title: 'Profile',
      isBack: true,
      linkTo: 'profile',
    },
  ]);
  return (
    <AppContext.Provider value={{ links, setLinks, isOpen, setIsOpen }}>
      {children}
    </AppContext.Provider>
  );
};
