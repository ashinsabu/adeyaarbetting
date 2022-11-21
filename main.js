const toggleModal = () => {
	const elem = document.getElementById("modal-backdrop");
	elem.style.display = elem.style.display !== "none" ? "none" : "block";
};

document.getElementById("place-bets-btn").onclick = () => {
	toggleModal();
};

document.getElementById("deactivate-btn").onclick = () => {
	toggleModal();
};

document.getElementById("cancel-btn").onclick = () => {
	toggleModal();
};
