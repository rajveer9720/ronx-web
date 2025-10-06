import React from "react";
import { Colors } from "../../../utils/colors";

const TelegramButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://t.me/your_telegram_channel"
        target="_blank"
        rel="noopener noreferrer"
        className=" p-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center" style={{ backgroundColor: Colors.button_bg, color: Colors.button_text }}
        aria-label="Telegram"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm5.454 7.454-1.636 7.636c-.121.515-.454.636-.909.454l-2.454-1.818-1.182 1.182c-.121.121-.242.242-.485.242l.606-2.121 4.848-4.363c.242-.242-.061-.363-.363-.121l-5.939 3.939-2.121-.666c-.485-.121-.485-.485.121-.727l9.333-3.636c.424-.121.787.121.666.666z" />
        </svg>
      </a>
    </div>
  );
};

export default TelegramButton;
