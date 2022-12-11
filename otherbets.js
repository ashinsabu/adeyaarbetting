import { getDatabase,ref,set,onValue,get,child } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'

let qFinalTeams = [
    
    // {
    //     team: "brazil",
    //     color: "#0DA044",
    //     teamNameColor: "#FEE009",
    //     accHead: "panelsStayOpen-headingSix",
    //     accColl: "panelsStayOpen-collapseSix",
    // },
    
    {
        team: "argentina",
        color: "#7EB2E1",
        teamNameColor: "white",
        accHead: "panelsStayOpen-headingTwo",
        accColl: "panelsStayOpen-collapseTwo",
    },
    // {
    //     team: "portugal",
    //     color: "#FDFD96",
    //     teamNameColor: "black",
    //     accHead: "panelsStayOpen-headingEight",
    //     accColl: "panelsStayOpen-collapseEight",
    // },
    // {
    //     team: "netherlands",
    //     color: "#B22732",
    //     teamNameColor: "white",
    //     accHead: "panelsStayOpen-headingOne",
    //     accColl: "panelsStayOpen-collapseOne",
        
    // },
    {
        team: "france",
        color: "#15359E",
        teamNameColor: "white",
        accHead: "panelsStayOpen-headingThree",
        accColl: "panelsStayOpen-collapseThree",
    },    
    {
        team: "morocco",
        color: "#19653D",
        teamNameColor: "white",
        accHead: "panelsStayOpen-headingSeven",
        accColl: "panelsStayOpen-collapseSeven",
    },
    // {
    //     team: "england",
    //     color: "white",
    //     teamNameColor: "red",
    //     accHead: "panelsStayOpen-headingFour",
    //     accColl: "panelsStayOpen-collapseFour",
    // },
    {
        team: "croatia",
        color: "#FF0B0B",
        teamNameColor: "white",
        accHead: "panelsStayOpen-headingFive",
        accColl: "panelsStayOpen-collapseFive",
    },
]

//things to update for last two teams update accordion and above list

// UTILITY AND USEFUL FUNCTIONS 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


class Counter {
    constructor(startDelay, endDelay) {
        this.startDelay = startDelay || 50;
        this.endDelay = endDelay || this.startDelay;
    }
    runCounter(objID, start, finish) {
        if (isNaN(start) || isNaN(finish)) {
            console.error("One of the count parameters was not a number. Please check the method call.");
            return;
        }
        if (finish - start === 0) {
            console.error("Finish count is the same as start count. Please use different numbers.");
            return;
        }
        const obj = document.getElementById(objID);
        let num = start;
        let delay = this.startDelay;
        let delayOffset = Math.floor((this.endDelay - this.startDelay) / (finish - start));
        let timerStep = function() {
            if (num <= finish) {
                obj.innerHTML = num;
                delay += delayOffset;
                num += 1;
                setTimeout(timerStep, delay);
            }
        }
        timerStep();
    }
}

// SUBMIT BET FUNCTION
const submitTournamentBet = (user, team, amount) => {
    const db = getDatabase();
    
    set(ref(db,'tournamentBets/'+user),{
        team: team,
        betAmt: amount
    })
    
}


// GLOBAL EVENT LISTENERS
document.querySelector('.tournament-winner-submit').addEventListener('click',() => {
    document.querySelector('.other-bet-message').innerHTML = '';
    document.querySelector('.other-bet-message').style.color = 'grey';

    let username = document.querySelector('.other-bet-username').value;
    let password = document.querySelector('.other-bet-password').value;

    if(userToPassword[username] == password){
        document.querySelector('.other-bet-message').innerHTML = 'Submitting Bet...';
        submitTournamentBet(username,document.querySelector('.tournament-winner-selector').value,document.querySelector('.tournament-winner-amount').value);
        setTimeout(()=>{
            location.reload();
        },1000)
    }
    else{
        document.querySelector('.other-bet-message').innerHTML = 'Wrong Credentials';
        document.querySelector('.other-bet-message').style.color = 'red';
    }
})


// UPDATE DOM FUNCTIONS and direct updates
for(let i=0;i<qFinalTeams.length;i++){
    document.querySelector('.tournament-winner-selector').innerHTML += `<option value="${qFinalTeams[i].team}">${capitalizeFirstLetter(qFinalTeams[i].team)}</option>`
}

