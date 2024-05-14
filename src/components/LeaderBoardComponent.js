// Code adapted from M Macero Garcia open sourced exercises

import * as React from 'react';
import ChampionshipApiClient from '../services/ChampionshipApiClient';
import CuriosityApiClient from '../services/CuriosityApiClient';

class LeaderBoardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leaderboard: [],
            serverError: false
        }
    }

    componentDidMount() {
        this.refreshLeaderBoard();
        // sets a timer to refresh the leaderboard every 5 seconds
        setInterval(this.refreshLeaderBoard.bind(this), 5000);
    }

    getLeaderBoardData(): Promise {
        return ChampionshipApiClient.leaderBoard().then(
            lbRes => {
                if (lbRes.ok) {
                    return lbRes.json();
                } else {
                    return Promise.reject("Champioship: error response");
                }
            }
        );
    }

    getUserAliasData(userIds: number[]): Promise {
        return CuriosityApiClient.getUsers(userIds).then(
           // return CuriosityApiClient.getUsers().then(
            usRes => {
                if(usRes.ok) {
                   // console.log(usRes);
                   // console.log(usRes.text());
                    return usRes.json();
                } else {
                    return Promise.reject("Curiosity: error response");
                }
            }
        )
    }

    updateLeaderBoard(lb) {
        this.setState({
            leaderboard: lb,
            // reset the flag
            serverError: false
        });
    }

    refreshLeaderBoard() {
        this.getLeaderBoardData().then(
            lbData => {
                 console.log("lbData :");
                  console.log(lbData);
                let userIds = lbData.map(row => row.userId);
                 console.log("userIds :");
                  console.log(userIds);
                if(userIds.length > 0) {
                    console.log(userIds.length);
                    this.getUserAliasData(userIds).then(data => {
                        console.log("data :");
                        console.log(data);
                        // build a map of id -> alias
                        let userMap = new Map();
                        data.forEach(idAlias => {
                            userMap.set(idAlias.id, idAlias.userName);
                        });
                        // add a property to existing lb data
                        lbData.forEach(row =>
                            row['alias'] = userMap.get(row.userId)
                        );
                        this.updateLeaderBoard(lbData);
                    }).catch(reason => {
                        console.log('Error mapping user ids', reason);
                        this.updateLeaderBoard(lbData);
                    });
                }
            }
        ).catch(reason => {
            this.setState({ serverError: true });
            console.log('Champioship server error', reason);
        });
    }

    render() {
        if (this.state.serverError) {
            return (
                <div>Ups, it seems the League can't be shown right now! Don't worry! Keep Playing, We are still counting your points!
                    </div>
            );
        }
        return (
            <div>
                <h3>League</h3>
                <table>
                    <thead>
                    <tr>
                        <th>User</th>
                        <th># of Articles Consulted</th>
                       
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.leaderboard.map(row => <tr key={row.userId}>
                        <td>{row.alias ? row.alias : row.userId}</td>
                        <td>{row.totalScore}</td>
                     
                    </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LeaderBoardComponent;
