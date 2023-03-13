import React, { SyntheticEvent, useState } from 'react';
import { Segment, Item, Label, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';

interface Props {
    activities: Activity[];
    handleSelectedActivity: (id: string) => void,
    deleteActivity: (id: string) => void,
    submitting: boolean,
}

export default function ActivityList({ activities, handleSelectedActivity, deleteActivity, submitting}: Props) {

    //console.log(Array.isArray(activities));
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

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
                               <Button name={activity.id} loading={submitting} onClick={(e) => handleActivityDelete(e, activity.id)} floated='right' content='Delete' color='red' />

                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                        


                    </Item>
                })}

            </Item.Group>
        </Segment>

    )


}

