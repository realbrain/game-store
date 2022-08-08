import { Params, useParams, useNavigate } from "react-router-dom";
import Board from "./Board";
import { useGame } from "../Context/GameProvider";
import useUser from "../hooks/useUser";

type RouterParams = Readonly<Params<string>>;

const Room = () => {
	const params: RouterParams = useParams();
	const { roomId } = params;
	const navigate = useNavigate();
	const { message, loading, mark, opponent } = useGame();
	const [user] = useUser();

	const leaveRoom = () => {
		navigate("/");
	};

	return (
		<div>
			{loading ? (
				<h1>Loading....</h1>
			) : (
				<>
					<div className="player-info">
						<div className="player">
							<div className={`player-${mark}`}></div>
							<span>{user.name}</span>
						</div>
						<div className="player">
							<span>{opponent?.name}</span>
							<div className={`player-${opponent?.turn}`}></div>
						</div>
					</div>
					<h4 className="center monospace">Room ID: {roomId}</h4>
					{message && <h4 className="center">{message}</h4>}
					<section>
						<Board />
					</section>
					<div>
						<button className="btn btn-round btn-danger btn-float-bottom-left" onClick={leaveRoom}>
							<i className="fa-solid fa-right-from-bracket fa-xl flip-x"></i>
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Room;
