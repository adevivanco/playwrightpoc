import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const WorkoutPage = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { id } = useParams();

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [createdAt, setCreaateAt] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const workout = {title, load, reps}

  const handleDeleteClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  };

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//     console.log("useEffect")
    // const fetchWorkouts = async () => {
    //   const response = await fetch(`/api/workouts/${id}`)
    //   const json = await response.json()

    //   if (response.ok) {
    //     dispatch({type: 'GET_WORKOUT', payload: json})
    //   }
    // }
    useEffect(() => {
        const fetchWorkouts = async () => {
          const response = await  fetch(`/api/workouts/${id}`)
          const json = await response.json()
    
          if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
          }
          if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle(json.title)
            setLoad(json.load)
            setReps(json.reps)
            setCreaateAt(json.createdAt)
            dispatch({type: 'GET_WORKOUT', payload: json})
          }
       
        }
    
        fetchWorkouts()
      }, [dispatch])

      
  
    //     fetchWorkouts()
//   }, [dispatch])

 console.log(workout);
  return (
    <div className="home">
      <div className="workouts">
      <div className="workout-details">
              <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      {/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */}
    <span className="material-symbols-outlined" onClick={handleDeleteClick}>delete</span> 
                  {/* <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleDeleteClick}>delete</span> */}

          {/* <WorkoutDetails workout={workout} key={id} /> */}
          </div>
      </div>
    </div>
  )
}

export default WorkoutPage