const updateBar = (qFinalTeams,objs) => { // also returns total bet
    let total = 0;
    let teamToAmount = {

    };

    for(let i =0;i<qFinalTeams.length;i++){
        teamToAmount[qFinalTeams[i].team] = 0;
    }

    for(let i =0;i<objs.length;i++){
        total+=objs[i].amt;
        teamToAmount[objs[i].team]+=objs[i].amt;
    }

    document.querySelector('.progress').innerHTML = '';
    for(let i =0;i<qFinalTeams.length;i++){
        document.querySelector('.progress').innerHTML +=
        `<div class="progress-bar ${qFinalTeams[i].team}" role="progressbar" style="width: ${teamToAmount[qFinalTeams[i].team]*100/total}%; background-color: ${qFinalTeams[i].color};" aria-valuenow="${100/qFinalTeams.length}" aria-valuemin="0" aria-valuemax="100"></div>
        `
    }
    // console.log(teamToAmount);
    // console.log(total)
    return total;
}


// submitTournamentBet("ashin","netherlands",50);


const updateAccordions = (qFinalTeams,objs,total) => {
    // console.log(objs);
    document.querySelector('.user-wise-table').innerHTML = `<tr>
        <th>User</th>
        <th>Team</th>
        <th>Bet Amt.</th>
        <th>Possible Win</th>
    </tr>`;
    let totals = {
        argentina: 0, 
        france: 0, 
        croatia: 0, 
        morocco: 0,
    }
    for(let i=0;i<objs.length;i++){
        totals[`${objs[i].team}`] += objs[i].amt;
    }

    let qFinalTeamsComponents =  qFinalTeams.map((item,index)=>{
        return `<div class="accordion-item">
        <h2 class="accordion-header" id="${item.accHead}">
          <button style="background-color: ${item.color}; color: ${item.teamNameColor};" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${item.accColl}" aria-expanded="false" aria-controls="${item.accColl}">
            ${capitalizeFirstLetter(item.team)}
          </button>
        </h2>
        <div id="${item.accColl}" class="accordion-collapse collapse" aria-labelledby="${item.accHead}">
          <div class="accordion-body ${item.team}-info">
              <p>Total Bet on ${capitalizeFirstLetter(item.team)}</p>
              <h5 style="margin-bottom: 8px;" class="total-bet-on-team ${item.team}-total">₹${totals[item.team]}</h5>
              <table class="${item.team}-table other-bet-team-table">
                  <tr>
                      <th>User</th>
                      <th>Bet Amt.</th>
                      <th>Possible Win</th>
                  </tr>
              </table>
          </div>
        </div>
        </div>
        `;
    });
    document.querySelector('.accordion').innerHTML = '';
    for(let i=0;i<qFinalTeamsComponents.length;i++){
        document.querySelector('.accordion').innerHTML += qFinalTeamsComponents[i];
    }

    for(let i=0;i<objs.length;i++){
        let possibleWin = (objs[i].amt/totals[`${objs[i].team}`])*(total-totals[`${objs[i].team}`]);
        // console.log((objs[i].amt/totals[`${objs[i].team}`])) 
        document.querySelector(`.${objs[i].team}-table`).innerHTML += `
        <tr>
            <td>${objs[i].name}</td>
            <td>₹${objs[i].amt}</td>
            <td>₹${possibleWin}</td>
        </tr>
        `;
        let teamNameInCaps = objs[i].team.charAt(0).toUpperCase() + objs[i].team.slice(1)
        document.querySelector('.user-wise-table').innerHTML +=`
        <tr>
            <td>${objs[i].name}</td>
            <td>${teamNameInCaps}</td>
            <td>₹${objs[i].amt}</td>
            <td>₹${possibleWin}</td>
        </tr>
        `
    }
}
//
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
const getObjectsFromData = (data) => {
    let objs = [];
    for (const prop in data) {
        let name = `${prop}`.charAt(0).toUpperCase() + `${prop}`.slice(1);
        let amt = parseInt(`${data[prop].betAmt}`,10);
        let team = `${data[prop].team}`;
        objs.push(
            {
                name: name,
                amt: amt,
                team: team
            }
        )
    }
    return objs;
}

let MyCounter1 = new Counter(5,150);

const startObserver = () => {
    const db = getDatabase();
    
    const betRef = ref(db,'tournamentBets/');
    onValue(betRef, (snapshot) => {
        const data = snapshot.val();
        const objs = getObjectsFromData(data);
        const total = updateBar(qFinalTeams,objs);
        // console.log(objs);
        
        updateAccordions(qFinalTeams,objs,total);
        MyCounter1.runCounter("myObj1", (total-50)>0?total-50:0, total);
    });
}


// updateAccordions(qFinalTeams);
// updateBar(qFinalTeams);
startObserver();