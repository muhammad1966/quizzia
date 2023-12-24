const initApp = () =>{

    const getUserParameters = (param) =>{
        param = param.replace(/[[]/, '\\[').replace(/[]]/, '\\]');

        const regex = new RegExp('[\\?&]' + param + '=([^#&]*)');

        const result = regex.exec(location.search);

        return result === null ? '' : decodeURIComponent(result[1].replace(/\+/g, ' '));

    }

    let answedQuestion = {
        count: 0,
        increment: function(){
            this.count++;
        },
        decrement: function(){
            this.count = 0;
        }
    }

    
    const kit = document.getElementById('correct_ans');
    let correctAns = {
        count: 0,
        increment: function(){
            this.count++;
            kit.innerText = this.count + 'c'
        },
        decrement: function(){
            this.count = 0;
        }
    }


    const kut = document.getElementById('wrong_ans');
    let wrongAns = {
        count: 0,
        increment: function(){
            this.count++;
            kut.innerText = this.count + 'w'
        },
        decrement: function(){
            this.count = 0;
        }
    }

    

    

    const Name = getUserParameters('name');
    const Subj = getUserParameters('subject');
    const moode = getUserParameters('mode')
    const  durat = getUserParameters('duration');
    const  numb_question = getUserParameters('quest');

    

    const user_name = document.getElementById('user_name');
    user_name.innerText = Name;

    const subjectAns = document.getElementById('ans_subject');
    subjectAns.innerText = Subj == 19 ? 'Math' : '';

    const modeAns = document.getElementById('ans_mode');
    modeAns.innerText = moode[0].toUpperCase() + moode.slice(1);

    const numbQuestion = document.getElementById('ans_quest');
    numbQuestion.innerText = numb_question + 'qts';

    const durAns = document.getElementById('ans_time');
    durAns.innerText = durat + (durat == 1 ? 'hour' : durat == 2 ? 'hours' : 'minutes');

    const kat = document.getElementById('quest_ans');
    kat.innerText = answedQuestion.count + `/${numb_question}`

    

    


    let Time = 0;

    const duratValue = parseInt(durat,10);

    if (duratValue === 1){
        Time = 3600;
    }

    else if(duratValue === 2){
        Time = 7200;
    }

    else if(duratValue === 40){
        Time = 2400;
    }

    else if(duratValue ===30){
        Time = 1800;
    }

    const mint = Time/60;

    const hrs = mint/60

    

    const ss = document.getElementById('second');
    const mm = document.getElementById('minu');
    const hh = document.getElementById('hour');


    const timer = {
        count: Time,
        mint_count: mint,
        sec_count: 59,
        hrs_count: hrs,
        updater: function(){
            this.count--;
            this.sec_count--;
            if(this.sec_count === 0){
                this.mint_count--;
                this.sec_count = 59;
            }

            if(this.mint_count === 0){
                this.hrs_count > 1 ? this.hrs_count-- : this.hrs_count = 0
                this.mint_count = 60
            }

            if(this.hrs_count >= 2){
                mm.innerText = this.mint_count/this.hrs_count -1;
                hh.innerText = this.hrs_count -1

            }
            else{
                hh.innerText = '00';
                mm.innerText = this.mint_count -1;
            }

            ss.innerText = this.sec_count;
            
        },
        
    }

    setInterval(timer.updater.bind(timer),1000)

    const Home = () =>{
        const homeTab = window.open('../public/index.html');
    }

    const goHome = document.getElementById('home');
    goHome.addEventListener('click', Home);

    const Abort = () =>{
        const prepTab = window.open('../public/prepQuizz.html');
    }

    const goPrep = document.getElementById('abort');
    goPrep.addEventListener('click', Abort)

    const question = document.getElementById('question');
    const ans_A = document.getElementById('option_a');
    const ans_B = document.getElementById('option_b');
    const ans_C = document.getElementById('option_c');
    const ans_D = document.getElementById('option_d');

    const fetchData = {
        data : [],
        fetchD: async function (){
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${Subj}&difficulty=${moode}&type=multiple`);
                const res = await response.json()
                this.data = res;
                
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    }
    const next = document.getElementById('next-n');
    next.addEventListener('click', function(){
        fetchData.fetchD().then(()=>{
            console.log(fetchData.data);
    
            const getRandomNumb = (min, max) =>{
                min = Math.ceil(min);
                max = Math.floor(max)
                const randNumb = Math.floor(Math.random() * (max - min)) + min ;
                return randNumb;
            }
            
            let ansArray = []
            
            ansArray.push(fetchData.data.results[0].incorrect_answers[0]);
            ansArray.push(fetchData.data.results[0].incorrect_answers[1]);
            ansArray.push(fetchData.data.results[0].incorrect_answers[2]);
            
            

            let ANS = {
                user_ans: null,
                rightAns: fetchData.data.results[0].correct_answer
            }
            
            let rand = getRandomNumb(0, 4);
            
            ansArray.splice(rand, 0, ANS.rightAns);
            
            
            question.innerText = fetchData.data.results[0].question;
            
            
            ans_A.innerText = ansArray[0];
            ans_B.innerText = ansArray[1];
            ans_C.innerText = ansArray[2];
            ans_D.innerText = ansArray[3];
    
            
    
            const AA = document.getElementById('a');
            const BB = document.getElementById('b');
            const CC = document.getElementById('c');
            const DD = document.getElementById('d');
    
            
            
    
            

            const conpare = () =>{
                if(ANS.user_ans == ANS.rightAns){
                    correctAns.increment()
                    
                }
                else{
                    wrongAns.increment()
                }
            }

            
            

           
            

            const A_user_ans = () =>{
                ANS.user_ans = ans_A.textContent;
                
            }


            const callA = () =>{
                A_user_ans()
                conpare()
                

                
                

            }

            const B_user_ans = () =>{
                ANS.user_ans = ans_B.textContent;
            }

            const callB = () =>{
                B_user_ans()
                conpare()
                

                

            }

            const C_user_ans = () =>{
                ANS.user_ans = ans_C.textContent;

            }

            const callC = () =>{
                C_user_ans()
                conpare()
                

                
            }
            
            const D_user_ans = () =>{
                ANS.user_ans = ans_D.textContent;
            }

            const callD = () =>{
                D_user_ans()
                conpare()
                

                

            }
            
            
            

            AA.addEventListener('click', callA);
            BB.addEventListener('click', callB);
            CC.addEventListener('click', callC);
            DD.addEventListener('click', callD);
            
            
    
            const A_change = ()=>{
                AA.classList.replace('sas','sasf')
    
            }
    
            AA.addEventListener('click', A_change);
    
            
            const B_change = ()=>{
                BB.classList.replace('sas','sasf')
            }
    
            BB.addEventListener('click', B_change);
    
            const C_change = ()=>{
                CC.classList.replace('sas','sasf')
            }
    
            CC.addEventListener('click', C_change);
    
            const D_change = ()=>{
                DD.classList.replace('sas','sasf')
            }
    
            DD.addEventListener('click', D_change);
        }
    )
    
    })

    
    window.onload = fetchData.fetchD()

    




    

}

document.addEventListener('DOMContentLoaded', initApp)