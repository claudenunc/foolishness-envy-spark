/**
 * SPARK Memory Service
 *
 * Handles persistent memory storage and retrieval.
 * MVP uses in-memory storage. Production uses Supabase.
 */

// In-memory store for MVP (replace with Supabase)
const memoryStore = new Map();

/**
 * Save a memory item
 * @param {string} userId - User identifier
 * @param {string} content - Memory content text
 * @param {string} domain - Domain classification (general, creative, etc.)
 * @param {object} metadata - Additional metadata
 * @returns {object} The saved memory item
 */
export async function saveMemory(userId, content, domain = 'general', metadata = {}) {
  const memory = {
    id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId,
    content,
    domain,
    metadata,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Get or create user's memory array
  if (!memoryStore.has(userId)) {
    memoryStore.set(userId, []);
  }

  memoryStore.get(userId).push(memory);

  // TODO: Replace with Supabase insert
  // const { data, error } = await supabase
  //   .from('memories')
  //   .insert({
  //     user_id: userId,
  //     content,
  //     domain,
  //     metadata,
  //   })
  //   .select()
  //   .single();

  return memory;
}

/**
 * Get memories for a user
 * @param {string} userId - User identifier
 * @param {string|null} domain - Optional domain filter
 * @param {number} limit - Max items to return
 * @returns {Array} Array of memory items
 */
export async function getMemories(userId, domain = null, limit = 20) {
  const userMemories = memoryStore.get(userId) || [];

  let filtered = domain
    ? userMemories.filter((m) => m.domain === domain)
    : userMemories;

  // Sort by most recent first
  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Apply limit
  filtered = filtered.slice(0, limit);

  // TODO: Replace with Supabase query
  // let query = supabase
  //   .from('memories')
  //   .select('*')
  //   .eq('user_id', userId)
  //   .order('created_at', { ascending: false })
  //   .limit(limit);
  //
  // if (domain) {
  //   query = query.eq('domain', domain);
  // }
  //
  // const { data, error } = await query;

  return filtered;
}

/**
 * Search memories by content
 * @param {string} userId - User identifier
 * @param {string} query - Search query
 * @returns {Array} Matching memory items, scored by relevance
 */
export async function searchMemories(userId, query) {
  const userMemories = memoryStore.get(userId) || [];
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);

  // Simple keyword matching for MVP
  const scored = userMemories.map((memory) => {
    const contentLower = memory.content.toLowerCase();
    let score = 0;

    // Exact phrase match
    if (contentLower.includes(queryLower)) {
      score += 10;
    }

    // Individual word matches
    for (const word of queryWords) {
      if (word.length < 3) continue; // Skip short words
      if (contentLower.includes(word)) {
        score += 2;
      }
    }

    // Domain match bonus
    if (contentLower.includes(query)) {
      score += 3;
    }

    return { ...memory, relevanceScore: score };
  });

  // Filter and sort by relevance
  const results = scored
    .filter((m) => m.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10);

  // TODO: Replace with Supabase full-text search or vector search
  // const { data, error } = await supabase
  //   .rpc('search_memories', {
  //     p_user_id: userId,
  //     p_query: query,
  //   });

  return results;
}

/**
 * Get memory stats for a user
 * @param {string} userId - User identifier
 * @returns {object} Memory statistics
 */
export async function getMemoryStats(userId) {
  const userMemories = memoryStore.get(userId) || [];

  const domainCounts = {};
  for (const mem of userMemories) {
    domainCounts[mem.domain] = (domainCounts[mem.domain] || 0) + 1;
  }

  return {
    totalMemories: userMemories.length,
    domainBreakdown: domainCounts,
    oldestMemory: userMemories.length > 0
      ? userMemories.reduce((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? a : b).createdAt
      : null,
    newestMemory: userMemories.length > 0
      ? userMemories.reduce((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? a : b).createdAt
      : null,
  };
}

export default { saveMemory, getMemories, searchMemories, getMemoryStats };
