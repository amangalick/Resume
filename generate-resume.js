import { readFileSync, writeFileSync } from 'fs';

// Read data from seed files
const experience = JSON.parse(readFileSync('./resume-data.json', 'utf8'));

// Extract skills from seed-skills.js (manually define here to avoid Firebase import issues)
const skills = [
  {
    category: "AI & LLMs",
    items: ["ChatGPT", "Claude", "GitHub Copilot", "GPT-4", "Claude Sonnet", "Cursor AI", "Windsurf", "Prompt Engineering"]
  },
  {
    category: "IDEs & Editors",
    items: ["Cursor", "VS Code", "Jupyter Notebook"]
  },
  {
    category: "CLIs & AI Agents",
    items: ["Claude Code (CLI)", "Copilot CLI", "GitHub CLI", "AI Code Agents"]
  },
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C/C++", "SQL", "HTML/CSS", "R"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Node.js", "Express", "Next.js", "TailwindCSS", "Firebase", "PostgreSQL"]
  },
  {
    category: "Cloud & Infrastructure",
    items: ["Firebase", "Google Cloud", "Docker", "Virtual Machines", "Linux"]
  },
  {
    category: "Build Tools & DevOps",
    items: ["Vite", "npm", "GitHub Actions", "Git"]
  }
];

const education = [
  {
    degree: "B.S.",
    field: "Computer Science & Mathematics",
    school: "Santa Clara University",
    startDate: "2022",
    endDate: "2026"
  }
];

const projects = [
  {
    name: "AI-Powered Resume Website",
    description: "Built this interactive resume site using React, Firebase, and Vite. Leveraged GitHub Copilot and Cursor for rapid development. Features dark mode, story/recruiter view toggle, and skill-based project filtering.",
    tech: ["React", "Firebase", "Vite", "JavaScript", "CSS"],
    link: "https://github.com/amangalick/Resume"
  },
  {
    name: "Data Analysis Pipeline",
    description: "Created Python pipeline for processing and visualizing large datasets. Used AI pair programming to accelerate development and implement best practices. Includes automated testing and documentation.",
    tech: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    link: "https://github.com/amangalick/DataScienceProject"
  }
];

// Generate Markdown Resume
function generateMarkdown() {
  let md = `# Ahnika Mangalick\n\n`;
  md += `**B.S. Computer Science & Mathematics** | Palo Alto, CA\n\n`;
  md += `[ahnika.mangalick@gmail.com](mailto:ahnika.mangalick@gmail.com) | `;
  md += `[LinkedIn](https://www.linkedin.com/in/ahnika-mangalick-792756261/) | `;
  md += `[GitHub](https://github.com/amangalick)\n\n`;
  md += `---\n\n`;
  
  // Summary
  md += `## Summary\n\n`;
  md += `**CS & Math grad comfortable using AI/Agents from design to code.** I love building software that solves real problems and explaining it clearly. I thrive in diverse, collaborative teams — equally comfortable deep in a codebase, leveraging AI tools to accelerate development, or translating technical work for non-technical stakeholders.\n\n`;
  
  // Education
  md += `## Education\n\n`;
  education.forEach(edu => {
    md += `**${edu.degree} in ${edu.field}**\n`;
    md += `${edu.school} | ${edu.startDate} – ${edu.endDate}\n\n`;
  });
  
  // Skills
  md += `## Skills\n\n`;
  skills.forEach(category => {
    md += `**${category.category}:** ${category.items.join(', ')}\n\n`;
  });
  
  // Experience
  md += `## Experience\n\n`;
  experience.forEach(job => {
    md += `### ${job.role}\n`;
    md += `**${job.company}** | ${job.startDate} – ${job.endDate}\n\n`;
    job.description.forEach(point => {
      md += `- ${point}\n`;
    });
    md += `\n`;
  });
  
  // Projects
  md += `## Projects\n\n`;
  projects.forEach(proj => {
    md += `### ${proj.name}\n`;
    if (proj.link) md += `[View Project](${proj.link})\n\n`;
    md += `${proj.description}\n\n`;
    md += `**Technologies:** ${proj.tech.join(', ')}\n\n`;
  });
  
  return md;
}

