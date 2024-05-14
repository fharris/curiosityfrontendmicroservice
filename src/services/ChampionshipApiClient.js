class ChampionshipApiClient {


    static SERVER_CHAMPIONSHIP_URL = 'http://'+ process.env.REACT_APP_SERVER_CURIOSITY_IP;

    static GET_LEAGUE = '/league/';

    static leagueTable(): Promise<Response> {
        return fetch(ChampionshipApiClient.SERVER_CHAMPIONSHIP_URL +
            ChampionshipApiClient.GET_LEAGUE);
    }

}

export default ChampionshipApiClient;
