import React from 'react';
import { Quill } from 'react-quill';
import '../styles.css';

const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
];
Quill.register(Font, true);

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
};

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'color',
  'background',
  'align',
];

export const ToolBar = ({ isToolbarReduced, id }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid #EEE ',
        position: 'relative',
        flexWrap: 'wrap',
      }}
    >
      {isToolbarReduced ? (
        <div id={id}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
          </span>
        </div>
      ) : (
        <div id={id}>
          <span className="ql-formats">
            <select className="ql-font" defaultValue="arial">
              <option value="arial">Arial</option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
              <option value="helvetica">Helvetica</option>
              <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size" defaultValue="medium">
              <option value="extra-small">Small</option>
              <option value="small">Normal</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="huge">Huge</option>
            </select>
          </span>

          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
          </span>

          <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
          </span>
          <span className="ql-formats">
            <select className="ql-align" />
          </span>
        </div>
      )}
    </div>
  );
};
