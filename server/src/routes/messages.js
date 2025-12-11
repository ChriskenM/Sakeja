// server/src/routes/messages.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Simple in-memory placeholder, replace with DB model (Message) in production
const messages = [];

/**
 * POST /api/messages
 * body: { toUserId, content }
 * requires auth
 */
router.post('/', auth, (req, res) => {
  const { toUserId, content } = req.body;
  if (!toUserId || !content) return res.status(400).json({ message: 'toUserId and content required' });
  const msg = {
    id: messages.length + 1,
    from: req.userId,
    to: toUserId,
    content,
    createdAt: new Date()
  };
  messages.push(msg);
  res.status(201).json(msg);
});

/**
 * GET /api/messages/:userId
 * Get messages for a given user (requires auth)
 */
router.get('/:userId', auth, (req, res) => {
  const { userId } = req.params;
  // basic access control: allow if requester is same as userId or admin
  if (req.userId !== userId) {
    // you may want stricter checks — for now allow listing only own messages
    return res.status(403).json({ message: 'Forbidden' });
  }
  const userMessages = messages.filter(m => m.to === userId || m.from === userId);
  res.json(userMessages);
});

module.exports = router;
