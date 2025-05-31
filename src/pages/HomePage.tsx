import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Shield, Zap, BarChart3, Github } from 'lucide-react';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI algorithms analyze your codebase for potential issues, security vulnerabilities, and optimization opportunities.'
    },
    {
      icon: Shield,
      title: 'Security Insights',
      description: 'Identify security vulnerabilities and get actionable recommendations to improve your application\'s security posture.'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Get detailed performance analysis and optimization suggestions to make your code faster and more efficient.'
    },
    {
      icon: BarChart3,
      title: 'Interactive Analytics',
      description: 'Visualize code quality trends, issue distribution, and team productivity with beautiful, interactive charts.'
    }
  ];

  const stats = [
    { label: 'Code Quality Score', value: '8.7/10', color: 'text-green-600' },
    { label: 'Security Issues', value: '3 Medium', color: 'text-yellow-600' },
    { label: 'Performance', value: '92%', color: 'text-blue-600' },
    { label: 'Files Analyzed', value: '127', color: 'text-purple-600' }
  ];

  const technologies = [
    { name: 'React 18', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'OpenAI API', icon: '🤖' },
    { name: 'GitHub API', icon: '🐙' },
    { name: 'Chart.js', icon: '📊' },
    { name: 'Tailwind CSS', icon: '🎨' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Intelligent Code Review with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                AI Insights
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
              Automated code analysis powered by OpenAI. Get instant security insights, 
              performance recommendations, and code quality metrics for your GitHub repositories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/dashboard"
                className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                🔗 Try Live Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="https://github.com/malek9899/ai-code-review-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-lg transition-all"
              >
                <Github className="mr-2 w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Live Dashboard Preview
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="card p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className="text-3xl">
                    {index === 0 && '✅'}
                    {index === 1 && '⚠️'}
                    {index === 2 && '🚀'}
                    {index === 3 && '📁'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/dashboard"
              className="btn btn-primary px-6 py-3 text-lg font-semibold"
            >
              Explore Full Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Powerful AI-Driven Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg transition-shadow">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Built with Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="card p-6 bg-white text-center hover:shadow-lg transition-shadow group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <p className="font-medium text-gray-800">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Code Quality?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the future of code review with AI-powered insights and recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg"
            >
              Start Analyzing Code
            </Link>
            <Link
              to="/about"
              className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};