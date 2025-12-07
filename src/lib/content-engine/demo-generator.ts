import type {
    ContentGenerationRequest,
    ContentGenerationResponse,
    ContentVariation,
} from "./content-types";

/**
 * Demo Mode Content Generator
 * Generates realistic content using templates - no API required!
 */

const DEMO_TEMPLATES = {
    linkedin: {
        professional: [
            "🚀 {topic}\n\nIn today's rapidly evolving business landscape, this has become more critical than ever. Here's what I've learned:\n\n✓ Innovation drives competitive advantage\n✓ Data-informed decisions lead to better outcomes\n✓ Collaboration amplifies individual expertise\n\nThe key is to stay adaptable and embrace continuous learning.\n\nWhat's your experience with this? Share your thoughts below! 👇\n\n#Business #Innovation #Leadership #GrowthMindset #ProfessionalDevelopment",

            "💡 {topic}\n\nAfter years in the industry, I've realized that success comes down to three things:\n\n1️⃣ Clear vision and strategy\n2️⃣ Strong execution and follow-through\n3️⃣ Building the right team\n\nThe organizations that master these fundamentals consistently outperform their competitors.\n\nAre you focusing on the right priorities? Let's discuss.\n\n#Strategy #BusinessGrowth #TeamBuilding #Success #Leadership",

            "🎯 {topic}\n\nHere's a perspective that might challenge conventional thinking:\n\nMost companies focus on the wrong metrics. Instead of chasing vanity numbers, focus on:\n\n→ Customer satisfaction and retention\n→ Employee engagement and growth\n→ Sustainable long-term value creation\n\nThis shift in mindset can transform your entire approach.\n\nWhat metrics matter most to you? 📊\n\n#BusinessStrategy #Metrics #CustomerSuccess #Innovation #Growth",

            "⚡ {topic}\n\nThe future belongs to those who can adapt quickly.\n\nI've seen countless examples where agility beats perfection. Here's why:\n\n• Markets change faster than ever\n• Customer needs evolve constantly\n• Technology creates new opportunities daily\n\nThe question isn't whether to change, but how fast you can learn and pivot.\n\nHow is your organization staying agile? 🚀\n\n#Agility #Innovation #BusinessTransformation #Leadership #FutureOfWork",

            "🔥 {topic}\n\nLet me share something that took me years to understand:\n\nSuccess isn't about working harder—it's about working smarter.\n\nKey insights:\n→ Automate repetitive tasks\n→ Delegate effectively\n→ Focus on high-impact activities\n→ Invest in continuous learning\n\nThe most successful leaders I know have mastered this balance.\n\nWhat's your productivity secret? Share below! 💪\n\n#Productivity #Leadership #WorkSmarter #Efficiency #Success"
        ],
        casual: [
            "Hey everyone! 👋\n\nLet's talk about {topic}.\n\nI've been thinking about this a lot lately, and honestly? It's a game-changer.\n\nHere's the thing - most people overcomplicate it. But it really comes down to:\n\n✨ Understanding the basics\n✨ Taking consistent action\n✨ Learning from mistakes\n\nThat's it. No magic formula.\n\nAnyone else working on this? Would love to hear your stories! 🙌\n\n#RealTalk #Learning #Growth #Community",

            "Quick thought on {topic}... 💭\n\nWe're all trying to figure this out, right?\n\nWhat's working for me:\n→ Start small\n→ Test and iterate\n→ Don't be afraid to fail\n\nThe journey is messy, but that's where the learning happens.\n\nWhat's your approach? Drop a comment! 👇\n\n#Journey #Learning #Progress #Community #Growth"
        ],
        technical: [
            "Technical Deep Dive: {topic}\n\nLet's break down the architecture and implementation details.\n\nKey Components:\n1. System Design Considerations\n   - Scalability patterns\n   - Performance optimization\n   - Fault tolerance\n\n2. Implementation Strategy\n   - Microservices architecture\n   - Event-driven design\n   - API-first approach\n\n3. Best Practices\n   - Code quality and testing\n   - CI/CD pipeline integration\n   - Monitoring and observability\n\nThe technical landscape is evolving rapidly. Staying current with these patterns is essential.\n\nThoughts on this approach? 🔧\n\n#SoftwareEngineering #Architecture #TechLeadership #DevOps #BestPractices",

            "Engineering Insights: {topic}\n\nAfter implementing this across multiple projects, here's what I've learned:\n\n🔹 Performance Metrics:\n- 40% reduction in latency\n- 3x improvement in throughput\n- 99.9% uptime achieved\n\n🔹 Technical Stack:\n- Modern frameworks and libraries\n- Cloud-native infrastructure\n- Automated testing and deployment\n\n🔹 Lessons Learned:\n- Start with solid fundamentals\n- Optimize for maintainability\n- Document everything\n\nThe devil is in the details. What's your experience? 💻\n\n#Engineering #Performance #CloudNative #TechStack #DevOps"
        ],
        storytelling: [
            "Let me tell you a story about {topic}...\n\nTwo years ago, I faced a challenge that seemed impossible. The deadline was tight, the stakes were high, and the path forward was unclear.\n\nBut here's what happened:\n\nDay 1: Panic and uncertainty\nDay 30: Small wins and momentum\nDay 90: Breakthrough and clarity\nDay 180: Success beyond expectations\n\nThe turning point? Embracing the uncertainty and focusing on progress, not perfection.\n\nToday, that \"impossible\" challenge became our biggest success story.\n\nWhat's a challenge you've overcome? Share your story! 📖\n\n#StoryTime #Inspiration #Perseverance #Success #Leadership",

            "Here's something I wish I knew earlier about {topic}...\n\nI remember sitting in a meeting, completely lost. Everyone seemed to understand something I didn't.\n\nThat moment of vulnerability became my greatest teacher.\n\nWhat I learned:\n→ Asking questions is a strength, not a weakness\n→ Everyone starts somewhere\n→ Growth happens outside your comfort zone\n\nFast forward to today: I'm now the one leading those meetings.\n\nThe lesson? Never stop learning. Never stop asking.\n\nWhat's a lesson that changed your perspective? 🌟\n\n#Growth #Learning #Vulnerability #Leadership #Journey"
        ]
    },
    twitter: {
        professional: [
            "🚀 {topic}\n\nKey insight: Success = Strategy + Execution + Adaptability\n\nThe companies winning today aren't just smart—they're agile.\n\n#Business #Innovation",

            "💡 {topic}\n\n3 things that matter:\n1. Clear vision\n2. Strong execution  \n3. Right team\n\nEverything else is noise.\n\n#Leadership #Success",

            "⚡ {topic}\n\nStop chasing perfection.\nStart shipping value.\n\nSpeed + learning > perfect planning.\n\n#Startup #Growth"
        ],
        casual: [
            "Thinking about {topic} today 💭\n\nHonestly? It's simpler than we make it.\n\nJust start. Learn. Iterate.\n\nThat's it. 🚀",

            "Hot take on {topic}:\n\nMost advice overcomplicate it.\n\nThe real secret? Consistency.\n\nShow up. Do the work. Repeat. 💪"
        ],
        technical: [
            "Tech deep dive: {topic}\n\n- Scalable architecture ✓\n- Performance optimized ✓  \n- Production-ready ✓\n\nDetails in thread 👇\n\n#Engineering #Tech",

            "Shipped {topic} today 🚢\n\nStack:\n- Modern frameworks\n- Cloud-native\n- Fully automated\n\nLessons learned in comments.\n\n#DevOps #Tech"
        ],
        storytelling: [
            "Story time: {topic}\n\nTwo years ago: Struggling\nOne year ago: Learning\nToday: Thriving\n\nThe journey matters more than the destination. 🌟",

            "Remember when {topic} seemed impossible?\n\nYeah, me too.\n\nNow it's second nature.\n\nNever underestimate growth. 📈"
        ]
    },
    blog: {
        professional: [
            "# {topic}: A Comprehensive Guide\n\nIn today's rapidly evolving business landscape, understanding this concept has become essential for success. This guide will walk you through everything you need to know.\n\n## Introduction\n\nThe modern business environment demands continuous adaptation and learning. Organizations that master these principles consistently outperform their competitors.\n\n## Key Principles\n\n### 1. Strategic Foundation\nBuilding a solid strategic foundation is critical. This involves:\n- Clear vision and mission alignment\n- Data-driven decision making\n- Stakeholder engagement\n\n### 2. Execution Excellence\nStrategy without execution is meaningless. Focus on:\n- Setting measurable goals\n- Building accountability systems\n- Continuous improvement processes\n\n### 3. Team Development\nYour team is your greatest asset. Invest in:\n- Skill development and training\n- Culture and values alignment\n- Leadership development\n\n## Implementation Strategy\n\nSuccessful implementation requires a systematic approach. Start with small wins, build momentum, and scale what works.\n\n## Conclusion\n\nMastering this concept takes time and dedication, but the results are worth it. Start today, stay consistent, and watch your organization transform.\n\nWhat's your experience with this? Share your thoughts in the comments below!",

            "# The Ultimate Guide to {topic}\n\n## Executive Summary\n\nThis comprehensive guide explores the critical aspects of this topic and provides actionable insights for implementation.\n\n## Why This Matters\n\nIn an increasingly competitive market, organizations must stay ahead of the curve. This guide provides the framework you need.\n\n## Core Concepts\n\n### Understanding the Fundamentals\nBefore diving into advanced strategies, it's essential to master the basics.\n\n### Advanced Strategies\nOnce you've mastered the fundamentals, these advanced techniques will take you to the next level.\n\n### Common Pitfalls to Avoid\nLearn from others' mistakes and avoid these common traps.\n\n## Best Practices\n\n1. **Start with Why**: Understand your purpose\n2. **Build Systematically**: Create sustainable processes\n3. **Measure Everything**: Data drives improvement\n4. **Iterate Constantly**: Continuous improvement is key\n\n## Real-World Applications\n\nSee how leading organizations are applying these principles to drive results.\n\n## Getting Started\n\nReady to implement? Here's your action plan for the next 30 days.\n\n## Conclusion\n\nThe journey of mastery is ongoing. Stay curious, keep learning, and never stop improving."
        ],
        casual: [
            "# Let's Talk About {topic}\n\nHey there! 👋\n\nSo, I've been thinking a lot about this lately, and I wanted to share some thoughts with you.\n\n## The Real Deal\n\nHere's the thing - everyone makes this way more complicated than it needs to be. But honestly? It's pretty straightforward once you break it down.\n\n## What Actually Works\n\nAfter trying a bunch of different approaches, here's what I've found works best:\n\n- **Keep it simple**: Don't overthink it\n- **Stay consistent**: Show up every day\n- **Learn as you go**: Mistakes are part of the process\n\n## My Personal Experience\n\nWhen I first started, I had no idea what I was doing. And you know what? That's totally okay. We all start somewhere.\n\n## Your Turn\n\nWhat's your experience been like? I'd love to hear your story in the comments!\n\nUntil next time! ✌️"
        ],
        technical: [
            "# Technical Deep Dive: {topic}\n\n## Abstract\n\nThis article provides a comprehensive technical analysis of the architecture, implementation, and best practices.\n\n## System Architecture\n\n### Overview\nThe system is designed with scalability, performance, and maintainability as core principles.\n\n### Components\n\n#### 1. Core Infrastructure\n- Microservices architecture\n- Event-driven design\n- API-first approach\n\n#### 2. Data Layer\n- Distributed databases\n- Caching strategies\n- Data consistency patterns\n\n#### 3. Application Layer\n- Service mesh integration\n- Load balancing\n- Circuit breakers\n\n## Implementation Details\n\n### Technology Stack\n```\n- Backend: Modern frameworks\n- Database: Distributed systems\n- Infrastructure: Cloud-native\n- CI/CD: Automated pipelines\n```\n\n### Performance Optimization\n\nKey optimizations implemented:\n- Caching at multiple layers\n- Database query optimization\n- Asynchronous processing\n- Resource pooling\n\n## Best Practices\n\n1. **Code Quality**: Maintain high standards\n2. **Testing**: Comprehensive test coverage\n3. **Documentation**: Keep it current\n4. **Monitoring**: Observability is key\n\n## Lessons Learned\n\nAfter implementing this in production, here are the key takeaways.\n\n## Conclusion\n\nBuilding scalable systems requires attention to detail and adherence to proven patterns."
        ],
        storytelling: [
            "# The Journey: {topic}\n\n## Chapter 1: The Beginning\n\nEvery great story has a beginning, and this one starts with a challenge that seemed insurmountable.\n\nTwo years ago, I sat at my desk, staring at a problem that had no clear solution. The pressure was mounting, the deadline was approaching, and doubt was creeping in.\n\n## Chapter 2: The Struggle\n\nThe first few weeks were brutal. Every attempt seemed to lead to a dead end. But with each failure came a lesson.\n\n### What I Learned\n- Persistence beats talent\n- Small wins build momentum\n- Community support is invaluable\n\n## Chapter 3: The Breakthrough\n\nThen, on a random Tuesday afternoon, everything clicked. The solution wasn't in working harder—it was in thinking differently.\n\n## Chapter 4: The Transformation\n\nWhat started as a personal challenge became a transformative journey. The lessons learned extended far beyond the original problem.\n\n### Key Insights\n1. **Embrace uncertainty**: It's where growth happens\n2. **Stay curious**: Questions lead to answers\n3. **Share your journey**: Others can learn from your experience\n\n## Epilogue: Looking Forward\n\nToday, that impossible challenge is a distant memory. But the lessons remain.\n\nWhat's your story? I'd love to hear it.\n\n---\n\n*Thank you for reading. If this resonated with you, share it with someone who needs to hear it.*"
        ]
    }
};