// Generate HTML Resume (print-friendly)
function generateHTML() {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ahnika Mangalick - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 850px;
      margin: 0 auto;
      padding: 40px 20px;
      font-size: 11pt;
    }
    h1 {
      font-size: 28pt;
      margin-bottom: 5px;
      color: #1a1a1a;
    }
    .subtitle {
      font-size: 11pt;
      color: #666;
      margin-bottom: 8px;
    }
    .contact {
      font-size: 10pt;
      color: #666;
      margin-bottom: 20px;
    }
    .contact a {
      color: #0066cc;
      text-decoration: none;
      margin-right: 15px;
    }
    hr {
      border: none;
      border-top: 2px solid #333;
      margin: 20px 0;
    }
    h2 {
      font-size: 14pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1a1a1a;
      margin: 20px 0 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    h3 {
      font-size: 12pt;
      margin: 12px 0 5px;
      color: #1a1a1a;
    }
    .job-header, .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }
    .company, .school {
      font-weight: 600;
      color: #0066cc;
    }
    .date {
      font-size: 10pt;
      color: #666;
      font-style: italic;
    }
    ul {
      margin: 8px 0 16px 20px;
    }
    li {
      margin-bottom: 5px;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 10px 0 20px;
    }
    .skill-category {
      font-size: 10pt;
    }
    .skill-category strong {
      color: #1a1a1a;
    }
    .project {
      margin-bottom: 15px;
    }
    .project-link {
      font-size: 10pt;
      color: #0066cc;
      text-decoration: none;
      margin-left: 10px;
    }
    .tech {
      font-size: 10pt;
      color: #666;
      font-style: italic;
    }
    .summary {
      margin: 15px 0;
      line-height: 1.7;
    }
    .summary strong {
      color: #1a1a1a;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    @media print {
      body { padding: 20px; font-size: 10pt; }
      h1 { font-size: 24pt; }
      h2 { font-size: 12pt; page-break-after: avoid; }
      h3 { page-break-after: avoid; }
      .job-header { page-break-inside: avoid; }
      ul { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>Ahnika Mangalick</h1>
  <div class="subtitle">B.S. Computer Science & Mathematics | Palo Alto, CA</div>
  <div class="contact">
    <a href="mailto:ahnika.mangalick@gmail.com">ahnika.mangalick@gmail.com</a>
    <a href="https://www.linkedin.com/in/ahnika-mangalick-792756261/" target="_blank">LinkedIn</a>
    <a href="https://github.com/amangalick" target="_blank">GitHub</a>
  </div>
  <hr>
  
  <h2>Summary</h2>
  <div class="summary">
    <strong>CS & Math grad comfortable using AI/Agents from design to code.</strong> I love building software that solves real problems and explaining it clearly. I thrive in diverse, collaborative teams — equally comfortable deep in a codebase, leveraging AI tools to accelerate development, or translating technical work for non-technical stakeholders.
  </div>
  
  <h2>Education</h2>`;
  
  education.forEach(edu => {
    html += `
  <div class="edu-header">
    <div>
      <h3>${edu.degree} in ${edu.field}</h3>
      <div class="school">${edu.school}</div>
    </div>
    <div class="date">${edu.startDate} – ${edu.endDate}</div>
  </div>`;
  });
  
  html += `
  
  <h2>Skills</h2>
  <div class="skills-grid">`;
  
  skills.forEach(category => {
    html += `
    <div class="skill-category">
      <strong>${category.category}:</strong> ${category.items.join(', ')}
    </div>`;
  });
  
  html += `
  </div>
  
  <h2>Experience</h2>`;
  
  experience.forEach(job => {
    html += `
  <div class="job-header">
    <div>
      <h3>${job.role}</h3>
      <div class="company">${job.company}</div>
    </div>
    <div class="date">${job.startDate} – ${job.endDate}</div>
  </div>
  <ul>`;
    
    job.description.forEach(point => {
      html += `
    <li>${point}</li>`;
    });
    
    html += `
  </ul>`;
  });
  
  html += `
  
  <h2>Projects</h2>`;
  
  projects.forEach(proj => {
    html += `
  <div class="project">
    <h3>${proj.name}`;
    if (proj.link) {
      html += `<a href="${proj.link}" class="project-link" target="_blank">View →</a>`;
    }
    html += `</h3>
    <p>${proj.description}</p>
    <div class="tech">Technologies: ${proj.tech.join(', ')}</div>
  </div>`;
  });
  
  html += `
</body>
</html>`;
  
  return html;
}

// Generate both formats
console.log('Generating resume documents...\n');

const markdown = generateMarkdown();
writeFileSync('./RESUME.md', markdown);
console.log('✓ Created RESUME.md');

const html = generateHTML();
writeFileSync('./RESUME.html', html);
console.log('✓ Created RESUME.html');

console.log('\n📄 Resume files created successfully!');
console.log('\nTo view:');
console.log('  • Open RESUME.html in your browser');
console.log('  • Print to PDF from browser (Cmd+P)');
console.log('  • Or open RESUME.md in any markdown viewer');

process.exit(0);
