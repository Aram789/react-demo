import {Component} from "react";

export default class SingleTask extends Component{
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className='container'>
                <div>task</div>
            </div>
        );
    }
}



// import * as ReactRouterDOM from "react-router";
//
// const useParams = ReactRouterDOM.useParams;
//
// export default function SingleTask ()  {
//     const params = useParams();
//     fetch('http://localhost:3001/task/'+ params.taskId, {
//         method: 'GET',
//         headers: {
//             "Content-Type": 'application/json'
//         }
//     })
//         .then(async (response) => {
//             const res = await response.json();
//             console.log(res)
//             if (response.status >= 400 && response.status < 600) {
//                 if (res.error) {
//                     throw res.error;
//                 } else {
//                     throw new Error('Something went wrong!');
//                 }
//             }
//         })
//         .catch((error) => {
//             console.log('catch error', error);
//         });
//     return (
//         <div className='container'>
//             <div>{params.taskId}</div>
//         </div>
//     );
//
// }