function selectRandomTemplate(platform: string, tone: string): string {
    const templates = DEMO_TEMPLATES[platform as keyof typeof DEMO_TEMPLATES]?.[tone as keyof typeof DEMO_TEMPLATES.linkedin];
    if (!templates || templates.length === 0) {
        return DEMO_TEMPLATES.linkedin.professional[0];
    }
    return templates[Math.floor(Math.random() * templates.length)];
}

function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    if (minutes < 1) return "< 1 min";
    if (minutes === 1) return "1 min";
    return `${minutes} min`;
}

/**
 * Generate demo content without API calls
 */
export async function generateDemoContent(
    request: ContentGenerationRequest
): Promise<ContentGenerationResponse> {
    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));

    const variations: ContentVariation[] = [];
    const numVariations = 5;

    for (let i = 0; i < numVariations; i++) {
        // Select template and replace topic
        let content = selectRandomTemplate(request.platform, request.tone);
        content = content.replace(/{topic}/g, request.topic);

        // Extract hashtags from content
        const hashtagRegex = /#[\w]+/g;
        const matches = content.match(hashtagRegex) || [];
        const hashtags = matches.map((tag) => tag.substring(1));

        // Mock engagement score (will be recalculated by engagement-scorer)
        const mockScore = 65 + Math.floor(Math.random() * 30); // 65-95

        variations.push({
            id: `demo-var-${i + 1}`,
            content,
            platform: request.platform,
            tone: request.tone,
            engagementScore: mockScore,
            hashtags,
            characterCount: content.length,
            estimatedReadTime: calculateReadTime(content),
        });
    }

    return {
        variations,
        topic: request.topic,
        generatedAt: new Date(),
        metadata: {
            platform: request.platform,
            tone: request.tone,
            length: request.length,
        },
    };
}
