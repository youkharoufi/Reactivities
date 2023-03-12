import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';

interface Props {
    activity: Activity;
    editMode: boolean;
    handleCancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({ activity, handleCancelSelectActivity, openForm, editMode}:Props) {

    return (
        <Card style={{ width: '100%' }}>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width='2'>
                    <Button onClick={() => { editMode = true; openForm(activity.id) }} basic color='blue' content='Edit' />
                    <Button onClick={() => handleCancelSelectActivity } basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>



    )
}
