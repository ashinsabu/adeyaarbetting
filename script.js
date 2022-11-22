import { getDatabase,ref,set,onValue } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'



const updateTables = (betData) => {
    // console.log(betData);

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

startObserver();

const userToPassword = {
    "ashin":"xyz",
    "aryan":"xyz",
    "pratyush":"xyz",
    "manan":"xyz",
    "ankur":"xyz",
    "boidushya":"xyz",
    "dev":"xyz",
    "drumil":"xyz",
    "jayesh":"xyz",
    "rahul":"xyz",
    "rohan":"xyz",
    "kartik":"xyz"
}

const placebet = (user,betAmt,team) => {
    const db = getDatabase();
    set(ref(db,'bets/'+user),{
        team: team,
        betAmt: betAmt
    })
} 

document.querySelectorAll('.bet-amount').forEach((betAmountButton) => {
    betAmountButton.addEventListener('click', (e) => {
        document.querySelectorAll('.bet-amount').forEach((x) => {x.classList.remove('active')});
        betAmountButton.classList.add('active');
        document.querySelector('#team1-bet').innerHTML = betAmountButton.innerHTML;
        document.querySelector('#team2-bet').innerHTML = betAmountButton.innerHTML;
    })
})  
placebet("Pratyush",1000,2);