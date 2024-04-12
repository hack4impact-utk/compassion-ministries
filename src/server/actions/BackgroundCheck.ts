import axios from 'axios';

// Assuming you have your environment variables loaded from .env.local
const SV_USER = process.env.SV_USER;
const SV_PASS = process.env.SV_PASS;

// Function to login and retrieve JWT
async function login(): Promise<string> {
    try {
        const response = await axios.post('https://springverify.com/api/login', {
            username: SV_USER,
            password: SV_PASS
        });
        return response.data.token;
    } catch (error) {
        throw new Error('Failed to login to SpringVerify');
    }
}

// Function to invite a candidate and initiate background check
async function inviteCandidate(email: string, token: string): Promise<void> {
    try {
        const response = await axios.post('https://springverify.com/api/invite', {
            email
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Candidate invited successfully:', response.data);
    } catch (error) {
        throw new Error('Failed to invite candidate');
    }
}

// Function to make payment for invite
async function makePayment(token: string): Promise<void> {
    try {
        const response = await axios.post('https://springverify.com/api/payment', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Payment made successfully:', response.data);
    } catch (error) {
        throw new Error('Failed to make payment for invite');
    }
}

// Function to initiate background check for a volunteer
export async function initiateBackgroundCheck(email: string): Promise<void> {
    try {
        const token = await login();
        await inviteCandidate(email, token);
        await makePayment(token);
        // Update volunteer's backgroundCheck.status to "In progress"
        // Assume implementation to update status in the database
        console.log('Background check initiated successfully');
    } catch (error) {
        console.error('Error initiating background check:', error.message);
    }
}
