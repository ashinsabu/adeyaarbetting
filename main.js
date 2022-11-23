import axios from "axios";

const toggleModal = () => {
	const elem = document.getElementById("modal-backdrop");
	elem.style.display = elem.style.display !== "none" ? "none" : "block";
};

const login = async () => {
	const result = await axios.post(
		`/api/user/login`,
		{
			email: "hi@boidushya.com",
			password: "password123",
		},
		{
			withCredentials: false,
		}
	);
	let token = result.data.data.token;
	return token;
};

const getMatchInfo = async () => {
	const token = await login();
	console.log("Token fetched successfully");
	const now = new Date();
	const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const result = await axios.post(
		`/api/bydate`,
		{
			date: date,
		},
		config
	);
	console.log(
		result.data.data.filter(item => item.time_elapsed !== "finished")
	);
	return result.data.data.filter(item => item.time_elapsed !== "finished")[0];
};

document.getElementById("place-bets-btn").onclick = async () => {
	// toggleModal();
	const res = await getMatchInfo();
	document.getElementById("home-flag-name").innerText = res.home_team_en;
	document.getElementById("away-flag-name").innerText = res.away_team_en;
	document.getElementById("home-flag-img").src = res.home_flag;
	document.getElementById("away-flag-img").src = res.away_flag;

	// toggleStatus();
};

document.getElementById("deactivate-btn").onclick = () => {
	toggleModal();
};

document.getElementById("cancel-btn").onclick = () => {
	toggleModal();
};

const toggleStatus = () => {
	const elem = document.getElementById("status");
	switch (elem.getAttribute("data-status")) {
		case "open":
			elem.classList.remove(
				"bg-green-500",
				"text-green-400",
				"border-green-500"
			);
			elem.classList.add("bg-red-500", "text-red-400", "border-red-500");
			elem.setAttribute("data-status", "closed");
			elem.lastChild.innerText = "Closed";
			break;
		case "closed":
			elem.classList.add(
				"bg-green-500",
				"text-green-400",
				"border-green-500"
			);
			elem.classList.remove(
				"bg-red-500",
				"text-red-400",
				"border-red-500"
			);
			elem.setAttribute("data-status", "open");
			elem.lastChild.innerText = "Open";
			break;
	}
};

window.onload = async () => {
	const res = await getMatchInfo();

	const homeName = document.getElementById("home-flag-name");
	const awayName = document.getElementById("away-flag-name");
	const homeFlag = document.getElementById("home-flag-img");
	const awayFlag = document.getElementById("away-flag-img");

	homeName.innerText = res.home_team_en;
	homeName.classList.remove("animate-pulse");
	awayName.classList.remove("animate-pulse");
	awayName.innerText = res.away_team_en;
	homeFlag.src = res.home_flag;
	awayFlag.src = res.away_flag;
	console.log("Changed Maps Successfully");
};
