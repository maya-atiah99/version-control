import React, { useState, useEffect, useRef, useCallback } from 'react';

const useDropdown = (initialValue) => {
  const [value, setValue] = useState(initialValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const optionsRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      optionsRef.current &&
      !optionsRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return {
    value,
    isOpen,
    searchTerm,
    dropdownRef,
    inputRef,
    optionsRef,
    setValue,
    setIsOpen,
    setSearchTerm,
  };
};

export { useDropdown };
