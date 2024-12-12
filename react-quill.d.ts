declare module 'react-quill';
import * as React from 'react';

declare module 'react-quill' {
  interface ReactQuillProps {
    value: string;
    onChange: (value: string) => void;
    modules: any;
    className: string;
  }

  const ReactQuill: React.FC<ReactQuillProps>;

  export default ReactQuill;
}





