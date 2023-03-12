import React, { useState } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    handleSelectedActivity: (id: string) => void
    handleCancelSelectActivity: () => void
    editMode: boolean,
    openForm:(id:string)=>void
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    deleteActivity: (id:string)=>void
}

export default function ActivityDashboard({ activities, selectedActivity, handleSelectedActivity, handleCancelSelectActivity,
    editMode, openForm, closeForm, createOrEdit, deleteActivity }: Props) {


    return (

        <Grid>

            <Grid.Column width='10'>
                <ActivityList activities={activities} handleSelectedActivity={handleSelectedActivity} deleteActivity={deleteActivity} />
            </Grid.Column>

            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails editMode={editMode}  activity={selectedActivity}
                        handleCancelSelectActivity={handleCancelSelectActivity}
                        openForm={openForm}/>
                }
                {editMode &&
                    <ActivityForm createOrEdit={createOrEdit} closeForm={closeForm} activity={selectedActivity} />

                }
                

            </Grid.Column>

        </Grid>
    )
}
