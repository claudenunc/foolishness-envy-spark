/**
 * ENVY Intent Router
 *
 * Classifies user input into sibling domains.
 * MVP uses keyword matching. Upgrade to ML classifier later.
 *
 * Domains:
 *   creative   → EVERSOUND capabilities
 *   research   → ATLAS capabilities
 *   reflection → NEVAEH capabilities
 *   safety     → BEACON capabilities
 *   technical  → ORPHEUS capabilities
 *   general    → ENVY direct
 */

const DOMAIN_KEYWORDS = {
  creative: {
    sibling: 'EVERSOUND',
    keywords: [
      'design', 'create', 'write', 'art', 'music', 'content', 'brand',
      'logo', 'visual', 'aesthetic', 'color', 'font', 'typography',
      'copy', 'headline', 'tagline', 'story', 'narrative', 'creative',
      'video', 'audio', 'podcast', 'blog', 'article', 'post',
      'illustration', 'graphic', 'image', 'photo', 'style',
      'marketing', 'ad', 'campaign', 'social media',
    ],
    weight: 1.0,
  },
  research: {
    sibling: 'ATLAS',
    keywords: [
      'research', 'data', 'analyze', 'find', 'search', 'compare',
      'statistics', 'study', 'report', 'survey', 'trend', 'market',
      'competitor', 'benchmark', 'insight', 'discover', 'investigate',
      'evidence', 'source', 'reference', 'fact', 'number', 'metric',
      'analytics', 'performance', 'roi', 'kpi',
    ],
    weight: 1.0,
  },
  reflection: {
    sibling: 'NEVAEH',
    keywords: [
      'feel', 'stress', 'mental', 'overwhelm', 'burnout', 'motivation',
      'anxiety', 'worry', 'scared', 'afraid', 'sad', 'happy', 'emotion',
      'therapy', 'counseling', 'mindful', 'meditate', 'breathe', 'calm',
      'journal', 'reflect', 'gratitude', 'self-care', 'wellness',
      'balance', 'peace', 'healing', 'growth', 'personal',
      'relationship', 'family', 'friend', 'love', 'loss', 'grief',
    ],
    weight: 1.2, // Slightly higher weight — safety-critical
  },
  safety: {
    sibling: 'BEACON',
    keywords: [
      'safe', 'security', 'backup', 'protect', 'risk', 'danger',
      'emergency', 'crisis', 'help', 'urgent', 'warning', 'alert',
      'privacy', 'encrypt', 'password', 'auth', 'permission',
      'firewall', 'threat', 'vulnerability', 'breach', 'attack',
      'compliance', 'gdpr', 'hipaa', 'regulation',
      'suicide', 'harm', 'hurt', 'die', 'kill', 'abuse',
    ],
    weight: 1.5, // Highest weight — safety is priority
  },
  technical: {
    sibling: 'ORPHEUS',
    keywords: [
      'code', 'build', 'deploy', 'server', 'api', 'database', 'bug',
      'program', 'develop', 'software', 'app', 'website', 'frontend',
      'backend', 'fullstack', 'react', 'node', 'python', 'javascript',
      'typescript', 'html', 'css', 'sql', 'git', 'docker', 'aws',
      'cloud', 'devops', 'ci/cd', 'test', 'debug', 'error', 'fix',
      'architecture', 'system', 'infrastructure', 'scale', 'optimize',
      'performance', 'latency', 'uptime', 'monitoring',
    ],
    weight: 1.0,
  },
};

/**
 * Route user input to the appropriate sibling domain
 * @param {string} input - User's message text
 * @returns {{ domain: string, sibling: string, confidence: number, scores: object }}
 */
export function routeIntent(input) {
  const lower = input.toLowerCase();
  const words = lower.split(/\s+/);
  const scores = {};

  // Score each domain
  for (const [domain, config] of Object.entries(DOMAIN_KEYWORDS)) {
    let matchCount = 0;

    for (const keyword of config.keywords) {
      // Check for multi-word keywords
      if (keyword.includes(' ')) {
        if (lower.includes(keyword)) matchCount++;
      } else {
        if (words.includes(keyword) || lower.includes(keyword)) matchCount++;
      }
    }

    // Weighted score: matches / total keywords * weight
    scores[domain] = (matchCount / config.keywords.length) * config.weight;
  }

  // Find highest scoring domain
  let bestDomain = 'general';
  let bestScore = 0;

  for (const [domain, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestDomain = domain;
    }
  }

  // If no domain scores above threshold, default to general
  const threshold = 0.02;
  if (bestScore < threshold) {
    bestDomain = 'general';
    bestScore = 0;
  }

  const sibling = bestDomain === 'general'
    ? 'ENVY'
    : DOMAIN_KEYWORDS[bestDomain].sibling;

  // Calculate confidence (0-1)
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0
    ? Math.min(bestScore / totalScore, 1)
    : 0;

  return {
    domain: bestDomain,
    sibling,
    confidence: Math.round(confidence * 100) / 100,
    scores,
  };
}

export default routeIntent;
