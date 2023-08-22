import axios from "axios"

export class thirdPartyApi {
    async series_list() {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/cricbuzz/series',
        };

        try {
            const response = await axios.request(options);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    async match_list() {
        try {
            let match_list = await axios.get('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent');
            return match_list
        }
        catch (err) {
            console.log(err);
        }

    }

    async team() {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/cricbuzz/getteams`,
            timeout: 30000
        };

        try {
            const response = await axios.request(options);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    async player() {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/player/1413/virat-kohli`,
            timeout: 30000
        };

        try {
            const response = await axios.request(options);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }



}