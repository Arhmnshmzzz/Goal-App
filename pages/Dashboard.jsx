import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGoals } from "../../auth/goalSlice";
import Spinner from "../components/spinner";
import GoalItem from "../components/goalItem";
import GoalForm from "../components/GoalForm";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals } = useSelector((state) => state.goals);

  useEffect(() => {
    if (user) {
      dispatch(getGoals());
    } else {
      navigate("/login");
    }
  }, [user, dispatch, navigate]);

  if (goals.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
