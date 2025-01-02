const initApp = function () {
    // Utility Functions
    const getUserParameters = (param) => {
        param = param.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
        const regex = new RegExp('[\\?&]' + param + '=([^#&]*)');
        const result = regex.exec(location.search);
        return result === null ? '' : decodeURIComponent(result[1].replace(/\+/g, ' '));
    };

    // State Objects
    const answedQuestion = {
        count: 0,
        increment() { this.count++; },
        decrement() { this.count = 0; }
    };

    const correctAns = {
        count: 0,
        increment() {
            this.count++;
            document.getElementById('correct_ans').innerText = this.count + 'c';
        },
        decrement() { this.count = 0; }
    };

    const wrongAns = {
        count: 0,
        increment() {
            this.count++;
            document.getElementById('wrong_ans').innerText = this.count + 'w';
        },
        decrement() { this.count = 0; }
    };

    // User Info and Display
    const Name = getUserParameters('name');
    const Subj = getUserParameters('subject');
    const moode = getUserParameters('mode');
    const durat = getUserParameters('duration');
    const numb_question = getUserParameters('quest');
    const NOQ = parseInt(numb_question, 10);

    document.getElementById('user_name').innerText = Name;
    document.getElementById('ans_subject').innerText = Subj == 19 ? 'Math' : Subj == 17 ? 'Science' : Subj == 25 ? 'Art' : '';
    document.getElementById('ans_mode').innerText = moode[0].toUpperCase() + moode.slice(1);
    document.getElementById('ans_quest').innerText = numb_question + 'qts';
    document.getElementById('ans_time').innerText = durat + (durat == 1 ? 'hour' : durat == 2 ? 'hours' : 'minutes');

    // Timer Setup
    let Time = parseInt(durat, 10) * 3600 || 1800;
    const ss = document.getElementById('second');
    const mm = document.getElementById('minu');
    const hh = document.getElementById('hour');

    const timer = {
        count: Time,
        mint_count: Time / 60,
        sec_count: 60,
        hrs_count: Time / 3600,
        updater() {
            this.count--;
            this.sec_count--;

            if (this.sec_count === 0) {
                this.mint_count--;
                this.sec_count = 60;
            }

            if (this.mint_count === 0) {
                this.hrs_count > 1 ? this.hrs_count-- : this.hrs_count = 0;
                this.mint_count = 60;
            }

            hh.innerText = this.hrs_count >= 2 ? this.hrs_count - 1 : '00';
            mm.innerText = this.mint_count - 1;
            ss.innerText = this.sec_count;

            if (this.count === 0) {
                clearInterval(INT);
                mm.innerText = '00';
                ss.innerText = '00';
                End();
            }

            if (answedQuestion.count > NOQ) Finish();
        }
    };

    const INT = setInterval(timer.updater.bind(timer), 1000);

    // Navigation Handlers
    const Home = () => window.open('../index.html');
    document.getElementById('home').addEventListener('click', Home);
    document.getElementById('home_mob').addEventListener('click', Home);

    const Abort = () => window.open('../prepQuizz.html');
    document.getElementById('abort').addEventListener('click', Abort);
    document.getElementById('abort_mob').addEventListener('click', Abort);

    // Fetch Data
    const fetchData = {
        data: [],
        async fetchD() {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${Subj}&difficulty=${moode}&type=multiple`);
                const res = await response.json();
                this.data = res;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    };

    // Question Handling
    const question = document.getElementById('question');
    const ans_A = document.getElementById('option_a');
    const ans_B = document.getElementById('option_b');
    const ans_C = document.getElementById('option_c');
    const ans_D = document.getElementById('option_d');

    const ANS = { user_ans: null, rightAns: null };

    const displayNextQuestion = () => {
        fetchData.fetchD().then(() => {
            const getRandomNumb = (min, max) => Math.floor(Math.random() * (max - min)) + min;

            const ansArray = [...fetchData.data.results[0].incorrect_answers];
            const RightAns = fetchData.data.results[0].correct_answer;
            ansArray.splice(getRandomNumb(0, 4), 0, RightAns);

            question.innerText = fetchData.data.results[0].question;
            ANS.rightAns = RightAns;

            [ans_A, ans_B, ans_C, ans_D].forEach((el, i) => el.innerText = ansArray[i]);

            [AA, BB, CC, DD].forEach(btn => btn.classList.replace('sasf', 'sas'));

            answedQuestion.increment();
            document.getElementById('quest_ans').innerText = `${answedQuestion.count}/${numb_question}`;
            document.getElementById('score-mob').innerText = `${correctAns.count}/${numb_question}`;
        });
    };

    document.getElementById('next-n').addEventListener('click', displayNextQuestion);
    document.getElementById('next-mob').addEventListener('click', displayNextQuestion);

    // Answer Buttons
    const [AA, BB, CC, DD] = [
        document.getElementById('a'),
        document.getElementById('b'),
        document.getElementById('c'),
        document.getElementById('d')
    ];

    const handleAnswer = (btn, ansText) => {
        ANS.user_ans = ansText;
        if (ANS.user_ans === ANS.rightAns) correctAns.increment();
        else wrongAns.increment();
        btn.classList.replace('sas', 'sasf');
    };

    [[AA, ans_A], [BB, ans_B], [CC, ans_C], [DD, ans_D]].forEach(([btn, ans]) => {
        btn.addEventListener('click', () => handleAnswer(btn, ans.textContent));
    });

    // End Handlers
    const End = () => document.getElementById('time-pop').classList.add('kare');
    const Finish = () => {
        const popFinish = document.getElementById('finish-pop');
        popFinish.classList.add('kare');
        document.getElementById('scored').innerText = correctAns.count;
        document.getElementById('fi-qunumb').innerText = numb_question;
    };

    document.getElementById('yes').addEventListener('click', () => window.location.reload());
    document.getElementById('no').addEventListener('click', Home);
    document.getElementById('YES').addEventListener('click', () => window.location.reload());
    document.getElementById('NO').addEventListener('click', Home);

    window.addEventListener('load', displayNextQuestion);
};

document.addEventListener('DOMContentLoaded', initApp);
