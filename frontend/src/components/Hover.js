// hover.js
import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const HoverComponent = () => {
  return (
    <div className="w-44 h-56 rounded-lg flex items-center justify-center">
      <div className="rounded-full bg-indigo-500 p-2 flex items-center justify-center">
        <Icon icon="weui:play-filled" style={{ color: 'black', fontSize: '32px' }} />
      </div>
    </div>
  );
};

export default HoverComponent;
