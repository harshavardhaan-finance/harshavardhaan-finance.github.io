// Projects data
const projects = [
    {
        id: 1,
        title: "13-Week Cash Flow Forecast",
        description: "Dynamic Excel model for rolling 13-week cash flow forecasting, liquidity planning, cash buffer monitoring, and short-term treasury management.",
        technologies: ["Excel", "Financial Modeling", "Cash Flow"],
        repo: "13-week-cash-flow-forecast",
        url: "https://github.com/harshavardhaan-finance/13-week-cash-flow-forecast"
    },
    {
        id: 2,
        title: "Financial Modeling - Business Valuation",
        description: "Driver-based Excel financial model featuring integrated financial statements, DCF valuation, sensitivity analysis, and executive dashboard for business valuation.",
        technologies: ["Excel", "DCF", "Valuation"],
        repo: "financial-modeling-business-valuation",
        url: "https://github.com/harshavardhaan-finance/financial-modeling-business-valuation"
    },
    {
        id: 3,
        title: "Financial Sales Dashboard - Power BI",
        description: "Interactive Power BI dashboard featuring financial KPI reporting, sales analytics, DAX measures, data modelling, and executive performance reporting.",
        technologies: ["Power BI", "DAX", "Business Intelligence"],
        repo: "financial-sales-dashboard-powerbi",
        url: "https://github.com/harshavardhaan-finance/financial-sales-dashboard-powerbi"
    },
    {
        id: 4,
        title: "Production Budget & Materials Planning",
        description: "Integrated production planning model including material budgeting, aluminium price forecasting, procurement planning, futures hedging strategy, and hedge performance analysis.",
        technologies: ["Excel", "Forecasting", "Hedging"],
        repo: "production-budget-materials-planning",
        url: "https://github.com/harshavardhaan-finance/production-budget-materials-planning"
    },
    {
        id: 5,
        title: "Sales Budget Forecast & Variance Analysis",
        description: "Driver-based sales budgeting and forecasting model using regression and seasonal analysis, followed by budget vs. actual variance analysis and executive reporting.",
        technologies: ["Excel", "Regression", "Forecasting"],
        repo: "sales-budget-forecast-variance-analysis",
        url: "https://github.com/harshavardhaan-finance/sales-budget-forecast-variance-analysis"
    },
    {
        id: 6,
        title: "Utility-Scale Solar Project Finance",
        description: "Comprehensive project finance model for 1 GW utility-scale solar project covering capital budgeting, DCF valuation, debt financing, DSCR analysis, and investment evaluation.",
        technologies: ["Excel", "Project Finance", "DCF"],
        repo: "utility-scale-solar-project-evaluation-finance-model",
        url: "https://github.com/harshavardhaan-finance/utility-scale-solar-project-evaluation-finance-model"
    },
    {
        id: 7,
        title: "Working Capital Analytics",
        description: "SQL analysis of receivables, payables, and inventory to compute working capital efficiency metrics (DSO, DPO, DIO, CCC) for business analytics.",
        technologies: ["SQL", "PostgreSQL", "Analytics"],
        repo: "working-capital-analytics",
        url: "https://github.com/harshavardhaan-finance/working-capital-analytics"
    }
];

// Function to render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
            </div>
            <div class="project-body">
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.url}" target="_blank" class="project-links a btn-github">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize projects when page loads
document.addEventListener('DOMContentLoaded', renderProjects);