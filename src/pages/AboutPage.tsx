import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { 
  User, 
  Code, 
  Brain, 
  Target, 
  Github, 
  Linkedin,
  ExternalLink,
  Calendar,
  MapPin,
  Mail
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const technologies = [
    { name: 'React 18', description: 'Modern React with hooks and functional components' },
    { name: 'TypeScript', description: 'Type-safe development and better developer experience' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid styling' },
    { name: 'Chart.js', description: 'Interactive data visualization and charts' },
    { name: 'OpenAI API', description: 'AI-powered code analysis and recommendations' },
    { name: 'GitHub API', description: 'Repository data fetching and integration' },
    { name: 'React Router', description: 'Client-side routing and navigation' },
    { name: 'Vercel', description: 'Modern deployment and hosting platform' }
  ];

  const features = [
    {
      title: 'AI-Powered Analysis',
      description: 'Leverages OpenAI GPT-4 to provide intelligent code reviews, security assessments, and optimization suggestions.',
      icon: Brain
    },
    {
      title: 'Real-time Dashboards',
      description: 'Interactive dashboards with live data visualization, trend analysis, and comprehensive reporting.',
      icon: Code
    },
    {
      title: 'Professional Architecture',
      description: 'Demonstrates modern React patterns, TypeScript best practices, and scalable component architecture.',
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About This Project</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A portfolio project showcasing AI integration, modern React development, 
              and professional frontend engineering skills built during parental leave.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Project Overview */}
        <Card className="mb-12">
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Purpose & Goals</h3>
                <p className="text-gray-600 mb-4">
                  This AI-powered code review dashboard was built to demonstrate proficiency in modern 
                  frontend development while exploring the integration of artificial intelligence in 
                  developer tools. The project showcases technical skills relevant to senior frontend 
                  engineering roles.
                </p>
                <p className="text-gray-600">
                  Created during parental leave (August 2024 - April 2025) to maintain technical 
                  currency and explore emerging technologies in the AI space.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    Built complete React application with TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    Integrated AI API for intelligent code analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    Implemented interactive data visualizations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    Designed responsive, accessible user interface
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    Deployed with modern CI/CD practices
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">Technology Stack</h2>
            <p className="text-gray-600">Modern technologies and best practices</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Developer Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">About the Developer</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Alekhya Mosali</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Cumming, GA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">9+ years Frontend Engineering</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">malekhya9899@gmail.com</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  Senior Frontend Engineer with experience at Amazon and Life Time, 
                  specializing in React, TypeScript, and scalable web applications.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/malek9899"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/alekhyamosali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="https://alekhyamosali.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Portfolio</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Project Repository</h2>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Open Source Project
                </h3>
                <p className="text-gray-600 mb-6">
                  View the complete source code, documentation, and implementation 
                  details on GitHub.
                </p>
                <a
                  href="https://github.com/malek9899/ai-code-review-dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex items-center gap-2 mx-auto"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
                <p className="text-xs text-gray-500 mt-4">
                  MIT License • Free to use and modify
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};