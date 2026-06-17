import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function renderMessageText(text) {
  if (!text) {
    return null;
  }
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default function SupportChat() {
  const { authTokens } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!authTokens?.access || bootstrapped) {
        return;
      }
      setBootstrapped(true);
      setLoading(true);
      try {
        const greeting =
          i18n.language === 'ru'
            ? 'Привет'
            : i18n.language === 'kz'
              ? 'Сәлем'
              : 'Hello';
        const response = await axios.post(
          'chatbot/query/',
          { message: greeting, history: [] },
          {
            headers: { Authorization: `Bearer ${authTokens.access}` },
          }
        );
        setMessages([{ role: 'assistant', text: response.data.reply, engine: response.data.engine }]);
        setSuggestions(response.data.suggestions || []);
      } catch (error) {
        setMessages([
          {
            role: 'assistant',
            text: t('chat.welcomeFallback'),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [authTokens, bootstrapped, i18n.language, t]);

  const sendMessage = async (textOverride) => {
    const userText = (textOverride ?? message).trim();
    if (!userText || loading) {
      return;
    }

    const history = messages.map((item) => ({
      role: item.role,
      text: item.text,
    }));

    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setMessage('');
    setSuggestions([]);
    setLoading(true);

    try {
      const response = await axios.post(
        'chatbot/query/',
        { message: userText, history },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: response.data.reply, engine: response.data.engine },
      ]);
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: t('chat.error') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const displayName = authTokens?.user?.first_name || 'Student';

  return (
    <div className="rooms">
      <Navbar />
      <div className="rooms-container support-chat-page">
        <section className="dorm-information">
          <header className="dorm-information-header">
            <div className="title-main">
              <h1>{t('chat.title')}</h1>
              <p>{t('chat.subtitle')}</p>
            </div>
          </header>
        </section>

        <section className="support-chat-panel">
          <div className="support-chat-header">
            <div className="support-chat-avatar">DH</div>
            <div>
              <h3>{t('chat.botName')}</h3>
              <p className="support-chat-meta">
                {t('chat.online')} · {displayName}
              </p>
            </div>
          </div>

          <div className="support-chat-messages">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`support-chat-bubble ${item.role}`}
              >
                {renderMessageText(item.text)}
              </div>
            ))}
            {loading && (
              <div className="support-chat-typing">{t('chat.typing')}</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length > 0 && messages[messages.length - 1]?.engine && (
            <p className="support-chat-engine-hint" style={{ fontSize: '0.75rem', opacity: 0.6, margin: '4px 12px' }}>
              {messages[messages.length - 1].engine === 'gemini' ? '✦ AI (Gemini)' : messages[messages.length - 1].engine === 'builtin' ? '' : `✦ ${messages[messages.length - 1].engine}`}
            </p>
          )}

          {suggestions.length > 0 && !loading && (
            <div className="support-chat-suggestions">
              {suggestions.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="support-chat-chip"
                  onClick={() => sendMessage(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div className="support-chat-input-row">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chat.placeholder')}
              disabled={loading}
              aria-label={t('chat.placeholder')}
            />
            <button type="button" onClick={() => sendMessage()} disabled={loading}>
              {loading ? '…' : t('chat.send')}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
