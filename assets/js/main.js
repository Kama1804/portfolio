const projectData = {
      fyp: {
        title: 'AI-Powered Multi-Outlet Sales Forecasting', subtitle: 'CSV-Driven Forecasting & Operational Decision Support',
        challenges: [
          ['Cleaning inconsistent outlet files', 'Built a CSV ETL process with column checks, invalid-row filtering and duplicate transaction prevention.'],
          ['Reducing weather API delays', 'Cached weather records by date and location in SQLite, then combined Prophet with holiday and weather information for five-day forecasts.'],
          ['Turning data into decisions', 'Mapped predicted drink demand to recipe-based ingredient lists and summarised key metrics for a Gemini-powered analytics chatbot.']
        ],
        outcome: 'Delivered outlet-specific five-day revenue forecasts, an interactive dashboard, ingredient planning and PDF reporting.',
        tech: ['Python','Flask','Prophet','SQLite','Gemini API',,'Open Weather API','ETL']
      },
      analytics: {
        title: 'Malaysia Household Economy & Cost-of-Living Analytics (2010–2026)',
        subtitle: 'An interactive study exploring household income, daily living expenses, and family savings across Malaysian states using official OpenDOSM data.',
        challenges: [
          ['Consolidating Official Data', 'Cleaned and merged government datasets on household income, everyday spending, and price changes across all 16 states into a unified database.'],
          ['Tracking Real Affordability', 'Calculated and ranked how much disposable income families actually keep each month after paying for essentials.'],
          ['Interactive Dashboard & Price Shock Simulation', 'Built easy-to-read Power BI dashboards and simulated price hikes to see how inflation impacts household budgets in each state.']
        ],
        outcome: 'Highlighted a significant cost-of-living divide: while central states maintain healthy monthly savings, households in northern and east coast states live on slim margins, leaving them far more vulnerable to sudden price increases.',
        note: 'Data Source: Department of Statistics Malaysia (OpenDOSM) — Household Income & Expenditure Survey (HIES) & Consumer Price Index (CPI).',
        tech: ['Python', 'Pandas', 'MySQL', 'Excel', 'Power BI']
      },
      brain: {
        title: 'NeuroScan AI — Brain Tumor Detection', subtitle: 'YOLOv8 Object Detection on a Kaggle MRI Dataset',
        challenges: [
          ['Preparing medical imagery', 'Used annotated training, validation and test MRI images with 640-pixel inputs and augmentation suited to grayscale scans.'],
          ['Distinguishing three tumor classes', 'Fine-tuned a lightweight YOLOv8n detector to locate glioma, meningioma and pituitary tumors.'],
          ['Assessing detection reliability', 'Evaluated 308 unseen test images and compared mAP50 with the stricter mAP50–95 score to identify localization limitations.']
        ],
        outcome: 'On 308 test images, the model achieved 92.10% mAP50, 68.46% mAP50–95, 88.89% precision and 88.88% recall. A Streamlit prototype displayed scan predictions and explored simulated patient data.',
        note: 'Academic project results on a Kaggle dataset; not validated for clinical diagnosis. The graphic above is illustrative.',
        metrics: [['92.10%','mAP50'],['88.89%','Precision'],['88.88%','Recall']],
        tech: ['Python','YOLOv8n','Ultralytics','Streamlit','Pandas','CRISP-DM']
      }
    };

    const dialog = document.getElementById('project-dialog');
    const dialogClose = document.getElementById('dialog-close');
    const dialogDone = document.getElementById('dialog-done');
    let previousFocus = null;

    function fillDialog(key) {
      const data = projectData[key];
      if (!data) return;
      document.getElementById('dialog-title').textContent = data.title;
      document.getElementById('dialog-subtitle').textContent = data.subtitle;
      document.getElementById('dialog-outcome').textContent = data.outcome;
      const noteElement = document.getElementById('dialog-note');
      noteElement.textContent = data.note || '';
      noteElement.hidden = !data.note;
      const metrics = document.getElementById('dialog-metrics');
      metrics.replaceChildren();
      (data.metrics || []).forEach(([value, label]) => {
        const card = document.createElement('div'); card.className = 'metric-item';
        const number = document.createElement('strong'); number.className = 'metric-value'; number.textContent = value;
        const caption = document.createElement('span'); caption.className = 'metric-caption'; caption.textContent = label;
        card.append(number, caption); metrics.append(card);
      });
      metrics.hidden = !data.metrics?.length;
      const visualTarget = document.getElementById('dialog-visual');
      const sourceVisual = document.querySelector('[data-project="' + key + '"]').closest('.project-card').querySelector('.project-visual');
      visualTarget.replaceChildren(sourceVisual.cloneNode(true));
      const challenges = document.getElementById('dialog-challenges');
      challenges.replaceChildren();
      data.challenges.forEach(([challenge, solution]) => {
        const li = document.createElement('li');
        const bold = document.createElement('strong'); bold.textContent = challenge;
        const detail = document.createElement('span'); detail.textContent = solution;
        li.append(bold, detail); challenges.append(li);
      });
      const tech = document.getElementById('dialog-tech');
      tech.replaceChildren();
      data.tech.forEach(label => {const item = document.createElement('span'); item.className = 'tech-pill'; item.textContent = label; tech.append(item);});
    }
    document.querySelectorAll('.open-project').forEach(button => button.addEventListener('click', () => {
      previousFocus = button;
      fillDialog(button.dataset.project);
      dialog.showModal();
      dialogClose.focus();
    }));
    dialogClose.addEventListener('click', () => dialog.close());
    dialogDone.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close();});
    dialog.addEventListener('close', () => {if (previousFocus?.isConnected) previousFocus.focus();});

    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false');
    }));
