import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { Link, useParams } from 'react-router-dom';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { id } = useParams();

  const handleDeleteClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  };


  return (
    <div className="workout-details">
      { id == undefined && 
      /* <Link
      to={{
        pathname: "/workouts",
        data: workout.id // your data array of objects
      }}> */
      <Link to={`/workouts/${workout._id}`}><h4>{workout.title}</h4></Link>}
      
      { id != undefined && 
      /* <Link
      to={{
        pathname: "/workouts",
        data: workout.id // your data array of objects
      }}> */
      <h4>{workout.title}</h4>}

      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleDeleteClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails