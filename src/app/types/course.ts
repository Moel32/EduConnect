// types.ts

export interface Video {
    id: {
        videoId: string;
        kind: string;
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            medium: { url: string };
            high: { url: string };
        };
        channelTitle: string;
    };
    etag: string;
}
