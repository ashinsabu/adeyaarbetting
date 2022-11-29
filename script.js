import { getDatabase,ref,set,onValue,get,child } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'
// import axios from 'axios'; 

// TODO:  
// info to be set manually since api not working
// also set script and css version so it loads different

let fixt=1;

import imgLinks from './flagLinks.js';

let nextMatchStart = "00:30:00"; 
let country1 = "Iran ";
let country2 = "USA";
let country1Img = imgLinks['iran'];
let country2Img = imgLinks['usa'];

let country3 = "Wales";
let country4 = "England";
let country3Img = imgLinks['wales'];
let country4Img = imgLinks['england'];

let canBet = true;
var time = new Date();
let curTime = (String(time.getHours()).padStart(2, '0') + ":" + String(time.getMinutes()).padStart(2, '0')  + ":" + String(time.getSeconds()).padStart(2, '0'));

// console.log(curTime, nextMatchStart, (curTime > nextMatchStart));



if(curTime > nextMatchStart){
// if(false){
    canBet = false;
    document.querySelector('.view-bet-area').style.display = 'none';
    document.querySelector('.tables').style.display = "flex";
    document.querySelector('.bet-not-visible').style.display='none';
    document.querySelector('.giffy').style.display = 'none';
}
else{
    document.querySelector('.bet-not-visible').style.display='block';
    // document.querySelector('.reveal-betters').style.display='block';
}

const setMatchInfo = async (fixt) => {

    document.querySelector('.fixt1').innerText = country1 + " vs. " + country2;
    document.querySelector('.fixt2').innerText = country3 + " vs. " + country4;


    if(fixt == 1){
        document.querySelectorAll('.country-1-name').forEach((x) => {
            x.innerHTML = country1;
        })
        document.querySelectorAll('.country-2-name').forEach((x) => {
            x.innerHTML = country2;
        })
        document.querySelector('.team-flag1').src = country1Img;
        document.querySelector('.team-flag2').src = country2Img;
    }
    else if (fixt == 2){
        document.querySelectorAll('.country-1-name').forEach((x) => {
            x.innerHTML = country3;
        })
        document.querySelectorAll('.country-2-name').forEach((x) => {
            x.innerHTML = country4;
        })
        document.querySelector('.team-flag1').src = country3Img;
        document.querySelector('.team-flag2').src = country4Img;
    }
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

const getBetObjsFromData = (betData) =>{
    return;
}

const updateTables = (betData) => {
    
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
    document.querySelectorAll('.betRecord').forEach((x)=>{
        x.remove();
    });

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
        if(betRecordAmt.innerText == '0')
            continue;
        if(betObjs[i].team == 1)
            table1.append(betRecord);
        if(betObjs[i].team == 2)
            table2.append(betRecord);
        
    }
}

const updateRevealedList = (betData) => {

    let total1 = 0, total2=0;
    let betNames = [];

    for (const prop in betData) {
        let name = `${prop}`.charAt(0).toUpperCase() + `${prop}`.slice(1);
        let team = parseInt(`${betData[prop].team}`,10);

        // if(team == 1)
        //     total1 += betAmt;
        // if(team == 2)
        //     total2 +=betAmt;
        betNames.push(name);
    }

    let area = document.querySelector('.revealed-betters');

    for (let i = 0;i<betNames.length;i++){
        let ele = document.createElement('p');
        ele.innerText = betNames[i];
        area.append(ele);
    }
    
}

const updateBetStatus = (betData) => {
    document.querySelector('.bet-status-row').innerHTML='';
    let betObjs = {};
    for (const prop in betData) {
        //str.charAt(0).toUpperCase() + str.slice(1)
        let name = `${prop}`;
        let betAmt = parseInt(`${betData[prop].betAmt}`,10);

        
        betObjs[name]=betAmt;
    }
    let ticks =[];
    let wrongs = [];
    for ( const prop in userToPassword) {
        let betStatusEle = document.createElement('div');
        betStatusEle.className = 'bet-status';

        let betStatusName = document.createElement('p');
        let betStatusTick = document.createElement('p');

        betStatusName.innerText = `${prop}`.charAt(0).toUpperCase() + `${prop}`.slice(1);
        
        if(betObjs[`${prop}`] > 0) {
            betStatusTick.innerText = '✔️';
        }
        else{
            betStatusTick.innerText = '❌';
        }

        betStatusEle.append(betStatusName,betStatusTick);

        if(betStatusTick.innerText == '✔️')
            ticks.push(betStatusEle);
        else if(betStatusTick.innerText == '❌')
            wrongs.push(betStatusEle);
    }
    for (let i = 0;i<ticks.length;i++){
        document.querySelector('.bet-status-row').append(ticks[i]);
    }
    for (let i = 0;i<wrongs.length;i++){
        document.querySelector('.bet-status-row').append(wrongs[i]);
    }

}

let fixtureSelector = document.getElementById('select-fixture');

