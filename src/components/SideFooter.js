import React from 'react';
import config from '../../config';
export default function SideFooter() {
  return (
    <footer>
      <ul className="items">
        {config.emailId && (
          <li>
            <h3>Email</h3>
            <a href={`mailto:${config.emailId}`}>{config.emailId}</a>
          </li>
        )}

        <li>
          <h3>Social Links</h3>
          <ul className="icons">
            {config.socialLinks.map(social => {
              const { icon, name, url } = social;
              return (
                <li key={url}>
                  <a href={url} className={`icon ${icon}`}>
                    <span className="label">{name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </footer>
  );
}
