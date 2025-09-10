const crypto = require('crypto');
const express = require('express');

const app = express();
app.use(express.json());

// our Intercom secret key (keep this secure!)
const INTERCOM_SECRET_KEY = 'our_intercom_secret_key_here';

/**
 * Generate HMAC-SHA256 hash for Intercom secure mode
 * @param {string} user_id - our internal user ID
 * @returns {string} - HMAC hash for secure mode
 */
function generateIntercomHash(user_id) {
  return crypto
    .createHmac('sha256', INTERCOM_SECRET_KEY)
    .update(user_id)
    .digest('hex');
}

/**
 * Verify user and generate secure mode data
 * @param {Object} user - User object from our database
 * @returns {Object} - Secure mode data for Intercom
 */
function generateSecureModeData(user) {
  const user_id = user.id.toString();
  const hmac = generateIntercomHash(user_id);
  
  return {
    user_id,
    hmac
  };
}

// Example endpoint to get secure mode data
app.post('/api/intercom/secure-mode', (req, res) => {
  try {
    const { userId } = req.body;
    
    // Verify user authentication (implement our auth logic here)
    // const user = await getUserById(userId);
    // if (!user || !isAuthenticated(req)) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    
    // For demo purposes, create a mock user
    const mockUser = {
      id: userId,
      email: 'user@example.com',
      name: 'Demo User'
    };
    
    const secureModeData = generateSecureModeData(mockUser);
    
    res.json({
      success: true,
      data: secureModeData
    });
  } catch (error) {
    console.error('Error generating secure mode data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example endpoint to track gambling events
app.post('/api/intercom/track-event', (req, res) => {
  try {
    const { eventName, metadata, userId } = req.body;
    
    // Verify user authentication
    // if (!isAuthenticated(req)) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    
    // Log the event (you can send this to Intercom via webhooks)
    console.log('Event tracked:', {
      eventName,
      metadata,
      userId,
      timestamp: new Date().toISOString()
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example endpoint to update user data
app.post('/api/intercom/update-user', (req, res) => {
  try {
    const { userData, userId } = req.body;
    
    // Verify user authentication
    // if (!isAuthenticated(req)) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    
    // Update user in our database
    // await updateUser(userId, userData);
    
    console.log('User updated:', {
      userId,
      userData,
      timestamp: new Date().toISOString()
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Intercom backend server running on port ${PORT}`);
});

module.exports = {
  generateIntercomHash,
  generateSecureModeData
}; 