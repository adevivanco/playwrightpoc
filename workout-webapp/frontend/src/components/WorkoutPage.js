import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { WorkoutPage } from '../pages/WorkoutPage'

const WorkoutPage = () => {
    const { workout, dispatch } = useWorkoutsContext()

    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts')
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'GET_WORKOUT', payload: json})
        }
      }
  
      fetchWorkouts()
    }, [dispatch])
  
    return (
        <div className="workout-details">
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Number of reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <span className="material-symbols-outlined" onClick={handleDeleteClick}>delete</span>
        </div>
      )
    
};

export default Page