import React from 'react';
import { Github, Linkedin, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">CodeReview AI</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Intelligent code analysis powered by AI. Built during parental leave to showcase 
              modern frontend development and AI integration skills.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/malek9899/ai-code-review-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/alekhyamosali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://alekhyamosali.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                title="Portfolio"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Portfolio</span>
              </a>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold mb-4">Technologies</h4>
            <ul className="space-y-2 text-gray-300">
              <li>React & TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Chart.js</li>
              <li>OpenAI API</li>
              <li>GitHub API</li>
              <li>Vercel Deployment</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li>AI Code Analysis</li>
              <li>Security Scanning</li>
              <li>Performance Insights</li>
              <li>Quality Metrics</li>
              <li>Interactive Charts</li>
              <li>Real-time Reports</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Alekhya Mosali. Built with{' '}
            <Heart className="w-4 h-4 inline text-red-500" />{' '}
            to showcase AI integration skills.
          </p>
          <p className="text-gray-400 text-sm">
            Portfolio project • Not for commercial use
          </p>
        </div>
      </div>
    </footer>
  );
};