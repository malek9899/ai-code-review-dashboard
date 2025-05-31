export interface Repository {
  id: string;
  name: string;
  owner: string;
  description?: string;
  language: string;
  size: string;
  filesAnalyzed: number;
  lastAnalysis: string;
  qualityScore: number;
  url?: string;
  isPrivate: boolean;
}

export interface QualityMetrics {
  overallScore: number;
  maintainability: number;
  reliability: number;
  security: number;
  performance: number;
  testCoverage: number;
}

export interface Issue {
  id: string;
  severity: 'critical' | 'major' | 'minor' | 'info';
  type: string;
  file: string;
  line?: number;
  message: string;
  suggestion: string;
  cve?: string;
  category: 'security' | 'performance' | 'quality' | 'style';
}

export interface AIRecommendation {
  id: string;
  category: 'Architecture' | 'Performance' | 'Security' | 'Testing' | 'Maintainability';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  files: string[];
  effort: string;
  impact: string;
  implementation?: string[];
}

export interface AnalysisResult {
  repository: Repository;
  qualityMetrics: QualityMetrics;
  issues: {
    critical: number;
    major: number;
    minor: number;
    info: number;
    total: number;
    items: Issue[];
  };
  recommendations: AIRecommendation[];
  trends: {
    qualityOverTime: Array<{ month: string; score: number }>;
    issueDistribution: Array<{ category: string; count: number; color: string }>;
    languageBreakdown: Array<{ language: string; percentage: number; lines: number }>;
  };
  generatedAt: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string | null;
  language: string | null;
  size: number;
  updated_at: string;
  html_url: string;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
}

export interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}