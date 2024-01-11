import React from "react";
import { TypingDots } from "../../typing-dots";

import "./styles.scss";

export const HeroCard: React.FC = () => (
  <div className="hero-card-container">
    <div className="head-thought" />
    <div className="t">
      <div className="a">
        <div className="b">
          Tim is typing
          <TypingDots />
        </div>
      </div>
    </div>
  </div>
);