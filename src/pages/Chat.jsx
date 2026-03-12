import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SIBLING_DOMAINS = {
  general: { name: 'ENVY', color: '#c9a227', label: 'Orchestrator' },
  creative: { name: 'EVERSOUND', color: '#8b5cf6', label: 'Creative' },
  research: { name: 'ATLAS', color: '#3b82f6', label: 'Research' },
  reflection: { name: 'NEVAEH', color: '#ec4899', label: 'Companion' },
  safety: { name: 'BEACON', color: '#22c55e', label: 'Guardian' },
  technical: { name: 'ORPHEUS', color: '#f97316', label: 'Architect' },
};

const DEMO_MEMORIES = [
  { text: 'Prefers dark theme UI designs', domain: 'creative' },
  { text: 'Working on SaaS product launch', domain: 'general' },
  { text: 'Uses React + Tailwind stack', domain: 'technical' },
  { text: 'Interested in AI-assisted workflows', domain: 'research' },
];

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: "Hey! I'm SPARK — your AI with memory. I already know you prefer React and you're working on a SaaS launch. What are we tackling today?",
      domain: 'general',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [activeDomain, setActiveDomain] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const domain = classifyInput(input);
      setActiveDomain(domain);
      const sibling = SIBLING_DOMAINS[domain];

      const aiMessage = {
        role: 'ai',
        content: getPlaceholderResponse(input, domain),
        domain,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const classifyInput = (text) => {
    const lower = text.toLowerCase();
    if (/design|create|write|art|music|content|brand/.test(lower)) return 'creative';
    if (/research|data|analyze|find|search|compare/.test(lower)) return 'research';
    if (/feel|stress|mental|overwhelm|burnout|motivation/.test(lower)) return 'reflection';
    if (/safe|security|backup|protect|risk/.test(lower)) return 'safety';
    if (/code|build|deploy|server|api|database|bug/.test(lower)) return 'technical';
    return 'general';
  };

  const getPlaceholderResponse = (input, domain) => {
    const responses = {
      general: `I've noted that down. Based on your previous projects, I'd suggest we break this into smaller tasks. Want me to create a project plan?`,
      creative: `Love the creative direction! Based on your style preferences I've learned, I'd recommend a clean, modern approach. Want me to draft something?`,
      research: `I'll dig into that. From what I remember about your research interests, here are some initial thoughts and directions we could explore...`,
      reflection: `I hear you. Based on our past conversations, I know this area is important to you. Let's talk through it together.`,
      safety: `Good thinking on the safety front. Let me review what we have in place and identify any gaps in your current setup.`,
      technical: `Great technical question. Given your React + Tailwind stack preference, here's how I'd approach this architecture...`,
    };
    return responses[domain];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const sibling = SIBLING_DOMAINS[activeDomain];

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      background: 'var(--color-bg-primary)',
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '0',
        overflow: 'hidden',
        borderRight: '1px solid var(--color-border)',
        background: 'var(--color-bg-secondary)',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Sidebar header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link to="/" style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '12px',
              color: '#0a0a0a',
            }}>S</div>
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-primary)' }}>SPARK</span>
          </Link>
        </div>

        {/* Active Context */}
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <h4 style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-text-muted)',
            marginBottom: '16px',
          }}>Active Context</h4>

          <div style={{
            padding: '12px 14px',
            background: 'var(--color-bg-primary)',
            borderRadius: '8px',
            marginBottom: '16px',
            border: '1px solid var(--color-border)',
          }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Current Project</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>SaaS Product Launch</div>
          </div>

          <h4 style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
          }}>Memory Items</h4>

          {DEMO_MEMORIES.map((mem, i) => (
            <div key={i} style={{
              padding: '10px 14px',
              background: 'var(--color-bg-primary)',
              borderRadius: '8px',
              marginBottom: '8px',
              border: '1px solid var(--color-border)',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: SIBLING_DOMAINS[mem.domain].color,
                marginTop: '5px',
                flexShrink: 0,
              }} />
              {mem.text}
            </div>
          ))}

          <h4 style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            marginTop: '24px',
          }}>Quick Actions</h4>

          <Link to="/dashboard" style={{
            display: 'block',
            padding: '10px 14px',
            background: 'var(--color-bg-primary)',
            borderRadius: '8px',
            marginBottom: '8px',
            border: '1px solid var(--color-border)',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}>
            View Dashboard
          </Link>
          <button style={{
            display: 'block',
            width: '100%',
            padding: '10px 14px',
            background: 'var(--color-bg-primary)',
            borderRadius: '8px',
            marginBottom: '8px',
            border: '1px solid var(--color-border)',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            textAlign: 'left',
          }}>
            Browse Memory
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{
          height: '56px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '12px',
          background: 'var(--color-bg-primary)',
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '18px',
              padding: '4px',
            }}
          >
            {sidebarOpen ? '\u2190' : '\u2192'}
          </button>

          <div style={{ flex: 1 }} />

          {/* Active sibling indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: `${sibling.color}15`,
            border: `1px solid ${sibling.color}30`,
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: sibling.color,
            }} />
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: sibling.color,
            }}>
              {sibling.name} — {sibling.label}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 24px 100px',
        }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '20px',
              }}>
                <div style={{
                  maxWidth: '70%',
                  padding: '14px 18px',
                  borderRadius: msg.role === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? 'var(--color-accent-gold)'
                    : 'var(--color-bg-secondary)',
                  color: msg.role === 'user'
                    ? '#0a0a0a'
                    : 'var(--color-text-primary)',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  border: msg.role === 'user'
                    ? 'none'
                    : '1px solid var(--color-border)',
                }}>
                  {msg.role === 'ai' && msg.domain && (
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: SIBLING_DOMAINS[msg.domain].color,
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {SIBLING_DOMAINS[msg.domain].name}
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg-primary)',
        }}>
          <div style={{
            maxWidth: '780px',
            margin: '0 auto',
            display: 'flex',
            gap: '12px',
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask SPARK anything... it remembers."
              rows={1}
              style={{
                flex: 1,
                padding: '14px 18px',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                color: 'var(--color-text-primary)',
                fontSize: '15px',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-gold-dim)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
            />
            <button
              onClick={handleSend}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: input.trim()
                  ? 'linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))'
                  : 'var(--color-bg-tertiary)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#0a0a0a' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
