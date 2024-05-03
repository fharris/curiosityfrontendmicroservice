import * as React from 'react';

class LastQueryPageComponent extends React.Component {

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Original Query</th>
                    <th>Article Consulted</th>
                </tr>
                </thead>
                <tbody>
                 {this.props.queryPageList.map(a =>
                    <tr key={a.id}>
                        <td>{a.id}</td>
                        <td>{a.originalQuery}</td>
                        <td>{a.query}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}

export default LastQueryPageComponent;
