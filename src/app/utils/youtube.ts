import axios, { AxiosInstance } from "axios";

const KEY = "AIzaSyD1mJpEU7WO2Z7QyCVFI9a-4el1PcLI61M";

const youtube: AxiosInstance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 10,
        key: KEY,
        q: "programming"  // Default query to filter programming-related videos
    }
});

export default youtube;
