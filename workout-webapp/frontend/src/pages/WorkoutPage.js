import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const WorkoutPage = () => {
  const { workout, dispatch } = useWorkoutsContext()

  
  return (
    <div className="home">
      <div className="workouts">
          <WorkoutPage workout={workout} key={workout._id} />
      </div>

    </div>
  )
}

export default WorkoutPage;