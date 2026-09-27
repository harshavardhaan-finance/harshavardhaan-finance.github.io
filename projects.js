// Project and case-study content. Edit here; cards and case pages are rendered from this list.
window.PROJECTS = [
  {
    id: 'dcf-valuation',
    artifact: { url: 'https://claude.ai/artifact/GmTjhr8mKcC7JXuiGf3rga', title: 'Harsha Tea House Model', preview: 'dcf-valuation.jpg', blurb: 'Change any assumption and every schedule, statement and the DCF recalculate.' },
    kicker: 'Financial Modelling · DCF · Excel',
    title: 'Three-Statement Modelling & DCF Valuation',
    summary: 'A dynamic five-year financial model for a fictional premium tea shop. It forecasts revenue, COGS and operating expenses, links the income statement, balance sheet and cash flow statement, calculates FCFF and runs DCF, scenario and sensitivity analysis.',
    tags: ['Financial Modelling', 'Three-Statement Model', 'DCF', 'FCFF', 'Scenario Analysis', 'Excel'],
    overview: 'A fully linked five-year three-statement model for a fictional premium tea shop. Operating assumptions flow straight through to the valuation, so it doesn\'t live in a separate spreadsheet.',
    highlight: { value: '₹1.10 Cr', label: 'Base-case enterprise value' },
    approach: [
      'Built and linked the income statement, balance sheet and cash flow statement across a five-year horizon',
      'Calculated Free Cash Flow to the Firm (FCFF) directly from the linked model outputs',
      'Applied a Discounted Cash Flow (DCF) methodology to derive enterprise value',
      'Added scenario and sensitivity analysis to test how key assumptions move the valuation'
    ],
    outcomes: [
      'Base-case model produced an enterprise value of INR 1,10,03,425',
      'Created a reusable, fully linked valuation framework rather than a single static number',
      'Made it possible to see, assumption by assumption, what drives enterprise value up or down'
    ],
    images: ['dcf-output-1.png', 'dcf-output-2.png', 'dcf-output-3.png', 'dcf-output-4.png', 'dcf-output-5.png'],
    thumb: 'project-image-01.png',
    report: { label: 'Report Output', title: 'Project Report', file: 'document-01.pdf' }
  },
  {
    id: 'cash-flow-13-week',
    artifact: { url: 'https://claude.ai/artifact/AgE7UKTDp8H2vnXzAEtFL6', title: '13-Week Cash Forecast', preview: 'cash-flow-13-week.jpg', blurb: 'Stress collection and payment timing and watch the minimum cash buffer.' },
    kicker: 'Cash Flow · Forecasting · Excel',
    title: '13-Week Cash Flow Forecast',
    summary: 'A short-term cash flow forecast that tracks liquidity, expected inflows and outflows, and cash position over a rolling 13-week period.',
    tags: ['Cash Flow Forecasting', 'Treasury', 'Liquidity Planning', 'Excel'],
    overview: 'A rolling 13-week cash flow forecast that gives a week-by-week view of liquidity instead of relying on month-end snapshots.',
    highlight: { value: '13 wks', label: 'Rolling liquidity horizon' },
    approach: [
      'Mapped customer collections, vendor payments and other cash movements onto a weekly timeline',
      'Rolled these into weekly cash inflows, outflows and running ending balances',
      'Structured the model to roll forward as actuals replace forecast weeks'
    ],
    outcomes: [
      'Produced a week-by-week liquidity view across the full 13-week horizon',
      'Made cash surplus and deficit periods visible well ahead of time',
      'Flagged weeks approaching the minimum cash buffer, supporting short-term treasury decisions'
    ],
    images: ['project-image-02.png'],
    thumb: 'project-image-02.png'
  },
  {
    id: 'sales-budget-variance',
    artifact: { url: 'https://claude.ai/artifact/ESzxo5icpUwVKmp2xPCJ5p', title: 'ABC Appliances Sales Budget', preview: 'sales-budget-variance.jpg', blurb: 'Flex the budget drivers, review Q1 variances and flip through the review deck.' },
    kicker: 'FP&A · Budgeting · Forecasting · Excel',
    title: 'Sales Budget vs Actual Variance & Forecast',
    summary: 'An end-to-end FP&A sales planning model. It uses historical seasonality, seasonal indices, regression and management guidance to set the annual sales budget, analyses revenue, volume and price variances, and updates rolling forecasts.',
    tags: ['FP&A', 'Budgeting', 'Regression Forecasting', 'Variance Analysis', 'Excel'],
    overview: 'An annual sales budget combined with a Q1 budget-vs-actual variance review. It explains why the business beat or missed budget, not just whether it did.',
    highlight: { value: 'Q1 BvA', label: 'Volume · price · mix variances' },
    approach: [
      'Built seasonal indices from historical sales data to capture demand patterns across the year',
      'Applied regression forecasting alongside management guidance and price assumptions to set the annual budget',
      'Ran a Q1 budget-vs-actual variance analysis, isolating volume, price and mix effects',
      'Fed the variance findings back into a revised rolling forecast'
    ],
    outcomes: [
      'Converted a static annual budget into a rolling, self-correcting forecast',
      'Produced a management-ready view of the revenue, volume and price drivers behind the outlook',
      'Packaged the analysis into a formal Budget Review Presentation (below)'
    ],
    images: ['project-image-03.png', 'project-image-10.png', 'project-image-11.png', 'project-image-12.png', 'project-image-13.png'],
    thumb: 'project-image-03.png',
    report: { label: 'FP&A Presentation', title: 'Budget Review Presentation', file: 'Budget_review.pdf' }
  },
  {
    id: 'material-budget-hedging',
    artifact: { url: 'https://claude.ai/artifact/RHBVFaP8D14FmAGDdKnce5', title: 'AluWrap Material Budget', preview: 'material-budget-hedging.jpg', blurb: 'Switch price-forecast methods, change the hedge ratio and see Q1 hedge performance.' },
    kicker: 'Cost Analysis · Budgeting · Hedging · Excel',
    title: 'Material Budget & Hedging Analysis',
    summary: 'An integrated production, materials and commodity-risk model. It covers production and inventory planning, aluminium requirements, procurement budgeting, regression and moving-average price forecasts, futures hedging, budget-vs-actual analysis and hedge effectiveness.',
    tags: ['Cost Analysis', 'Commodity Hedging', 'Procurement Budgeting', 'Regression', 'Excel'],
    overview: 'A material cost and hedging model built around aluminium as the key input. It connects production planning to commodity-price risk management.',
    highlight: { value: 'Aluminium', label: 'Futures hedge on key input' },
    approach: [
      'Modelled production and inventory planning to derive aluminium requirement schedules',
      'Forecast commodity prices using regression and moving-average techniques',
      'Built a procurement budget from the requirement and price forecasts',
      'Added futures hedging and hedge-effectiveness analysis against that exposure'
    ],
    outcomes: [
      'Quantified how the hedge changes the business\'s input-cost exposure',
      'Connected commodity-price movements directly to budget-vs-actual cost outcomes',
      'Gave a basis for deciding how much of the aluminium exposure to hedge'
    ],
    images: ['project-image-04.png', 'project-image-14.png', 'project-image-15.png', 'project-image-16.png', 'project-image-17.png'],
    thumb: 'project-image-04.png'
  },
  {
    id: 'project-decision-analysis',
    artifact: { url: 'https://claude.ai/artifact/1dVowCNeiio8y4pxeTcVjL', title: 'SunRise 1 GW Solar', preview: 'project-decision-analysis.jpg', blurb: 'Pick a scenario or change a driver and the board tests, DSCR and NPV update.' },
    kicker: 'Capital Allocation · Project Evaluation · Excel',
    title: 'Project Decision Analysis',
    summary: 'An evaluation of a project investment decision, with financial analysis and an executive summary focused on project economics and decision support.',
    tags: ['Capital Budgeting', 'DCF', 'DSCR', 'Scenario Analysis', 'Excel'],
    overview: 'An evaluation model for a utility-scale solar project, built to support a go/no-go capital allocation decision. It combines project economics with the debt side of the financing.',
    highlight: { value: 'NPV · IRR · DSCR', label: 'One decision framework' },
    approach: [
      'Modelled project-level cash flows across the life of the solar asset',
      'Applied DCF valuation to the project cash flows to derive NPV and IRR',
      'Added debt financing assumptions and calculated the Debt Service Coverage Ratio (DSCR)',
      'Ran scenario and sensitivity analysis across the key value drivers'
    ],
    outcomes: [
      'Brought NPV, IRR, payback period and DSCR into a single investment-decision framework',
      'Sensitivities highlighted which variables the project\'s returns are most exposed to',
      'Gave decision-makers a structured basis for approving or rejecting the investment'
    ],
    images: ['project-image-05.png'],
    thumb: 'project-image-05.png',
    report: { label: 'Report Output', title: 'Project Report', file: 'document-02.pdf' }
  },
  {
    id: 'power-bi-dashboard',
    artifact: { url: 'https://claude.ai/artifact/Eif7KKiwPXonTBPTGw83Va', title: 'Sales and Profitability 2025', preview: 'power-bi-dashboard.webp', blurb: 'The Power BI report plus an interactive version you can slice and filter.' },
    kicker: 'Power BI · DAX · Financial Analytics',
    title: 'Power BI Financial Dashboard',
    summary: 'A financial dashboard that presents key performance indicators and business trends in an interactive management-reporting format.',
    tags: ['Power BI', 'DAX', 'Data Modelling', 'Financial Analytics'],
    overview: 'An interactive Power BI dashboard on a structured data model. Management can explore profitability instead of reading it off a static report.',
    highlight: { value: 'DAX', label: 'Revenue · GP · EBITDA · margins' },
    approach: [
      'Built a structured data model connecting transactional data to customer, product, business-unit and regional dimensions',
      'Wrote DAX measures for revenue, gross profit, EBITDA and margin percentages',
      'Added monthly trend analysis to track performance over time',
      'Designed the report layer for drill-down exploration rather than one-way reporting'
    ],
    outcomes: [
      'Turned raw transactional data into an interactive management dashboard',
      'Made profitability and performance patterns easier to identify across customers, products and regions',
      'Let users investigate a trend rather than just observe it'
    ],
    images: ['project-image-06.png'],
    thumb: 'project-image-06.png'
  },
  {
    id: 'portfolio-optimization',
    artifact: { url: 'https://claude.ai/artifact/MFjiVH2qVbicMhMNZd8HAK', title: 'Equity Portfolio Optimizer', preview: 'portfolio-optimization.jpg', blurb: 'Find the max-Sharpe allocation, run Monte Carlo VaR and size a Nifty futures hedge.' },
    kicker: 'Portfolio Analytics · Risk · Excel',
    title: 'Portfolio Optimization',
    summary: 'A portfolio risk and return analysis using an efficient frontier, Monte Carlo simulation, portfolio optimization and risk/hedging analysis.',
    tags: ['Portfolio Theory', 'Efficient Frontier', 'Monte Carlo Simulation', 'Risk Analysis', 'Excel'],
    overview: 'A portfolio risk-and-return analysis that maps the trade-off between expected return and volatility, instead of defaulting to a single fixed allocation.',
    highlight: { value: 'Monte Carlo', label: 'Efficient frontier analysis' },
    approach: [
      'Built an efficient-frontier analysis across the candidate asset mix',
      'Ran Monte Carlo simulation to stress-test return and volatility outcomes',
      'Applied portfolio optimisation techniques to identify efficient allocations',
      'Added risk and hedging analysis around the optimised mixes'
    ],
    outcomes: [
      'Identified portfolio mixes along the risk-return frontier rather than a single "best" portfolio',
      'Made the trade-off between expected return, volatility and diversification explicit and visual',
      'Gave a framework for choosing an allocation based on risk appetite rather than guesswork'
    ],
    images: ['project-image-07.png', 'project-image-18.png', 'project-image-19.png', 'project-image-20.png'],
    thumb: 'project-image-07.png'
  },
  {
    id: 'sql-working-capital',
    artifact: { url: 'https://claude.ai/artifact/CLibXwAy92Lu9T3XGvZgL2', title: 'Working Capital SQL', preview: 'sql-working-capital.jpg', blurb: 'All 31 queries run live in your browser. Edit any query or write your own.' },
    kicker: 'SQL · Working Capital · Financial Analytics',
    title: 'SQL Working Capital Analytics',
    summary: 'A SQL analysis of working-capital drivers, including inventory, receivables, suppliers and working-capital ratios.',
    tags: ['SQL', 'Working Capital', 'DSO / DPO / DIO', 'Cash Conversion Cycle'],
    overview: 'A SQL working capital analysis that runs directly on receivables, payables and inventory data, not on pre-aggregated spreadsheet extracts.',
    highlight: { value: 'CCC', label: 'DSO + DIO − DPO' },
    approach: [
      'Wrote SQL queries against receivables, payables and inventory tables to calculate DSO, DPO and DIO',
      'Combined the three metrics to compute the Cash Conversion Cycle (CCC)',
      'Broke the CCC down by driver to see where working capital was actually tied up',
      'Translated the raw query outputs into a working-capital analysis a non-technical reader could use'
    ],
    outcomes: [
      'Isolated the receivables, inventory and payables drivers behind the CCC',
      'Turned database-level outputs into actionable working-capital insights',
      'Demonstrated SQL as a direct tool for financial analysis, not just data retrieval'
    ],
    images: ['project-image-08.png', 'project-image-21.png', 'project-image-22.png', 'project-image-23.png'],
    thumb: 'project-image-08.png'
  },
  {
    id: 'startup-valuation',
    artifact: { url: 'https://claude.ai/artifact/FJu3yeYZXoGRtjinyhjGoL', title: 'Annapurna Capital Series B', preview: 'startup-valuation.jpg', blurb: 'Flex the scenario and drivers, then see the valuation, cap table and pitchbook.' },
    kicker: 'Financial Modelling · Valuation · Excel · Presentation',
    title: 'Startup Valuation & Presentation',
    summary: 'A startup valuation case study that combines financial modelling, valuation analysis, scenario and sensitivity analysis, cap-table analysis, market sizing (TAM/SAM/SOM) and an investor presentation.',
    tags: ['Valuation', 'DCF', 'Comparable Company Analysis', 'Cap Table', 'Investor Presentation'],
    overview: 'An end-to-end startup valuation and Series B fundraising case study. It mirrors how an investment or corporate development team would evaluate and present a deal.',
    highlight: { value: '₹700 Cr', label: 'Recommended post-money' },
    approach: [
      'Built a five-year financial model as the foundation for valuation',
      'Ran DCF valuation and comparable-company analysis side by side to triangulate a value range',
      'Sized the market using a TAM/SAM/SOM framework',
      'Modelled the cap table alongside scenario and sensitivity analysis on the key assumptions',
      'Packaged the full analysis into an investor-facing Series B pitch deck'
    ],
    outcomes: [
      'DCF valuation indicated approximately INR 176 Cr of equity value',
      'Comparable-company analysis produced a INR 315–1,183 Cr range, bracketing the DCF output',
      'Recommended Series B terms: INR 560 Cr pre-money, INR 700 Cr post-money, 20% dilution against a INR 140 Cr raise',
      'Delivered as a full pitchbook, not just a spreadsheet (below)'
    ],
    images: ['project-image-09.png', 'project-image-24.png', 'project-image-25.png', 'project-image-26.png'],
    thumb: 'project-image-09.png',
    report: { label: 'Investor Presentation', title: 'Series B Pitchbook', file: 'Annapurna_Capital_SeriesB_Pitchbook.pdf' }
  }
];
