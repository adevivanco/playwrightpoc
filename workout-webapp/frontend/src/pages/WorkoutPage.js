import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"

const WorkoutPage = () => {
    const { dispatch, workout} = useWorkoutsContext()
    const { id } = useParams();

    useEffect(() => {
        const fetchWorkouts = async () => {
          const response = await  fetch(`/api/workouts/${id}`)
          const json = await response.json()
    
          if (response.ok) {
            dispatch({type: 'GET_WORKOUT', payload: json})
          }     
        }
        fetchWorkouts()
      }, [dispatch])


    console.log(workout);
    return (
        <div className="home">
            <div className="workouts">
               {workout && 
                 <WorkoutDetails workout={workout} key={workout._id} />
               }
            </div>
        </div>
    )
}

export default WorkoutPage