import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1>Privacy Policy for MindMatch</h1>
        <p className="last-updated">Last updated: March 3, 2026</p>

        <p className="intro">MindMatch values your privacy. This policy explains what data is used in the app.</p>

        <section>
          <h2>1. Data We Collect</h2>
          <p>MindMatch does not require account registration.</p>
          <p>The app may process:</p>
          <ul>
            <li>Player nickname (if you set one)</li>
            <li>Gameplay/progression data (coins, XP, wins, moves, settings)</li>
            <li>Leaderboard data (nickname, move count, seed period/date, and a CloudKit player identifier)</li>
          </ul>
        </section>

        <section>
          <h2>2. How Data Is Used</h2>
          <p>We use this data to:</p>
          <ul>
            <li>Save your game progress</li>
            <li>Sync progress (if iCloud is enabled)</li>
            <li>Show leaderboard rankings</li>
          </ul>
        </section>

        <section>
          <h2>3. Storage and Sharing</h2>
          <ul>
            <li>Local app data is stored on your device.</li>
            <li>If iCloud is enabled, app data may sync via Apple iCloud/CloudKit.</li>
            <li>MindMatch uses Google AdMob to display ads. Google may collect data such as device identifiers and usage/network information to deliver and measure ads under Google's policies.</li>
            <li>In-app purchases are processed by Apple (StoreKit). We do not receive your payment details.</li>
          </ul>
        </section>

        <section>
          <h2>4. Third-Party Services</h2>
          <ul>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a></li>
            <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">Google Ads Policy</a></li>
            <li><a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noreferrer">Apple Standard EULA</a></li>
          </ul>
        </section>

        <section>
          <h2>5. Children's Privacy</h2>
          <p>MindMatch does not knowingly collect personal information directly from children under 13. If you believe a child has provided personal information, contact us and we will address it.</p>
        </section>

        <section>
          <h2>6. Your Choices</h2>
          <ul>
            <li>You can disable iCloud for the app in iOS Settings.</li>
            <li>You can delete app data by deleting the app.</li>
            <li>Ad choices may be available through your device settings and Google controls.</li>
          </ul>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p className="contact-email">
            <a href="mailto:support@fidgetlabsinc.com">support@fidgetlabsinc.com</a>
          </p>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>We may update this policy from time to time. Updates will be posted at this URL.</p>
        </section>
      </div>
    </div>
  );
}
