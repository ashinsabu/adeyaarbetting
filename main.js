const toggleModal = () => {
	const elem = document.getElementById("modal-backdrop");
	elem.style.display = elem.style.display !== "none" ? "none" : "block";
};

document.getElementById("place-bets-btn").onclick = () => {
	toggleModal();
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
