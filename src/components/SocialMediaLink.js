// src/components/SocialMediaLink.js
import React from 'react';

function SocialMediaLink({ className, href, iconClass }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      <i className={iconClass}></i>
    </a>
  );
}

export default SocialMediaLink;
