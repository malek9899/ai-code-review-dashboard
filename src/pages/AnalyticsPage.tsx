import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { QualityChart } from '../components/charts/QualityChart';
import { IssueDistributionChart } from '../components/charts/IssueDistributionChart';
import { mockRepositories, mockAnalysisResult } from '../utils/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedRepos, setSelectedRepos] = useState<string[]>(['all']);

  const timeRangeOptions = [
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' }
  ];

  const overallStats = [
    {
      label: 'Average Quality Score',
      value: '8.5',
      change: '+0.3',
      trend: 'up',
      description: 'Across all repositories'
    },
    {
      label: 'Total Issues Resolved',
      value: '247',
      change: '+12',
      trend: 'up',
      description: 'This month'
    },
    {
      label: 'Security Vulnerabilities',
      value: '8',
      change: '-5',
      trend: 'down',
      description: 'High priority issues'
    },
    {
      label: 'Code Coverage',
      value: '87%',
      change: '+2%',
      trend: 'up',
      description: 'Average across projects'
    }
  ];

  const repositoryComparison = mockRepositories.map(repo => ({
    name: repo.name,
    qualityScore: repo.qualityScore,
    issues: Math.floor(Math.random() * 20) + 5,
    coverage: Math.floor(Math.random() * 20) + 75,
    lastUpdated: repo.lastAnalysis
  }));

  const languageStats = [
    { language: 'TypeScript', repositories: 8, avgQuality: 8.9, color: '#3178c6' },
    { language: 'JavaScript', repositories: 12, avgQuality: 8.2, color: '#f7df1e' },
    { language: 'Python', repositories: 5, avgQuality: 8.6, color: '#3776ab' },
    { language: 'Java', repositories: 3, avgQuality: 8.1, color: '#ed8b00' },
    { language: 'Go', repositories: 2, avgQuality: 9.1, color: '#00add8' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary-600" />
                Analytics Dashboard
              </h1>
              <p className="mt-2 text-gray-600">
                Comprehensive insights into code quality trends and repository performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn btn-outline flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
              <button className="btn btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select 
            value={selectedRepos[0]}
            onChange={(e) => setSelectedRepos([e.target.value])}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Repositories</option>
            {mockRepositories.map(repo => (
              <option key={repo.id} value={repo.name}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => (
            <Card key={index} hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                  <div className={`flex items-center gap-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Quality Trends Over Time</h3>
              <p className="text-sm text-gray-600">Average quality score across all repositories</p>
            </CardHeader>
            <CardContent>
              <QualityChart data={mockAnalysisResult.trends.qualityOverTime} height={350} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Issue Categories</h3>
              <p className="text-sm text-gray-600">Distribution of issues across all projects</p>
            </CardHeader>
            <CardContent>
              <IssueDistributionChart data={mockAnalysisResult.trends.issueDistribution} height={350} />
            </CardContent>
          </Card>
        </div>

        {/* Repository Comparison */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Repository Comparison</h3>
                <p className="text-sm text-gray-600">Performance metrics across repositories</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Repository</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Quality Score</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Issues</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Coverage</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {repositoryComparison.map((repo, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{repo.name}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              repo.qualityScore >= 9 
                                ? 'bg-green-100 text-green-800'
                                : repo.qualityScore >= 8
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {repo.qualityScore}/10
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-gray-900">{repo.issues}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-gray-900">{repo.coverage}%</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-sm text-gray-600">
                              {new Date(repo.lastUpdated).toLocaleDateString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Language Statistics</h3>
                <p className="text-sm text-gray-600">Quality by programming language</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {languageStats.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        ></div>
                        <div>
                          <div className="font-medium text-gray-900">{lang.language}</div>
                          <div className="text-sm text-gray-600">{lang.repositories} repositories</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{lang.avgQuality}/10</div>
                        <div className="text-sm text-gray-600">avg quality</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Recent Analysis Activity</h3>
            <p className="text-sm text-gray-600">Latest repository scans and updates</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: 'analysis',
                  repo: 'react-ecommerce-app',
                  action: 'Code analysis completed',
                  time: '2 hours ago',
                  status: 'success',
                  details: 'Quality score improved from 8.4 to 8.7'
                },
                {
                  type: 'security',
                  repo: 'vue-admin-dashboard',
                  action: 'Security scan completed',
                  time: '4 hours ago',
                  status: 'warning',
                  details: '2 medium severity vulnerabilities found'
                },
                {
                  type: 'performance',
                  repo: 'node-api-service',
                  action: 'Performance analysis completed',
                  time: '6 hours ago',
                  status: 'success',
                  details: 'Bundle size reduced by 15%'
                },
                {
                  type: 'analysis',
                  repo: 'python-ml-pipeline',
                  action: 'Code analysis completed',
                  time: '8 hours ago',
                  status: 'error',
                  details: 'Analysis failed - repository access denied'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{activity.repo}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{activity.action}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};