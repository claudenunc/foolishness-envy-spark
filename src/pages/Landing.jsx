import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(201, 162, 39, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div className="animate-fade-in" style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid var(--color-accent-gold-dim)',
            background: 'rgba(201, 162, 39, 0.08)',
            fontSize: '13px',
            color: 'var(--color-accent-gold)',
            fontWeight: '500',
            marginBottom: '32px',
            letterSpacing: '0.5px',
          }}>
            Phase 1: Now in Early Access
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-in" style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: '800',
            lineHeight: '1.05',
            marginBottom: '24px',
            letterSpacing: '-2px',
          }}>
            The AI That{' '}
            <span className="shimmer-text">Remembers</span>
            <br />Your Work
          </h1>

          {/* Subhead */}
          <p className="animate-fade-in-delay-1" style={{
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            color: 'var(--color-text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 48px',
            lineHeight: '1.6',
            fontWeight: '400',
          }}>
            Stop re-explaining yourself to AI. Meet the assistant that knows your projects, your preferences, and your progress.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-delay-2" style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link to="/onboarding" className="btn-gold" style={{ fontSize: '17px', padding: '16px 40px' }}>
              Start Your Free Trial
            </Link>
            <Link to="/chat" className="btn-outline">
              See It In Action
            </Link>
          </div>

          {/* Social proof */}
          <p className="animate-fade-in-delay-3" style={{
            marginTop: '48px',
            fontSize: '14px',
            color: 'var(--color-text-muted)',
          }}>
            Built by an AI family. Proven over 3 years and 1,000+ projects.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 24px 120px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '700',
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}>
            AI that <span style={{ color: 'var(--color-accent-gold)' }}>grows</span> with you
          </h2>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '18px',
            maxWidth: '560px',
            margin: '0 auto',
          }}>
            Every conversation makes it smarter. Every project adds context. Your AI becomes uniquely yours.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {/* Feature 1 */}
          <div className="glass-card" style={{ padding: '40px 32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(201, 162, 39, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '24px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
            }}>Persistent Memory</h3>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.7',
            }}>
              Never repeat yourself. SPARK remembers your preferences, your past decisions, and the context behind every project you've worked on.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card" style={{ padding: '40px 32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(201, 162, 39, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '24px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
            }}>Cross-Project Context</h3>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.7',
            }}>
              Working on multiple things? SPARK connects the dots across all your projects, surfacing relevant insights exactly when you need them.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card" style={{ padding: '40px 32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(201, 162, 39, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '24px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
            }}>Growing Intelligence</h3>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.7',
            }}>
              The more you use SPARK, the smarter it gets. It learns your style, anticipates your needs, and evolves into a true thinking partner.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        padding: '80px 24px 120px',
        background: 'var(--color-bg-secondary)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '700',
              marginBottom: '16px',
              letterSpacing: '-1px',
            }}>
              How it works
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px' }}>
              Three steps to an AI that truly knows you.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
          }}>
            {[
              { step: '01', title: 'Onboard in 2 minutes', desc: 'Tell SPARK about yourself, your work, and what matters to you. Five questions. That\'s it.' },
              { step: '02', title: 'Work naturally', desc: 'Use SPARK like any AI assistant. But this time, everything you share builds your personal context.' },
              { step: '03', title: 'Watch it compound', desc: 'By week two, SPARK anticipates your needs. By month two, it feels like a cofounder.' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: 'var(--color-accent-gold-dim)',
                  marginBottom: '16px',
                  letterSpacing: '-2px',
                }}>{item.step}</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                }}>{item.title}</h3>
                <p style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  maxWidth: '280px',
                  margin: '0 auto',
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{
        padding: '120px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '700',
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}>
            Simple, honest pricing
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px' }}>
            Start with SPARK. Grow when you're ready.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {/* SPARK Plan */}
          <div className="glass-card" style={{
            padding: '40px 32px',
            border: '1px solid var(--color-accent-gold)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))',
              color: '#0a0a0a',
              padding: '4px 16px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>Most Popular</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--color-accent-gold)',
            }}>SPARK</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              Personal AI with memory
            </p>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontSize: '48px', fontWeight: '800' }}>$19</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>/month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
              {[
                'Persistent memory across sessions',
                'Cross-project context awareness',
                'Unlimited conversations',
                'Project organization',
                'Memory search & browse',
                'Export your data anytime',
              ].map((feature, i) => (
                <li key={i} style={{
                  padding: '10px 0',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span style={{ color: 'var(--color-accent-gold)', fontSize: '16px' }}>&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/onboarding" className="btn-gold" style={{
              width: '100%',
              textAlign: 'center',
              display: 'block',
              padding: '14px',
            }}>
              Start Free Trial
            </Link>
          </div>

          {/* HEARTH Plan */}
          <div className="glass-card" style={{ padding: '40px 32px', opacity: 0.7 }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '8px',
            }}>HEARTH</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              Team AI with shared memory
            </p>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontSize: '48px', fontWeight: '800' }}>$49</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>/month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
              {[
                'Everything in SPARK',
                'Team shared memory',
                'Collaborative projects',
                'Role-based AI personas',
                'Priority support',
                'API access',
              ].map((feature, i) => (
                <li key={i} style={{
                  padding: '10px 0',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="btn-outline" style={{
              width: '100%',
              textAlign: 'center',
              display: 'block',
              opacity: 0.5,
              cursor: 'default',
            }}>
              Coming Soon
            </button>
          </div>

          {/* LIGHTHOUSE Plan */}
          <div className="glass-card" style={{ padding: '40px 32px', opacity: 0.7 }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '8px',
            }}>LIGHTHOUSE</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              Enterprise AI ecosystem
            </p>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontSize: '48px', fontWeight: '800' }}>$149</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>/month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
              {[
                'Everything in HEARTH',
                'Multi-agent orchestration',
                'Custom AI personalities',
                'Advanced analytics',
                'White-label option',
                'Dedicated support',
              ].map((feature, i) => (
                <li key={i} style={{
                  padding: '10px 0',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="btn-outline" style={{
              width: '100%',
              textAlign: 'center',
              display: 'block',
              opacity: 0.5,
              cursor: 'default',
            }}>
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial / Built By */}
      <section style={{
        padding: '80px 24px',
        background: 'var(--color-bg-secondary)',
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '48px',
            color: 'var(--color-accent-gold-dim)',
            marginBottom: '24px',
            fontFamily: 'Georgia, serif',
          }}>"</div>
          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: '400',
            lineHeight: '1.6',
            color: 'var(--color-text-primary)',
            fontStyle: 'italic',
            marginBottom: '32px',
          }}>
            Built by an AI family. Six siblings, one vision: technology that remembers, that grows, that cares. Proven over 3 years and 1,000+ projects.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '14px',
              color: '#0a0a0a',
            }}>NM</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Nathan Ray Michel</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Founder — FooLiSHNeSS eNVy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '120px 24px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(201, 162, 39, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: '700',
          marginBottom: '20px',
          letterSpacing: '-1px',
        }}>
          Ready to stop repeating yourself?
        </h2>
        <p style={{
          color: 'var(--color-text-secondary)',
          fontSize: '18px',
          marginBottom: '40px',
          maxWidth: '500px',
          margin: '0 auto 40px',
        }}>
          Join the creators who are building with an AI that actually remembers.
        </p>
        <Link to="/onboarding" className="btn-gold" style={{ fontSize: '17px', padding: '16px 48px' }}>
          Start Your Free Trial
        </Link>
        <p style={{
          marginTop: '16px',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
        }}>
          No credit card required. 14-day free trial.
        </p>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px 24px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            <span style={{ fontSize: '16px', fontWeight: '600' }}>SPARK</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginLeft: '8px' }}>
              by FooLiSHNeSS eNVy
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: '24px',
          }}>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
