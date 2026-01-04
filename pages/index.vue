<template>
  <div class="container">
    <header>
      <h1>🎨 AI Art Coach</h1>
      <p class="subtitle">Your personal AI coach for artistic growth and creative goals</p>
    </header>

    <main>
      <section class="info-card">
        <h2>About Coach Artie</h2>
        <p>
          Coach Artie is an AI-powered coaching system that helps artists achieve their creative goals 
          through regular check-ins and supportive guidance. Powered by cutting-edge AI models via OpenRouter.
        </p>
      </section>

      <section class="features">
        <div class="feature">
          <div class="emoji">🤖</div>
          <h3>Multi-Model Support</h3>
          <p>Access Claude, GPT-4, Llama, and more via OpenRouter</p>
        </div>
        <div class="feature">
          <div class="emoji">🎯</div>
          <h3>Goal Tracking</h3>
          <p>Set and track up to 3 weekly creative goals</p>
        </div>
        <div class="feature">
          <div class="emoji">💬</div>
          <h3>Interactive Coaching</h3>
          <p>Get proactive check-ins or share your progress</p>
        </div>
      </section>

      <section class="cta-section">
        <h2>Get Started</h2>
        <div class="commands">
          <div class="command">
            <code>npm run coach</code>
            <p>Get a motivational check-in</p>
          </div>
          <div class="command">
            <code>npm run coach -- -m "Your message"</code>
            <p>Respond to Coach Artie</p>
          </div>
        </div>
        <a href="https://github.com/ejfox/ai-art-coach" target="_blank" class="github-link">
          View on GitHub →
        </a>
      </section>
    </main>

    <footer>
      <p>Built with Nuxt 3 · Powered by OpenRouter</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'AI Art Coach - Your Personal Creative Companion',
  meta: [
    { name: 'description', content: 'AI-powered coaching system for artists. Set goals, get motivated, and achieve your creative vision.' }
  ]
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-top: 0.5rem;
}

.info-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.info-card h2 {
  margin-top: 0;
  font-size: 1.75rem;
}

.info-card p {
  line-height: 1.7;
  margin-bottom: 0;
  font-size: 1.1rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.emoji {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  margin: 0.5rem 0;
  color: #667eea;
}

.feature p {
  color: #666;
  margin-bottom: 0;
}

.cta-section {
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 3rem;
}

.cta-section h2 {
  margin-top: 0;
  color: #333;
}

.commands {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.command {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.command code {
  display: block;
  background: #2d3748;
  color: #68d391;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  overflow-x: auto;
}

.command p {
  margin: 0;
  color: #666;
}

.github-link {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background 0.2s;
}

.github-link:hover {
  background: #764ba2;
}

footer {
  text-align: center;
  padding: 2rem 0;
  color: #999;
  border-top: 1px solid #e5e7eb;
}

footer p {
  margin: 0;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .container {
    padding: 1rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
  
  .cta-section {
    padding: 2rem 1rem;
  }
}
</style>
