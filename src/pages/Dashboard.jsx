import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const DEMO_PROJECTS = [
  {
    name: 'SaaS Product Launch',
    memories: 24,
    lastActive: '2 hours ago',
    domain: 'general',
    progress: 68,
  },
  {
    name: 'Content Strategy',
    memories: 18,
    lastActive: 'Yesterday',
    domain: 'creative',
    progress: 45,
  },
  {
    name: 'Technical Architecture',
    memories: 31,
    lastActive: '3 days ago',
    domain: 'technical',
    progress: 82,
  },
];

const DOMAIN_COLORS = {
  general: '#c9a227',
  creative: '#8b5cf6',
  research: '#3b82f6',
  reflection: '#ec4899',
  safety: '#22c55e',
  technical: '#f97316',
};

const RECENT_MEMORIES = [
  { text: 'User prefers React + Tailwind for all frontend work', domain: 'technical', time: '2h ago' },
  { text: 'Target audience: solo founders and small teams', domain: 'general', time: '3h ago' },
  { text: 'Pricing model: freemium with $19/mo starter tier', domain: 'general', time: '5h ago' },
  { text: 'Brand voice should be warm but professional', domain: 'creative', time: '1d ago' },
  { text: 'Deployment preference: Vercel for frontend, Railway for backend', domain: 'technical', time: '1d ago' },
  { text: 'Key differentiator: persistent memory across sessions', domain: 'research', time: '2d ago' },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const totalMemories = 73;
  const totalProjects = 3;
  const totalConversations = 142;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <Navbar />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '88px 24px 60px',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '40px',
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}>Dashboard</h1>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
            }}>
              Your AI remembers <span style={{ color: 'var(--color-accent-gold)', fontWeight: '600' }}>{totalMemories} items</span> across <span style={{ color: 'var(--color-accent-gold)', fontWeight: '600' }}>{totalProjects} projects</span>
            </p>
          </div>
          <Link to="/chat" className="btn-gold" style={{ padding: '10px 24px', fontSize: '14px' }}>
            New Conversation
          </Link>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}>
          {[
            { label: 'Total Memories', value: totalMemories, change: '+12 this week' },
            { label: 'Active Projects', value: totalProjects, change: '1 new this month' },
            { label: 'Conversations', value: totalConversations, change: '+8 this week' },
            { label: 'Context Score', value: '94%', change: 'Excellent retention' },
          ].map((stat, i) => (
            <div key={i} className="glass-card" style={{
              padding: '24px',
            }}>
              <div style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                marginBottom: '8px',
                fontWeight: '500',
              }}>{stat.label}</div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '4px',
                letterSpacing: '-1px',
              }}>{stat.value}</div>
              <div style={{
                fontSize: '12px',
                color: 'var(--color-accent-gold)',
              }}>{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '40px',
        }}>
          {[
            { label: 'New conversation', icon: '\u2b50', to: '/chat' },
            { label: 'Browse memory', icon: '\ud83e\udde0', to: '#' },
            { label: 'Settings', icon: '\u2699\ufe0f', to: '#' },
          ].map((action, i) => (
            <Link
              key={i}
              to={action.to}
              style={{
                padding: '16px 20px',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text-secondary)',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '18px' }}>{action.icon}</span>
              {action.label}
            </Link>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
        }}>
          {/* Projects */}
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
            }}>Projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {DEMO_PROJECTS.map((project, i) => (
                <div key={i} className="glass-card" style={{
                  padding: '20px 24px',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: DOMAIN_COLORS[project.domain],
                      }} />
                      <h3 style={{
                        fontSize: '15px',
                        fontWeight: '600',
                      }}>{project.name}</h3>
                    </div>
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--color-text-muted)',
                    }}>{project.lastActive}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      fontSize: '13px',
                      color: 'var(--color-text-muted)',
                    }}>{project.memories} memories</span>
                    <div style={{
                      width: '100px',
                      height: '4px',
                      background: 'var(--color-bg-tertiary)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${project.progress}%`,
                        height: '100%',
                        background: DOMAIN_COLORS[project.domain],
                        borderRadius: '2px',
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Memories */}
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
            }}>Recent Memories</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {RECENT_MEMORIES.map((mem, i) => (
                <div key={i} style={{
                  padding: '14px 18px',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: DOMAIN_COLORS[mem.domain],
                    marginTop: '6px',
                    flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}>{mem.text}</div>
                    <div style={{
                      fontSize: '11px',
                      color: 'var(--color-text-muted)',
                      marginTop: '4px',
                    }}>{mem.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
