import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import { QualityChart } from '../../components/charts/QualityChart';
import { IssueDistributionChart } from '../../components/charts/IssueDistributionChart';
import { mockAnalysisResult, generateRandomAnalysis, simulateAPICall } from '../../utils/mockData';
import type { AnalysisResult } from '../../types';
import { 
  ArrowLeft, 
  Github, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  ExternalLink,
  Zap,
  Shield,
  Code,
} from 'lucide-react';

export const RepositoryPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!repo) return;
      
      try {
        // Simulate fetching repository-specific data
        const data = repo === 'react-ecommerce-app' 
          ? await simulateAPICall(mockAnalysisResult, 1500)
          : await simulateAPICall(generateRandomAnalysis(repo), 1500);
        
        setAnalysisData(data);
      } catch (error) {
        console.error('Failed to fetch repository analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [owner, repo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading text={`Analyzing ${repo} repository...`} size="lg" />
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Repository not found</h2>
          <p className="text-gray-600 mt-2">The repository analysis could not be loaded</p>
          <Link to="/dashboard" className="btn btn-primary mt-4">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const qualityMetrics = [
    { 
      label: 'Maintainability', 
      value: analysisData.qualityMetrics.maintainability, 
      icon: Code,
      color: 'text-blue-600'
    },
    { 
      label: 'Reliability', 
      value: analysisData.qualityMetrics.reliability, 
      icon: CheckCircle,
      color: 'text-green-600'
    },
    { 
      label: 'Security', 
      value: analysisData.qualityMetrics.security, 
      icon: Shield,
      color: 'text-red-600'
    },
    { 
      label: 'Performance', 
      value: analysisData.qualityMetrics.performance, 
      icon: Zap,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/dashboard" 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Github className="w-8 h-8 text-gray-700" />
                {owner}/{repo}
              </h1>
              <p className="text-gray-600 mt-1">{analysisData.repository.description}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Last analyzed: {new Date(analysisData.generatedAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {analysisData.repository.filesAnalyzed} files
              </span>
              <span className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                {analysisData.repository.language}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href={analysisData.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </a>
              <button className="btn btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="btn btn-primary">
                Re-analyze Repository
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Quality Score */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-3xl font-bold mb-4">
                  {analysisData.qualityMetrics.overallScore}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Quality Score</h2>
                <p className="text-gray-600 mb-6">Based on comprehensive AI analysis of code quality, security, and performance</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {qualityMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <metric.icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Quality Trends</h3>
              <p className="text-sm text-gray-600">Code quality progression over time</p>
            </CardHeader>
            <CardContent>
              <QualityChart data={analysisData.trends.qualityOverTime} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Issue Breakdown</h3>
              <p className="text-sm text-gray-600">Distribution of identified issues</p>
            </CardHeader>
            <CardContent>
              <IssueDistributionChart data={analysisData.trends.issueDistribution} />
            </CardContent>
          </Card>
        </div>

        {/* Issues and Recommendations */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Issues List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Identified Issues</h3>
                  <p className="text-sm text-gray-600">{analysisData.issues.total} issues found</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    {analysisData.issues.critical} Critical
                  </span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    {analysisData.issues.major} Major
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {analysisData.issues.items.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
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
                      {issue.cve && (
                        <span className="text-xs text-red-600 font-mono bg-red-50 px-1 rounded">
                          {issue.cve}
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{issue.message}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      <code className="bg-gray-100 px-1 rounded text-xs">{issue.file}</code>
                      {issue.line && (
                        <span className="ml-1">line {issue.line}</span>
                      )}
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded p-2">
                      <p className="text-sm text-green-800">
                        <strong>💡 AI Suggestion:</strong> {issue.suggestion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
              <p className="text-sm text-gray-600">Intelligent suggestions for improvement</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {analysisData.recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
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
                        <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{recommendation.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Effort:</span> {recommendation.effort}
                      </div>
                      <div>
                        <span className="font-medium">Impact:</span> {recommendation.impact}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Files:</span>{' '}
                      {recommendation.files.slice(0, 2).map((file, idx) => (
                        <code key={idx} className="bg-gray-100 px-1 rounded mr-1">
                          {file}
                        </code>
                      ))}
                      {recommendation.files.length > 2 && (
                        <span>+{recommendation.files.length - 2} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};