const startObserver = () => {
    const db = getDatabase();
    
    const bet1Ref = ref(db,'bets/');
    const bet2Ref = ref(db,'bets2/')
    onValue(bet1Ref, (snapshot) => {
        // if(snapshot.val()){
        const data = snapshot.val();
        // console.log(data['bets']);
        if(fixt == 1){
            updateTables(data);
            // updateRevealedList(data);
            updateBetStatus(data);
        }
        
        return data;
        // }
    });
    onValue(bet2Ref, (snapshot) => {
        // if(snapshot.val()){
        const data = snapshot.val();
        // console.log(data['bets']);
        if(fixt == 2){
            updateTables(data);
            // updateRevealedList(data);
            updateBetStatus(data);
        }
        
        return data;
        // }
    });
    fixtureSelector.addEventListener('change', () => {
        onValue(bet1Ref, (snapshot) => {
            // if(snapshot.val()){
            const data = snapshot.val();
            // console.log(data['bets']);
            if(fixt == 1){
                updateTables(data);
                // updateRevealedList(data);
                updateBetStatus(data);
            }
            
            return data;
            // }
        });
        onValue(bet2Ref, (snapshot) => {
            // if(snapshot.val()){
            const data = snapshot.val();
            // console.log(data['bets']);
            if(fixt == 2){
                updateTables(data);
                // updateRevealedList(data);
                updateBetStatus(data);
            }
            
            return data;
            // }
        });
    })
}

const userToPassword = {
    "ashin":"messifan",
    "aryan":"bitchmallu69",
    "pratyush":"betxyz",
    "manan":"ilovemallus",
    "ankur":"mallu123",
    "boidushya":"password1234",
    "dev":"sexymallu69",
    "drumil":"xyz",
    "jayesh":"ashinmom12",
    "rahul":"ankurlodu",
    "rohan":"ashin69",
    "kartik":"ashinbabyanalsex",
    "ayush" : "ashinsabu",
    "rishikesh" : "rishikesh",
}

const placebet = (fixt,user,betAmt,team) => {
    const db = getDatabase();

    if(fixt == 1){
        set(ref(db,'bets/'+user),{
            team: team,
            betAmt: betAmt
        })
    }
    else{
        set(ref(db,'bets2/'+user),{
            team: team,
            betAmt: betAmt
        })
    }
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
        // if(curTime>nextMatchStart){
        //     canBet = false;
        // }
        if(canBet == false){
            document.querySelector('#message-1').innerHTML = "Can't bet now";
            return;
        }
        let chosenMatch = ((fixt==1)?1:2);
        if(betButton.dataset.betteam == 1){
            let username = (document.querySelector("#username1").value).toString();
            let password = document.querySelector("#password1").value;
            let betAmount = document.querySelector("#team1-bet").innerHTML;
            
            
            // console.log(username,password,betAmount);

            if(userToPassword[username] == password){
                document.querySelector('#message-1').style.color = "grey";
                document.querySelector('#message-1').innerHTML = "Placing...";
                placebet(fixt,username,betAmount,1);
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
                placebet(fixt,username,betAmount,2);
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

const viewMyBet = async (username,password) => {
    if(userToPassword[username] != password)
        return;
    
    const db = ref(getDatabase());
    let suffixforfixt = (fixt==2)?'2':'';

    get(child(db, `bets${suffixforfixt}/${username}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        const data=snapshot.val();
        document.querySelector('.view-bet-result').classList.remove('wrong-creds-for-view');
        
        document.querySelector('.view-bet-result').innerHTML="<h7 style = 'color: green'>🤑Your Bet🤑</h7> <p><span style = 'color: grey'>Name: </span>" + username.charAt(0).toUpperCase() + username.slice(1) + 
        "</p><p><span style = 'color: grey'>Bet Amount: </span>₹"  + data.betAmt + "</p><p><span style = 'color: grey'>Team: </span>" + ((fixt==1)?(data.team == 1?country1:country2):(data.team == 1?country3:country4))+"</p>";

      } else {
        document.querySelector('.view-bet-result').innerHTML="";
        document.querySelector('.view-bet-result').innerText = "You have not placed a bet."
      }
    }).catch((error) => {
      console.error(error);
    });
}


document.querySelector('#view-my-bet-button').addEventListener('click', () => {
    document.querySelector('.view-bet-result').style.display = 'flex';
    let username = document.querySelector('.viewbet-username').value;
    let password = document.querySelector('.viewbet-password').value;

    if(userToPassword[username] == password){
        viewMyBet(username,password);   
    }
    else{
        document.querySelector('.view-bet-result').innerHTML="";
        document.querySelector('.view-bet-result').classList.add('wrong-creds-for-view');
        document.querySelector('.view-bet-result').innerText = "Wrong Credentials."
    }
})

fixtureSelector.addEventListener('change' , (e) => {
    fixt = fixtureSelector.value;
    setMatchInfo(fixt);
})
// const loadNextMatchInfo = async () => {
// 	// toggleModal();
// 	const res = await getNextMatchInfo();
	

// 	// toggleStatus();
// };
setMatchInfo(fixt);
startObserver();
// getNextMatchInfo();