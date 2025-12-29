import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo Animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
            animate={{ 
              boxShadow: [
                '0 0 0 0 hsl(var(--primary) / 0)',
                '0 0 0 20px hsl(var(--primary) / 0.1)',
                '0 0 0 40px hsl(var(--primary) / 0)'
              ]
            }}
            transition={{ duration: 1.5, repeat: 1, ease: 'easeOut' }}
          >
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </motion.div>
        </motion.div>

        {/* Text Animation */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            ScholarStream
          </span>
          <motion.div
            className="h-1 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Landing = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => setContentReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-foreground overflow-hidden">
        {/* Navigation */}
        <motion.nav
          className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={contentReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">ScholarStream</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Get started</Link>
              </Button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">AI-Powered Matching</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={contentReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Find scholarships
              <br />
              <span className="text-muted-foreground">you actually qualify for</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={contentReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Stop scrolling through thousands of irrelevant listings. 
              Our AI matches your profile to scholarships that fit.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={contentReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button size="lg" className="text-base px-8 h-12 group" asChild>
                <Link to="/signup">
                  Start for free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 h-12" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
            </motion.div>
          </div>

          {/* Subtle gradient orb */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={contentReady ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          className="fixed bottom-0 left-0 right-0 py-6 px-6"
          initial={{ opacity: 0 }}
          animate={contentReady ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Built for Student Hackpad 2025
            </span>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default Landing;
