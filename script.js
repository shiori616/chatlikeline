
//   firebase設定時よりコピー ↓ここから
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";

// Firebaseのウェブアプリへの Firebase の追加には含まれないため、自分では追加必要
// verを↑のバージョンと合わせるように
  import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved } 
  from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
   ******************************
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

//   firebase設定時よりコピー　↑ここまで

const db = getDatabase(app); //dbに↑のappを渡す
const dbRef = ref(db, 'chat'); //chatにデータを保存する


// 送信イベント
$("#send-btn").on("click", function(){
    const msg = {
        text : $("#msg-input-text").val(),
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // 時刻のみ取得
      };
    // 送信データをデータベースに格納
    const newPostRef = push(dbRef); //UNIQUEなキーを生成
    set(newPostRef, msg) //データを保存
});

// 受信イベント（データ個数分自動でループ）
onChildAdded(dbRef,function(data){
  const msg = data.val(); //データを取得とオブジェクトに変換
  const key = data.key; //キーを取得
  senderMessageDisplay(msg); //メッセージを表示する関数を呼び出す
  scrollToBottom(); //スクロールを下端に移動
  partnerMessageDisplay(); //パートナーメッセージを表示する関数を呼び出す
  scrollToBottom(); //スクロールを下端に移動
  
});

// 送信メッセージを表示する関数
function senderMessageDisplay(msg) {
    let senderMessage = `
          <div id="" class="sender-msg">
            <p class="sender-time">${msg.date}</p>
            <p class="sender-text">${msg.text}</p>
          </div>
        `;
    $("#msg-box").append(senderMessage); //メッセージを表示
    $("#msg-input-text").val(""); //入力欄を空にする
}

// スクロールを下端に移動する関数
function scrollToBottom() {
  const msgBox = document.getElementById("msg-box");
  msgBox.scrollTop = msgBox.scrollHeight;
}


// partnerメッセージ候補
const partnerMessages = [
    "できる！できる！君ならできる！もっと熱くなれよ！太陽より熱い君の心で、不可能を可能に変えろ！さあ、行こうぜ！",
    "失敗は挑戦の証だ！転んでも、その分だけ強くなれる！諦めるな！君の夢は、君自身が燃やし続ける限り、絶対に消えない！",
    "壁にぶち当たった時こそチャンスだ！乗り越えた先に、新しい景色が待っている！君の情熱を信じろ！さあ、一歩踏み出せ！",
    "大丈夫だ！君は一人じゃない！俺が、そしてみんなが、君の背中を押してる！自信を持て！君のガッツを見せてやれ！大丈夫だ！君は一人じゃない！俺が、そしてみんなが、君の背中を押してる！自信を持て！君のガッツを見せてやれ！",
    "やればできる！いや、やるんだ！言い訳を探すな！今この瞬間、全力を出し切れ！君の限界は、君が勝手に決めているだけだ！",
    "壁にぶち当たった時こそチャンスだ！乗り越えた先に、新しい景色が待っている！君の情熱を信じろ！さあ、一歩踏み出せ！",
    "ネガティブな感情は吹き飛ばせ！君の未来は、君自身が創るんだ！笑顔で、前向きに！君の笑顔が、周りを明るくする！"
];

// ランダムにメッセージを選択する関数
function getRandomPartnerMessage() {
  const randomIndex = Math.floor(Math.random() * partnerMessages.length);
  return partnerMessages[randomIndex];
};

// パートナーメッセージを表示する関数
function partnerMessageDisplay() {
  getRandomPartnerMessage(); //ランダムにメッセージを選択
  const partnerMsg = {
    text: getRandomPartnerMessage(), //ランダムに選択したメッセージ
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // 時刻のみ取得
  };
  let partnerMessage = `
            <div id="" class="partner-msg">
                  <img src="img/0.png" alt="profile-photo" class ="partner-photo">
                  <p class="partner-text">${partnerMsg.text}</p>
                  <p class="partner-time">${partnerMsg.date}</p>
            </div>
      `;
  $("#msg-box").append(partnerMessage); //メッセージを表示
}
