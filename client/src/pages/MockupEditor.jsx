import React from 'react';
import CanvasEditor from '../components/CanvasEditor';

const MockupEditor = () => (
  <div>
    <h1 style={{
      textAlign: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 700,
      color: '#1a1a1a'
    }}>
      Canvas
    </h1>
    <CanvasEditor />
  </div>
);

export default MockupEditor;
