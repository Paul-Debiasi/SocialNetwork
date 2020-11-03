import React from "react";
// function component can not have "state"
// export default function HelloWorld() {
//     return (
//         <div>
//             <p>Hello</p>
//             <p>my </p>
//             <p>Bloody</p>
//             <p>Awesome</p>
//             <p>and</p>
//             <p>Disturbing </p>
//             <p>World</p>
//         </div>
//     );
// }
// Class component can have "state" is the react word for "data". They are "stateful" components which means that they can do logic!
export default class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Paul",
        };
        // {
        //     this.componentDidMount();
        // }
    }
    render() {
        return (
            <div>
                <p>{this.state.first}</p>
            </div>
        );
    }
}
