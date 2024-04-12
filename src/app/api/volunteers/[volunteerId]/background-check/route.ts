// In route.ts
import express from 'express';
import { initiateBackgroundCheck } from '@/server/actions/BackgroundCheck';

const router = express.Router();

router.post('/api/volunteers/:volunteerId/background-check', async (req: { params: { volunteerId: any; }; body: { email: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    const volunteerId = req.params.volunteerId;
    // Assuming you extract email from request body or somewhere else
    const email = req.body.email;

    try {
        // Call the function to initiate background check
        await initiateBackgroundCheck(email);
        // Send success response
        res.status(200).send('Background check initiated successfully');
    } catch (error) {
        // Send error response
        res.status(500).send('Failed to initiate background check');
    }
});

export default router;
