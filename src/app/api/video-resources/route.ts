import { NextRequest, NextResponse } from 'next/server';
import youtube from '../../utils/youtube'; // Adjust the path based on your project structure

export async function GET(request: NextRequest) {
    try {
        const response = await youtube.get('/search');
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching data from YouTube API', error);
        return NextResponse.json({ error: 'Error fetching data from YouTube API' }, { status: 500 });
    }
}
