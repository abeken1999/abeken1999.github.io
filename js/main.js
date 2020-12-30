'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = shuffle([
        { q: '地球儀を使うネタをする宇宙海賊の名前は？', c: ["ゴー☆ジャス", "ゴージャス", "ゴージャス松野", "宇宙戦艦ゴージャス"] },
        { q: '上田晋也と有田哲平のコンビ名は？', c: ["くりぃむしちゅー", "くりぃむしちゅ～", "クリームシチュー", "くりぃむしちゅう"] },
        { q: '三村マサカズと大竹一樹のコンビ名は？', c: ["さまぁ～ず", "さまーず", "さま～ず", "さまぁーず"] },
        { q: '笑っていいとも！にレギュラーで出演したことがない人は誰？', c: ["ブラックマヨネーズ", "ウエストランド", "とんねるず", "ココリコ"] },
        { q: 'お笑いコンビ千鳥のノブが一時期使用していた芸名は？', c: ["ノブ小池", "ノブ田中", "ノブ次郎", "ノブちゃん"] },
        { q: 'アンジャッシュの大声を出すギャグの人は？', c: ["児島", "大島", "八丈島", "奄美大島"] },
        { q: 'ボキャブラ天国に出演した際、出川哲郎のキャッチフレーズは？', c: ["自称ポストタモリ", "ドッキリ請負人", "4人目のダチョウ倶楽部", "切れたナイフ"] },
        { q: '「アメトーーク！」のタイトルは特番になると「ー」が長くなる。それはなぜ？', c: ["時間を表しているから", "宮迫の気分次第", "特番の時はアピールしたいから", "ゲストの数が増えるから"] },
        { q: 'くりぃむしちゅー上田は過去に何股した？', c: ["3股", "2股", "4股", "5股"] },
        { q: '有吉弘行が和田アキ子につけたあだ名は？', c: ["リズム&暴力", "楽屋の厄介者", "進撃の巨人", "女番長"] },
    ]);
    let currentNum = 0; //0から始める
    let isAnswered; //回答はじめ
    let score = 0;
    let tweet = document.getElementById('tweet');
    let tweetUrl;

    // 問題のシャッフル
    function shuffle(arr) {
        // 配列すべてに対して処理したいのループ
        for (let i = arr.length - 1; i > 0; i--) {

            // 現在処理してる添字の元にした乱数を生成します
            // 0 ~ i までの数がランダムに生成されます。
            const j = Math.floor(Math.random() * (i + 1)); //randomする

            // 処理中の配列の添字と作成した乱数の添字を使って配列を入れ替えます
            // その結果、配列の中身がシャッフルされます。
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if (isAnswered) { //回答済みならreturn
            return;
        }
        isAnswered = true; //未回答で正解ならtrue

        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++; //正解なら1を足す
        } else {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled'); //回答したら次へボタン押せる
    }

    function setQuiz() {
        isAnswered = false;

        question.textContent = quizSet[currentNum].q;

        while (choices.firstChild) { //choicesの最初の子要素がある時、choicesの最初の子要素を消す
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = '結果を見る';
        }
    }

    setQuiz();

    //ボタンの処理
    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) { //未回答ならruturn
            return;
        }
        btn.classList.add('disabled'); //次の問題に進んだらdisabled グレーにする

        if (currentNum === quizSet.length - 1) { //最後の問題になったら結果ボタンにする(最後の画面は結果で、その前の最終問題で結果ボタンを表示しなればならない)
            scoreLabel.textContent = `成績: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }

        // ツイート機能実装
        tweetUrl = 'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent(scoreLabel.textContent + "でした！") + 　
            '&hashtags=お笑いクイズ';

        tweet.href = tweetUrl;

    });
}