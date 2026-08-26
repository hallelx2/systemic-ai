# Quick Start Guide - SynthesisAI Development

## 🚀 Get Started Today

### Step 1: Install AI SDK (5 minutes)
```bash
cd /home/hallelx2/Documents/organisation-projects/systemic-ai
bun add ai @ai-sdk/openai @ai-sdk/anthropic zod
```

### Step 2: Set Up Environment Variables (5 minutes)
```bash
# Create .env.local if it doesn't exist
touch .env.local
```

Add these keys:
```env
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-...

# Get from: https://console.anthropic.com/
ANTHROPIC_API_KEY=sk-ant-...

# Already have these:
DATABASE_URL=your-neon-url
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
```

### Step 3: Create Your First Agent (15 minutes)
```bash
mkdir -p lib/ai/agents
touch lib/ai/agents/test-agent.ts
```

```typescript
// lib/ai/agents/test-agent.ts
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function simpleResearchAgent(topic: string) {
  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: `You are a research assistant. Find and summarize 5 key research 
    papers about: ${topic}. For each paper, provide:
    - Title
    - Authors
    - Year
    - Key finding (1 sentence)`,
  });
  
  console.log('Research Results:', text);
  return text;
}
```

### Step 4: Test It! (5 minutes)
```bash
# Create a test file
touch lib/ai/test.ts
```

```typescript
// lib/ai/test.ts
import { simpleResearchAgent } from './agents/test-agent';

async function test() {
  const results = await simpleResearchAgent('machine learning in healthcare');
  console.log(results);
}

test();
```

```bash
# Run it
bun run lib/ai/test.ts
```

---

## 📚 Your Documentation Library

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **PROJECT_OVERVIEW.md** | Big picture vision | Start here! |
| **APPLICATION_ARCHITECTURE.md** | System design | Building features |
| **AI_AGENTS_DESIGN.md** | Agent specifications | Creating agents |
| **IMPLEMENTATION_ROADMAP.md** | 14-week plan | Planning work |
| **AGENTS.md** | Code style guide | Writing code |

---

## 🎯 This Week's Tasks

### Monday: Setup (2 hours)
- [x] Review all documentation
- [ ] Install Vercel AI SDK
- [ ] Set up API keys
- [ ] Create test agent
- [ ] Run first test

### Tuesday-Wednesday: PubMed Search (6 hours)
- [ ] Read PubMed API docs
- [ ] Create search tool
- [ ] Test with sample queries
- [ ] Store results in database

### Thursday-Friday: Search Agent (8 hours)
- [ ] Build search agent with tools
- [ ] Add ArXiv search
- [ ] Create research wizard UI
- [ ] Connect UI to agent

### Weekend: Testing & Polish (4 hours)
- [ ] Test end-to-end flow
- [ ] Fix bugs
- [ ] Document learnings
- [ ] Plan next week

---

## 💡 Key Concepts

### Vercel AI SDK Basics

**1. Generate Text (Simple)**
```typescript
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await generateText({
  model: openai('gpt-4-turbo'),
  prompt: 'Your prompt here',
});

console.log(result.text);
```

**2. Stream Text (Real-time)**
```typescript
import { streamText } from 'ai';

const { textStream } = await streamText({
  model: openai('gpt-4-turbo'),
  prompt: 'Generate a long report...',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

**3. Tools (Give AI Capabilities)**
```typescript
import { generateText, tool } from 'ai';
import { z } from 'zod';

const searchTool = tool({
  description: 'Search for research papers',
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }) => {
    // Your search logic
    return results;
  },
});

const result = await generateText({
  model: openai('gpt-4-turbo'),
  tools: { searchTool },
  prompt: 'Find papers about AI',
});
```

---

## 🔑 Important URLs

### APIs to Set Up
- OpenAI: https://platform.openai.com
- Anthropic: https://console.anthropic.com
- PubMed: https://www.ncbi.nlm.nih.gov/account/
- Semantic Scholar: https://www.semanticscholar.org/product/api

### Documentation
- Vercel AI SDK: https://sdk.vercel.ai
- Next.js 15: https://nextjs.org/docs
- Drizzle ORM: https://orm.drizzle.team
- Better Auth: https://www.better-auth.com

### Learning Resources
- AI SDK Examples: https://github.com/vercel/ai-examples
- Prompt Engineering: https://www.promptingguide.ai
- Academic APIs Guide: (in your docs)

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found: 'ai'"
**Solution:**
```bash
bun add ai @ai-sdk/openai
```

### Issue: "API key not found"
**Solution:** Check `.env.local` exists and has correct keys

### Issue: "Too many tokens"
**Solution:** Add `maxTokens: 4000` to your generateText config

### Issue: "Rate limit exceeded"
**Solution:** 
- Add delays between requests
- Use cheaper model (gpt-3.5-turbo)
- Implement caching

---

## 📊 Development Workflow

### Daily Routine:
1. **Morning**: Review yesterday's progress
2. **Code**: 2-3 hour focused session
3. **Test**: Always test before moving on
4. **Document**: Update notes with learnings
5. **Plan**: Set tomorrow's goals

### Weekly Routine:
1. **Monday**: Plan week's tasks
2. **Mid-week**: Review progress
3. **Friday**: Demo working feature
4. **Weekend**: Optional exploration

---

## 🎯 Success Checkpoints

### Week 1: ✅ Can search for papers
- [ ] PubMed API working
- [ ] Results stored in DB
- [ ] UI shows results

### Week 2: ✅ Can analyze papers  
- [ ] Extract key findings
- [ ] Store in database
- [ ] Display in UI

### Week 4: ✅ Can synthesize findings
- [ ] Cluster by themes
- [ ] Show insights
- [ ] Create visualizations

### Week 8: ✅ Can generate reports
- [ ] Full report generated
- [ ] Proper citations
- [ ] PDF export works

---

## 💬 Get Help

### When Stuck:
1. Check documentation (your docs + official)
2. Search GitHub issues
3. Ask Claude/ChatGPT
4. Post in Discord/community

### Good Questions:
- ✅ "How do I implement X using Vercel AI SDK?"
- ✅ "What's the best way to handle Y?"
- ✅ "Here's my code, why doesn't it work?"

### Bad Questions:
- ❌ "It doesn't work" (too vague)
- ❌ "Do everything for me"

---

## 🎉 Quick Wins

### Easy Features to Build First:
1. ✅ Simple search (PubMed only)
2. ✅ Display results in UI
3. ✅ Save to database
4. ✅ Basic analysis (extract title/abstract)
5. ✅ Simple report generation

### Save for Later:
- ⏳ Multi-database search
- ⏳ Advanced synthesis
- ⏳ Interactive chat
- ⏳ Multiple export formats

---

## 📝 Development Log Template

Keep track of progress:

```markdown
## Week 1 - Day 1 (Oct 5, 2025)

### What I Did:
- Installed Vercel AI SDK
- Created first test agent
- Tested with simple prompt

### What Worked:
- API connection successful
- Got response from GPT-4

### What Didn't:
- Response was too generic
- Need better prompts

### Tomorrow:
- Improve prompts
- Add PubMed search
- Create tool function

### Learnings:
- Temperature affects creativity
- Need to be specific in prompts
```

---

## 🚀 You've Got This!

Remember:
- ✅ Start small, iterate fast
- ✅ Test everything immediately
- ✅ Document as you go
- ✅ Ask for help when stuck
- ✅ Celebrate small wins

**Your first goal**: Get a working search agent by end of Week 1!

Now go build something amazing! 🎯
