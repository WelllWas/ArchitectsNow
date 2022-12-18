import ListClients from "../ListClients/ListClients";
import ListArc from "../ListArc/ListArc";
import React from 'react';

export default function ManageLists(props:any){
    return (
        <>
        {props.type == "A" ?
        <ListClients></ListClients>
        :
        <ListArc></ListArc>
        }
        </>
    )
}