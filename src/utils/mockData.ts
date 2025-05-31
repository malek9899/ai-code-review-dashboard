import type { Repository, AnalysisResult, Issue, AIRecommendation } from '../types';

export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'react-ecommerce-app',
    owner: 'alekhya-dev',
    description: 'Modern React e-commerce application with TypeScript',
    language: 'TypeScript',
    size: '2.3MB',
    filesAnalyzed: 127,
    lastAnalysis: '2024-12-15T10:30:00Z',
    qualityScore: 8.7,
    url: 'https://github.com/alekhya-dev/react-ecommerce-app',
    isPrivate: false
  },
  {
    id: '2', 
    name: 'vue-admin-dashboard',
    owner: 'alekhya-dev',
    description: 'Vue.js admin dashboard with real-time analytics',
    language: 'Vue.js',
    size: '1.8MB',
    filesAnalyzed: 89,
    lastAnalysis: '2024-12-14T15:22:00Z',
    qualityScore: 9.1,
    url: 'https://github.com/alekhya-dev/vue-admin-dashboard',
    isPrivate: false
  },
  {
    id: '3',
    name: 'node-api-service',
    owner: 'alekhya-dev',
    description: 'RESTful API service built with Node.js and Express',
    language: 'JavaScript',
    size: '1.2MB',
    filesAnalyzed: 64,
    lastAnalysis: '2024-12-13T09:15:00Z',
    qualityScore: 8.3,
    url: 'https://github.com/alekhya-dev/node-api-service',
    isPrivate: true
  }
];

export const mockIssues: Issue[] = [
  {
    id: 'SEC-001',
    severity: 'major',
    type: 'Dependency Vulnerability',
    file: 'package.json',
    line: undefined,
    message: 'React version 17.0.2 has known vulnerabilities. Upgrade to 18.2.0+',
    suggestion: 'npm install react@^18.2.0 react-dom@^18.2.0',
    cve: 'CVE-2022-28131',
    category: 'security'
  },
  {
    id: 'PERF-001',
    severity: 'major',
    type: 'Bundle Size',
    file: 'src/components/Dashboard.tsx',
    line: 1,
    message: 'Large bundle size (847KB) affects initial load time',
    suggestion: 'Implement lazy loading with React.lazy() and Suspense',
    category: 'performance'
  },
  {
    id: 'QUAL-001',
    severity: 'minor',
    type: 'Code Duplication',
    file: 'src/utils/validation.ts',
    line: 15,
    message: 'Duplicate validation logic found in multiple files',
    suggestion: 'Extract common validation logic to shared utility',
    category: 'quality'
  },
  {
    id: 'SEC-002',
    severity: 'minor',
    type: 'Input Validation',
    file: 'src/components/UserForm.tsx', 
    line: 45,
    message: 'User input not properly sanitized before database query',
    suggestion: 'Implement input validation and parameterized queries',
    category: 'security'
  }
];

export const mockRecommendations: AIRecommendation[] = [
  {
    id: 'REC-001',
    category: 'Performance',
    priority: 'high',
    title: 'Implement Code Splitting',
    description: 'Break down large components into smaller chunks loaded on demand to improve initial load time.',
    files: ['src/components/Dashboard.tsx', 'src/pages/Analytics.tsx'],
    effort: '4-6 hours',
    impact: '40% reduction in initial bundle size',
    implementation: [
      'Use React.lazy() for route-level code splitting',
      'Implement Suspense boundaries with loading states', 
      'Analyze bundle with webpack-bundle-analyzer'
    ]
  },
  {
    id: 'REC-002',
    category: 'Security',
    priority: 'high',
    title: 'Update Dependencies',
    description: 'Several dependencies have security vulnerabilities that should be addressed immediately.',
    files: ['package.json'],
    effort: '2-3 hours',
    impact: 'Eliminates 3 high-severity security vulnerabilities',
    implementation: [
      'Update React to latest stable version',
      'Run npm audit fix',
      'Review and test updated dependencies'
    ]
  },
  {
    id: 'REC-003',
    category: 'Architecture',
    priority: 'medium',
    title: 'Add Error Boundaries',
    description: 'Implement error boundaries to prevent cascading failures and improve user experience.',
    files: ['src/components/Dashboard.tsx', 'src/App.tsx'],
    effort: '3-4 hours',
    impact: 'Improved error handling and user experience'
  }
];

export const mockAnalysisResult: AnalysisResult = {
  repository: mockRepositories[0],
  qualityMetrics: {
    overallScore: 8.7,
    maintainability: 8.5,
    reliability: 9.0,
    security: 8.2,
    performance: 8.8,
    testCoverage: 85
  },
  issues: {
    critical: 0,
    major: 2,
    minor: 8,
    info: 15,
    total: 25,
    items: mockIssues
  },
  recommendations: mockRecommendations,
  trends: {
    qualityOverTime: [
      { month: 'Jul', score: 7.2 },
      { month: 'Aug', score: 7.8 },
      { month: 'Sep', score: 8.1 },
      { month: 'Oct', score: 8.5 },
      { month: 'Nov', score: 8.3 },
      { month: 'Dec', score: 8.7 }
    ],
    issueDistribution: [
      { category: 'Security', count: 3, color: '#ef4444' },
      { category: 'Performance', count: 7, color: '#f59e0b' },
      { category: 'Quality', count: 12, color: '#3b82f6' },
      { category: 'Style', count: 5, color: '#10b981' }
    ],
    languageBreakdown: [
      { language: 'TypeScript', percentage: 65, lines: 8420 },
      { language: 'JavaScript', percentage: 20, lines: 2590 },
      { language: 'CSS/SCSS', percentage: 10, lines: 1295 },
      { language: 'HTML', percentage: 5, lines: 648 }
    ]
  },
  generatedAt: new Date().toISOString()
};

// Simulate API delay
export const simulateAPICall = async <T>(data: T, delay = 1500): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, delay));
  return data;
};

// Generate random analysis data for demo
export const generateRandomAnalysis = (repoName: string): AnalysisResult => {
  const baseScore = 7 + Math.random() * 2; // 7-9 range
  
  return {
    ...mockAnalysisResult,
    repository: {
      ...mockAnalysisResult.repository,
      name: repoName,
      qualityScore: Number(baseScore.toFixed(1))
    },
    qualityMetrics: {
      overallScore: Number(baseScore.toFixed(1)),
      maintainability: Number((baseScore + Math.random() * 0.5 - 0.25).toFixed(1)),
      reliability: Number((baseScore + Math.random() * 0.5 - 0.25).toFixed(1)),
      security: Number((baseScore + Math.random() * 0.5 - 0.25).toFixed(1)),
      performance: Number((baseScore + Math.random() * 0.5 - 0.25).toFixed(1)),
      testCoverage: Math.floor(70 + Math.random() * 25) // 70-95%
    },
    issues: {
      critical: Math.floor(Math.random() * 2),
      major: Math.floor(Math.random() * 5) + 1,
      minor: Math.floor(Math.random() * 10) + 5,
      info: Math.floor(Math.random() * 15) + 10,
      total: 0,
      items: mockIssues
    },
    generatedAt: new Date().toISOString()
  };
};