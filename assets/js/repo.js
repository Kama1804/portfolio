document.addEventListener('DOMContentLoaded', () => {
  // Update these two URLs with your exact GitHub repository names if different
  const repoLinks = {
    analytics: 'https://github.com/Kama1804/malaysia-household-economy-analytics',
    brain: 'https://github.com/Kama1804/brain-tumor-dashboard-kamaputra'
  };

  const repoBtn = document.getElementById('dialog-repo');

  document.querySelectorAll('.open-project').forEach(button => {
    button.addEventListener('click', () => {
      const projectKey = button.getAttribute('data-project');

      // Run on next tick after main.js populates the dialog
      setTimeout(() => {
        // 1. Show "View Repo" ONLY for 'analytics' and 'brain', hide for 'fyp' (Forecast)
        if (projectKey === 'analytics' || projectKey === 'brain') {
          repoBtn.href = repoLinks[projectKey];
          repoBtn.hidden = false;
          repoBtn.style.display = 'inline-flex';
        } else {
          repoBtn.hidden = true;
          repoBtn.style.display = 'none';
        }

        // 2. Inject the new OpenDOSM case study content when 'analytics' is clicked
        if (projectKey === 'analytics') {
          document.getElementById('dialog-title').textContent = 'Malaysia Household Economy & Cost-of-Living Analytics (2010–2026)';
          document.getElementById('dialog-subtitle').textContent = 'An interactive study exploring household income, daily living expenses, and family savings across Malaysian states using official OpenDOSM data.';

          const metricsEl = document.getElementById('dialog-metrics');
          if (metricsEl) {
            metricsEl.hidden = true;
            metricsEl.innerHTML = '';
          }

          const challengesEl = document.getElementById('dialog-challenges');
          if (challengesEl) {
            challengesEl.innerHTML = `
              <li><strong>Consolidating Official Data:</strong> Cleaned and merged government datasets on household income, everyday spending, and price changes across all 16 states into a unified database.</li>
              <li><strong>Tracking Real Affordability:</strong> Calculated and ranked how much disposable income families actually keep each month after paying for essentials.</li>
              <li><strong>Interactive Dashboard &amp; Price Shock Simulation:</strong> Built easy-to-read Power BI dashboards and simulated price hikes to see how inflation impacts household budgets in each state.</li>
            `;
          }

          document.getElementById('dialog-outcome').textContent = 'Highlighted a significant cost-of-living divide: while central states maintain healthy monthly savings, households in northern and east coast states live on slim margins, leaving them far more vulnerable to sudden price increases.';
          document.getElementById('dialog-note').textContent = 'Data Source: Department of Statistics Malaysia (OpenDOSM) — Household Income & Expenditure Survey (HIES) & Consumer Price Index (CPI).';

          const techEl = document.getElementById('dialog-tech');
          if (techEl) {
            techEl.innerHTML = `
              <span class="tech-pill">Python (Pandas)</span>
              <span class="tech-pill">MySQL</span>
              <span class="tech-pill">Microsoft Excel</span>
              <span class="tech-pill">Power BI</span>
              <span class="tech-pill">DAX</span>
            `;
          }
        }
      }, 10);
    });
  });
});
