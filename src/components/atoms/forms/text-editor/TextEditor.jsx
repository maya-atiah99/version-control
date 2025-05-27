import React, { useCallback, useEffect, useState } from 'react';
import styles from './TextEditor.module.scss';
import './styles.css';
import 'react-quill/dist/quill.snow.css';
import Label from '../label/Label';
import { ToolBar } from './tool-bar/ToolBar';
import { formats } from './tool-bar/ToolBar';
import debounce from 'lodash.debounce';
import ReactQuill from 'react-quill';

const TextEditor = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  error,
  touched,
  isLoading,
  customFormats,
  className,
  isToolbarReduced = false,
  textEditorClassName,
}) => {
  const [editorContent, setEditorContent] = useState(value || '');
  const [toolbarId] = useState(
    () => `toolbar-${Math.random().toString(36).substring(2, 15)}`
  );

  useEffect(() => {
    setEditorContent(value || '');
  }, [value]);

  const debouncedOnChange = useCallback(
    debounce((content) => {
      if (onChange) onChange(content);
    }, 300),
    [onChange]
  );

  const handleEditorChange = (content) => {
    setEditorContent(content);
    debouncedOnChange(content);
  };
  const getModules = () => ({
    toolbar: {
      container: `#${toolbarId}`,
    },
  });
  return (
    <div>
      <Label text={label} />
      <div className={`textEditorCont ${className ?? ''}`}>
        <ToolBar
          setEditorContent={setEditorContent}
          editorContent={editorContent}
          isToolbarReduced={isToolbarReduced ?? false}
          id={toolbarId}
        />
        <ReactQuill
          value={isLoading ? '...' : editorContent}
          onChange={handleEditorChange}
          modules={getModules()}
          formats={customFormats ?? formats}
          placeholder={placeholder ?? 'Enter Content'}
          className={`${styles['text-editor']} ${textEditorClassName ?? ''}`}
        />
      </div>

      {error && touched && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TextEditor;
