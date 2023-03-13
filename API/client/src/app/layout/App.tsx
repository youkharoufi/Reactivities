import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid } from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        agent.Activities.list()
            .then((response:any) => {
                let activities: Activity[] = [];
                response.forEach((activity:any) => {

                    activity.date = activity.date.split('T')[0];
                    activities.push(activity);
                })


                setActivities(activities);
                setLoading(false);

            })
    }, [])

    function handleSelectedActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        if (id === undefined) handleCancelSelectActivity()
        else {
            handleSelectedActivity(id);
            setEditMode(true);
        }
    }

        function handleFormClose() {
            setEditMode(false);
        }

    function handleCreateOrEditActivity(activity: Activity) {
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
    }

    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        })
    }

    if(loading) return <LoadingComponent/>

        return (
            <>
                <NavBar openForm={handleFormOpen} />

                <Container style={{ marginTop: '7em' }}>
                    <ActivityDashboard activities={activities}
                        selectedActivity={selectedActivity}
                        handleSelectedActivity={handleSelectedActivity}
                        handleCancelSelectActivity={handleCancelSelectActivity}
                        editMode={editMode}
                        openForm={handleFormOpen}
                        closeForm={handleFormClose}
                        createOrEdit={handleCreateOrEditActivity}
                        deleteActivity={handleDeleteActivity}
                        submitting={submitting }

                    />
                </Container>





            </>
        );


        
    }



export default App;
