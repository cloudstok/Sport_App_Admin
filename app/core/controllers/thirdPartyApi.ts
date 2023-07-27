import axios from "axios"

export class thirdPartyApi {
    async series_list() {
        const options = {
            method: 'GET',
            url: 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/international',
            headers: {
              'X-RapidAPI-Key': 'bd8f0ef610msh6012d41a3d87a3dp107e51jsnb52344cd4286',
              'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              return response.data
          } catch (error) {
              console.error(error);
          }
    }

    async match_list() {
        try {
            let match_list = await axios.get('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent');
            return match_list
        }
        catch (err) {

        }
        
    }








}