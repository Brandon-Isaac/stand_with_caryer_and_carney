// Rate limiting utility to prevent spam donations
interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

const STORAGE_KEY = 'donation_rate_limit';
const MAX_ATTEMPTS = 3; // Max 3 donations
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes window

export const checkRateLimit = (): { allowed: boolean; timeRemaining?: number; attemptsRemaining?: number } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    
    if (!stored) {
      // First attempt
      return { allowed: true, attemptsRemaining: MAX_ATTEMPTS - 1 };
    }
    
    const data: RateLimitEntry = JSON.parse(stored);
    const timeSinceFirst = now - data.firstAttempt;
    
    // Reset if window has passed
    if (timeSinceFirst > WINDOW_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return { allowed: true, attemptsRemaining: MAX_ATTEMPTS - 1 };
    }
    
    // Check if limit exceeded
    if (data.count >= MAX_ATTEMPTS) {
      const timeRemaining = Math.ceil((WINDOW_MS - timeSinceFirst) / 1000 / 60); // minutes
      return { 
        allowed: false, 
        timeRemaining,
        attemptsRemaining: 0
      };
    }
    
    return { 
      allowed: true, 
      attemptsRemaining: MAX_ATTEMPTS - data.count - 1 
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // On error, allow the attempt
    return { allowed: true };
  }
};

export const recordAttempt = (): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    
    if (!stored) {
      const entry: RateLimitEntry = {
        count: 1,
        firstAttempt: now,
        lastAttempt: now
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    } else {
      const data: RateLimitEntry = JSON.parse(stored);
      const timeSinceFirst = now - data.firstAttempt;
      
      if (timeSinceFirst > WINDOW_MS) {
        // Reset window
        const entry: RateLimitEntry = {
          count: 1,
          firstAttempt: now,
          lastAttempt: now
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
      } else {
        // Increment count
        data.count += 1;
        data.lastAttempt = now;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error('Record attempt error:', error);
  }
};

export const getRemainingTime = (): number | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data: RateLimitEntry = JSON.parse(stored);
    const now = Date.now();
    const timeSinceFirst = now - data.firstAttempt;
    
    if (timeSinceFirst > WINDOW_MS) {
      return null;
    }
    
    return Math.ceil((WINDOW_MS - timeSinceFirst) / 1000 / 60); // minutes
  } catch (error) {
    return null;
  }
};
