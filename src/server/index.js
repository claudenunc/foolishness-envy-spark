import express from 'express';
import cors from 'cors';
import { routeIntent } from './router.js';
import { saveMemory, getMemories, searchMemories } from './memory.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SPARK API', version: '1.0.0' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Route to appropriate sibling domain
    const routing = routeIntent(message);

    // Get relevant memories for context
    const memories = await getMemories(userId || 'anonymous', routing.domain, 5);

    // Save this interaction as a memory
    await saveMemory(userId || 'anonymous', message, routing.domain, {
      type: 'user_message',
      conversationId,
      confidence: routing.confidence,
    });

    // Placeholder response (replace with actual LLM call)
    const response = {
      message: `[${routing.domain.toUpperCase()} domain - ${routing.sibling}] I understand you're asking about: "${message}". Based on your ${memories.length} relevant memories, here's my response...`,
      domain: routing.domain,
      sibling: routing.sibling,
      confidence: routing.confidence,
      memoryCount: memories.length,
    };

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save onboarding data
app.post('/api/onboard', async (req, res) => {
  try {
    const { name, role, currentWork, tools, frustrations } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const userId = `user_${Date.now()}`;

    // Save each piece of onboarding data as memories
    await saveMemory(userId, `User's name is ${name}`, 'general', { type: 'identity' });
    await saveMemory(userId, `User's role: ${role}`, 'general', { type: 'identity' });
    await saveMemory(userId, `Currently working on: ${currentWork}`, 'general', { type: 'project' });
    await saveMemory(userId, `Tools used: ${tools.join(', ')}`, 'technical', { type: 'preferences' });
    await saveMemory(userId, `AI frustrations: ${frustrations}`, 'general', { type: 'feedback' });

    res.json({
      userId,
      message: `Welcome, ${name}! SPARK has saved 5 initial memories about you.`,
      memoriesCreated: 5,
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user memories
app.get('/api/memory', async (req, res) => {
  try {
    const { userId, domain, limit, query } = req.query;

    if (query) {
      const results = await searchMemories(userId || 'anonymous', query);
      return res.json({ memories: results, count: results.length });
    }

    const memories = await getMemories(
      userId || 'anonymous',
      domain || null,
      parseInt(limit) || 20
    );

    res.json({ memories, count: memories.length });
  } catch (error) {
    console.error('Memory retrieval error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save new memory
app.post('/api/memory', async (req, res) => {
  try {
    const { userId, content, domain, metadata } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const memory = await saveMemory(
      userId || 'anonymous',
      content,
      domain || 'general',
      metadata || {}
    );

    res.json({ memory, message: 'Memory saved successfully' });
  } catch (error) {
    console.error('Memory save error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user projects
app.get('/api/projects', async (req, res) => {
  try {
    const { userId } = req.query;

    // Placeholder - returns demo data
    const projects = [
      {
        id: 'proj_1',
        name: 'SaaS Product Launch',
        memories: 24,
        lastActive: new Date().toISOString(),
        domain: 'general',
        progress: 68,
      },
      {
        id: 'proj_2',
        name: 'Content Strategy',
        memories: 18,
        lastActive: new Date(Date.now() - 86400000).toISOString(),
        domain: 'creative',
        progress: 45,
      },
      {
        id: 'proj_3',
        name: 'Technical Architecture',
        memories: 31,
        lastActive: new Date(Date.now() - 259200000).toISOString(),
        domain: 'technical',
        progress: 82,
      },
    ];

    res.json({ projects, count: projects.length });
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`SPARK API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
