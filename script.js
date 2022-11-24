import { getDatabase,ref,set,onValue } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'
// import axios from 'axios'; 

//info to be set manually since api not working
let nextMatchStart = "21:30:00";
let country1 = "Portugal";
let country2 = "Ghana";
let country1Img = "https://ssl.gstatic.com/onebox/media/sports/logos/HJ3_2c4w791nZJj7n-Lj3Q_96x96.png";
let country2Img = "https://ssl.gstatic.com/onebox/media/sports/logos/VJQ1emg0TOubjGnap4vWuw_96x96.png";



let canBet = true;
var time = new Date();
let curTime = (time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

if(curTime>nextMatchStart){
    canBet = false;
}

const setMatchInfo = async () => {
    document.querySelectorAll('.country-1-name').forEach((x) => {
        x.innerHTML = country1;
    })
    document.querySelectorAll('.country-2-name').forEach((x) => {
        x.innerHTML = country2;
    })
    document.querySelector('.team-flag1').src = country1Img;
    document.querySelector('.team-flag2').src = country2Img;
}

if(canBet){
    document.querySelector('.open-close-status').innerText = "Betting OPEN";
    document.querySelector('.open-close-status').classList.remove("closed");
    document.querySelector('.open-close-status').classList.add("open");
}
else{
    document.querySelector('.open-close-status').innerText = "Betting CLOSED";
    document.querySelector('.open-close-status').classList.remove("open");
    document.querySelector('.open-close-status').classList.add("closed");
}
const updateTables = (betData) => {
    document.querySelectorAll('.betRecord').forEach((x)=>{
        x.remove();
    })
    let total1 = 0,total2=0;
    let betObjs = [];

    for (const prop in betData) {
        //str.charAt(0).toUpperCase() + str.slice(1)
        let name = `${prop}`.charAt(0).toUpperCase() + `${prop}`.slice(1);
        let betAmt = parseInt(`${betData[prop].betAmt}`,10);
        let team = parseInt(`${betData[prop].team}`,10);

        if(team == 1)
            total1 += betAmt;
        if(team == 2)
            total2 +=betAmt;

        betObjs.push({
            name:name,
            betAmt: betAmt,
            team: team,
        })
    }

    // console.log("total team 1: "+total1);
    // console.log("total team 2: "+total2);


    // use betObjs and totals now to populate tables 
    // betObj schema - name,betAmt,team

    let table1 = document.querySelector('.team1-table');
    let table2 = document.querySelector('.team2-table');

    for (let i = 0;i<betObjs.length;i++){
        // console.log(betObjs[i]);
        let betRecord = document.createElement('tr');
        let betRecordName = document.createElement('td');
        let betRecordAmt = document.createElement('td');
        let betRecordWin = document.createElement('td');
        betRecord.className = "betRecord";
        betRecordName.textContent = betObjs[i].name;
        betRecordAmt.textContent = (betObjs[i].betAmt).toString();
        
        if(betObjs[i].team == 1)
            betRecordWin.textContent = ((Math.round(((betObjs[i].betAmt)*total2/total1) * 100) / 100).toFixed(2)).toString();
        if(betObjs[i].team == 2)
            betRecordWin.textContent = ((Math.round(((betObjs[i].betAmt)*total1/total2) * 100) / 100).toFixed(2)).toString();
        betRecord.append(betRecordName,betRecordAmt,betRecordWin);
        // console.log(table1);
        if(betObjs[i].team == 1)
            table1.append(betRecord);
        if(betObjs[i].team == 2)
            table2.append(betRecord);
        
    }
}

const startObserver = () =>{
    const db = getDatabase();
    const betRef = ref(db, 'bets');
    onValue(betRef, (snapshot) => {
        const data = snapshot.val();
        updateTables(data);
    });
}


const userToPassword = {
    "ashin":"messifan",
    "aryan":"bitchmallu69",
    "pratyush":"xyz",
    "manan":"ilovemallus",
    "ankur":"xyz",
    "boidushya":"password1234",
    "dev":"sexymallu69",
    "drumil":"xyz",
    "jayesh":"ashinmom12",
    "rahul":"xyz",
    "rohan":"ashin69",
    "kartik":"xyz"
}

const placebet = (user,betAmt,team) => {
    const db = getDatabase();
    set(ref(db,'bets/'+user),{
        team: team,
        betAmt: betAmt
    })
} 

document.querySelectorAll('#amount-dropdown').forEach((betAmountDropDown) => {
    betAmountDropDown.addEventListener('change', (e) => {
        if(betAmountDropDown.className == "teamone"){
            document.querySelector('#team1-bet').innerHTML = betAmountDropDown.value;
            // console.log(betAmountDropDown.classList);
            // console.log(betAmountDropDown.value);
        }
        if(betAmountDropDown.className == "teamtwo")    
            document.querySelector('#team2-bet').innerHTML = betAmountDropDown.value;
    })
})  

document.querySelectorAll('.submit-bet').forEach((betButton) => {
    betButton.addEventListener('click',() => {
        // console.log(betButton.dataset.betteam);
        if(canBet == false){
            document.querySelector('#message-1').innerHTML = "Can't bet now";
            return;
        }
        if(betButton.dataset.betteam == 1){
            let username = (document.querySelector("#username1").value).toString();
            let password = document.querySelector("#password1").value;
            let betAmount = document.querySelector("#team1-bet").innerHTML;
            
            
            // console.log(username,password,betAmount);

            if(userToPassword[username] == password){
                document.querySelector('#message-1').style.color = "grey";
                document.querySelector('#message-1').innerHTML = "Placing...";
                placebet(username,betAmount,1);
                setTimeout(() => {
                    location.reload();
                },1000)
            }
            else{
                document.querySelector('#message-1').innerHTML = "Wrong Credentials";
            }
            
        }

        if(betButton.dataset.betteam == 2){
            let username = (document.querySelector("#username2").value).toString();
            let password = document.querySelector("#password2").value;
            let betAmount = document.querySelector("#team2-bet").innerHTML;
            
            // console.log(username);
            // console.log(userToPassword[username]);

            if(userToPassword[username] == password){
                document.querySelector('#message-1').style.color = "grey";
                document.querySelector('#message-1').innerHTML = "Placing...";
                placebet(username,betAmount,2);
                setTimeout(() => {
                    location.reload();
                },1000)
            }
            else{
                document.querySelector('#message-2').innerHTML = "Wrong Credentials";
            }

        }
    })
})


// const login = async () => {
// 	const result = await fetch(
// 		'http://api.cup2022.ir/api/v1/user/login',
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             method: 'POST',
//             mode: 'cors',
            
//             body: JSON.stringify({
//                 'email': "hi@boidushya.com",
//                 'password': "password123",
//             }),                
// 		});
// 	let token = result.data.data.token;
// 	return token;
// };

// const getMatchInfo = async () => {
// 	const token = await login();
// 	console.log("Token fetched successfully");
// 	const now = new Date(
// 		new Date().toLocaleString("en", { timeZone: "Asia/Qatar" })
// 	);
// 	const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
// 	// const config = {
// 	// 	headers: {
// 	// 		Authorization: `Bearer ${token}`,
// 	// 	},
// 	// };
    
// 	const result = await fetch(
// 		'http://api.cup2022.ir/api/v1/bydate',
//         {
//         method: 'POST',
//         mode: 'CORS',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         },
// 		body: JSON.stringify(`
// 			date: ${date},
//         `),
            
// 		});
// 	console.log(
// 		result.data.data.filter(item => item.time_elapsed !== "finished")
// 	);
// 	return result.data.data.filter(item => item.time_elapsed !== "finished")[0];
// };

// const loadMatchInfo = async () => {
// 	// toggleModal();
// 	const res = await getMatchInfo();
// 	document.getElementById("country-1-name").innerText = res.home_team_en;
// 	document.getElementById("country-2-name").innerText = res.away_team_en;
// 	document.getElementById("team-flag1").src = res.home_flag;
// 	document.getElementById("team-flag2").src = res.away_flag;

// 	// toggleStatus();
// };

const toggleStatus = () => {
	// const elem = document.getElementById("status");
	// switch (elem.getAttribute("data-status")) {
	// 	case "open":
	// 		elem.classList.remove(
	// 			"bg-green-500",
	// 			"text-green-400",
	// 			"border-green-500"
	// 		);
	// 		elem.classList.add("bg-red-500", "text-red-400", "border-red-500");
	// 		elem.setAttribute("data-status", "closed");
	// 		elem.lastChild.innerText = "Closed";
	// 		break;
	// 	case "closed":
	// 		elem.classList.add(
	// 			"bg-green-500",
	// 			"text-green-400",
	// 			"border-green-500"
	// 		);
	// 		elem.classList.remove(
	// 			"bg-red-500",
	// 			"text-red-400",
	// 			"border-red-500"
	// 		);
	// 		elem.setAttribute("data-status", "open");
	// 		elem.lastChild.innerText = "Open";
	// 		break;
	// }
};

// window.onload = async () => {
// 	const res = await getMatchInfo();

// 	const homeName = document.getElementById("home-flag-name");
// 	const awayName = document.getElementById("away-flag-name");
// 	const homeFlag = document.getElementById("home-flag-img");
// 	const awayFlag = document.getElementById("away-flag-img");

// 	homeName.innerText = res.home_team_en;
// 	homeName.classList.remove("animate-pulse");
// 	awayName.classList.remove("animate-pulse");
// 	awayName.innerText = res.away_team_en;
// 	homeFlag.src = res.home_flag;
// 	awayFlag.src = res.away_flag;
// 	console.log("Changed Maps Successfully");
// };

// loadMatchInfo();

const getNextMatchInfo = async () => {
    fetch("https://v3.football.api-sports.io/fixtures?league=1&next=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": ""
	}
    })
    .then(response => response.json()).then((data) => {
        const firstLayer = data["response"];
        const secondLayer = firstLayer[0];
        const status = secondLayer["fixture"]["status"]["short"]; //NS = not started
        const teams = secondLayer["teams"];
        const firstTeamName = teams["home"]["name"];
        const secondTeamName = teams["away"]["name"];

        const firstTeamLogo = teams["home"]["logo"];
        const secondTeamLogo = teams["away"]["logo"];
        console.log(data);
        canBet = (status == "NS"?true:false);
        // console.log(firstTeamName,secondTeamName);

        document.querySelectorAll(".country-1-name").forEach((x) => {
            x.innerText = firstTeamName;
        })
        document.querySelectorAll(".country-2-name").forEach((x)=>{
            x.innerText= secondTeamName;
        })
        document.querySelector(".team-flag1").src = firstTeamLogo;
        document.querySelector(".team-flag2").src = secondTeamLogo;

        if(canBet){
            document.querySelector('.open-close-status').innerText = "Betting OPEN";
            document.querySelector('.open-close-status').classList.remove("close");
            document.querySelector('.open-close-status').classList.add("open");
        }
        else{
            document.querySelector('.open-close-status').innerText = "Betting CLOSE";
            document.querySelector('.open-close-status').classList.remove("open");
            document.querySelector('.open-close-status').classList.add("close");
        }
        return {
            status: status,
            firstTeamLogo: firstTeamLogo,
            firstTeamName: firstTeamName,
            secondTeamLogo: secondTeamLogo,
            secondTeamName: secondTeamName,
        };

    })
    .catch(err => {
        console.log(err);
    });

}
// const loadNextMatchInfo = async () => {
// 	// toggleModal();
// 	const res = await getNextMatchInfo();
	

// 	// toggleStatus();
// };
setMatchInfo();
startObserver();
// getNextMatchInfo();