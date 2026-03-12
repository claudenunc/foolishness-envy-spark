import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  {
    question: "What's your name?",
    subtitle: "Let's make this personal.",
    type: 'text',
    placeholder: 'Enter your name',
    field: 'name',
  },
  {
    question: 'What do you do?',
    subtitle: 'This helps us tailor SPARK to your world.',
    type: 'select',
    options: [
      { value: 'creator', label: 'Creator', desc: 'Writer, designer, artist, musician' },
      { value: 'entrepreneur', label: 'Entrepreneur', desc: 'Founder, business owner, freelancer' },
      { value: 'student', label: 'Student', desc: 'Learning, researching, growing' },
      { value: 'professional', label: 'Professional', desc: 'Corporate, agency, consulting' },
      { value: 'other', label: 'Other', desc: 'Something unique' },
    ],
    field: 'role',
  },
  {
    question: 'What are you working on right now?',
    subtitle: "This becomes SPARK's first memory of your work.",
    type: 'textarea',
    placeholder: 'Tell us about your current project, goal, or challenge...',
    field: 'currentWork',
  },
  {
    question: 'What tools do you currently use?',
    subtitle: 'We integrate with your existing workflow.',
    type: 'checkbox',
    options: [
      'ChatGPT', 'Claude', 'Notion', 'Obsidian', 'Google Docs',
      'Figma', 'VS Code', 'Slack', 'Linear', 'Other',
    ],
    field: 'tools',
  },
  {
    question: 'What frustrates you most about AI?',
    subtitle: "This is exactly what SPARK was built to solve.",
    type: 'textarea',
    placeholder: 'Be honest. We built SPARK because of these exact frustrations...',
    field: 'frustrations',
  },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    role: '',
    currentWork: '',
    tools: [],
    frustrations: '',
  });

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const canProceed = () => {
    const val = data[current.field];
    if (current.type === 'checkbox') return val.length > 0;
    return val && val.trim().length > 0;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Submit onboarding
      console.log('Onboarding data:', data);
      navigate('/chat');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleCheckbox = (item) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.includes(item)
        ? prev.tools.filter((t) => t !== item)
        : [...prev.tools, item],
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Progress bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--color-bg-tertiary)',
        zIndex: 100,
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-gold-light))',
          transition: 'width 0.5s ease',
        }} />
      </div>

      {/* Step counter */}
      <div style={{
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            color: step > 0 ? 'var(--color-text-secondary)' : 'transparent',
            cursor: step > 0 ? 'pointer' : 'default',
            fontSize: '14px',
            fontFamily: 'inherit',
          }}
        >
          &larr; Back
        </button>
        <span style={{
          fontSize: '13px',
          color: 'var(--color-text-muted)',
        }}>
          {step + 1} of {STEPS.length}
        </span>
        <div style={{ width: '60px' }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px 80px',
      }}>
        <div style={{
          maxWidth: '520px',
          width: '100%',
        }} className="animate-fade-in" key={step}>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: '700',
            marginBottom: '12px',
            letterSpacing: '-1px',
          }}>
            {current.question}
          </h1>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            marginBottom: '40px',
          }}>
            {current.subtitle}
          </p>

          {/* Text input */}
          {current.type === 'text' && (
            <input
              type="text"
              value={data[current.field]}
              onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
              placeholder={current.placeholder}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && canProceed() && handleNext()}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                color: 'var(--color-text-primary)',
                fontSize: '18px',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          )}

          {/* Textarea */}
          {current.type === 'textarea' && (
            <textarea
              value={data[current.field]}
              onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
              placeholder={current.placeholder}
              autoFocus
              rows={5}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                color: 'var(--color-text-primary)',
                fontSize: '16px',
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'vertical',
                lineHeight: '1.6',
                transition: 'border-color 0.2s',
              }}
            />
          )}

          {/* Select cards */}
          {current.type === 'select' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setData({ ...data, [current.field]: opt.value })}
                  style={{
                    padding: '16px 20px',
                    background: data[current.field] === opt.value
                      ? 'rgba(201, 162, 39, 0.1)'
                      : 'var(--color-bg-secondary)',
                    border: data[current.field] === opt.value
                      ? '1px solid var(--color-accent-gold)'
                      : '1px solid var(--color-border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                >
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: data[current.field] === opt.value
                      ? 'var(--color-accent-gold)'
                      : 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}>{opt.label}</div>
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                  }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          )}

          {/* Checkboxes */}
          {current.type === 'checkbox' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
            }}>
              {current.options.map((item) => (
                <button
                  key={item}
                  onClick={() => handleCheckbox(item)}
                  style={{
                    padding: '14px 16px',
                    background: data.tools.includes(item)
                      ? 'rgba(201, 162, 39, 0.1)'
                      : 'var(--color-bg-secondary)',
                    border: data.tools.includes(item)
                      ? '1px solid var(--color-accent-gold)'
                      : '1px solid var(--color-border)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: data.tools.includes(item)
                      ? 'var(--color-accent-gold)'
                      : 'var(--color-text-secondary)',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: data.tools.includes(item)
                      ? '2px solid var(--color-accent-gold)'
                      : '2px solid var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    flexShrink: 0,
                    background: data.tools.includes(item)
                      ? 'var(--color-accent-gold)'
                      : 'transparent',
                    color: '#0a0a0a',
                  }}>
                    {data.tools.includes(item) ? '\u2713' : ''}
                  </span>
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* Next button */}
          <div style={{ marginTop: '40px' }}>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-gold"
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '16px',
                padding: '16px',
                opacity: canProceed() ? 1 : 0.4,
                cursor: canProceed() ? 'pointer' : 'default',
              }}
            >
              {step === STEPS.length - 1 ? 'Meet Your AI' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
