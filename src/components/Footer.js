// src/components/Footer.js
import React from 'react';
import SocialMediaLink from './SocialMediaLink';

function Footer() {
  return (
    <footer>
      <div className="social-media">
        <SocialMediaLink
          className="social-icon user"
          href="https://www.hcoco1.com/"
          iconClass="fas fa-user"
        />
        <SocialMediaLink
          className="social-icon linkedin"
          href="https://www.linkedin.com/in/hcoco1"
          iconClass="fab fa-linkedin"
        />
        <SocialMediaLink
          className="social-icon twitter"
          href="https://twitter.com/hcoco1"
          iconClass="fab fa-twitter"
        />
      </div>
      <p style={{ textAlign: 'center' }}>COPYRIGHT © 2024 Ivan Arias</p>
      <a className = "question" href="https://www.hcoco1.com/blog/2024-03-13-audits-tool" target="_blank" rel="noreferrer" >Why did I decide to build this app?</a>
    </footer>
  );
}

export default Footer;



