class CuriosityApiClient {

        static SERVER_CURIOSITY_URL = 'http://'+ process.env.REACT_APP_SERVER_CURIOSITY_IP;
        static GET_PAGE =   '/wiki/curiosity/page';
        static GET_TOPICS = '/wiki/curiosity/topics'; 
        static GET_STATS = '/wiki/curiosity/stats?userName=';
        static GET_USERS_BY_IDS = '/wiki/curiosity/users/';
        
    static curiosity(user: string,
                     query: string,
                     originalQuery: string): Promise<Response> {

                        //console.log(user +"---"+query+"---"+originalQuery);

        return fetch(CuriosityApiClient.SERVER_CURIOSITY_URL + CuriosityApiClient.GET_PAGE + "/" + user + "/" + query + "/" + originalQuery );
    }

    static getTopics(user: string,
                     query: string): Promise<Response> {

        return fetch(CuriosityApiClient.SERVER_CURIOSITY_URL + CuriosityApiClient.GET_TOPICS + "/" + user + "/" + query);
    }

    static getStats(userName: string): Promise<Response> {

        console.log("userName for Stats :"+userName);
       


        return fetch(CuriosityApiClient.SERVER_CURIOSITY_URL + CuriosityApiClient.GET_STATS + userName);
    }

    static getUsers(userIds: number[]): Promise<Response> {
        return fetch(CuriosityApiClient.SERVER_CURIOSITY_URL + CuriosityApiClient.GET_USERS_BY_IDS  + userIds.join(','));
    }

   // static getUsers2(userIds: number[]): Promise<Response> {
   //     return fetch('http://localhost:8090/wiki/curiosity/users/' + userIds.join(','))
           // .then(res => res.text())
           // .then(text => console.log(text));
   // }
    

}

export default CuriosityApiClient;
