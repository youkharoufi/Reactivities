import React from 'react';
import { Segment, Item, Label, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';

interface Props {
    activities: Activity[];
    handleSelectedActivity: (id: string) => void,
    deleteActivity:(id:string)=>void
}

export default function ActivityList({ activities, handleSelectedActivity, deleteActivity}: Props) {

    console.log(Array.isArray(activities));

    return (
        <Segment>

            <Item.Group divided>
                {activities.map((activity) => {

                   return <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                               <Button onClick={() => handleSelectedActivity(activity.id)} floated='right' content='View' color='blue' />
                               <Button onClick={() => deleteActivity(activity.id)} floated='right' content='Delete' color='red' />

                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                        


                    </Item>
                })}

            </Item.Group>
        </Segment>

    )


}

