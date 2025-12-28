<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="footer-text">
        Made with <span class="heart">❤️</span> by 
        <a href="https://github.com/Pe0ny9-A" target="_blank" rel="noopener noreferrer" class="author-link">
          Pe0ny9
        </a>
      </p>
      <p class="footer-subtext">
        Open Source · Zero Code · Powerful Tools
      </p>
      <p class="footer-copyright">
        Copyright © 2025 
        <a href="https://github.com/Pe0ny9-A" target="_blank" rel="noopener noreferrer" class="author-link">
          Pe0ny9
        </a>
        . All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: var(--spacing-xl) var(--spacing-xl);
  border-top: 1px solid var(--divider);
  text-align: center;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-text {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: var(--spacing-xs);
}

.heart {
  color: var(--error);
  animation: pulse 2s ease-in-out infinite;
}

.footer-subtext {
  color: var(--text-placeholder);
  font-size: 12px;
}

.footer-copyright {
  color: var(--text-placeholder);
  font-size: 11px;
  margin-top: var(--spacing-xs);
}

.author-link {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.author-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}
</style>

