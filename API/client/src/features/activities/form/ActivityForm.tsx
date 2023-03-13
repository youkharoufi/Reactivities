import React, { ChangeEvent, useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void,
    createOrEdit: (activity: Activity) => void
    submitting:boolean
}

export default function ActivityForm({ activity, closeForm, submitting, createOrEdit }: Props) {

    const initialState = activity ? activity :

        {
            id:'',
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: ''
        };

    const [values, setValues] = useState(initialState);

    function handleSubmit() {
        createOrEdit(values);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setValues({...values, [name]:value})
    }

    return (

        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={values.title} name="title" onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={values.title} name="description" onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={values.title} name="category" onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={values.title} name="date" onChange={handleInputChange} />
                <Form.Input placeholder='City' value={values.title} name="city" onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={values.title} name="venue" onChange={handleInputChange} />

                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

            </Form>

        </Segment>

    )
}
