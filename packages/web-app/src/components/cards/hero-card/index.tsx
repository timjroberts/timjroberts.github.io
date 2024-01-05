import React from "react";

import "./styles.scss";
import { TypingDots } from "../..";

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