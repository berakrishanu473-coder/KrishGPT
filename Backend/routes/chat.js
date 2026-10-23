import express from 'express';
import Thread from '../models/Thread.js';
import getAIResponse from '../utils/openRouter-ai.js';

const router = express.Router();

// test
router.post('/test', async(req, res) => {
    try {
        const thread = new Thread({
            threadId: '456',
            title: "Testing New Thread"
        });

        const response = await thread.save();
        res.send(response); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to save in database"});
    }
});

// Get all threads
router.get('/thread', async(req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1}); // sort in descending order
        res.json(threads);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch threads" });
    }
});

// Get a specific thread
router.get('/thread/:threadId', async(req, res) => {
    const { threadId } = req.params;

    try {
        const chat = await Thread.findOne({threadId});
        if(!chat) {
            res.status(404).json({ error: "Thread not found" });
        }

        res.json(chat.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
});

// Delete a specific thread
router.delete('/thread/:threadId', async(req, res) => {
    const {threadId} = req.params;

    try {
        const deletedChat = await Thread.findOneAndDelete({threadId});
        if(!deletedChat) {
            res.status(404).json({ error: "Thread not found" });
        }

        res.status(200).json({ success: "Thread deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete chat" });
    }
});

// store user and assistant messages
router.post('/chat', async(req, res) => {
    const {threadId, message} = req.body;

    if(!threadId || !message) {
        res.status(400).json({error: "Missing required fields"});
    }

    try {
        const thread = await Thread.findOne({threadId});
        if(!thread) {
            // create a new thread in DB
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}],
            });
        } else {
            thread.messages.push({role: "user", content: message});
        }

        const assistantResponse = await getAIResponse(message);

        thread.messages.push({role: "assistant", content: assistantResponse});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantResponse});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong!"});
    }
});

export default router;