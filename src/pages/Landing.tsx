import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Sparkles, Trophy, User, 
  Zap, Target, Bell, TrendingUp, Shield, Clock,
  GraduationCap, DollarSign, Brain, Rocket
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">ScholarStream</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Results</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')} className="text-sm">
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')} className="text-sm shadow-lg shadow-primary/25">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        {/* Subtle gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-info/5 blur-[100px]" />
        </div>

        <motion.div 
          className="relative z-10 max-w-5xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Scholarship Discovery</span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-foreground"
          >
            Find scholarships
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">you'll actually win</span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Stop wasting time on scholarships you won't get. Our AI matches you with opportunities 
            based on your unique profile and predicts your winning probability.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="text-base px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
              onClick={() => navigate('/signup')}
            >
              Start Finding Money
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 py-6 rounded-full hover:bg-secondary"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Free forever
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              2-min setup
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              No credit card
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 px-6 border-y border-border/50 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { value: '$2.9B', label: 'Unclaimed yearly', icon: DollarSign },
              { value: '1,200+', label: 'Scholarships tracked', icon: Target },
              { value: '89%', label: 'Match accuracy', icon: Brain },
              { value: '2 min', label: 'Average setup time', icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Everything you need to win
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From discovery to application, we've got every step covered
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI Matching',
                description: 'Smart algorithms analyze your profile against thousands of scholarships to find your best fits.',
                color: 'primary'
              },
              {
                icon: Target,
                title: 'Win Probability',
                description: 'See your chances of winning each scholarship before you apply. Focus on high-probability opportunities.',
                color: 'success'
              },
              {
                icon: Bell,
                title: 'Smart Reminders',
                description: 'Never miss a deadline. Get timely alerts for upcoming deadlines and new matching opportunities.',
                color: 'warning'
              },
              {
                icon: Sparkles,
                title: 'Essay Co-Pilot',
                description: 'AI-powered writing assistant helps you craft compelling essays that stand out.',
                color: 'info'
              },
              {
                icon: TrendingUp,
                title: 'Application Tracker',
                description: 'Track all your applications in one place. See status updates and manage your pipeline.',
                color: 'primary'
              },
              {
                icon: Shield,
                title: 'Verified Sources',
                description: 'Every scholarship is verified. No scams, no expired listings, just real opportunities.',
                color: 'success'
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className={`h-12 w-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Three steps to scholarship success
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in under 2 minutes
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Create your profile',
                description: 'Tell us about your background, academics, and interests. Our smart form adapts to ask only what matters.',
                icon: User
              },
              {
                step: '02',
                title: 'Get matched instantly',
                description: 'Our AI scans thousands of scholarships and ranks them by your probability of winning. No more guesswork.',
                icon: Zap
              },
              {
                step: '03',
                title: 'Apply and win',
                description: 'Use our essay co-pilot, track deadlines, and submit applications. We guide you every step of the way.',
                icon: Trophy
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col md:flex-row items-start gap-6"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-mono text-primary mb-2">Step {item.step}</div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full border-destructive/20 bg-destructive/5">
                <h3 className="text-2xl font-bold mb-6 text-destructive flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                    <span className="text-xl">✕</span>
                  </div>
                  The old way
                </h3>
                <ul className="space-y-4">
                  {[
                    'Hours searching scattered websites',
                    'Applying to scholarships you won\'t win',
                    'Missing deadlines constantly',
                    'Generic essays that don\'t stand out',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground">
                      <span className="text-destructive mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full border-success/20 bg-success/5">
                <h3 className="text-2xl font-bold mb-6 text-success flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  The ScholarStream way
                </h3>
                <ul className="space-y-4">
                  {[
                    'AI finds perfect matches instantly',
                    'Focus only on high-probability wins',
                    'Smart reminders keep you on track',
                    'Essay co-pilot helps you stand out',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="p-12 md:p-16 text-center gradient-primary border-0 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white/50 blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur mb-6">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Ready to find your scholarships?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
                Join thousands of students who are winning scholarships they actually qualify for.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-base px-8 py-6 rounded-full shadow-lg"
                onClick={() => navigate('/signup')}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-white/60 mt-6 text-sm">
                No credit card required • Setup in 2 minutes
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">ScholarStream</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for Student Hackpad 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;