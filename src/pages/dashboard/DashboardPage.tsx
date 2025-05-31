import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import { QualityChart } from '../../components/charts/QualityChart';
import { IssueDistributionChart } from '../../components/charts/IssueDistributionChart';
import { mockRepositories, mockAnalysisResult, simulateAPICall } from '../../utils/mockData';
import type { AnalysisResult } from '../../types';
import { 
  CheckCircle, 
  AlertTriangle, 
  Zap, 
  FileText, 
  ArrowUpRight,
  GitBranch,
  Clock,
  TrendingUp
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await simulateAPICall(mockAnalysisResult, 1200);
        setAnalysisData(data);
      } catch (error) {
        console.error('Failed to fetch analysis data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading text="Analyzing repositories with AI..." size="lg" />
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Failed to load dashboard</h2>
          <p className="text-gray-600 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Code Quality Score',
      value: `${analysisData.qualityMetrics.overallScore}/10`,
      change: '+0.4',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Security Issues',
      value: `${analysisData.issues.major + analysisData.issues.critical}`,
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Performance Score',
      value: `${analysisData.qualityMetrics.performance}/10`,
      change: '+0.2',
      trend: 'up',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Files Analyzed',
      value: analysisData.repository.filesAnalyzed.toString(),
      change: '+12',
      trend: 'up',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Code Review Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Intelligent analysis powered by OpenAI GPT-4 • Last updated {new Date(analysisData.generatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/analytics"
                className="btn btn-outline flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                View Analytics
              </Link>
              <button className="btn btn-primary flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Analyze Repository
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <span className={`text-sm px-2 py-1 rounded-full flex items-center gap-1 ${
                        stat.trend === 'up' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        <ArrowUpRight className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-90' : ''}`} />
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Code Quality Trends</h3>
              <p className="text-sm text-gray-600">Quality score over the last 6 months</p>
            </CardHeader>
            <CardContent>
              <QualityChart data={analysisData.trends.qualityOverTime} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Issue Distribution</h3>
              <p className="text-sm text-gray-600">Breakdown of issues by category</p>
            </CardHeader>
            <CardContent>
              <IssueDistributionChart data={analysisData.trends.issueDistribution} />
            </CardContent>
          </Card>
        </div>

        {/* Repository Overview & Recent Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Repository List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Recent Repositories</h3>
                <p className="text-sm text-gray-600">Recently analyzed repositories</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRepositories.map((repo) => (
                    <Link
                      key={repo.id}
                      to={`/repository/${repo.owner}/${repo.name}`}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{repo.name}</h4>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          repo.qualityScore >= 9 
                            ? 'bg-green-100 text-green-700'
                            : repo.qualityScore >= 8
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {repo.qualityScore}/10
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{repo.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(repo.lastAnalysis).toLocaleDateString()}
                        </span>
                        <span>{repo.language}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Issues & Recommendations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Recent Issues & AI Recommendations</h3>
                <p className="text-sm text-gray-600">Critical issues and intelligent suggestions</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Critical Issues */}
                  {analysisData.issues.items.slice(0, 3).map((issue) => (
                    <div key={issue.id} className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              issue.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              issue.severity === 'major' ? 'bg-orange-100 text-orange-800' :
                              issue.severity === 'minor' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {issue.severity}
                            </span>
                            <span className="text-sm text-gray-600">{issue.type}</span>
                          </div>
                          <p className="font-medium text-gray-900 mb-1">{issue.message}</p>
                          <p className="text-sm text-gray-600 mb-2">
                            <code className="bg-gray-100 px-1 rounded">{issue.file}</code>
                            {issue.line && ` line ${issue.line}`}
                          </p>
                          <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                            💡 <strong>Suggestion:</strong> {issue.suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* AI Recommendations */}
                  {analysisData.recommendations.slice(0, 2).map((recommendation) => (
                    <div key={recommendation.id} className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              recommendation.priority === 'high' ? 'bg-red-100 text-red-800' :
                              recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {recommendation.priority} priority
                            </span>
                            <span className="text-sm text-gray-600">{recommendation.category}</span>
                          </div>
                          <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{recommendation.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Effort: {recommendation.effort}</span>
                        <span>Impact: {recommendation.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link
                    to={`/repository/${analysisData.repository.owner}/${analysisData.repository.name}`}
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                  >
                    View Full Analysis Report
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};